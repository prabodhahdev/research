def generate_chat_reply(*, message: str, related_count: int = 0) -> str:
    text = message.lower()

    if related_count:
        return (
            f"I found {related_count} related jobs from the imported research dataset. "
            "Results are ranked with the stacking ensemble (SVM + Logistic Regression + "
            "XGBoost, meta Logistic Regression) trained on NDCG@10."
        )

    if any(word in text for word in ("cv", "resume")):
        return (
            "For a stronger CV, keep the job title clear, list the most relevant skills near the top, "
            "include education and certifications, and describe experience with measurable outcomes. "
            "You can upload the CV to get model-ranked job recommendations."
        )

    if any(word in text for word in ("skill", "learn", "course")):
        return (
            "Focus on skills that appear repeatedly in your target job category. "
            "For IT roles, common signals include Python, JavaScript, React, SQL, testing, and Git. "
            "For non-IT roles, prioritize domain tools, certifications, communication, and practical experience."
        )

    return (
        "I can help with Sri Lankan job search, CV improvement, and skill planning. "
        "For job matching, ask for a role such as 'software engineer jobs' or upload your CV for personalized recommendations."
    )
