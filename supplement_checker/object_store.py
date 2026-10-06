"""
Local object store stand-in for Cloudflare R2.

Production swaps this for signed R2 uploads. Keeps medical PDFs / label images
off the SQL profile rows.
"""

from __future__ import annotations

import os
from pathlib import Path
from uuid import uuid4

DEFAULT_ROOT = Path(
    os.environ.get(
        "SUPPLEMENT_OBJECT_ROOT",
        Path(__file__).resolve().parent / "data" / "objects",
    )
)


class ObjectStore:
    def __init__(self, root: Path | str | None = None) -> None:
        self.root = Path(root) if root else DEFAULT_ROOT
        self.root.mkdir(parents=True, exist_ok=True)

    def put_bytes(
        self,
        *,
        prefix: str,
        filename: str,
        data: bytes,
        profile_id: str | None = None,
    ) -> str:
        safe_name = Path(filename).name or f"upload-{uuid4().hex}"
        key = f"{prefix}/{profile_id or 'anon'}/{uuid4().hex}/{safe_name}"
        path = self.root / key
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_bytes(data)
        return key

    def get_bytes(self, key: str) -> bytes | None:
        path = self.root / key
        if not path.is_file():
            return None
        return path.read_bytes()

    def exists(self, key: str) -> bool:
        return (self.root / key).is_file()

    def absolute_path(self, key: str) -> Path:
        return self.root / key


_OBJECTS: ObjectStore | None = None


def get_object_store() -> ObjectStore:
    global _OBJECTS
    if _OBJECTS is None:
        _OBJECTS = ObjectStore()
    return _OBJECTS
