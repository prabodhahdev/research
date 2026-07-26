"""Research feature engineering (Step 5): 5 ranking features + hybrid retrieval."""

from __future__ import annotations

import os
import re
from functools import lru_cache
from typing import Any, Dict, List, Optional, Sequence, Tuple

import joblib
import numpy as np
from rank_bm25 import BM25Okapi

from ai.cv_parser import extract_field, extract_skills_from_cv_text
from ai.experience_rules import EXPERIENCE_RULES
from ai.field_rules import FIELD_RULES
from ai.text_preprocess import clean_job_text

FEATURE_NAMES = (
    "sbert_score",
    "bm25_score_norm",
    "field_match",
    "skill_overlap_score",
    "experience_match_score",
)

EXPERIENCE_ORDINAL = {"intern": 0, "junior": 1, "mid": 2, "senior": 3}

# Map CV/job labels onto the same canonical field keys used by field_rules.
FIELD_ALIASES = {
    "information technology": "it & software",
    "it field": "it & software",
    "it & software": "it & software",
    "banking": "banking & financial services",
    "banking & financial services": "banking & financial services",
    "finance": "accounting & finance",
    "accounting & finance": "accounting & finance",
    "graphic design": "design & creative",
    "design & creative": "design & creative",
    "healthcare": "healthcare & medical",
    "healthcare & medical": "healthcare & medical",
    "education": "education & training",
    "education & training": "education & training",
    "human resources": "human resources",
    "engineering": "engineering & construction",
    "engineering & construction": "engineering & construction",
    "marketing": "sales & marketing",
    "marketing & sales": "sales & marketing",
    "sales & marketing": "sales & marketing",
    "customer service": "customer service & bpo",
    "customer service & bpo": "customer service & bpo",
}

_YEARS_RE = re.compile(r"(\d+)\+?\s*(?:years?|yrs?)", re.I)

_BACKEND_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
_CACHE_PATH = os.path.join(_BACKEND_DIR, "data", "vectors", "job_sbert_cache.joblib")
# Bump when cached job rows change meaning (e.g. how `_resolved_field` is derived).
_CACHE_VERSION = 2
MAX_INDEX_JOBS = int(os.environ.get("MAX_INDEX_JOBS", "5500"))
DEFAULT_SBERT_K = int(os.environ.get("SBERT_K", "40"))
DEFAULT_BM25_K = int(os.environ.get("BM25_K", "40"))


def normalize_field(value: Optional[str]) -> str:
    raw = (value or "").strip().lower()
    if not raw:
        return ""
    return FIELD_ALIASES.get(raw, raw)


def split_skills(value: Any) -> List[str]:
    if value is None:
        return []
    text = str(value).strip().lower()
    if not text:
        return []
    parts = re.split(r"[;,|/]\s*|\n", text)
    return [p.strip() for p in parts if p.strip()]


def experience_level_from_text(text: str) -> str:
    """Map free-text experience to intern/junior/mid/senior/unknown."""
    if not text:
        return "unknown"

    lowered = text.lower()
    match = _YEARS_RE.search(lowered)
    if match:
        years = int(match.group(1))
        if years < 1:
            return "intern"
        if years < 2:
            return "junior"
        if years < 5:
            return "mid"
        return "senior"

    for level in ("senior", "mid", "junior", "intern"):
        for kw in EXPERIENCE_RULES[level]["keywords"]:
            if kw.lower() in lowered:
                return level
    return "unknown"


def experience_match_score(cv_level: str, job_level: str) -> float:
    cv_ord = EXPERIENCE_ORDINAL.get(cv_level)
    job_ord = EXPERIENCE_ORDINAL.get(job_level)
    if cv_ord is None or job_ord is None:
        return 0.5
    diff = abs(cv_ord - job_ord)
    if diff == 0:
        return 1.0
    if diff == 1:
        return 0.7
    return 0.0


def field_match_score(cv_field: Optional[str], job_field: Optional[str]) -> float:
    cv = normalize_field(cv_field)
    job = normalize_field(job_field)
    if not cv or not job:
        return 0.0
    return 1.0 if cv == job else 0.0


def _skill_in_text(skill: str, text: str) -> bool:
    if not skill or not text:
        return False
    if skill in text:
        return True
    return bool(re.search(rf"(?<!\w){re.escape(skill)}(?!\w)", text))


def skill_overlap_score(cv_skills: Sequence[str], job_row: Dict[str, Any]) -> float:
    if not cv_skills:
        return 0.0

    job_skills = set(split_skills(job_row.get("skills")))
    if not job_skills and job_row.get("_inferred_skills"):
        job_skills = set(s.lower() for s in job_row["_inferred_skills"])

    # ``job_category`` is excluded: portal buckets such as
    # "IT-Sware/DB/QA/Web/Graphics/GIS" would falsely match CV skills like
    # "web" or "qa" on jobs that are not actually in that role.
    job_blob = " ".join(
        str(job_row.get(key) or "")
        for key in ("title", "skills", "description", "job_text")
    ).lower()

    matched = 0
    for skill in cv_skills:
        s = str(skill).strip().lower()
        if not s:
            continue
        if s in job_skills or _skill_in_text(s, job_blob):
            matched += 1
    return matched / max(1, len(cv_skills))


def build_job_document(row: Dict[str, Any]) -> str:
    job_text = row.get("job_text")
    if job_text and str(job_text).strip():
        return str(job_text).strip()
    return " ".join(
        str(row.get(key) or "")
        for key in (
            "title",
            "job_category",
            "experience",
            "skills",
            "description",
            "company",
            "location",
        )
        if row.get(key)
    ).strip()


def _is_portal_bucket(value: str) -> bool:
    """True for coarse portal categories that group unrelated roles together.

    e.g. "IT-Sware/DB/QA/Web/Graphics/GIS" holds everything from developers to
    a Textile lecturer, so it cannot be trusted as the job's actual field.
    """
    raw = value.strip().lower()
    if not raw:
        return True
    if raw in FIELD_ALIASES or raw in FIELD_RULES:
        return False
    return "/" in raw or raw.count("&") > 1 or raw.count(",") > 1


def resolve_job_field(row: Dict[str, Any]) -> str:
    """Prefer a trustworthy stored category; otherwise infer from title/description."""
    stored = str(row.get("job_category") or row.get("category") or "").strip()
    if stored and not _is_portal_bucket(stored):
        return stored
    title = str(row.get("title") or "")
    blob = build_job_document(row)
    return extract_field(blob, title) or ""


def build_job_experience(row: Dict[str, Any]) -> str:
    # Prefer explicit experience column; fall back to title only (avoid noisy descriptions).
    explicit = str(row.get("experience") or "").strip()
    if explicit:
        return experience_level_from_text(explicit)
    title = str(row.get("title") or "")
    level = experience_level_from_text(title)
    if level != "unknown":
        return level
    return experience_level_from_text(str(row.get("description") or ""))


@lru_cache(maxsize=1)
def _load_sbert():
    # Limit CPU threads so free-tier containers are less likely to OOM / thrash.
    try:
        import torch

        torch.set_num_threads(1)
    except Exception:
        pass
    from sentence_transformers import SentenceTransformer

    return SentenceTransformer("all-MiniLM-L6-v2")


class JobRetrievalIndex:
    """BM25 corpus index with on-demand SBERT encoding for candidates only."""

    def __init__(self) -> None:
        self._job_ids: List[Any] = []
        self._job_rows: List[Dict[str, Any]] = []
        self._bm25_docs: List[List[str]] = []
        self._bm25: Optional[BM25Okapi] = None
        self._bm25_min = 0.0
        self._bm25_max = 1.0
        self._signature: Tuple[Any, ...] = ()
        self._embedding_by_idx: Dict[int, np.ndarray] = {}

    def build(self, jobs: List[Dict[str, Any]]) -> None:
        if len(jobs) > MAX_INDEX_JOBS:
            jobs = jobs[:MAX_INDEX_JOBS]

        signature = tuple(row.get("id") for row in jobs)
        if signature == self._signature and self._bm25 is not None:
            return

        if self._try_load_cache(signature):
            return

        self._job_ids = []
        self._job_rows = []
        self._bm25_docs = []
        raw_scores: List[float] = []

        for row in jobs:
            enriched = dict(row)
            enriched["_resolved_field"] = resolve_job_field(row)
            doc = build_job_document(row)
            if not doc.strip():
                continue
            cleaned = clean_job_text(doc)
            if not cleaned.strip():
                continue
            self._job_ids.append(row.get("id"))
            self._job_rows.append(enriched)
            self._bm25_docs.append(cleaned.split())

        if not self._bm25_docs:
            self._bm25 = None
            self._signature = signature
            return

        self._bm25 = BM25Okapi(self._bm25_docs)
        for doc_tokens in self._bm25_docs[: min(300, len(self._bm25_docs))]:
            if doc_tokens:
                raw_scores.extend(self._bm25.get_scores(doc_tokens[:25]))
        if raw_scores:
            self._bm25_min = float(min(raw_scores))
            self._bm25_max = float(max(raw_scores))
            if self._bm25_max <= self._bm25_min:
                self._bm25_max = self._bm25_min + 1.0

        self._signature = signature
        self._save_cache()

    def _try_load_cache(self, signature: Tuple[Any, ...]) -> bool:
        if not os.path.isfile(_CACHE_PATH):
            return False
        try:
            payload = joblib.load(_CACHE_PATH)
            if payload.get("version") != _CACHE_VERSION:
                return False
            if tuple(payload.get("job_ids", [])) != signature:
                return False
            self._job_ids = list(payload["job_ids"])
            self._job_rows = list(payload["job_rows"])
            self._bm25_docs = list(payload["bm25_docs"])
            self._bm25 = BM25Okapi(self._bm25_docs) if self._bm25_docs else None
            self._bm25_min = float(payload["bm25_min"])
            self._bm25_max = float(payload["bm25_max"])
            self._signature = signature
            return True
        except Exception:
            return False

    def _save_cache(self) -> None:
        try:
            os.makedirs(os.path.dirname(_CACHE_PATH), exist_ok=True)
            joblib.dump(
                {
                    "version": _CACHE_VERSION,
                    "job_ids": self._job_ids,
                    "job_rows": self._job_rows,
                    "bm25_docs": self._bm25_docs,
                    "bm25_min": self._bm25_min,
                    "bm25_max": self._bm25_max,
                },
                _CACHE_PATH,
            )
        except Exception:
            pass

    def _normalize_bm25(self, score: float) -> float:
        if self._bm25_max <= self._bm25_min:
            return 0.0
        return float(
            np.clip((score - self._bm25_min) / (self._bm25_max - self._bm25_min), 0.0, 1.0)
        )

    def retrieve_candidates(
        self,
        *,
        cv_text: str,
        cv_query_tokens: List[str],
        cv_embedding: np.ndarray,
        sbert_k: int = 40,
        bm25_k: int = 40,
    ) -> List[int]:
        """Hybrid retrieval: BM25 pool, then SBERT top-k on that pool only."""
        if not self._job_rows:
            return []

        self._embedding_by_idx = {}

        bm25_top: List[int] = []
        if self._bm25 is not None and cv_query_tokens:
            bm25_scores = self._bm25.get_scores(cv_query_tokens)
            bm25_top = np.argsort(-np.asarray(bm25_scores))[:bm25_k].tolist()

        pool_size = max(sbert_k * 2, 80)
        pool: List[int] = []
        seen_pool = set()
        for idx in bm25_top[:pool_size]:
            if idx not in seen_pool:
                seen_pool.add(idx)
                pool.append(idx)

        sbert_top: List[int] = []
        if pool:
            model = _load_sbert()
            texts = [build_job_document(self._job_rows[idx]) for idx in pool]
            job_embeddings = np.asarray(
                model.encode(
                    texts,
                    batch_size=8,
                    show_progress_bar=False,
                    normalize_embeddings=True,
                )
            )
            for local_idx, job_idx in enumerate(pool):
                self._embedding_by_idx[job_idx] = job_embeddings[local_idx]

            sims = job_embeddings @ cv_embedding
            for local_idx in np.argsort(-sims)[:sbert_k]:
                sbert_top.append(pool[int(local_idx)])

        ordered: List[int] = []
        seen = set()
        for idx in sbert_top + bm25_top:
            if idx not in seen:
                seen.add(idx)
                ordered.append(idx)
        return ordered

    def score_candidates(
        self,
        *,
        candidate_indices: List[int],
        cv_text: str,
        cv_field: Optional[str],
        cv_experience: Optional[str],
        cv_skills: Sequence[str],
        cv_embedding: np.ndarray,
        cv_query_tokens: List[str],
    ) -> List[Tuple[Dict[str, Any], Dict[str, float]]]:
        cv_level = experience_level_from_text(cv_experience or cv_text)
        results: List[Tuple[Dict[str, Any], Dict[str, float]]] = []

        bm25_all = None
        if self._bm25 is not None and cv_query_tokens:
            bm25_all = self._bm25.get_scores(cv_query_tokens)

        for idx in candidate_indices:
            row = self._job_rows[idx]
            if not split_skills(row.get("skills")) and "_inferred_skills" not in row:
                row["_inferred_skills"] = extract_skills_from_cv_text(
                    build_job_document(row), limit=25
                )

            job_embedding = self._embedding_by_idx.get(idx)
            if job_embedding is None:
                model = _load_sbert()
                job_embedding = np.asarray(
                    model.encode(
                        [build_job_document(row)],
                        batch_size=1,
                        show_progress_bar=False,
                        normalize_embeddings=True,
                    )[0]
                )
                self._embedding_by_idx[idx] = job_embedding

            sbert_score = float(np.dot(cv_embedding, job_embedding))
            bm25_raw = float(bm25_all[idx]) if bm25_all is not None else 0.0
            job_field = row.get("_resolved_field") or resolve_job_field(row)
            job_level = build_job_experience(row)

            features = {
                "sbert_score": round(sbert_score, 6),
                "bm25_score_norm": round(self._normalize_bm25(bm25_raw), 6),
                "field_match": field_match_score(cv_field, job_field),
                "skill_overlap_score": round(skill_overlap_score(cv_skills, row), 6),
                "experience_match_score": experience_match_score(cv_level, job_level),
            }
            results.append((row, features))

        return results


_INDEX = JobRetrievalIndex()


def build_feature_matrix(
    *,
    cv_text: str,
    cv_field: Optional[str],
    cv_experience: Optional[str],
    cv_skills: Sequence[str],
    jobs: List[Dict[str, Any]],
    sbert_k: Optional[int] = None,
    bm25_k: Optional[int] = None,
) -> Tuple[List[Dict[str, Any]], np.ndarray, List[Dict[str, float]]]:
    if not jobs:
        return [], np.empty((0, 5)), []

    if sbert_k is None:
        sbert_k = DEFAULT_SBERT_K
    if bm25_k is None:
        bm25_k = DEFAULT_BM25_K

    _INDEX.build(jobs)

    cv_raw = (cv_text or "").strip()
    cv_clean = clean_job_text(cv_raw)
    cv_query_tokens = cv_clean.split() if cv_clean else []
    model = _load_sbert()
    cv_embedding = np.asarray(
        model.encode([cv_raw or cv_clean or " "], normalize_embeddings=True)[0]
    )

    candidate_indices = _INDEX.retrieve_candidates(
        cv_text=cv_raw,
        cv_query_tokens=cv_query_tokens,
        cv_embedding=cv_embedding,
        sbert_k=sbert_k,
        bm25_k=bm25_k,
    )
    if not candidate_indices:
        return [], np.empty((0, 5)), []

    scored = _INDEX.score_candidates(
        candidate_indices=candidate_indices,
        cv_text=cv_raw,
        cv_field=cv_field,
        cv_experience=cv_experience,
        cv_skills=cv_skills,
        cv_embedding=cv_embedding,
        cv_query_tokens=cv_query_tokens,
    )

    rows = [row for row, _ in scored]
    feature_dicts = [features for _, features in scored]
    matrix = np.array(
        [[fd[name] for name in FEATURE_NAMES] for fd in feature_dicts], dtype=float
    )
    return rows, matrix, feature_dicts
