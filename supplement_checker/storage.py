"""
Local persistence matching Cloudflare D1 schema.

Uses SQLite for local/dev. Same SQL migrations apply to D1 in production.
Sensitive document bytes stay out of this DB (R2 / local object store).
"""

from __future__ import annotations

import json
import os
import sqlite3
from contextlib import contextmanager
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Iterator
from uuid import uuid4

from .profile_ingestion import (
    HealthProfile,
    ingest_profile,
    profile_to_storage_dict,
)

DEFAULT_DB_PATH = Path(
    os.environ.get(
        "SUPPLEMENT_DB_PATH",
        Path(__file__).resolve().parent / "data" / "profiles.db",
    )
)

MIGRATIONS_DIR = Path(__file__).resolve().parent / "cloudflare" / "migrations"


def _utc_now() -> str:
    return datetime.now(timezone.utc).isoformat()


class ProfileStore:
    """SQLite-backed profile + terms + analysis job store (D1-compatible)."""

    def __init__(self, db_path: Path | str | None = None) -> None:
        self.db_path = Path(db_path) if db_path else DEFAULT_DB_PATH
        self.db_path.parent.mkdir(parents=True, exist_ok=True)
        self._init_schema()

    @contextmanager
    def _conn(self) -> Iterator[sqlite3.Connection]:
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        conn.execute("PRAGMA foreign_keys = ON")
        try:
            yield conn
            conn.commit()
        except Exception:
            conn.rollback()
            raise
        finally:
            conn.close()

    def _init_schema(self) -> None:
        with self._conn() as conn:
            for path in sorted(MIGRATIONS_DIR.glob("*.sql")):
                conn.executescript(path.read_text(encoding="utf-8"))
            # Additive column for profile ownership (safe if already present).
            cols = {
                row["name"]
                for row in conn.execute("PRAGMA table_info(profiles)").fetchall()
            }
            if "user_id" not in cols:
                conn.execute("ALTER TABLE profiles ADD COLUMN user_id TEXT")

    # ------------------------------------------------------------------ terms
    def save_terms(self, client_id: str, record: dict[str, Any]) -> None:
        with self._conn() as conn:
            conn.execute(
                """
                INSERT INTO terms_acceptances
                  (client_id, notice_version, accepted, accepted_at, acceptance_method)
                VALUES (?, ?, ?, ?, ?)
                ON CONFLICT(client_id) DO UPDATE SET
                  notice_version = excluded.notice_version,
                  accepted = excluded.accepted,
                  accepted_at = excluded.accepted_at,
                  acceptance_method = excluded.acceptance_method
                """,
                (
                    client_id,
                    record["notice_version"],
                    1 if record.get("accepted") else 0,
                    record.get("accepted_at") or _utc_now(),
                    record.get("acceptance_method"),
                ),
            )

    def get_terms(self, client_id: str) -> dict[str, Any] | None:
        with self._conn() as conn:
            row = conn.execute(
                "SELECT * FROM terms_acceptances WHERE client_id = ?",
                (client_id,),
            ).fetchone()
        if not row:
            return None
        return {
            "accepted": bool(row["accepted"]),
            "notice_version": row["notice_version"],
            "accepted_at": row["accepted_at"],
            "acceptance_method": row["acceptance_method"],
        }

    # ---------------------------------------------------------------- profiles
    def save_profile(
        self,
        profile: HealthProfile | dict[str, Any],
        *,
        user_id: str | None = None,
    ) -> HealthProfile:
        if isinstance(profile, dict):
            profile = ingest_profile(profile, trust_verified_flag=True)
        data = profile_to_storage_dict(profile)

        demographics_json = json.dumps(data.get("demographics") or {})
        clinical_json = json.dumps(
            {
                "conditions": data.get("conditions") or [],
                "medications": data.get("medications") or [],
                "allergies": data.get("allergies") or [],
                "dietary_restrictions": data.get("dietary_restrictions") or [],
                "goals": data.get("goals") or [],
                "nutrient_flags": data.get("nutrient_flags") or [],
                "current_supplements": data.get("current_supplements") or [],
                "caffeine_sensitive": data.get("caffeine_sensitive", False),
                "stimulant_sensitive": data.get("stimulant_sensitive", False),
                "allergies_reviewed": data.get("allergies_reviewed", False),
                "history_sources": data.get("history_sources") or [],
            }
        )
        gaps_json = json.dumps(data.get("verification_gaps") or [])

        with self._conn() as conn:
            conn.execute(
                """
                INSERT INTO profiles (
                  profile_id, display_name, profile_verified, verification_status,
                  allergies_reviewed, demographics_json, clinical_json,
                  verification_gaps_json, notes, created_at, updated_at, user_id
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ON CONFLICT(profile_id) DO UPDATE SET
                  display_name = excluded.display_name,
                  profile_verified = excluded.profile_verified,
                  verification_status = excluded.verification_status,
                  allergies_reviewed = excluded.allergies_reviewed,
                  demographics_json = excluded.demographics_json,
                  clinical_json = excluded.clinical_json,
                  verification_gaps_json = excluded.verification_gaps_json,
                  notes = excluded.notes,
                  updated_at = excluded.updated_at,
                  user_id = COALESCE(excluded.user_id, profiles.user_id)
                """,
                (
                    profile.profile_id,
                    profile.display_name,
                    1 if profile.profile_verified else 0,
                    profile.verification_status.value,
                    1 if profile.allergies_reviewed else 0,
                    demographics_json,
                    clinical_json,
                    gaps_json,
                    profile.notes,
                    data.get("created_at") or _utc_now(),
                    data.get("updated_at") or _utc_now(),
                    user_id,
                ),
            )
            conn.execute(
                "DELETE FROM history_sources WHERE profile_id = ?",
                (profile.profile_id,),
            )
            for src in data.get("history_sources") or []:
                conn.execute(
                    """
                    INSERT INTO history_sources (
                      source_id, profile_id, source_type, label,
                      r2_object_key, device_sync_at, text_excerpt, received_at
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                    """,
                    (
                        src.get("source_id") or str(uuid4()),
                        profile.profile_id,
                        src.get("source_type"),
                        src.get("label"),
                        src.get("r2_object_key"),
                        src.get("device_sync_at"),
                        src.get("text_excerpt"),
                        src.get("received_at") or _utc_now(),
                    ),
                )
        return profile

    def get_profile(self, profile_id: str) -> HealthProfile | None:
        with self._conn() as conn:
            row = conn.execute(
                "SELECT * FROM profiles WHERE profile_id = ?",
                (profile_id,),
            ).fetchone()
            if not row:
                return None
            sources = conn.execute(
                "SELECT * FROM history_sources WHERE profile_id = ? ORDER BY received_at",
                (profile_id,),
            ).fetchall()

        clinical = json.loads(row["clinical_json"])
        payload = {
            "profile_id": row["profile_id"],
            "display_name": row["display_name"],
            "profile_verified": bool(row["profile_verified"]),
            "verification_status": row["verification_status"],
            "verification_gaps": json.loads(row["verification_gaps_json"] or "[]"),
            "allergies_reviewed": bool(row["allergies_reviewed"]),
            "demographics": json.loads(row["demographics_json"]),
            "notes": row["notes"],
            "created_at": row["created_at"],
            "updated_at": row["updated_at"],
            **clinical,
            "history_sources": [
                {
                    "source_id": s["source_id"],
                    "source_type": s["source_type"],
                    "label": s["label"],
                    "r2_object_key": s["r2_object_key"],
                    "device_sync_at": s["device_sync_at"],
                    "text_excerpt": s["text_excerpt"],
                    "received_at": s["received_at"],
                }
                for s in sources
            ],
        }
        return ingest_profile(payload, trust_verified_flag=True)

    # ----------------------------------------------------------- analysis jobs
    def create_job(
        self,
        *,
        profile_id: str,
        job_type: str,
        input_data: dict[str, Any] | None = None,
    ) -> str:
        job_id = str(uuid4())
        now = _utc_now()
        with self._conn() as conn:
            conn.execute(
                """
                INSERT INTO analysis_jobs (
                  job_id, profile_id, job_type, status,
                  input_json, result_json, error, created_at, updated_at
                ) VALUES (?, ?, ?, 'queued', ?, NULL, NULL, ?, ?)
                """,
                (
                    job_id,
                    profile_id,
                    job_type,
                    json.dumps(input_data or {}),
                    now,
                    now,
                ),
            )
        return job_id

    def complete_job(
        self,
        job_id: str,
        *,
        result: dict[str, Any] | None = None,
        error: str | None = None,
    ) -> None:
        status = "failed" if error else "completed"
        with self._conn() as conn:
            conn.execute(
                """
                UPDATE analysis_jobs
                SET status = ?, result_json = ?, error = ?, updated_at = ?
                WHERE job_id = ?
                """,
                (
                    status,
                    json.dumps(result) if result is not None else None,
                    error,
                    _utc_now(),
                    job_id,
                ),
            )

    def get_job(self, job_id: str) -> dict[str, Any] | None:
        with self._conn() as conn:
            row = conn.execute(
                "SELECT * FROM analysis_jobs WHERE job_id = ?",
                (job_id,),
            ).fetchone()
        if not row:
            return None
        return {
            "job_id": row["job_id"],
            "profile_id": row["profile_id"],
            "job_type": row["job_type"],
            "status": row["status"],
            "input": json.loads(row["input_json"] or "{}"),
            "result": json.loads(row["result_json"]) if row["result_json"] else None,
            "error": row["error"],
            "created_at": row["created_at"],
            "updated_at": row["updated_at"],
        }

    # ------------------------------------------------------------------- auth
    def create_user(
        self,
        *,
        user_id: str,
        email: str,
        password_hash: str,
        display_name: str | None = None,
    ) -> None:
        with self._conn() as conn:
            conn.execute(
                """
                INSERT INTO users (user_id, email, password_hash, display_name, created_at)
                VALUES (?, ?, ?, ?, ?)
                """,
                (user_id, email, password_hash, display_name, _utc_now()),
            )

    def get_user(self, user_id: str) -> dict[str, Any] | None:
        with self._conn() as conn:
            row = conn.execute(
                "SELECT * FROM users WHERE user_id = ?",
                (user_id,),
            ).fetchone()
        return dict(row) if row else None

    def get_user_by_email(self, email: str) -> dict[str, Any] | None:
        with self._conn() as conn:
            row = conn.execute(
                "SELECT * FROM users WHERE email = ?",
                (email,),
            ).fetchone()
        return dict(row) if row else None

    def create_session(
        self,
        *,
        user_id: str,
        client_id: str,
        token_hash: str,
        expires_at: str,
    ) -> dict[str, Any]:
        created = _utc_now()
        with self._conn() as conn:
            conn.execute(
                """
                INSERT INTO sessions
                  (token_hash, user_id, client_id, created_at, expires_at, revoked)
                VALUES (?, ?, ?, ?, ?, 0)
                """,
                (token_hash, user_id, client_id, created, expires_at),
            )
        return {
            "user_id": user_id,
            "client_id": client_id,
            "created_at": created,
            "expires_at": expires_at,
        }

    def get_session_by_token_hash(self, token_hash: str) -> dict[str, Any] | None:
        with self._conn() as conn:
            row = conn.execute(
                "SELECT * FROM sessions WHERE token_hash = ?",
                (token_hash,),
            ).fetchone()
        return dict(row) if row else None

    def revoke_session(self, token_hash: str) -> None:
        with self._conn() as conn:
            conn.execute(
                "UPDATE sessions SET revoked = 1 WHERE token_hash = ?",
                (token_hash,),
            )


# Process-wide default store (tests can construct ProfileStore with temp path).
_STORE: ProfileStore | None = None


def get_store() -> ProfileStore:
    global _STORE
    if _STORE is None:
        _STORE = ProfileStore()
    return _STORE


def reset_store_for_tests(db_path: Path | str) -> ProfileStore:
    global _STORE
    _STORE = ProfileStore(db_path)
    return _STORE
