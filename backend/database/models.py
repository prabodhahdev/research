import os
import sqlite3
from datetime import datetime


BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DB_PATH = os.path.join(BASE_DIR, "sl_jobs_ai.db")

JOB_EXTRA_COLUMNS = {
    "job_type": "TEXT",
    "job_category": "TEXT",
    "experience": "TEXT",
    "skills": "TEXT",
    "job_text": "TEXT",
    "closing_date": "TEXT",
}


def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS jobs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            company TEXT,
            location TEXT,
            description TEXT,
            salary TEXT,
            source TEXT NOT NULL,
            source_url TEXT UNIQUE,
            posted_date TEXT,
            created_at TEXT NOT NULL
        )
        """
    )

    cursor.execute("PRAGMA table_info(jobs)")
    existing_columns = {row["name"] for row in cursor.fetchall()}
    for column, column_type in JOB_EXTRA_COLUMNS.items():
        if column not in existing_columns:
            cursor.execute(f"ALTER TABLE jobs ADD COLUMN {column} {column_type}")

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS user_profiles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT UNIQUE,
            cv_filename TEXT,
            cv_text TEXT,
            extracted_skills TEXT,
            extracted_keywords TEXT,
            created_at TEXT NOT NULL
        )
        """
    )

    conn.commit()
    conn.close()


def insert_job(job):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        INSERT OR IGNORE INTO jobs
        (
            title, company, location, description, salary, source, source_url,
            posted_date, created_at, job_type, job_category, experience, skills,
            job_text, closing_date
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            job.get("title") or job.get("job_title"),
            job.get("company"),
            job.get("location"),
            job.get("description") or job.get("job_description"),
            job.get("salary"),
            job.get("source"),
            job.get("source_url"),
            job.get("posted_date"),
            datetime.utcnow().isoformat(),
            job.get("job_type"),
            job.get("job_category") or job.get("category"),
            job.get("experience") or job.get("experience_level"),
            job.get("skills"),
            job.get("job_text"),
            job.get("closing_date"),
        ),
    )

    conn.commit()
    inserted = cursor.rowcount
    conn.close()

    # `INSERT OR IGNORE` returns 0 when a duplicate `source_url` already exists.
    return inserted


def get_jobs(
    keyword=None,
    location=None,
    category=None,
    limit=50,
    offset=0,
    exclude_sources=None,
):
    conn = get_connection()
    cursor = conn.cursor()

    query = "SELECT * FROM jobs WHERE 1=1"
    params = []

    if keyword:
        query += """
            AND (
                title LIKE ? OR description LIKE ? OR company LIKE ?
                OR skills LIKE ? OR job_text LIKE ? OR job_category LIKE ?
            )
        """
        wildcard = f"%{keyword}%"
        params.extend([wildcard, wildcard, wildcard, wildcard, wildcard, wildcard])

    if location:
        query += " AND location LIKE ?"
        params.append(f"%{location}%")

    if category:
        query += " AND job_category LIKE ?"
        params.append(f"%{category}%")

    if exclude_sources:
        placeholders = ",".join(["?"] * len(exclude_sources))
        query += f" AND source NOT IN ({placeholders})"
        params.extend(exclude_sources)

    # Pagination support for frontend "page/page_size".
    if offset < 0:
        offset = 0

    query += " ORDER BY id DESC LIMIT ? OFFSET ?"
    params.extend([limit, offset])

    cursor.execute(query, params)
    rows = cursor.fetchall()
    conn.close()

    return [dict(row) for row in rows]
