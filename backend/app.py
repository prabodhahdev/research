import os

from dotenv import load_dotenv
from flask import Flask, jsonify
from flask_cors import CORS
from werkzeug.exceptions import HTTPException

# Load optional local environment variables from the backend folder.
_BACKEND_ROOT = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(_BACKEND_ROOT, ".env"))


def _warmup_models() -> None:
    """Load ML artifacts once at process start (Render cold-start mitigation)."""
    if os.environ.get("SKIP_WARMUP") == "1":
        return
    try:
        from ai.model_store import load_stacking_models, models_available

        if models_available():
            print("[warmup] Loading stacking models ...")
            load_stacking_models()
        from ai.features import _load_sbert

        print("[warmup] Loading SBERT ...")
        _load_sbert()
        print("[warmup] ML stack ready.")
    except Exception as error:
        print(f"[WARN] warmup failed: {error}")


def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/api/*": {"origins": "*"}})

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

    @app.errorhandler(Exception)
    def handle_unexpected_error(error):
        if isinstance(error, HTTPException):
            return error
        print(f"[ERROR] {error}")
        return jsonify({"error": "Internal server error. Check Render logs."}), 500

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
_warmup_models()


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
