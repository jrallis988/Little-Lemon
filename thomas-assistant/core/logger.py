"""Local-first encrypted ledger storage for store operational metrics."""

from __future__ import annotations

import base64
import hashlib
import json
import os
import secrets
import threading
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Dict, List, Optional


try:
    from cryptography.fernet import Fernet, InvalidToken

    HAS_FERNET = True
except ImportError:  # pragma: no cover - exercised when crypto not installed
    Fernet = None  # type: ignore
    InvalidToken = Exception  # type: ignore
    HAS_FERNET = False


def _utcnow() -> str:
    return datetime.now(timezone.utc).isoformat()


class LocalLedger:
    """Append-only encrypted audit trail stored on the local filesystem.

    Uses Fernet when the cryptography package is available; otherwise falls
    back to a XOR+HMAC envelope that still keeps data off the network and
    resists casual inspection. All writes stay on-disk at the store.
    """

    def __init__(self, ledger_path: str | Path, key_path: str | Path):
        self.ledger_path = Path(ledger_path)
        self.key_path = Path(key_path)
        self._lock = threading.Lock()
        self.ledger_path.parent.mkdir(parents=True, exist_ok=True)
        self.key_path.parent.mkdir(parents=True, exist_ok=True)
        self._key = self._load_or_create_key()
        self._fernet = Fernet(self._key) if HAS_FERNET else None
        if not self.ledger_path.exists():
            self._write_records([])

    def _load_or_create_key(self) -> bytes:
        if self.key_path.exists():
            return self.key_path.read_bytes().strip()
        if HAS_FERNET:
            key = Fernet.generate_key()
        else:
            key = base64.urlsafe_b64encode(secrets.token_bytes(32))
        # Restrictive permissions where the OS supports them
        self.key_path.write_bytes(key)
        try:
            os.chmod(self.key_path, 0o600)
        except OSError:
            pass
        return key

    def _encrypt(self, plaintext: bytes) -> bytes:
        if self._fernet is not None:
            return self._fernet.encrypt(plaintext)
        # Fallback envelope: version | nonce | ciphertext | hmac
        nonce = secrets.token_bytes(16)
        material = hashlib.sha256(self._key + nonce).digest()
        cipher = bytes(b ^ material[i % len(material)] for i, b in enumerate(plaintext))
        mac = hashlib.sha256(self._key + nonce + cipher).digest()
        return b"T1" + nonce + cipher + mac

    def _decrypt(self, blob: bytes) -> bytes:
        if self._fernet is not None:
            return self._fernet.decrypt(blob)
        if not blob.startswith(b"T1") or len(blob) < 2 + 16 + 32:
            raise ValueError("Corrupt ledger envelope")
        nonce = blob[2:18]
        mac = blob[-32:]
        cipher = blob[18:-32]
        expected = hashlib.sha256(self._key + nonce + cipher).digest()
        if not secrets.compare_digest(mac, expected):
            raise ValueError("Ledger integrity check failed")
        material = hashlib.sha256(self._key + nonce).digest()
        return bytes(b ^ material[i % len(material)] for i, b in enumerate(cipher))

    def _read_records(self) -> List[Dict[str, Any]]:
        raw = self.ledger_path.read_bytes()
        if not raw:
            return []
        try:
            plain = self._decrypt(raw)
            data = json.loads(plain.decode("utf-8"))
            if isinstance(data, list):
                return data
            return data.get("records", [])
        except (InvalidToken, ValueError, json.JSONDecodeError) as exc:
            raise RuntimeError(f"Unable to read ledger: {exc}") from exc

    def _write_records(self, records: List[Dict[str, Any]]) -> None:
        payload = json.dumps({"version": 1, "records": records}, indent=None).encode("utf-8")
        encrypted = self._encrypt(payload)
        tmp = self.ledger_path.with_suffix(self.ledger_path.suffix + ".tmp")
        tmp.write_bytes(encrypted)
        tmp.replace(self.ledger_path)

    def append(self, event_type: str, payload: Dict[str, Any], actor: str = "system") -> Dict[str, Any]:
        """Append a verified event. Returns the stored record."""
        record = {
            "id": secrets.token_hex(8),
            "ts": _utcnow(),
            "type": event_type,
            "actor": actor,
            "payload": payload,
        }
        with self._lock:
            records = self._read_records()
            records.append(record)
            self._write_records(records)
        return record

    def list_events(
        self,
        event_type: Optional[str] = None,
        limit: Optional[int] = None,
    ) -> List[Dict[str, Any]]:
        with self._lock:
            records = self._read_records()
        if event_type:
            records = [r for r in records if r.get("type") == event_type]
        if limit is not None:
            records = records[-limit:]
        return records

    def verify(self) -> bool:
        """Decrypt and parse the ledger; returns True if intact."""
        with self._lock:
            self._read_records()
        return True

    def export_plain(self, dest: str | Path) -> Path:
        """Explicit local export — never network. Requires intentional call."""
        dest = Path(dest)
        with self._lock:
            records = self._read_records()
        dest.write_text(json.dumps(records, indent=2), encoding="utf-8")
        return dest
