"""Hierarchy query helpers: University → Department → Professor / Course / Dorm."""

from uuid import UUID

from sqlalchemy import func, or_, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.models import Course, Department, DormHousing, PersonType, ProfessorAdvisor, University
from app.schemas import DirectorySearchResult


async def list_universities(
    db: AsyncSession,
    *,
    q: str | None = None,
    limit: int = 50,
    offset: int = 0,
) -> tuple[list[University], int]:
    stmt = select(University)
    count_stmt = select(func.count()).select_from(University)
    if q:
        pattern = f"%{q.strip()}%"
        filt = or_(
            University.name.ilike(pattern),
            University.location.ilike(pattern),
            University.domain.ilike(pattern),
            University.slug.ilike(pattern),
        )
        stmt = stmt.where(filt)
        count_stmt = count_stmt.where(filt)

    total = (await db.execute(count_stmt)).scalar_one()
    rows = (
        await db.execute(stmt.order_by(University.name).limit(limit).offset(offset))
    ).scalars().all()
    return list(rows), total


async def get_university(db: AsyncSession, university_id: UUID) -> University | None:
    return await db.get(University, university_id)


async def list_departments(
    db: AsyncSession,
    university_id: UUID,
    *,
    q: str | None = None,
    limit: int = 100,
    offset: int = 0,
) -> tuple[list[Department], int]:
    filters = [Department.university_id == university_id]
    if q:
        pattern = f"%{q.strip()}%"
        filters.append(
            or_(Department.name.ilike(pattern), Department.code.ilike(pattern))
        )

    count_stmt = select(func.count()).select_from(Department).where(*filters)
    total = (await db.execute(count_stmt)).scalar_one()
    rows = (
        await db.execute(
            select(Department)
            .where(*filters)
            .order_by(Department.name)
            .limit(limit)
            .offset(offset)
        )
    ).scalars().all()
    return list(rows), total


async def list_professors(
    db: AsyncSession,
    *,
    university_id: UUID | None = None,
    department_id: UUID | None = None,
    person_type: PersonType | None = None,
    q: str | None = None,
    limit: int = 50,
    offset: int = 0,
) -> tuple[list[ProfessorAdvisor], int]:
    stmt = select(ProfessorAdvisor).join(Department)
    count_stmt = select(func.count()).select_from(ProfessorAdvisor).join(Department)
    filters = []

    if university_id:
        filters.append(Department.university_id == university_id)
    if department_id:
        filters.append(ProfessorAdvisor.department_id == department_id)
    if person_type:
        if person_type == PersonType.both:
            filters.append(ProfessorAdvisor.type == PersonType.both)
        else:
            filters.append(
                or_(
                    ProfessorAdvisor.type == person_type,
                    ProfessorAdvisor.type == PersonType.both,
                )
            )
    if q:
        filters.append(ProfessorAdvisor.name.ilike(f"%{q.strip()}%"))

    if filters:
        stmt = stmt.where(*filters)
        count_stmt = count_stmt.where(*filters)

    total = (await db.execute(count_stmt)).scalar_one()
    rows = (
        await db.execute(
            stmt.options(selectinload(ProfessorAdvisor.department))
            .order_by(ProfessorAdvisor.name)
            .limit(limit)
            .offset(offset)
        )
    ).scalars().all()
    return list(rows), total


async def list_courses(
    db: AsyncSession,
    *,
    university_id: UUID | None = None,
    department_id: UUID | None = None,
    q: str | None = None,
    limit: int = 50,
    offset: int = 0,
) -> tuple[list[Course], int]:
    stmt = select(Course).join(Department)
    count_stmt = select(func.count()).select_from(Course).join(Department)
    filters = []

    if university_id:
        filters.append(Department.university_id == university_id)
    if department_id:
        filters.append(Course.department_id == department_id)
    if q:
        pattern = f"%{q.strip()}%"
        filters.append(
            or_(Course.course_code.ilike(pattern), Course.course_name.ilike(pattern))
        )

    if filters:
        stmt = stmt.where(*filters)
        count_stmt = count_stmt.where(*filters)

    total = (await db.execute(count_stmt)).scalar_one()
    rows = (
        await db.execute(stmt.order_by(Course.course_code).limit(limit).offset(offset))
    ).scalars().all()
    return list(rows), total


async def list_dorms(
    db: AsyncSession,
    university_id: UUID,
    *,
    q: str | None = None,
    campus_zone: str | None = None,
    limit: int = 50,
    offset: int = 0,
) -> tuple[list[DormHousing], int]:
    filters = [DormHousing.university_id == university_id]
    if campus_zone:
        filters.append(DormHousing.campus_zone.ilike(campus_zone))
    if q:
        pattern = f"%{q.strip()}%"
        filters.append(
            or_(
                DormHousing.building_name.ilike(pattern),
                DormHousing.campus_zone.ilike(pattern),
            )
        )

    count_stmt = select(func.count()).select_from(DormHousing).where(*filters)
    total = (await db.execute(count_stmt)).scalar_one()
    rows = (
        await db.execute(
            select(DormHousing)
            .where(*filters)
            .order_by(DormHousing.building_name)
            .limit(limit)
            .offset(offset)
        )
    ).scalars().all()
    return list(rows), total


async def directory_search(
    db: AsyncSession,
    *,
    q: str,
    university_id: UUID | None = None,
    limit: int = 20,
) -> list[DirectorySearchResult]:
    """Cross-entity search for the mobile multi-layer directory."""
    pattern = f"%{q.strip()}%"
    results: list[DirectorySearchResult] = []

    uni_stmt = select(University).where(
        or_(University.name.ilike(pattern), University.slug.ilike(pattern))
    ).limit(limit)
    for uni in (await db.execute(uni_stmt)).scalars():
        results.append(
            DirectorySearchResult(
                kind="university",
                id=uni.id,
                label=uni.name,
                subtitle=uni.location,
                university_id=uni.id,
            )
        )

    dept_stmt = select(Department).where(Department.name.ilike(pattern))
    if university_id:
        dept_stmt = dept_stmt.where(Department.university_id == university_id)
    for dept in (await db.execute(dept_stmt.limit(limit))).scalars():
        results.append(
            DirectorySearchResult(
                kind="department",
                id=dept.id,
                label=dept.name,
                subtitle=dept.code,
                university_id=dept.university_id,
                department_id=dept.id,
            )
        )

    prof_stmt = (
        select(ProfessorAdvisor, Department)
        .join(Department)
        .where(ProfessorAdvisor.name.ilike(pattern))
    )
    if university_id:
        prof_stmt = prof_stmt.where(Department.university_id == university_id)
    for prof, dept in (await db.execute(prof_stmt.limit(limit))).all():
        results.append(
            DirectorySearchResult(
                kind="professor",
                id=prof.id,
                label=prof.name,
                subtitle=f"{prof.type.value} · {dept.name}",
                university_id=dept.university_id,
                department_id=dept.id,
            )
        )

    course_stmt = (
        select(Course, Department)
        .join(Department)
        .where(
            or_(Course.course_code.ilike(pattern), Course.course_name.ilike(pattern))
        )
    )
    if university_id:
        course_stmt = course_stmt.where(Department.university_id == university_id)
    for course, dept in (await db.execute(course_stmt.limit(limit))).all():
        results.append(
            DirectorySearchResult(
                kind="course",
                id=course.id,
                label=f"{course.course_code} — {course.course_name}",
                subtitle=dept.name,
                university_id=dept.university_id,
                department_id=dept.id,
            )
        )

    dorm_stmt = select(DormHousing).where(DormHousing.building_name.ilike(pattern))
    if university_id:
        dorm_stmt = dorm_stmt.where(DormHousing.university_id == university_id)
    for dorm in (await db.execute(dorm_stmt.limit(limit))).scalars():
        results.append(
            DirectorySearchResult(
                kind="dorm",
                id=dorm.id,
                label=dorm.building_name,
                subtitle=dorm.campus_zone,
                university_id=dorm.university_id,
            )
        )

    return results[:limit]
