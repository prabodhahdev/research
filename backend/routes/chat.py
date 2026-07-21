from flask import Blueprint, jsonify, request

from ai.cv_parser import parse_cv_text
from ai.chatbot import generate_chat_reply
from ai.recommender import recommend_jobs_for_skills
from database.models import get_jobs

chat_bp = Blueprint("chat", __name__)


@chat_bp.post("/")
def chat():
    payload = request.get_json(silent=True) or {}
    message = str(payload.get("message") or "").strip()

    if not message:
        return jsonify({"reply": "Please send a message.", "related_jobs": []})

    related_jobs = []
    if any(word in message.lower() for word in ("job", "jobs", "vacancy", "vacancies", "role")):
        cv_profile = parse_cv_text(message)
        jobs_rows = get_jobs(keyword=None, location=None, limit=5000, exclude_sources=["manual"])
        try:
            recommendations = recommend_jobs_for_skills(
                skills=cv_profile["skills"],
                jobs=jobs_rows,
                cv_text=message,
                cv_field=cv_profile["field"] or None,
                cv_experience=(cv_profile.get("experience") or [None])[0],
                top_k=5,
            )
            related_jobs = [item["job"] for item in recommendations]
        except RuntimeError:
            related_jobs = []

    reply = generate_chat_reply(message=message, related_count=len(related_jobs))
    return jsonify({"reply": reply, "related_jobs": related_jobs})

