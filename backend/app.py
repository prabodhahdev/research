import os

from dotenv import load_dotenv
from flask import Flask, jsonify
from flask_cors import CORS

# Load optional local environment variables from the backend folder.
_BACKEND_ROOT = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(_BACKEND_ROOT, ".env"))


def create_app():
    app = Flask(__name__)
    CORS(app)

    app.config["JSON_SORT_KEYS"] = False
    app.config["MAX_CONTENT_LENGTH"] = 10 * 1024 * 1024  # 10MB upload limit
    app.config["UPLOAD_FOLDER"] = os.path.join(os.getcwd(), "uploads")
    os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)

    # Ensure SQLite tables exist before serving routes.
    try:
        from database.models import init_db

        init_db()
    except Exception as error:
        print(f"[WARN] database init failed: {error}")

    @app.get("/api/health")
    def health_check():
        return jsonify({"status": "ok", "message": "SL Jobs AI backend is running"})

    # Route blueprints are optional during early setup.
    try:
        from routes.jobs import jobs_bp

        app.register_blueprint(jobs_bp, url_prefix="/api/jobs")
    except Exception as error:
        print(f"[WARN] jobs route not loaded: {error}")

    try:
        from routes.chat import chat_bp

        app.register_blueprint(chat_bp, url_prefix="/api/chat")
    except Exception as error:
        print(f"[WARN] chat route not loaded: {error}")

    try:
        from routes.upload import upload_bp

        app.register_blueprint(upload_bp, url_prefix="/api/upload")
    except Exception as error:
        print(f"[WARN] upload route not loaded: {error}")

    return app


app = create_app()


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
