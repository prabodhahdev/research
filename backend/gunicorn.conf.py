"""Gunicorn config for Render (single worker, long ML requests)."""

import os

# HF Spaces uses 7860; Render/local can override with PORT.
bind = f"0.0.0.0:{os.environ.get('PORT', '7860')}"
# One worker avoids loading SBERT + stacking models multiple times.
workers = 1
threads = 1
timeout = int(os.environ.get("GUNICORN_TIMEOUT", "300"))
graceful_timeout = int(os.environ.get("GUNICORN_GRACEFUL_TIMEOUT", "60"))
keepalive = 5
preload_app = False
