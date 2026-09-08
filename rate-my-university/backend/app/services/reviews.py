"""Review submission with validation and auto-create fallback."""

import hashlib
from collections import Counter
from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models import (
    Course,
    Department,
    DormHousing,
    Review,
    ReviewAggregate,
    ReviewTargetType,
    ProfessorAdvisor,
    University,
)
from app.schemas import CourseCreate, DormCreate, ProfessorCreate, ReviewCreate, ReviewOut


def hash_user_token(token: str) -> str:
    return hashlib.sha256(token.encode("utf-8")).hexdigest()


async def _resolve_or_create_department(
    db: AsyncSession,
    *,
    department_id: UUID | None,
    department_name: str | None,
    university_id: UUID | None,
) -> Department:
    if department_id:
        dept = await db.get(Department, department_id)
        if not dept:
            raise HTTPException(status.HTTP_404_NOT_FOUND, "Department not found")
        return dept

    if not department_name or not university_id:
        raise HTTPException(
            status.HTTP_422_UNPROCESSABLE_ENTITY,
            "Provide department_id or (department_name + university_id) for auto-create",
        )

    uni = await db.get(University, university_id)
    if not uni:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "University not found")

    existing = (
        await db.execute(
            select(Department).where(
                Department.university_id == university_id,
                Department.name.ilike(department_name.strip()),
            )
        )
    ).scalar_one_or_none()
    if existing:
        return existing

    dept = Department(
        university_id=university_id,
        name=department_name.strip(),
    )
    db.add(dept)
    await db.flush()
    return dept


async def _auto_create_professor(
    db: AsyncSession, payload: ProfessorCreate
) -> ProfessorAdvisor:
    dept = await _resolve_or_create_department(
        db,
        department_id=payload.department_id,
        department_name=payload.department_name,
        university_id=payload.university_id,
    )
    existing = (
        await db.execute(
            select(ProfessorAdvisor).where(
                ProfessorAdvisor.department_id == dept.id,
                ProfessorAdvisor.name.ilike(payload.name.strip()),
            )
        )
    ).scalar_one_or_none()
    if existing:
        return existing

    person = ProfessorAdvisor(
        department_id=dept.id,
        name=payload.name.strip(),
        type=payload.type,
        email=payload.email,
        title=payload.title,
        is_verified=False,
    )
    db.add(person)
    await db.flush()
    return person


async def _auto_create_course(db: AsyncSession, payload: CourseCreate) -> Course:
    dept = await _resolve_or_create_department(
        db,
        department_id=payload.department_id,
        department_name=payload.department_name,
        university_id=payload.university_id,
    )
    code = payload.course_code.strip().upper()
    existing = (
        await db.execute(
            select(Course).where(
                Course.department_id == dept.id,
                Course.course_code == code,
            )
        )
    ).scalar_one_or_none()
    if existing:
        return existing

    course = Course(
        department_id=dept.id,
        course_code=code,
        course_name=payload.course_name.strip(),
        credits=payload.credits,
        is_verified=False,
    )
    db.add(course)
    await db.flush()
    return course


async def _auto_create_dorm(db: AsyncSession, payload: DormCreate) -> DormHousing:
    uni = await db.get(University, payload.university_id)
    if not uni:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "University not found")

    existing = (
        await db.execute(
            select(DormHousing).where(
                DormHousing.university_id == payload.university_id,
                DormHousing.building_name.ilike(payload.building_name.strip()),
            )
        )
    ).scalar_one_or_none()
    if existing:
        return existing

    dorm = DormHousing(
        university_id=payload.university_id,
        building_name=payload.building_name.strip(),
        campus_zone=payload.campus_zone,
        capacity=payload.capacity,
        is_verified=False,
    )
    db.add(dorm)
    await db.flush()
    return dorm


async def _ensure_target_exists(
    db: AsyncSession, target_type: ReviewTargetType, target_id: UUID
) -> None:
    model_map = {
        ReviewTargetType.professor: ProfessorAdvisor,
        ReviewTargetType.advisor: ProfessorAdvisor,
        ReviewTargetType.course: Course,
        ReviewTargetType.dorm: DormHousing,
        ReviewTargetType.university: University,
    }
    entity = await db.get(model_map[target_type], target_id)
    if not entity:
        raise HTTPException(
            status.HTTP_404_NOT_FOUND,
            f"{target_type.value} target not found: {target_id}",
        )
    if target_type == ReviewTargetType.advisor and hasattr(entity, "type"):
        if entity.type.value not in ("advisor", "both"):
            raise HTTPException(
                status.HTTP_422_UNPROCESSABLE_ENTITY,
                "Target person is not marked as an advisor",
            )


async def _refresh_aggregate(
    db: AsyncSession, target_type: ReviewTargetType, target_id: UUID
) -> None:
    reviews = (
        await db.execute(
            select(Review).where(
                Review.target_type == target_type,
                Review.target_id == target_id,
                Review.is_flagged.is_(False),
            )
        )
    ).scalars().all()

    if not reviews:
        return

    metric_sums: dict[str, float] = {}
    metric_counts: dict[str, int] = {}
    tag_counter: Counter[str] = Counter()

    for review in reviews:
        for key, value in review.ratings.items():
            metric_sums[key] = metric_sums.get(key, 0.0) + float(value)
            metric_counts[key] = metric_counts.get(key, 0) + 1
        tag_counter.update(review.qualitative_tags)

    avg_ratings = {
        key: round(metric_sums[key] / metric_counts[key], 2) for key in metric_sums
    }
    top_tags = [tag for tag, _ in tag_counter.most_common(8)]

    aggregate = await db.get(ReviewAggregate, (target_type, target_id))
    if aggregate is None:
        aggregate = ReviewAggregate(
            target_type=target_type,
            target_id=target_id,
            review_count=len(reviews),
            avg_ratings=avg_ratings,
            top_tags=top_tags,
        )
        db.add(aggregate)
    else:
        aggregate.review_count = len(reviews)
        aggregate.avg_ratings = avg_ratings
        aggregate.top_tags = top_tags


async def submit_review(db: AsyncSession, payload: ReviewCreate) -> ReviewOut:
    try:
        payload.validate_metrics_for_type()
    except ValueError as exc:
        raise HTTPException(status.HTTP_422_UNPROCESSABLE_ENTITY, str(exc)) from exc

    target_created = False
    target_id = payload.target_id

    if target_id is None:
        target_created = True
        if payload.target_type in (ReviewTargetType.professor, ReviewTargetType.advisor):
            if not payload.create_professor:
                raise HTTPException(
                    status.HTTP_422_UNPROCESSABLE_ENTITY,
                    "create_professor is required when target_id is omitted",
                )
            person = await _auto_create_professor(db, payload.create_professor)
            target_id = person.id
        elif payload.target_type == ReviewTargetType.course:
            if not payload.create_course:
                raise HTTPException(
                    status.HTTP_422_UNPROCESSABLE_ENTITY,
                    "create_course is required when target_id is omitted",
                )
            course = await _auto_create_course(db, payload.create_course)
            target_id = course.id
        elif payload.target_type == ReviewTargetType.dorm:
            if not payload.create_dorm:
                raise HTTPException(
                    status.HTTP_422_UNPROCESSABLE_ENTITY,
                    "create_dorm is required when target_id is omitted",
                )
            dorm = await _auto_create_dorm(db, payload.create_dorm)
            target_id = dorm.id
        elif payload.target_type == ReviewTargetType.university:
            if not payload.create_university_id:
                raise HTTPException(
                    status.HTTP_422_UNPROCESSABLE_ENTITY,
                    "create_university_id is required when target_id is omitted",
                )
            target_id = payload.create_university_id
            target_created = False
        else:
            raise HTTPException(status.HTTP_422_UNPROCESSABLE_ENTITY, "Unsupported target")

    await _ensure_target_exists(db, payload.target_type, target_id)

    user_hash = hash_user_token(payload.user_token)
    existing = (
        await db.execute(
            select(Review).where(
                Review.target_type == payload.target_type,
                Review.target_id == target_id,
                Review.user_id_hash == user_hash,
            )
        )
    ).scalar_one_or_none()
    if existing:
        raise HTTPException(
            status.HTTP_409_CONFLICT,
            "You have already reviewed this target",
        )

    review = Review(
        target_type=payload.target_type,
        target_id=target_id,
        user_id_hash=user_hash,
        ratings=payload.ratings,
        qualitative_tags=payload.qualitative_tags,
        comment=payload.comment,
    )
    db.add(review)
    await db.flush()
    await _refresh_aggregate(db, payload.target_type, target_id)

    return ReviewOut(
        id=review.id,
        target_type=review.target_type,
        target_id=review.target_id,
        ratings=review.ratings,
        qualitative_tags=review.qualitative_tags,
        comment=review.comment,
        created_at=review.created_at,
        target_created=target_created,
    )


async def list_reviews_for_target(
    db: AsyncSession,
    target_type: ReviewTargetType,
    target_id: UUID,
    *,
    limit: int = 50,
    offset: int = 0,
) -> tuple[list[Review], int]:
    from sqlalchemy import func

    filters = [
        Review.target_type == target_type,
        Review.target_id == target_id,
        Review.is_flagged.is_(False),
    ]
    total = (
        await db.execute(select(func.count()).select_from(Review).where(*filters))
    ).scalar_one()
    rows = (
        await db.execute(
            select(Review)
            .where(*filters)
            .order_by(Review.created_at.desc())
            .limit(limit)
            .offset(offset)
        )
    ).scalars().all()
    return list(rows), total


async def get_aggregate(
    db: AsyncSession, target_type: ReviewTargetType, target_id: UUID
) -> ReviewAggregate | None:
    return await db.get(ReviewAggregate, (target_type, target_id))
