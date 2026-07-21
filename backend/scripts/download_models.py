"""Download stacking model .pkl files for Render (or local) deployment.

URLs are defined in MODEL_URLS below. Optional env overrides:
  SVM_MODEL_URL, LR_MODEL_URL, XGB_MODEL_URL, META_MODEL_URL

Run during Render build:
  pip install -r requirements.txt && python scripts/download_models.py
"""

from __future__ import annotations

import os
import re
import sys
from pathlib import Path

import requests

BACKEND_DIR = Path(__file__).resolve().parent.parent
MODELS_DIR = BACKEND_DIR / "data" / "models"

MODEL_URLS = {
    "svm_model.pkl": "https://drive.google.com/file/d/1GhgGDG59VDrEJTaHu5wNccmQzxA6xemP/view?usp=sharing",
    "lr_model.pkl": "https://drive.google.com/file/d/1d44dTNEEeguc8PipAdF_B--4boBoOB0X/view?usp=sharing",
    "xgb_model.pkl": "https://drive.google.com/file/d/1z_s093FmoEX_5GCNzwCdoPBSBDf6UQLc/view?usp=sharing",
    "meta_model.pkl": "https://drive.google.com/file/d/1_prEE7AxRVoSNltzri0KNQelQq36tHrS/view?usp=sharing",
}

ENV_OVERRIDES = {
    "svm_model.pkl": "SVM_MODEL_URL",
    "lr_model.pkl": "LR_MODEL_URL",
    "xgb_model.pkl": "XGB_MODEL_URL",
    "meta_model.pkl": "META_MODEL_URL",
}

DRIVE_ID_RE = re.compile(r"(?:/d/|id=)([a-zA-Z0-9_-]{10,})")


def _extract_drive_file_id(url: str) -> str | None:
    match = DRIVE_ID_RE.search(url.strip())
    return match.group(1) if match else None


def _is_valid_pickle(path: Path) -> bool:
    if not path.is_file() or path.stat().st_size < 64:
        return False
    with path.open("rb") as handle:
        header = handle.read(2)
    return header in (b"\x80\x03", b"\x80\x04", b"\x80\x05")


def _download_google_drive(file_id: str, destination: Path) -> None:
    session = requests.Session()
    base_url = "https://docs.google.com/uc?export=download"
    response = session.get(base_url, params={"id": file_id}, stream=True, timeout=120)
    response.raise_for_status()

    token = None
    for key, value in response.cookies.items():
        if key.startswith("download_warning"):
            token = value
            break

    if token:
        response = session.get(
            base_url,
            params={"id": file_id, "confirm": token},
            stream=True,
            timeout=120,
        )
        response.raise_for_status()

    destination.parent.mkdir(parents=True, exist_ok=True)
    with destination.open("wb") as handle:
        for chunk in response.iter_content(chunk_size=1024 * 256):
            if chunk:
                handle.write(chunk)

    if not _is_valid_pickle(destination):
        raise RuntimeError(
            f"Downloaded {destination.name} is not a valid pickle file — "
            "check that the Google Drive link is shared as 'Anyone with the link'."
        )


def _download_url(url: str, destination: Path) -> None:
    file_id = _extract_drive_file_id(url)
    if file_id:
        _download_google_drive(file_id, destination)
        return

    response = requests.get(url, stream=True, timeout=120)
    response.raise_for_status()
    destination.parent.mkdir(parents=True, exist_ok=True)
    with destination.open("wb") as handle:
        for chunk in response.iter_content(chunk_size=1024 * 256):
            if chunk:
                handle.write(chunk)


def main() -> int:
    MODELS_DIR.mkdir(parents=True, exist_ok=True)
    missing = [name for name in MODEL_URLS if not (MODELS_DIR / name).is_file()]

    if not missing:
        print("[download_models] All model files already present — skipping.")
        return 0

    print(f"[download_models] Missing: {', '.join(missing)}")

    for filename in missing:
        env_name = ENV_OVERRIDES[filename]
        url = os.environ.get(env_name, "").strip() or MODEL_URLS[filename]
        if not url:
            print(
                f"[download_models] ERROR: no URL for {filename} "
                f"(set {env_name} or MODEL_URLS in script).",
                file=sys.stderr,
            )
            return 1

        destination = MODELS_DIR / filename
        print(f"[download_models] Downloading {filename} ...")
        _download_url(url, destination)
        print(f"[download_models] Saved {destination} ({destination.stat().st_size} bytes)")

    print("[download_models] Done.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
