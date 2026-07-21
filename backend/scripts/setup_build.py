"""Prepare runtime assets during Render build (NLTK + SBERT cache)."""

from __future__ import annotations

import sys


def _download_nltk() -> None:
    import nltk

    for resource in ("punkt_tab", "punkt", "stopwords", "wordnet", "omw-1.4"):
        print(f"[setup_build] Downloading NLTK: {resource}")
        nltk.download(resource, quiet=True)


def _cache_sbert() -> None:
    print("[setup_build] Caching SBERT model (all-MiniLM-L6-v2) ...")
    from sentence_transformers import SentenceTransformer

    SentenceTransformer("all-MiniLM-L6-v2")
    print("[setup_build] SBERT model cached.")


def main() -> int:
    try:
        _download_nltk()
        _cache_sbert()
    except Exception as error:
        print(f"[setup_build] ERROR: {error}", file=sys.stderr)
        return 1

    print("[setup_build] Done.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
