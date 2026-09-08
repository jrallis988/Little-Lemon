"""Unit tests for review payload validation (no database required)."""

import pytest
from pydantic import ValidationError

from app.models import ReviewTargetType
from app.schemas import ReviewCreate


def _professor_payload(**overrides):
    base = {
        "target_type": ReviewTargetType.professor,
        "user_token": "device-token-abcdef",
        "ratings": {
            "clarity": 4,
            "helpfulness": 5,
            "difficulty": 3,
            "would_recommend": 5,
        },
        "qualitative_tags": ["engaging"],
    }
    base.update(overrides)
    return base


def test_professor_metrics_accept_complete_payload():
    review = ReviewCreate(**_professor_payload())
    review.validate_metrics_for_type()


def test_professor_metrics_reject_missing_key():
    review = ReviewCreate(
        **_professor_payload(
            ratings={"clarity": 4, "helpfulness": 5, "difficulty": 3}
        )
    )
    with pytest.raises(ValueError, match="missing metrics"):
        review.validate_metrics_for_type()


def test_professor_metrics_reject_unknown_key():
    review = ReviewCreate(
        **_professor_payload(
            ratings={
                "clarity": 4,
                "helpfulness": 5,
                "difficulty": 3,
                "would_recommend": 5,
                "charisma": 5,
            }
        )
    )
    with pytest.raises(ValueError, match="unknown metrics"):
        review.validate_metrics_for_type()


def test_rating_out_of_range_rejected_by_schema():
    with pytest.raises(ValidationError):
        ReviewCreate(**_professor_payload(ratings={
            "clarity": 0,
            "helpfulness": 5,
            "difficulty": 3,
            "would_recommend": 5,
        }))


def test_unsupported_tag_rejected():
    review = ReviewCreate(**_professor_payload(qualitative_tags=["not-a-real-tag"]))
    with pytest.raises(ValueError, match="Unsupported tags"):
        review.validate_metrics_for_type()


def test_course_metrics_shape():
    review = ReviewCreate(
        target_type=ReviewTargetType.course,
        user_token="device-token-abcdef",
        ratings={
            "workload": 3,
            "interest": 5,
            "organization": 4,
            "grading_fairness": 4,
        },
        qualitative_tags=["project-based"],
    )
    review.validate_metrics_for_type()


def test_dorm_metrics_shape():
    review = ReviewCreate(
        target_type=ReviewTargetType.dorm,
        user_token="device-token-abcdef",
        ratings={
            "cleanliness": 3,
            "location": 5,
            "community": 4,
            "value": 3,
        },
    )
    review.validate_metrics_for_type()


def test_health_route_registered():
    from app.main import app

    paths = {getattr(route, "path", None) for route in app.routes}
    assert "/health" in paths
    assert "/api/v1/universities" in paths
    assert "/api/v1/professors/{professor_id}" in paths
    assert "/api/v1/courses/{course_id}" in paths
    assert "/api/v1/dorms/{dorm_id}" in paths
    assert "/api/v1/departments/{department_id}" in paths
