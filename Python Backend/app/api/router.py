from fastapi import APIRouter
from app.core.config import settings
from app.api.v1.endpoints import health, classify

api_router = APIRouter()
v1 = APIRouter(prefix=settings.API_V1_PREFIX)

v1.include_router(health.router, tags=["health"])
v1.include_router(classify.router, tags=["classify"])

api_router.include_router(v1)
