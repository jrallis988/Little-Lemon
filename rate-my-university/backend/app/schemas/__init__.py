"""Pydantic request/response schemas."""

from datetime import datetime
from typing import Any, Literal
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field, field_validator

from app.core.constants import ALLOWED_TAGS, RATING_MAX, RATING_METRICS, RATING_MIN
from app.models import PersonType, ReviewTargetType


class ORMModel(BaseModel):
    model_config = ConfigDict(from_attributes=True)


# ----- Universities -----


class UniversityOut(ORMModel):
    id: UUID
    name: str
    domain: str
    location: str
    slug: str


class UniversityCreate(BaseModel):
    name: str = Field(min_length=2, max_length=200)
    domain: str = Field(pattern=r"^@[a-z0-9.-]+\.[a-z]{2,}$")
    location: str = Field(min_length=2, max_length=200)
    slug: str = Field(pattern=r"^[a-z0-9-]+$")


# ----- Departments -----


class DepartmentOut(ORMModel):
    id: UUID
    university_id: UUID
    name: str
    code: str | None = None


class DepartmentCreate(BaseModel):
    name: str = Field(min_length=2, max_length=200)
    code: str | None = Field(default=None, max_length=20)


# ----- Professors / Advisors -----


class ProfessorOut(ORMModel):
    id: UUID
    department_id: UUID
    name: str
    type: PersonType
    email: str | None = None
    title: str | None = None
    is_verified: bool


class ProfessorCreate(BaseModel):
    name: str = Field(min_length=2, max_length=200)
    type: PersonType = PersonType.professor
    email: str | None = None
    title: str | None = None
    department_id: UUID | None = None
    department_name: str | None = None
    university_id: UUID | None = None


# ----- Courses -----


class CourseOut(ORMModel):
    id: UUID
    department_id: UUID
    course_code: str
    course_name: str
    credits: int | None = None
    is_verified: bool


class CourseCreate(BaseModel):
    course_code: str = Field(min_length=2, max_length=32)
    course_name: str = Field(min_length=2, max_length=200)
    credits: int | None = Field(default=None, ge=0, le=20)
    department_id: UUID | None = None
    department_name: str | None = None
    university_id: UUID | None = None


# ----- Dorms -----


class DormOut(ORMModel):
    id: UUID
    university_id: UUID
    building_name: str
    campus_zone: str | None = None
    capacity: int | None = None
    is_verified: bool


class DormCreate(BaseModel):
    building_name: str = Field(min_length=2, max_length=200)
    campus_zone: str | None = None
    capacity: int | None = Field(default=None, ge=0)
    university_id: UUID


# ----- Reviews -----


class ReviewCreate(BaseModel):
    """Submit a structured review. Auto-creates the target when create_* fields are set."""

    target_type: ReviewTargetType
    target_id: UUID | None = None
    user_token: str = Field(
        min_length=8,
        max_length=256,
        description="Opaque client token; hashed server-side before storage.",
    )
    ratings: dict[str, int]
    qualitative_tags: list[str] = Field(default_factory=list, max_length=8)
    comment: str | None = Field(default=None, max_length=2000)

    # Auto-create fallback payload (used when target_id is omitted)
    create_professor: ProfessorCreate | None = None
    create_course: CourseCreate | None = None
    create_dorm: DormCreate | None = None
    create_university_id: UUID | None = None  # for university-target reviews only

    @field_validator("ratings")
    @classmethod
    def validate_rating_values(cls, value: dict[str, int]) -> dict[str, int]:
        for key, score in value.items():
            if not isinstance(score, int) or score < RATING_MIN or score > RATING_MAX:
                raise ValueError(
                    f"Rating '{key}' must be an integer between {RATING_MIN} and {RATING_MAX}"
                )
        return value

    def validate_metrics_for_type(self) -> None:
        expected = set(RATING_METRICS[self.target_type.value])
        provided = set(self.ratings.keys())
        if provided != expected:
            missing = expected - provided
            extra = provided - expected
            parts = []
            if missing:
                parts.append(f"missing metrics: {sorted(missing)}")
            if extra:
                parts.append(f"unknown metrics: {sorted(extra)}")
            raise ValueError("; ".join(parts))

        allowed = set(ALLOWED_TAGS[self.target_type.value])
        bad = [t for t in self.qualitative_tags if t not in allowed]
        if bad:
            raise ValueError(f"Unsupported tags for {self.target_type}: {bad}")


class ReviewOut(ORMModel):
    id: UUID
    target_type: ReviewTargetType
    target_id: UUID
    ratings: dict[str, Any]
    qualitative_tags: list[str]
    comment: str | None
    created_at: datetime
    target_created: bool = False


class ReviewAggregateOut(ORMModel):
    target_type: ReviewTargetType
    target_id: UUID
    review_count: int
    avg_ratings: dict[str, float]
    top_tags: list[str]


# ----- Search / directory -----


class DirectorySearchResult(BaseModel):
    kind: Literal["university", "department", "professor", "course", "dorm"]
    id: UUID
    label: str
    subtitle: str | None = None
    university_id: UUID | None = None
    department_id: UUID | None = None


class PaginatedResponse(BaseModel):
    items: list[Any]
    total: int
    limit: int
    offset: int
