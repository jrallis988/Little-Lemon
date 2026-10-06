"""
Legal & transparency safeguard — Gaps & Knowledge Limits notice.

Mandatory un-skippable acceptance before medical-history upload OR scan UI.
"""

from __future__ import annotations

from datetime import datetime, timezone
from typing import Any

from pydantic import BaseModel, Field


# Exact product notice — keep wording stable for UI, API, and audit logs.
GAPS_AND_KNOWLEDGE_LIMITS_NOTICE = """\
IMPORTANT NOTICE: This platform is an independent research and data-aggregation \
tool intended solely for informational and educational purposes. It is NOT a \
medical device, diagnostic tool, or a substitute for professional medical advice, \
diagnosis, or treatment.

Data Coverage & Incomplete Information Warning: This system cross-references \
publicly available scientific literature, biomedical databases (such as PubMed), \
and label formulations against your provided health history. However, medical \
research is dynamic, and not all compounds, proprietary blends, or rare chemical \
variants possess complete human clinical data or indexed records.

The platform may encounter unindexed items, missing literature, or incomplete \
data for which no definitive assessment can be provided. The absence of a flag \
does not indicate safety, and any insights generated are exploratory research \
projections only. Always consult a qualified physician, cardiologist, or \
healthcare specialist regarding any supplement, medication, or medical condition.\
"""

NOTICE_VERSION = "2026-08-24.gaps-knowledge-limits.v1"

DATA_GAP_UI_MESSAGE = (
    "Data Gap Identified: This ingredient or dosage lacks sufficient indexed "
    "human research literature. No safety or mechanistic evaluation can be "
    "provided. Review this item directly with your clinician."
)


class TermsNotAcceptedError(PermissionError):
    """Raised when profile upload or scan is attempted without notice acceptance."""

    def __init__(self, message: str | None = None) -> None:
        super().__init__(
            message
            or (
                "Access blocked: Gaps & Knowledge Limits notice must be explicitly "
                "accepted before uploading a medical history profile or opening "
                "the scan interface."
            )
        )


class TermsAcceptance(BaseModel):
    """Record of un-skippable notice acceptance (server-authoritative)."""

    accepted: bool = False
    notice_version: str = NOTICE_VERSION
    accepted_at: datetime | None = None
    acceptance_method: str | None = Field(
        default=None,
        description="e.g. checkbox_ui, api_explicit",
        max_length=64,
    )

    def is_valid_for_current_notice(self) -> bool:
        return (
            self.accepted is True
            and self.notice_version == NOTICE_VERSION
            and self.accepted_at is not None
        )


def build_terms_acceptance(*, accepted: bool, method: str = "checkbox_ui") -> TermsAcceptance:
    """Create an acceptance record. Rejects unchecked boxes."""
    if not accepted:
        raise TermsNotAcceptedError(
            "The Gaps & Knowledge Limits agreement checkbox is required and cannot be skipped."
        )
    return TermsAcceptance(
        accepted=True,
        notice_version=NOTICE_VERSION,
        accepted_at=datetime.now(timezone.utc),
        acceptance_method=method,
    )


def assert_terms_accepted(record: TermsAcceptance | dict[str, Any] | None) -> TermsAcceptance:
    """Hard gate for profile upload and scan routes."""
    if record is None:
        raise TermsNotAcceptedError()
    if isinstance(record, dict):
        record = TermsAcceptance.model_validate(record)
    if not record.is_valid_for_current_notice():
        raise TermsNotAcceptedError(
            "Gaps & Knowledge Limits notice acceptance is missing, expired, or "
            f"outdated (required version {NOTICE_VERSION})."
        )
    return record


def terms_payload() -> dict[str, Any]:
    """Public payload for mobile / web clients to render the mandatory gate."""
    return {
        "notice_version": NOTICE_VERSION,
        "title": "Gaps & Knowledge Limits Notice",
        "body": GAPS_AND_KNOWLEDGE_LIMITS_NOTICE,
        "checkbox_label": (
            "I have read and agree to the Gaps & Knowledge Limits Notice. "
            "I understand this platform is not a medical device and that "
            "missing literature means no evaluation will be provided."
        ),
        "required": True,
        "skippable": False,
        "blocks": ["medical_history_upload", "scan_interface", "analysis"],
    }
