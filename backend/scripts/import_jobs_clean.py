from __future__ import annotations

import argparse
import csv
import os
import sqlite3
import sys
from datetime import datetime, timezone
from typing import Dict, Iterable


BACKEND_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEFAULT_CSV_PATH = os.path.join(BACKEND_DIR, "data", "processed", "jobs_clean.csv")

if BACKEND_DIR not in sys.path:
    sys.path.insert(0, BACKEND_DIR)

from database.models import DB_PATH, init_db  # noqa: E402


def _clean(value: str | None) -> str | None:
    if value is None:
        return None
    value = value.strip()
    return value if value else None


def _read_csv_rows(path: str) -> Iterable[Dict[str, str]]:
    encodings = ("utf-8", "utf-8-sig", "cp1252", "latin-1")
    last_error: UnicodeDecodeError | None = None

    for encoding in encodings:
        try:
            with open(path, newline="", encoding=encoding) as csv_file:
                yield from csv.DictReader(csv_file)
            return
        except UnicodeDecodeError as exc:
            last_error = exc

    if last_error:
        raise last_error


def _map_job(row: Dict[str, str]) -> Dict[str, str | None]:
    description = _clean(row.get("job_description")) or _clean(row.get("job_text"))

    return {
        "title": _clean(row.get("job_title")),
        "company": _clean(row.get("company")),
        "location": _clean(row.get("location")),
        "description": description,
        "salary": _clean(row.get("salary")),
        "source": _clean(row.get("source")) or "colab",
        "source_url": _clean(row.get("source_url")),
        "posted_date": _clean(row.get("posted_date")),
        "job_type": _clean(row.get("job_type")),
        "job_category": _clean(row.get("job_category")),
        "experience": _clean(row.get("experience")),
        "skills": _clean(row.get("skills")),
        "job_text": _clean(row.get("job_text")),
        "closing_date": _clean(row.get("closing_date")),
    }


def import_jobs(csv_path: str, limit: int | None = None) -> tuple[int, int]:
    if not os.path.exists(csv_path):
        raise FileNotFoundError(f"CSV file not found: {csv_path}")

    init_db()

    seen = 0
    rows_to_insert = []

    for row in _read_csv_rows(csv_path):
        if limit is not None and seen >= limit:
            break

        job = _map_job(row)
        if not job["title"]:
            continue

        seen += 1
        rows_to_insert.append(
            (
                job["title"],
                job["company"],
                job["location"],
                job["description"],
                job["salary"],
                job["source"],
                job["source_url"],
                job["posted_date"],
                datetime.now(timezone.utc).isoformat(),
                job["job_type"],
                job["job_category"],
                job["experience"],
                job["skills"],
                job["job_text"],
                job["closing_date"],
            )
        )

    if not rows_to_insert:
        return seen, 0

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.executemany(
        """
        INSERT OR IGNORE INTO jobs
        (
            title, company, location, description, salary, source, source_url,
            posted_date, created_at, job_type, job_category, experience, skills,
            job_text, closing_date
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        rows_to_insert,
    )
    inserted = cursor.rowcount if cursor.rowcount != -1 else 0
    conn.commit()
    conn.close()

    return seen, inserted


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Import Colab jobs_clean.csv into the Flask SQLite database."
    )
    parser.add_argument(
        "--csv",
        default=DEFAULT_CSV_PATH,
        help=f"Path to jobs_clean.csv. Default: {DEFAULT_CSV_PATH}",
    )
    parser.add_argument(
        "--limit",
        type=int,
        default=None,
        help="Optional max number of rows to import for testing.",
    )
    args = parser.parse_args()

    seen, inserted = import_jobs(args.csv, args.limit)
    skipped = seen - inserted

    print(f"CSV: {args.csv}")
    print(f"Rows processed: {seen}")
    print(f"Jobs inserted: {inserted}")
    print(f"Duplicates/skipped: {skipped}")


if __name__ == "__main__":
    main()
