"""
FastAPI application — clinical research aggregation API.

Locked routes refuse work while profile_verified is False.
"""

from __future__ import annotations

from datetime import datetime, timezone
from typing import Any

from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, field_validator

from supplement_checker.access_control import (
    ProfileNotVerifiedError,
    analysis_allowed,
    apply_verification_state,
    assert_profile_verified,
    evaluate_verification,
)
from supplement_checker.profile_ingestion import (
    HealthProfile,
    HistorySource,
    HistorySourceType,
    ProfileIngestionError,
    VerificationStatus,
    example_profile,
    ingest_profile,
    profile_to_storage_dict,
)

app = FastAPI(
    title="Supplement Research Platform API",
    description=(
        "Clinical-grade research and data-aggregation API. "
        "Not a medical device or diagnostic tool. "
        "Analysis endpoints require profile_verified=True."
    ),
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory store for local prototype — Cloudflare D1 in production.
_PROFILES: dict[str, dict[str, Any]] = {}


class DocumentMetadataIn(BaseModel):
    source_type: HistorySourceType = HistorySourceType.MEDICAL_PDF
    label: str | None = None
    r2_object_key: str = Field(..., min_length=1, max_length=512)
    text_excerpt: str | None = None


class HealthSyncIn(BaseModel):
    provider: HistorySourceType
    label: str | None = None
    payload_summary: str | None = Field(
        default=None,
        description="Non-PHI summary of synced metrics (counts/types only).",
        max_length=2000,
    )

    @field_validator("provider")
    @classmethod
    def require_device_provider(cls, value: HistorySourceType) -> HistorySourceType:
        allowed = {
            HistorySourceType.APPLE_HEALTHKIT,
            HistorySourceType.GOOGLE_HEALTH_CONNECT,
        }
        if value not in allowed:
            raise ValueError("provider must be apple_healthkit or google_health_connect")
        return value


class LabelScanIn(BaseModel):
    r2_object_key: str = Field(..., description="R2 key for label image")


class CompareIn(BaseModel):
    ingredients: list[dict[str, Any]] = Field(default_factory=list)


def _get_profile_or_404(profile_id: str) -> HealthProfile:
    raw = _PROFILES.get(profile_id)
    if not raw:
        raise HTTPException(status_code=404, detail="Profile not found")
    return ingest_profile(raw, trust_verified_flag=True)


def require_verified_profile(profile_id: str) -> HealthProfile:
    profile = _get_profile_or_404(profile_id)
    try:
        return assert_profile_verified(profile)
    except ProfileNotVerifiedError as exc:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail={
                "error": "profile_not_verified",
                "message": str(exc),
                "missing": exc.missing,
            },
        ) from exc


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "supplement-research-api"}


@app.post("/profiles", status_code=201)
def create_profile(payload: dict[str, Any]) -> dict[str, Any]:
    try:
        profile = ingest_profile(payload, trust_verified_flag=False)
    except ProfileIngestionError as exc:
        raise HTTPException(status_code=422, detail=str(exc)) from exc

    profile.profile_verified = False
    profile.verification_status = VerificationStatus.DRAFT
    ok, gaps = evaluate_verification(profile)
    profile.verification_gaps = gaps
    if ok:
        profile.verification_status = VerificationStatus.PENDING_REVIEW

    _PROFILES[profile.profile_id] = profile_to_storage_dict(profile)
    return {
        "profile": profile.summary(),
        "analysis_allowed": analysis_allowed(profile),
    }


@app.get("/profiles/{profile_id}")
def get_profile(profile_id: str) -> dict[str, Any]:
    profile = _get_profile_or_404(profile_id)
    return {
        "profile": profile.summary(),
        "analysis_allowed": analysis_allowed(profile),
        "full": profile_to_storage_dict(profile),
    }


@app.post("/profiles/{profile_id}/documents")
def attach_document(profile_id: str, body: DocumentMetadataIn) -> dict[str, Any]:
    """Register a medical PDF / file already uploaded to R2."""
    profile = _get_profile_or_404(profile_id)
    profile.history_sources.append(
        HistorySource(
            source_type=body.source_type,
            label=body.label,
            r2_object_key=body.r2_object_key,
            text_excerpt=body.text_excerpt,
        )
    )
    profile.touch()
    profile.verification_status = VerificationStatus.PENDING_REVIEW
    _PROFILES[profile.profile_id] = profile_to_storage_dict(profile)
    return {
        "profile": profile.summary(),
        "history_sources": len(profile.history_sources),
    }


@app.post("/profiles/{profile_id}/health-sync")
def health_sync(profile_id: str, body: HealthSyncIn) -> dict[str, Any]:
    """Record Apple HealthKit or Google Health Connect sync metadata."""
    profile = _get_profile_or_404(profile_id)
    profile.history_sources.append(
        HistorySource(
            source_type=body.provider,
            label=body.label or body.provider.value,
            device_sync_at=datetime.now(timezone.utc),
            text_excerpt=body.payload_summary,
        )
    )
    profile.touch()
    _PROFILES[profile.profile_id] = profile_to_storage_dict(profile)
    return {"profile": profile.summary(), "synced": body.provider.value}


@app.post("/profiles/{profile_id}/verify")
def verify_profile(profile_id: str) -> dict[str, Any]:
    """Attempt to flip profile_verified when completeness gates pass."""
    profile = _get_profile_or_404(profile_id)
    profile = apply_verification_state(profile)
    _PROFILES[profile.profile_id] = profile_to_storage_dict(profile)
    if not profile.profile_verified:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail={
                "error": "verification_incomplete",
                "message": "Health history incomplete — analysis remains locked.",
                "missing": profile.verification_gaps,
                "profile": profile.summary(),
            },
        )
    return {
        "profile": profile.summary(),
        "analysis_allowed": True,
    }


# ---------------------------------------------------------------------------
# LOCKED analysis routes — require profile_verified=True
# ---------------------------------------------------------------------------


@app.post("/labels/scan/{profile_id}")
def scan_label_for_profile(
    body: LabelScanIn,
    profile: HealthProfile = Depends(require_verified_profile),
) -> dict[str, Any]:
    """Vision OCR entrypoint — locked until profile_verified."""
    return {
        "status": "accepted",
        "profile_id": profile.profile_id,
        "r2_object_key": body.r2_object_key,
        "message": "Vision OCR pipeline stub — profile gate passed.",
    }


@app.post("/compare/{profile_id}")
def compare_ingredients(
    body: CompareIn,
    profile: HealthProfile = Depends(require_verified_profile),
) -> dict[str, Any]:
    """Literature-backed comparison stub — locked until profile_verified."""
    return {
        "status": "accepted",
        "profile_id": profile.profile_id,
        "ingredient_count": len(body.ingredients),
        "risk_tokens": sorted(profile.risk_tokens()),
        "message": "Comparison + PubMed pipeline stub — profile gate passed.",
    }


@app.post("/literature/{profile_id}")
def literature_query(
    query: str,
    profile: HealthProfile = Depends(require_verified_profile),
) -> dict[str, Any]:
    return {
        "status": "accepted",
        "profile_id": profile.profile_id,
        "query": query,
        "message": "PubMed/NCBI query stub — profile gate passed.",
    }


@app.post("/demo/seed")
def seed_demo(verified: bool = False) -> dict[str, Any]:
    """Dev helper: seed example profile; optionally verify if complete."""
    profile = example_profile()
    if verified:
        profile = apply_verification_state(profile)
    _PROFILES[profile.profile_id] = profile_to_storage_dict(profile)
    return {
        "profile": profile.summary(),
        "analysis_allowed": analysis_allowed(profile),
    }
