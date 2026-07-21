from flask import Blueprint, jsonify, request

from ai.cv_parser import parse_cv_text
from ai.recommender import recommend_jobs_for_skills
from database.models import get_jobs


jobs_bp = Blueprint("jobs", __name__)


def _job_response(row):
    return {
        "id": row.get("id"),
        "title": row.get("title"),
        "company": row.get("company"),
        "location": row.get("location"),
        "salary": row.get("salary"),
        "posted_date": row.get("posted_date"),
        "description": row.get("description"),
        "source": row.get("source"),
        # Frontend expects `url`, backend stores `source_url`.
        "url": row.get("source_url") or row.get("url"),
        "category": row.get("job_category") or row.get("category"),
        "experience_level": row.get("experience") or row.get("experience_level"),
        "job_type": row.get("job_type"),
        "skills": row.get("skills"),
    }


@jobs_bp.get("/")
def list_jobs():
    keyword = request.args.get("keyword", default="", type=str).strip()
    location = request.args.get("location", default="", type=str).strip()
    limit = request.args.get("limit", default=50, type=int)

    # Keep limits safe to avoid heavy queries during testing.
    if limit < 1:
        limit = 1
    if limit > 200:
        limit = 200

    jobs = get_jobs(
        keyword=keyword if keyword else None,
        location=location if location else None,
        limit=limit,
    )

    return jsonify(
        {
            "success": True,
            "count": len(jobs),
            "filters": {"keyword": keyword, "location": location, "limit": limit},
            "data": jobs,
        }
    )


@jobs_bp.get("/search")
def search_jobs():
    """
    Backend endpoint consumed by the Next.js frontend.
    Expects:
      - q: keyword (optional)
      - location: location filter (optional)
      - category: job category filter (optional)
      - page: 1-based page number
      - page_size: number of results per page
    """

    q = request.args.get("q", default="", type=str).strip()
    location = request.args.get("location", default="", type=str).strip()
    category = request.args.get("category", default="", type=str).strip()
    page = request.args.get("page", default=1, type=int)
    page_size = request.args.get("page_size", default=20, type=int)
    include_manual = request.args.get("include_manual", default="false", type=str).lower() in (
        "1",
        "true",
        "yes",
    )

    if page < 1:
        page = 1
    if page_size < 1:
        page_size = 1
    # Safety cap to avoid heavy queries.
    if page_size > 200:
        page_size = 200

    offset = (page - 1) * page_size

    if q:
        query_profile = parse_cv_text(q)
        candidate_rows = get_jobs(
            keyword=None,
            location=location if location else None,
            category=category if category else None,
            limit=5000,
            exclude_sources=None if include_manual else ["manual"],
        )
        try:
            ranked = recommend_jobs_for_skills(
                skills=query_profile["skills"],
                jobs=candidate_rows,
                cv_text=q,
                cv_field=query_profile["field"] or category or None,
                cv_experience=(query_profile.get("experience") or [None])[0],
                top_k=offset + page_size,
            )
        except RuntimeError as error:
            return jsonify({"error": str(error), "jobs": []}), 503
        jobs = []
        for item in ranked[offset : offset + page_size]:
            job = _job_response(item["job"])
            job["match_score"] = item["match_score"]
            job["scores"] = item.get("scores")
            jobs.append(job)
    else:
        rows = get_jobs(
            keyword=None,
            location=location if location else None,
            category=category if category else None,
            limit=page_size,
            offset=offset,
            exclude_sources=None if include_manual else ["manual"],
        )
        jobs = [_job_response(row) for row in rows]

    return jsonify({"jobs": jobs})
