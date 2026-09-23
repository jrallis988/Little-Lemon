"""
FastAPI application — clinical research aggregation API.

Gates (in order):
  1. Gaps & Knowledge Limits notice acceptance (before history upload / scan)
  2. profile_verified=True (before analysis)
  3. Data-gap hard stop for unindexed ingredients (no speculation)

Persistence: SQLite (local) matching Cloudflare D1 schema.
Objects: local filesystem stand-in for R2.
"""

from __future__ import annotations

from datetime import datetime, timezone
from typing import Any

from fastapi import Depends, FastAPI, File, Form, Header, HTTPException, UploadFile, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, field_validator

from supplement_checker.access_control import (
    ProfileNotVerifiedError,
    analysis_allowed,
    apply_verification_state,
    assert_profile_verified,
    evaluate_verification,
)
from supplement_checker.compare_engine import compare_profile_to_ingredients
from supplement_checker.legal_notice import (
    NOTICE_VERSION,
    TermsAcceptance,
    TermsNotAcceptedError,
    assert_terms_accepted,
    build_terms_acceptance,
    terms_payload,
)
from supplement_checker.literature import query_literature
from supplement_checker.object_store import get_object_store
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
from supplement_checker.storage import get_store
from supplement_checker.vision_ocr import (
    extract_label_from_bytes,
    extraction_to_dicts,
)

app = FastAPI(
    title="Supplement Research Platform API",
    description=(
        "Clinical-grade research and data-aggregation API. "
        "Not a medical device or diagnostic tool. "
        "Requires Gaps & Knowledge Limits acceptance, then profile_verified=True."
    ),
    version="0.3.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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


class CompareIn(BaseModel):
    ingredients: list[dict[str, Any]] = Field(default_factory=list)
    use_live_literature: bool = True


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
    store = get_store()
    try:
        return assert_terms_accepted(store.get_terms(client_id))
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
    profile = get_store().get_profile(profile_id)
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile


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
def health() -> dict[str, Any]:
    return {
        "status": "ok",
        "service": "supplement-research-api",
        "version": "0.3.0",
        "persistence": "sqlite",
    }


@app.get("/legal/notice")
def get_legal_notice() -> dict[str, Any]:
    return terms_payload()


@app.post("/legal/accept")
def accept_legal_notice(body: TermsAcceptIn) -> dict[str, Any]:
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
    record = acceptance.model_dump(mode="json")
    get_store().save_terms(body.client_id, record)
    return {
        "accepted": True,
        "notice_version": NOTICE_VERSION,
        "client_id": body.client_id,
        "record": record,
    }


@app.post("/profiles", status_code=201)
def create_profile(body: ProfileCreateIn) -> dict[str, Any]:
    store = get_store()
    try:
        assert_terms_accepted(store.get_terms(body.client_id))
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

    store.save_profile(profile)
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
    store = get_store()
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
    store.save_profile(profile)
    return {
        "profile": profile.summary(),
        "history_sources": len(profile.history_sources),
    }


@app.post("/profiles/{profile_id}/documents/upload")
async def upload_document(
    profile_id: str,
    _: TermsAcceptance = Depends(require_terms),
    file: UploadFile = File(...),
    label: str | None = None,
) -> dict[str, Any]:
    """Upload a medical PDF/file into the object store and attach metadata."""
    store = get_store()
    objects = get_object_store()
    profile = _get_profile_or_404(profile_id)
    data = await file.read()
    if not data:
        raise HTTPException(status_code=400, detail="Empty upload")
    key = objects.put_bytes(
        prefix="medical",
        filename=file.filename or "record.pdf",
        data=data,
        profile_id=profile_id,
    )
    source_type = (
        HistorySourceType.MEDICAL_PDF
        if (file.filename or "").lower().endswith(".pdf")
        else HistorySourceType.FILE_UPLOAD
    )
    profile.history_sources.append(
        HistorySource(
            source_type=source_type,
            label=label or file.filename,
            r2_object_key=key,
        )
    )
    profile.touch()
    profile.verification_status = VerificationStatus.PENDING_REVIEW
    store.save_profile(profile)
    return {
        "profile": profile.summary(),
        "r2_object_key": key,
        "bytes": len(data),
    }


@app.post("/profiles/{profile_id}/health-sync")
def health_sync(
    profile_id: str,
    body: HealthSyncIn,
    _: TermsAcceptance = Depends(require_terms),
) -> dict[str, Any]:
    store = get_store()
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
    store.save_profile(profile)
    return {"profile": profile.summary(), "synced": body.provider.value}


@app.post("/profiles/{profile_id}/verify")
def verify_profile(
    profile_id: str,
    _: TermsAcceptance = Depends(require_terms),
) -> dict[str, Any]:
    store = get_store()
    profile = _get_profile_or_404(profile_id)
    profile = apply_verification_state(profile)
    store.save_profile(profile)
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
async def scan_label_for_profile(
    profile_id: str,
    profile: HealthProfile = Depends(require_verified_profile),
    _: TermsAcceptance = Depends(require_terms),
    file: UploadFile | None = File(default=None),
    r2_object_key: str | None = Form(default=None),
) -> dict[str, Any]:
    """
    Vision OCR entrypoint.

    Accepts multipart image upload and/or an existing object key.
    Without an API key, returns structured demo extraction.
    """
    store = get_store()
    objects = get_object_store()
    job_id = store.create_job(
        profile_id=profile.profile_id,
        job_type="label_scan",
        input_data={"filename": file.filename if file else None},
    )

    try:
        image_bytes: bytes | None = None
        object_key: str | None = r2_object_key
        content_type = file.content_type if file else None

        if file is not None:
            image_bytes = await file.read()
            if not image_bytes:
                raise HTTPException(status_code=400, detail="Empty label image")
            object_key = objects.put_bytes(
                prefix="labels",
                filename=file.filename or "label.jpg",
                data=image_bytes,
                profile_id=profile.profile_id,
            )
        elif object_key:
            image_bytes = objects.get_bytes(object_key)
            if image_bytes is None:
                raise HTTPException(status_code=404, detail="Label object not found")
        else:
            # No file provided — demo extraction still allowed for verified profiles.
            image_bytes = b""

        if image_bytes:
            extraction = extract_label_from_bytes(
                image_bytes,
                filename=file.filename if file else object_key,
                content_type=content_type,
            )
        else:
            extraction = extract_label_from_bytes(b"", filename="demo")

        result = {
            "status": "completed",
            "job_id": job_id,
            "profile_id": profile.profile_id,
            "r2_object_key": object_key,
            "provider": extraction.provider,
            "product_name": extraction.product_name,
            "serving_size": extraction.serving_size,
            "confidence": extraction.confidence,
            "ingredients": extraction_to_dicts(extraction),
            "message": (
                "Vision OCR completed."
                if extraction.provider != "demo"
                else "Demo OCR used (set OPENAI_API_KEY or ANTHROPIC_API_KEY for live vision)."
            ),
        }
        store.complete_job(job_id, result=result)
        return result
    except HTTPException:
        store.complete_job(job_id, error="http_error")
        raise
    except Exception as exc:  # noqa: BLE001 — surface OCR failures cleanly
        store.complete_job(job_id, error=str(exc))
        raise HTTPException(status_code=502, detail=f"OCR failed: {exc}") from exc


@app.post("/compare/{profile_id}")
def compare_ingredients(
    body: CompareIn,
    profile: HealthProfile = Depends(require_verified_profile),
    _: TermsAcceptance = Depends(require_terms),
) -> dict[str, Any]:
    store = get_store()
    job_id = store.create_job(
        profile_id=profile.profile_id,
        job_type="compare",
        input_data={"ingredient_count": len(body.ingredients)},
    )
    result = compare_profile_to_ingredients(
        profile,
        body.ingredients,
        use_live_literature=body.use_live_literature,
    )
    result["job_id"] = job_id
    store.complete_job(job_id, result=result)
    return result


@app.get("/literature/{profile_id}")
def literature_query(
    profile_id: str,
    query: str,
    profile: HealthProfile = Depends(require_verified_profile),
    _: TermsAcceptance = Depends(require_terms),
) -> dict[str, Any]:
    store = get_store()
    job_id = store.create_job(
        profile_id=profile.profile_id,
        job_type="literature",
        input_data={"query": query},
    )
    lit = query_literature(query)
    result = {
        "status": "completed",
        "job_id": job_id,
        "profile_id": profile.profile_id,
        **lit,
        "disclaimer": (
            "Literature aggregation only — not a medical device or diagnostic tool."
        ),
    }
    store.complete_job(job_id, result=result)
    return result


@app.get("/jobs/{job_id}")
def get_job(job_id: str) -> dict[str, Any]:
    job = get_store().get_job(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job


@app.post("/demo/seed")
def seed_demo(verified: bool = False) -> dict[str, Any]:
    store = get_store()
    profile = example_profile()
    if verified:
        profile = apply_verification_state(profile)
    store.save_profile(profile)
    return {
        "profile": profile.summary(),
        "analysis_allowed": analysis_allowed(profile),
    }
