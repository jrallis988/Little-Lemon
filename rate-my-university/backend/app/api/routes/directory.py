"""REST routes for hierarchical directory queries."""

from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models import PersonType
from app.schemas import (
    CourseOut,
    DepartmentOut,
    DirectorySearchResult,
    DormOut,
    PaginatedResponse,
    ProfessorOut,
    UniversityOut,
)
from app.services import hierarchy

router = APIRouter(tags=["directory"])


@router.get("/universities", response_model=PaginatedResponse)
async def get_universities(
    q: str | None = None,
    limit: int = Query(50, ge=1, le=100),
    offset: int = Query(0, ge=0),
    db: AsyncSession = Depends(get_db),
) -> PaginatedResponse:
    items, total = await hierarchy.list_universities(db, q=q, limit=limit, offset=offset)
    return PaginatedResponse(
        items=[UniversityOut.model_validate(i) for i in items],
        total=total,
        limit=limit,
        offset=offset,
    )


@router.get("/universities/{university_id}", response_model=UniversityOut)
async def get_university(
    university_id: UUID,
    db: AsyncSession = Depends(get_db),
) -> UniversityOut:
    uni = await hierarchy.get_university(db, university_id)
    if not uni:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "University not found")
    return UniversityOut.model_validate(uni)


@router.get(
    "/universities/{university_id}/departments",
    response_model=PaginatedResponse,
)
async def get_departments(
    university_id: UUID,
    q: str | None = None,
    limit: int = Query(100, ge=1, le=200),
    offset: int = Query(0, ge=0),
    db: AsyncSession = Depends(get_db),
) -> PaginatedResponse:
    if not await hierarchy.get_university(db, university_id):
        raise HTTPException(status.HTTP_404_NOT_FOUND, "University not found")
    items, total = await hierarchy.list_departments(
        db, university_id, q=q, limit=limit, offset=offset
    )
    return PaginatedResponse(
        items=[DepartmentOut.model_validate(i) for i in items],
        total=total,
        limit=limit,
        offset=offset,
    )


@router.get(
    "/universities/{university_id}/professors",
    response_model=PaginatedResponse,
)
async def get_professors_by_university(
    university_id: UUID,
    department_id: UUID | None = None,
    person_type: PersonType | None = None,
    q: str | None = None,
    limit: int = Query(50, ge=1, le=100),
    offset: int = Query(0, ge=0),
    db: AsyncSession = Depends(get_db),
) -> PaginatedResponse:
    items, total = await hierarchy.list_professors(
        db,
        university_id=university_id,
        department_id=department_id,
        person_type=person_type,
        q=q,
        limit=limit,
        offset=offset,
    )
    return PaginatedResponse(
        items=[ProfessorOut.model_validate(i) for i in items],
        total=total,
        limit=limit,
        offset=offset,
    )


@router.get(
    "/universities/{university_id}/courses",
    response_model=PaginatedResponse,
)
async def get_courses_by_university(
    university_id: UUID,
    department_id: UUID | None = None,
    q: str | None = None,
    limit: int = Query(50, ge=1, le=100),
    offset: int = Query(0, ge=0),
    db: AsyncSession = Depends(get_db),
) -> PaginatedResponse:
    items, total = await hierarchy.list_courses(
        db,
        university_id=university_id,
        department_id=department_id,
        q=q,
        limit=limit,
        offset=offset,
    )
    return PaginatedResponse(
        items=[CourseOut.model_validate(i) for i in items],
        total=total,
        limit=limit,
        offset=offset,
    )


@router.get(
    "/universities/{university_id}/dorms",
    response_model=PaginatedResponse,
)
async def get_dorms(
    university_id: UUID,
    q: str | None = None,
    campus_zone: str | None = None,
    limit: int = Query(50, ge=1, le=100),
    offset: int = Query(0, ge=0),
    db: AsyncSession = Depends(get_db),
) -> PaginatedResponse:
    items, total = await hierarchy.list_dorms(
        db,
        university_id,
        q=q,
        campus_zone=campus_zone,
        limit=limit,
        offset=offset,
    )
    return PaginatedResponse(
        items=[DormOut.model_validate(i) for i in items],
        total=total,
        limit=limit,
        offset=offset,
    )


@router.get(
    "/departments/{department_id}/professors",
    response_model=PaginatedResponse,
)
async def get_professors_by_department(
    department_id: UUID,
    person_type: PersonType | None = None,
    q: str | None = None,
    limit: int = Query(50, ge=1, le=100),
    offset: int = Query(0, ge=0),
    db: AsyncSession = Depends(get_db),
) -> PaginatedResponse:
    items, total = await hierarchy.list_professors(
        db,
        department_id=department_id,
        person_type=person_type,
        q=q,
        limit=limit,
        offset=offset,
    )
    return PaginatedResponse(
        items=[ProfessorOut.model_validate(i) for i in items],
        total=total,
        limit=limit,
        offset=offset,
    )


@router.get(
    "/departments/{department_id}/courses",
    response_model=PaginatedResponse,
)
async def get_courses_by_department(
    department_id: UUID,
    q: str | None = None,
    limit: int = Query(50, ge=1, le=100),
    offset: int = Query(0, ge=0),
    db: AsyncSession = Depends(get_db),
) -> PaginatedResponse:
    items, total = await hierarchy.list_courses(
        db, department_id=department_id, q=q, limit=limit, offset=offset
    )
    return PaginatedResponse(
        items=[CourseOut.model_validate(i) for i in items],
        total=total,
        limit=limit,
        offset=offset,
    )


@router.get("/search", response_model=list[DirectorySearchResult])
async def search_directory(
    q: str = Query(..., min_length=1, max_length=100),
    university_id: UUID | None = None,
    limit: int = Query(20, ge=1, le=50),
    db: AsyncSession = Depends(get_db),
) -> list[DirectorySearchResult]:
    return await hierarchy.directory_search(
        db, q=q, university_id=university_id, limit=limit
    )
