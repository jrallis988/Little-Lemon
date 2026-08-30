"""Review submission and retrieval endpoints."""

from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models import ReviewTargetType
from app.schemas import PaginatedResponse, ReviewAggregateOut, ReviewCreate, ReviewOut
from app.services import reviews as review_service

router = APIRouter(prefix="/reviews", tags=["reviews"])


@router.post("", response_model=ReviewOut, status_code=status.HTTP_201_CREATED)
async def create_review(
    payload: ReviewCreate,
    db: AsyncSession = Depends(get_db),
) -> ReviewOut:
    """
    Submit a structured multi-metric review.

    If `target_id` is omitted, pass the matching `create_*` payload so the API
    can auto-create a newly hired professor, new course, or dorm listing.
    """
    return await review_service.submit_review(db, payload)


@router.get("/{target_type}/{target_id}", response_model=PaginatedResponse)
async def get_reviews(
    target_type: ReviewTargetType,
    target_id: UUID,
    limit: int = Query(50, ge=1, le=100),
    offset: int = Query(0, ge=0),
    db: AsyncSession = Depends(get_db),
) -> PaginatedResponse:
    items, total = await review_service.list_reviews_for_target(
        db, target_type, target_id, limit=limit, offset=offset
    )
    return PaginatedResponse(
        items=[
            ReviewOut(
                id=r.id,
                target_type=r.target_type,
                target_id=r.target_id,
                ratings=r.ratings,
                qualitative_tags=r.qualitative_tags,
                comment=r.comment,
                created_at=r.created_at,
                target_created=False,
            )
            for r in items
        ],
        total=total,
        limit=limit,
        offset=offset,
    )


@router.get(
    "/{target_type}/{target_id}/aggregate",
    response_model=ReviewAggregateOut,
)
async def get_review_aggregate(
    target_type: ReviewTargetType,
    target_id: UUID,
    db: AsyncSession = Depends(get_db),
) -> ReviewAggregateOut:
    aggregate = await review_service.get_aggregate(db, target_type, target_id)
    if not aggregate:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "No reviews yet for this target")
    return ReviewAggregateOut.model_validate(aggregate)
