"""
Session auth for the research platform API.

Email/password accounts with bearer tokens (stored hashed).
Set SUPPLEMENT_AUTH_DISABLED=true for local demos without login.
"""

from __future__ import annotations

import hashlib
import hmac
import os
import secrets
from dataclasses import dataclass
from datetime import datetime, timedelta, timezone
from typing import Any

from .storage import ProfileStore, get_store

SESSION_DAYS = int(os.environ.get("SUPPLEMENT_SESSION_DAYS", "14"))


def auth_disabled() -> bool:
    return os.environ.get("SUPPLEMENT_AUTH_DISABLED", "").lower() in {
        "1",
        "true",
        "yes",
    }


# Back-compat alias evaluated at import; prefer auth_disabled() at runtime.
AUTH_DISABLED = auth_disabled()


class AuthError(Exception):
    def __init__(self, message: str, *, status_code: int = 401) -> None:
        super().__init__(message)
        self.status_code = status_code


@dataclass
class AuthUser:
    user_id: str
    email: str
    display_name: str | None
    client_id: str


def _utc_now() -> datetime:
    return datetime.now(timezone.utc)


def _hash_password(password: str, *, salt: str | None = None) -> str:
    salt = salt or secrets.token_hex(16)
    digest = hashlib.pbkdf2_hmac(
        "sha256",
        password.encode("utf-8"),
        salt.encode("utf-8"),
        120_000,
    ).hex()
    return f"pbkdf2_sha256${salt}${digest}"


def _verify_password(password: str, stored: str) -> bool:
    try:
        algo, salt, _digest = stored.split("$", 2)
    except ValueError:
        return False
    if algo != "pbkdf2_sha256":
        return False
    check = _hash_password(password, salt=salt)
    return hmac.compare_digest(check, stored)


def _hash_token(token: str) -> str:
    return hashlib.sha256(token.encode("utf-8")).hexdigest()


def register(
    *,
    email: str,
    password: str,
    display_name: str | None = None,
    store: ProfileStore | None = None,
) -> dict[str, Any]:
    store = store or get_store()
    email_norm = email.strip().lower()
    if not email_norm or "@" not in email_norm:
        raise AuthError("Valid email required", status_code=400)
    if len(password) < 8:
        raise AuthError("Password must be at least 8 characters", status_code=400)
    if store.get_user_by_email(email_norm):
        raise AuthError("Email already registered", status_code=409)

    user_id = secrets.token_hex(16)
    client_id = f"user_{user_id[:12]}"
    store.create_user(
        user_id=user_id,
        email=email_norm,
        password_hash=_hash_password(password),
        display_name=display_name,
    )
    raw_token = secrets.token_urlsafe(32)
    session = store.create_session(
        user_id=user_id,
        client_id=client_id,
        token_hash=_hash_token(raw_token),
        expires_at=(_utc_now() + timedelta(days=SESSION_DAYS)).isoformat(),
    )
    return {
        "user": {
            "user_id": user_id,
            "email": email_norm,
            "display_name": display_name,
            "client_id": client_id,
        },
        "access_token": raw_token,
        "token_type": "bearer",
        "expires_at": session["expires_at"],
    }


def login(
    *,
    email: str,
    password: str,
    store: ProfileStore | None = None,
) -> dict[str, Any]:
    store = store or get_store()
    email_norm = email.strip().lower()
    user = store.get_user_by_email(email_norm)
    if not user or not _verify_password(password, user["password_hash"]):
        raise AuthError("Invalid email or password", status_code=401)

    client_id = f"user_{user['user_id'][:12]}"
    raw_token = secrets.token_urlsafe(32)
    session = store.create_session(
        user_id=user["user_id"],
        client_id=client_id,
        token_hash=_hash_token(raw_token),
        expires_at=(_utc_now() + timedelta(days=SESSION_DAYS)).isoformat(),
    )
    return {
        "user": {
            "user_id": user["user_id"],
            "email": user["email"],
            "display_name": user.get("display_name"),
            "client_id": client_id,
        },
        "access_token": raw_token,
        "token_type": "bearer",
        "expires_at": session["expires_at"],
    }


def resolve_bearer_token(
    authorization: str | None,
    *,
    store: ProfileStore | None = None,
    x_client_id: str | None = None,
) -> AuthUser:
    store = store or get_store()

    if auth_disabled():
        client_id = x_client_id or "dev-client"
        return AuthUser(
            user_id="dev-user",
            email="dev@localhost",
            display_name="Dev User",
            client_id=client_id,
        )

    if not authorization or not authorization.lower().startswith("bearer "):
        raise AuthError("Bearer token required")
    raw = authorization.split(" ", 1)[1].strip()
    if not raw:
        raise AuthError("Bearer token required")

    session = store.get_session_by_token_hash(_hash_token(raw))
    if not session:
        raise AuthError("Invalid or expired session")
    expires = datetime.fromisoformat(session["expires_at"])
    if expires.tzinfo is None:
        expires = expires.replace(tzinfo=timezone.utc)
    if session.get("revoked") or expires < _utc_now():
        raise AuthError("Invalid or expired session")

    user = store.get_user(session["user_id"])
    if not user:
        raise AuthError("User not found")
    return AuthUser(
        user_id=user["user_id"],
        email=user["email"],
        display_name=user.get("display_name"),
        client_id=session["client_id"],
    )


def revoke_token(authorization: str | None, *, store: ProfileStore | None = None) -> None:
    store = store or get_store()
    if not authorization or not authorization.lower().startswith("bearer "):
        return
    raw = authorization.split(" ", 1)[1].strip()
    store.revoke_session(_hash_token(raw))
