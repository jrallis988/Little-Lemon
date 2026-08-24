"""Supplement research platform — legal gate, profile lock, FastAPI, Cloudflare design."""

from .access_control import (
    ProfileNotVerifiedError,
    analysis_allowed,
    apply_verification_state,
    assert_profile_verified,
    evaluate_verification,
)
from .data_gaps import (
    DATA_GAP_UI_MESSAGE,
    DataGapStopError,
    evaluate_ingredients_with_gap_stops,
)
from .legal_notice import (
    GAPS_AND_KNOWLEDGE_LIMITS_NOTICE,
    NOTICE_VERSION,
    TermsNotAcceptedError,
    assert_terms_accepted,
    build_terms_acceptance,
    terms_payload,
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
    "DATA_GAP_UI_MESSAGE",
    "GAPS_AND_KNOWLEDGE_LIMITS_NOTICE",
    "NOTICE_VERSION",
    "DataGapStopError",
    "HealthProfile",
    "HistorySource",
    "HistorySourceType",
    "ProfileIngestionError",
    "ProfileNotVerifiedError",
    "TermsNotAcceptedError",
    "analysis_allowed",
    "apply_verification_state",
    "assert_profile_verified",
    "assert_terms_accepted",
    "build_terms_acceptance",
    "evaluate_ingredients_with_gap_stops",
    "evaluate_verification",
    "example_profile",
    "ingest_profile",
    "ingest_profile_json",
    "profile_to_storage_dict",
    "terms_payload",
]
