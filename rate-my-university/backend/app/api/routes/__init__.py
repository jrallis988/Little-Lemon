from fastapi import APIRouter

from app.api.routes import directory, reviews

api_router = APIRouter()
api_router.include_router(directory.router)
api_router.include_router(reviews.router)
