"""SQLAlchemy ORM models mirroring database/schema.sql."""

import enum
import uuid
from datetime import datetime

from sqlalchemy import (
    Boolean,
    DateTime,
    Enum,
    ForeignKey,
    Index,
    SmallInteger,
    String,
    Text,
    UniqueConstraint,
    func,
    text,
)
from sqlalchemy.dialects.postgresql import ARRAY, JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class PersonType(str, enum.Enum):
    professor = "professor"
    advisor = "advisor"
    both = "both"


class ReviewTargetType(str, enum.Enum):
    professor = "professor"
    advisor = "advisor"
    course = "course"
    dorm = "dorm"
    university = "university"


class University(Base):
    __tablename__ = "universities"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, server_default=text("gen_random_uuid()")
    )
    name: Mapped[str] = mapped_column(Text, nullable=False)
    domain: Mapped[str] = mapped_column(Text, nullable=False, unique=True)
    location: Mapped[str] = mapped_column(Text, nullable=False)
    slug: Mapped[str] = mapped_column(Text, nullable=False, unique=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )

    departments: Mapped[list["Department"]] = relationship(back_populates="university")
    dorms: Mapped[list["DormHousing"]] = relationship(back_populates="university")


class Department(Base):
    __tablename__ = "departments"
    __table_args__ = (
        UniqueConstraint("university_id", "name", name="departments_unique_name"),
    )

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, server_default=text("gen_random_uuid()")
    )
    university_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("universities.id", ondelete="CASCADE"), nullable=False
    )
    name: Mapped[str] = mapped_column(Text, nullable=False)
    code: Mapped[str | None] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )

    university: Mapped["University"] = relationship(back_populates="departments")
    professors: Mapped[list["ProfessorAdvisor"]] = relationship(back_populates="department")
    courses: Mapped[list["Course"]] = relationship(back_populates="department")


class ProfessorAdvisor(Base):
    __tablename__ = "professors_advisors"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, server_default=text("gen_random_uuid()")
    )
    department_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("departments.id", ondelete="CASCADE"), nullable=False
    )
    name: Mapped[str] = mapped_column(Text, nullable=False)
    type: Mapped[PersonType] = mapped_column(
        Enum(PersonType, name="person_type", create_type=False),
        nullable=False,
        default=PersonType.professor,
    )
    email: Mapped[str | None] = mapped_column(Text)
    title: Mapped[str | None] = mapped_column(Text)
    is_verified: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )

    department: Mapped["Department"] = relationship(back_populates="professors")


class Course(Base):
    __tablename__ = "courses"
    __table_args__ = (
        UniqueConstraint("department_id", "course_code", name="courses_unique_code"),
    )

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, server_default=text("gen_random_uuid()")
    )
    department_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("departments.id", ondelete="CASCADE"), nullable=False
    )
    course_code: Mapped[str] = mapped_column(Text, nullable=False)
    course_name: Mapped[str] = mapped_column(Text, nullable=False)
    credits: Mapped[int | None] = mapped_column(SmallInteger)
    is_verified: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )

    department: Mapped["Department"] = relationship(back_populates="courses")


class DormHousing(Base):
    __tablename__ = "dorms_housing"
    __table_args__ = (
        UniqueConstraint("university_id", "building_name", name="dorms_unique_building"),
    )

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, server_default=text("gen_random_uuid()")
    )
    university_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("universities.id", ondelete="CASCADE"), nullable=False
    )
    building_name: Mapped[str] = mapped_column(Text, nullable=False)
    campus_zone: Mapped[str | None] = mapped_column(Text)
    capacity: Mapped[int | None] = mapped_column()
    is_verified: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )

    university: Mapped["University"] = relationship(back_populates="dorms")


class Review(Base):
    __tablename__ = "reviews"
    __table_args__ = (
        Index("reviews_target_idx", "target_type", "target_id"),
        UniqueConstraint(
            "target_type", "target_id", "user_id_hash", name="reviews_one_per_user"
        ),
    )

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, server_default=text("gen_random_uuid()")
    )
    target_type: Mapped[ReviewTargetType] = mapped_column(
        Enum(ReviewTargetType, name="review_target_type", create_type=False),
        nullable=False,
    )
    target_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), nullable=False)
    user_id_hash: Mapped[str] = mapped_column(String(128), nullable=False)
    ratings: Mapped[dict] = mapped_column(JSONB, nullable=False)
    qualitative_tags: Mapped[list[str]] = mapped_column(
        ARRAY(Text), nullable=False, server_default=text("'{}'")
    )
    comment: Mapped[str | None] = mapped_column(Text)
    is_flagged: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )


class ReviewAggregate(Base):
    __tablename__ = "review_aggregates"

    target_type: Mapped[ReviewTargetType] = mapped_column(
        Enum(ReviewTargetType, name="review_target_type", create_type=False),
        primary_key=True,
    )
    target_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True)
    review_count: Mapped[int] = mapped_column(nullable=False, default=0)
    avg_ratings: Mapped[dict] = mapped_column(JSONB, nullable=False, server_default=text("'{}'"))
    top_tags: Mapped[list[str]] = mapped_column(
        ARRAY(Text), nullable=False, server_default=text("'{}'")
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )
