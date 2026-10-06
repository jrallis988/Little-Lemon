"""
Non-negotiable access control: profile_verified lock.

No label scan, OCR, literature query, or comparison may proceed until the
user health history is complete and profile_verified is True.
"""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any

from .profile_ingestion import HealthProfile, HistorySourceType


class ProfileNotVerifiedError(PermissionError):
    """Raised when analysis is attempted before profile verification."""

    def __init__(self, message: str, *, missing: list[str] | None = None) -> None:
        super().__init__(message)
        self.missing = missing or []


@dataclass(frozen=True)
class VerificationRequirements:
    """
    Minimum completeness gates before profile_verified may become True.

    Tunable later; defaults encode the blueprint rule that history must be
    substantive before any product analysis.
    """

    require_demographics: bool = True
    min_history_sources: int = 1
    require_allergy_section_acknowledged: bool = True
    require_device_or_document_or_text: bool = True
    # At least one clinical signal beyond empty demographics.
    min_clinical_items: int = 1


DEFAULT_REQUIREMENTS = VerificationRequirements()


def _clinical_item_count(profile: HealthProfile) -> int:
    return (
        len(profile.conditions)
        + len(profile.medications)
        + len(profile.allergies)
        + len(profile.nutrient_flags)
        + len(profile.current_supplements)
    )


def verification_gaps(
    profile: HealthProfile,
    requirements: VerificationRequirements = DEFAULT_REQUIREMENTS,
) -> list[str]:
    """Return human-readable gaps that block verification."""
    gaps: list[str] = []

    if requirements.require_demographics:
        if profile.demographics.age_years is None:
            gaps.append("demographics.age_years")
        if profile.demographics.biological_sex is None:
            gaps.append("demographics.biological_sex")

    if requirements.min_history_sources > 0:
        if len(profile.history_sources) < requirements.min_history_sources:
            gaps.append(
                f"history_sources (need ≥ {requirements.min_history_sources})"
            )

    if requirements.require_device_or_document_or_text:
        allowed = {
            HistorySourceType.TEXT_INPUT,
            HistorySourceType.MEDICAL_PDF,
            HistorySourceType.FILE_UPLOAD,
            HistorySourceType.APPLE_HEALTHKIT,
            HistorySourceType.GOOGLE_HEALTH_CONNECT,
        }
        if not any(src.source_type in allowed for src in profile.history_sources):
            gaps.append(
                "history_sources must include text, medical PDF/file upload, "
                "or HealthKit / Health Connect sync"
            )

    if requirements.require_allergy_section_acknowledged:
        if not profile.allergies_reviewed:
            gaps.append("allergies_reviewed must be true (even if allergy list is empty)")

    if requirements.min_clinical_items > 0:
        count = _clinical_item_count(profile)
        if count < requirements.min_clinical_items:
            gaps.append(
                f"clinical items (conditions/meds/allergies/nutrients/supplements) "
                f"need ≥ {requirements.min_clinical_items}, have {count}"
            )

    return gaps


def evaluate_verification(
    profile: HealthProfile,
    requirements: VerificationRequirements = DEFAULT_REQUIREMENTS,
) -> tuple[bool, list[str]]:
    """Return (can_verify, gaps). Does not mutate the profile."""
    gaps = verification_gaps(profile, requirements)
    return (len(gaps) == 0, gaps)


def apply_verification_state(
    profile: HealthProfile,
    *,
    force: bool = False,
    requirements: VerificationRequirements = DEFAULT_REQUIREMENTS,
) -> HealthProfile:
    """
    Set profile_verified based on completeness.

    force=True is reserved for admin/test tooling and still records gaps.
    """
    ok, gaps = evaluate_verification(profile, requirements)
    profile.verification_gaps = gaps
    if force or ok:
        profile.profile_verified = True
    else:
        profile.profile_verified = False
    profile.touch()
    return profile


def assert_profile_verified(profile: HealthProfile | dict[str, Any]) -> HealthProfile:
    """
    Hard gate for analysis routes.

    Accepts a HealthProfile or raw dict (e.g. session / D1 row payload).
    """
    if isinstance(profile, dict):
        from .profile_ingestion import ingest_profile

        profile = ingest_profile(profile)

    if not profile.profile_verified:
        gaps = profile.verification_gaps or verification_gaps(profile)
        raise ProfileNotVerifiedError(
            "Analysis locked: profile_verified is False. "
            "Complete health history (uploads, medical PDFs, text, and/or "
            "HealthKit / Health Connect) before scanning products.",
            missing=gaps,
        )
    return profile


def analysis_allowed(profile: HealthProfile | dict[str, Any] | None) -> bool:
    """Soft check for UI disablement."""
    if profile is None:
        return False
    try:
        assert_profile_verified(profile)
        return True
    except ProfileNotVerifiedError:
        return False
