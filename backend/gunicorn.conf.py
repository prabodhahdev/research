"""Gunicorn config for Render (single worker, long ML requests)."""

import os

bind = f"0.0.0.0:{os.environ.get('PORT', '5000')}"
workers = 1
threads = 1
timeout = 300
graceful_timeout = 300
keepalive = 5
preload_app = False
