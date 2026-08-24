"""
FastAPI application — clinical research aggregation API.

Gates (in order):
  1. Gaps & Knowledge Limits notice acceptance (before history upload / scan)
  2. profile_verified=True (before analysis)
  3. Data-gap hard stop for unindexed ingredients (no speculation)
"""

from __future__ import annotations

from datetime import datetime, timezone
from typing import Any

from fastapi import Depends, FastAPI, Header, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, field_validator

from supplement_checker.access_control import (
    ProfileNotVerifiedError,
    analysis_allowed,
    apply_verification_state,
    assert_profile_verified,
    evaluate_verification,
)
from supplement_checker.data_gaps import (
    DATA_GAP_UI_MESSAGE,
    evaluate_ingredients_with_gap_stops,
)
from supplement_checker.legal_notice import (
    NOTICE_VERSION,
    TermsAcceptance,
    TermsNotAcceptedError,
    assert_terms_accepted,
    build_terms_acceptance,
    terms_payload,
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
        "Requires Gaps & Knowledge Limits acceptance, then profile_verified=True."
    ),
    version="0.2.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

_PROFILES: dict[str, dict[str, Any]] = {}
# session_id / client_id → TermsAcceptance dict
_TERMS: dict[str, dict[str, Any]] = {}


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


class TermsAcceptIn(BaseModel):
    accepted: bool
    client_id: str = Field(..., min_length=1, max_length=128)


class ProfileCreateIn(BaseModel):
    client_id: str = Field(..., min_length=1, max_length=128)
    profile: dict[str, Any]


def _client_id(
    x_client_id: str | None = Header(default=None, alias="X-Client-Id"),
    client_id: str | None = None,
) -> str:
    value = client_id or x_client_id
    if not value:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="X-Client-Id header (or client_id) is required for terms binding.",
        )
    return value


def require_terms(client_id: str = Depends(_client_id)) -> TermsAcceptance:
    try:
        return assert_terms_accepted(_TERMS.get(client_id))
    except TermsNotAcceptedError as exc:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail={
                "error": "terms_not_accepted",
                "message": str(exc),
                "notice": terms_payload(),
            },
        ) from exc


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


@app.get("/legal/notice")
def get_legal_notice() -> dict[str, Any]:
    """Public Gaps & Knowledge Limits notice for mandatory UI gate."""
    return terms_payload()


@app.post("/legal/accept")
def accept_legal_notice(body: TermsAcceptIn) -> dict[str, Any]:
    """Record un-skippable notice acceptance for a client session."""
    try:
        acceptance = build_terms_acceptance(
            accepted=body.accepted,
            method="api_explicit",
        )
    except TermsNotAcceptedError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={"error": "terms_checkbox_required", "message": str(exc)},
        ) from exc
    _TERMS[body.client_id] = acceptance.model_dump(mode="json")
    return {
        "accepted": True,
        "notice_version": NOTICE_VERSION,
        "client_id": body.client_id,
        "record": _TERMS[body.client_id],
    }


@app.post("/profiles", status_code=201)
def create_profile(body: ProfileCreateIn) -> dict[str, Any]:
    """Create profile — blocked until Gaps & Knowledge Limits notice is accepted."""
    try:
        assert_terms_accepted(_TERMS.get(body.client_id))
    except TermsNotAcceptedError as exc:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail={
                "error": "terms_not_accepted",
                "message": str(exc),
                "notice": terms_payload(),
            },
        ) from exc

    try:
        profile = ingest_profile(body.profile, trust_verified_flag=False)
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
def attach_document(
    profile_id: str,
    body: DocumentMetadataIn,
    _: TermsAcceptance = Depends(require_terms),
) -> dict[str, Any]:
    """Register medical PDF metadata — requires prior notice acceptance."""
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
def health_sync(
    profile_id: str,
    body: HealthSyncIn,
    _: TermsAcceptance = Depends(require_terms),
) -> dict[str, Any]:
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
def verify_profile(
    profile_id: str,
    _: TermsAcceptance = Depends(require_terms),
) -> dict[str, Any]:
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


@app.post("/labels/scan/{profile_id}")
def scan_label_for_profile(
    body: LabelScanIn,
    profile: HealthProfile = Depends(require_verified_profile),
    _: TermsAcceptance = Depends(require_terms),
) -> dict[str, Any]:
    """Vision OCR entrypoint — requires terms + verified profile."""
    return {
        "status": "accepted",
        "profile_id": profile.profile_id,
        "r2_object_key": body.r2_object_key,
        "message": "Vision OCR pipeline stub — legal + profile gates passed.",
    }


@app.post("/compare/{profile_id}")
def compare_ingredients(
    body: CompareIn,
    profile: HealthProfile = Depends(require_verified_profile),
    _: TermsAcceptance = Depends(require_terms),
) -> dict[str, Any]:
    """
    Literature-backed comparison.

    Unindexed ingredients trigger a hard data-gap stop — no speculative
    safety or mechanistic evaluation is returned for those items.
    """
    gap_result = evaluate_ingredients_with_gap_stops(body.ingredients)
    return {
        "status": "completed_with_gaps" if gap_result["data_gaps"] else "completed",
        "profile_id": profile.profile_id,
        "risk_tokens": sorted(profile.risk_tokens()),
        "evaluable_ingredients": gap_result["evaluable_ingredients"],
        "data_gaps": gap_result["data_gaps"],
        "evaluation_blocked_for_gaps": gap_result["evaluation_blocked_for_gaps"],
        "data_gap_notice": DATA_GAP_UI_MESSAGE if gap_result["data_gaps"] else None,
        "message": (
            "Comparison ran only on ingredients with sufficient indexed literature. "
            "Unindexed items received an explicit Data Gap Identified hard stop."
        ),
    }


@app.post("/literature/{profile_id}")
def literature_query(
    query: str,
    profile: HealthProfile = Depends(require_verified_profile),
    _: TermsAcceptance = Depends(require_terms),
) -> dict[str, Any]:
    return {
        "status": "accepted",
        "profile_id": profile.profile_id,
        "query": query,
        "message": "PubMed/NCBI query stub — legal + profile gates passed.",
    }


@app.post("/demo/seed")
def seed_demo(verified: bool = False) -> dict[str, Any]:
    """Dev helper: seed example profile (does not bypass terms for other routes)."""
    profile = example_profile()
    if verified:
        profile = apply_verification_state(profile)
    _PROFILES[profile.profile_id] = profile_to_storage_dict(profile)
    return {
        "profile": profile.summary(),
        "analysis_allowed": analysis_allowed(profile),
    }
