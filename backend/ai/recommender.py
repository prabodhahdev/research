"""Job ranking via Colab-trained stacking ensemble (research Steps 5–10)."""

from __future__ import annotations

from typing import Any, Dict, List, Optional

import numpy as np

from ai.features import build_feature_matrix
from ai.model_store import load_stacking_models, missing_model_files, models_available


def _stacking_scores(feature_matrix: np.ndarray) -> np.ndarray:
    models = load_stacking_models()
    base_probs = np.hstack(
        [
            models["svm"].predict_proba(feature_matrix),
            models["lr"].predict_proba(feature_matrix),
            models["xgb"].predict_proba(feature_matrix),
        ]
    )
    # Meta learner trained on P(class=2 best-match) from each base model.
    meta_input = base_probs[:, [2, 5, 8]]
    return models["meta"].predict_proba(meta_input)[:, 2]


def _job_payload(row: Dict[str, Any]) -> Dict[str, Any]:
    return {
        "id": row.get("id"),
        "title": row.get("title"),
        "company": row.get("company"),
        "location": row.get("location") or "",
        "salary": row.get("salary"),
        "posted_date": row.get("posted_date"),
        "description": row.get("description"),
        "source": row.get("source"),
        "url": row.get("source_url"),
        "category": row.get("job_category") or row.get("_resolved_field"),
    }


def recommend_jobs_for_skills(
    *,
    skills: List[str],
    jobs: List[Dict[str, Any]],
    cv_text: str = "",
    cv_field: Optional[str] = None,
    cv_experience: Optional[str] = None,
    top_k: int = 20,
) -> List[Dict[str, Any]]:
    if not models_available():
        missing = ", ".join(missing_model_files()) or "all model files"
        raise RuntimeError(
            "Stacking ensemble models are not installed. "
            f"Place the Colab pickles in data/models/ (missing: {missing})."
        )

    if not jobs:
        return []

    job_rows, feature_matrix, feature_dicts = build_feature_matrix(
        cv_text=cv_text,
        cv_field=cv_field,
        cv_experience=cv_experience,
        cv_skills=skills,
        jobs=jobs,
    )
    if feature_matrix.size == 0:
        return []

    match_probs = _stacking_scores(feature_matrix)
    recs: List[Dict[str, Any]] = []

    for row, features, prob in zip(job_rows, feature_dicts, match_probs):
        recs.append(
            {
                "job": _job_payload(row),
                "match_score": float(min(max(prob, 0.0), 1.0)),
                "mode": "cv",
                "scores": features,
            }
        )

    recs.sort(key=lambda item: item["match_score"], reverse=True)
    return recs[:top_k]
