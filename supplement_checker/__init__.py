"""Supplement research platform — legal gate, profile lock, OCR, literature, FastAPI."""

from .access_control import (
    ProfileNotVerifiedError,
    analysis_allowed,
    apply_verification_state,
    assert_profile_verified,
    evaluate_verification,
)
from .compare_engine import compare_profile_to_ingredients
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
from .literature import query_literature, search_pubmed
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
from .vision_ocr import extract_label_from_bytes, extraction_to_dicts

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
    "compare_profile_to_ingredients",
    "evaluate_ingredients_with_gap_stops",
    "evaluate_verification",
    "example_profile",
    "extract_label_from_bytes",
    "extraction_to_dicts",
    "ingest_profile",
    "ingest_profile_json",
    "profile_to_storage_dict",
    "query_literature",
    "search_pubmed",
    "terms_payload",
]
