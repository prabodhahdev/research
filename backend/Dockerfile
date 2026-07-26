# Hugging Face Docker Space — SL Jobs AI backend
FROM python:3.11-slim

RUN useradd -m -u 1000 user
WORKDIR /app

# System deps useful for scientific Python wheels
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

COPY --chown=user requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY --chown=user . .

# Prefetch NLTK + SBERT, download ranking pickles, import jobs into SQLite
RUN python scripts/setup_build.py
RUN python scripts/download_models.py
RUN python scripts/import_jobs_clean.py

# Runtime user cannot create folders under /app unless we pre-create + chown
RUN mkdir -p /app/uploads && chown -R user:user /app

USER user
ENV HOME=/home/user \
    PATH=/home/user/.local/bin:$PATH \
    PORT=7860

EXPOSE 7860
CMD ["gunicorn", "-c", "gunicorn.conf.py", "app:app"]
