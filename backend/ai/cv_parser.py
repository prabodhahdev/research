"""Rule-based CV parser aligned with research Steps 2–3.

Uses ``field_rules``, ``skills_rules``, and ``experience_rules``.
"""

from __future__ import annotations

import re
from typing import List

from ai.experience_rules import EXPERIENCE_RULES
from ai.field_rules import FIELD_RULES
from ai.skills_rules import SKILL_RULES


def _normalize(text: str) -> str:
    return re.sub(r"\s+", " ", (text or "").lower()).strip()


def extract_skills_from_cv_text(cv_text: str, *, limit: int = 40) -> List[str]:
    text = _normalize(cv_text)
    if not text:
        return []

    found: List[str] = []
    seen = set()
    # Longer phrases first to prefer specific skills.
    lexicon: List[str] = []
    for skills in SKILL_RULES.values():
        lexicon.extend(skills)
    lexicon = sorted(set(lexicon), key=lambda s: (-len(s), s.lower()))

    for skill in lexicon:
        needle = skill.lower().strip()
        if len(needle) < 2 or needle in seen:
            continue
        if re.search(rf"(?<!\w){re.escape(needle)}(?!\w)", text):
            seen.add(needle)
            found.append(skill)
            if len(found) >= limit:
                break
    return found


def extract_field(cv_text: str, position: str = "") -> str:
    text = _normalize(f"{position} {cv_text}")
    if not text:
        return ""

    best_field = ""
    best_score = 0
    for field, weights in FIELD_RULES.items():
        score = 0
        for term in weights.get("weight_3", []):
            if term.lower() in text:
                score += 3
        for term in weights.get("weight_2", []):
            if term.lower() in text:
                score += 2
        for term in weights.get("weight_1", []):
            if term.lower() in text:
                score += 1
        if score > best_score:
            best_score = score
            best_field = field
    return best_field if best_score > 0 else ""


def extract_position(cv_text: str) -> str:
    text = cv_text or ""
    lines = [ln.strip() for ln in text.splitlines() if ln.strip()]
    for line in lines[:12]:
        lower = line.lower()
        if any(
            k in lower
            for k in (
                "curriculum",
                "resume",
                "cv",
                "email",
                "phone",
                "address",
                "linkedin",
            )
        ):
            continue
        if 3 <= len(line) <= 80:
            return line
    return ""


def extract_experience(cv_text: str) -> List[str]:
    text = _normalize(cv_text)
    hits: List[str] = []
    for level, spec in EXPERIENCE_RULES.items():
        for kw in spec.get("keywords", []):
            if kw.lower() in text:
                hits.append(level)
                break
    # Prefer most specific single label when possible.
    order = ["senior", "mid", "junior", "intern"]
    for level in order:
        if level in hits:
            return [level]
    return hits


def extract_education(cv_text: str) -> List[str]:
    text = _normalize(cv_text)
    patterns = [
        r"b\.?\s*sc",
        r"bachelor",
        r"m\.?\s*sc",
        r"master",
        r"phd",
        r"diploma",
        r"a/?l",
        r"o/?l",
        r"degree",
    ]
    found = []
    for pat in patterns:
        if re.search(pat, text):
            found.append(pat.replace(r"\.?\s*", " ").replace("?", ""))
    return found


def extract_certifications(cv_text: str) -> List[str]:
    text = _normalize(cv_text)
    certs = [
        "aws",
        "azure",
        "google cloud",
        "pmp",
        "scrum",
        "itil",
        "ccna",
        "comptia",
        "cka",
    ]
    return [c for c in certs if c in text]


def parse_cv_text(cv_text: str) -> dict:
    skills = extract_skills_from_cv_text(cv_text)
    position = extract_position(cv_text)
    field = extract_field(cv_text, position)
    education = extract_education(cv_text)
    experience = extract_experience(cv_text)
    certifications = extract_certifications(cv_text)

    profile_text = " ".join(
        part
        for part in [
            position,
            field,
            ", ".join(skills),
            ", ".join(education),
            ", ".join(experience),
            ", ".join(certifications),
            cv_text,
        ]
        if part
    )

    return {
        "skills": skills,
        "position": position,
        "field": field,
        "education": education,
        "experience": experience,
        "certifications": certifications,
        "cv_profile_text": profile_text,
    }
