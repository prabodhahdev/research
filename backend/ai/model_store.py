"""Load Colab-trained stacking ensemble artifacts.

Expected files in ``data/models/``:
  - svm_model.pkl
  - lr_model.pkl
  - xgb_model.pkl
  - meta_model.pkl
"""

from __future__ import annotations

import os
from typing import Any, Dict, Optional

import joblib

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODELS_DIR = os.path.join(BASE_DIR, "data", "models")

SVM_PATH = os.path.join(MODELS_DIR, "svm_model.pkl")
LR_PATH = os.path.join(MODELS_DIR, "lr_model.pkl")
XGB_PATH = os.path.join(MODELS_DIR, "xgb_model.pkl")
META_PATH = os.path.join(MODELS_DIR, "meta_model.pkl")

REQUIRED_PATHS = (SVM_PATH, LR_PATH, XGB_PATH, META_PATH)

_artifacts: Optional[Dict[str, Any]] = None


def models_available() -> bool:
    return all(os.path.isfile(path) for path in REQUIRED_PATHS)


def models_dir() -> str:
    return MODELS_DIR


def missing_model_files() -> list[str]:
    return [os.path.basename(path) for path in REQUIRED_PATHS if not os.path.isfile(path)]


def load_stacking_models(*, force_reload: bool = False) -> Dict[str, Any]:
    """Return ``{svm, lr, xgb, meta}`` sklearn/xgboost estimators."""
    global _artifacts

    if _artifacts is not None and not force_reload:
        return _artifacts

    missing = missing_model_files()
    if missing:
        raise FileNotFoundError(
            "Stacking ensemble models not found in data/models/. Missing: "
            + ", ".join(missing)
            + ". Copy svm_model.pkl, lr_model.pkl, xgb_model.pkl, and meta_model.pkl from Colab."
        )

    _artifacts = {
        "svm": joblib.load(SVM_PATH),
        "lr": joblib.load(LR_PATH),
        "xgb": joblib.load(XGB_PATH),
        "meta": joblib.load(META_PATH),
    }
    return _artifacts


def clear_model_cache() -> None:
    global _artifacts
    _artifacts = None
