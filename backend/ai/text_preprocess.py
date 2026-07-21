"""NLTK-based job text cleaning (research CV/job preprocessing Step 3)."""

from __future__ import annotations

import re
from functools import lru_cache

_EMAIL = re.compile(r"\S+@\S+\.\S+")
_URL = re.compile(r"https?://\S+|www\.\S+")
_PHONE = re.compile(r"(\+?\d[\d\s\-().]{7,}\d)")


def _ensure_nltk() -> None:
    import nltk

    resources = (
        ("tokenizers/punkt_tab", "punkt_tab"),
        ("tokenizers/punkt", "punkt"),
        ("corpora/stopwords", "stopwords"),
        ("corpora/wordnet", "wordnet"),
        ("corpora/omw-1.4", "omw-1.4"),
    )
    for lookup_path, resource in resources:
        try:
            nltk.data.find(lookup_path)
        except LookupError:
            nltk.download(resource, quiet=True)


@lru_cache(maxsize=1)
def _nlp_helpers():
    _ensure_nltk()
    import nltk
    from nltk.corpus import stopwords
    from nltk.stem import WordNetLemmatizer

    return nltk, stopwords.words("english"), WordNetLemmatizer()


def clean_job_text(text: str) -> str:
    """Clean job text for BM25 (emails/urls/phones removed, lemmatized)."""
    if not text:
        return ""

    t = text.lower()
    t = _EMAIL.sub(" ", t)
    t = _URL.sub(" ", t)
    t = _PHONE.sub(" ", t)
    t = t.replace("\n", " ").replace("\r", " ")
    t = re.sub(r"[^a-z0-9@+./&\- ]+", " ", t)
    t = re.sub(r"\s+", " ", t).strip()

    nltk, stop_words, lemmatizer = _nlp_helpers()
    tokens = nltk.word_tokenize(t)
    tokens = [lemmatizer.lemmatize(tok) for tok in tokens if tok not in stop_words and len(tok) > 1]
    return " ".join(tokens)
