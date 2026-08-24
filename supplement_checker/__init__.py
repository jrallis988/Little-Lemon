"""Supplement research platform — profile gate, FastAPI, Cloudflare-backed design."""

from .access_control import (
    ProfileNotVerifiedError,
    analysis_allowed,
    apply_verification_state,
    assert_profile_verified,
    evaluate_verification,
)
from .profile_ingestion import (
    HealthProfile,
    HistorySource,
    HistorySourceType,
    ProfileIngestionError,
    example_profile,
    ingest_profile,
    ingest_profile_json,
    profile_to_storage_dict,
)

__all__ = [
    "HealthProfile",
    "HistorySource",
    "HistorySourceType",
    "ProfileIngestionError",
    "ProfileNotVerifiedError",
    "analysis_allowed",
    "apply_verification_state",
    "assert_profile_verified",
    "evaluate_verification",
    "example_profile",
    "ingest_profile",
    "ingest_profile_json",
    "profile_to_storage_dict",
]
