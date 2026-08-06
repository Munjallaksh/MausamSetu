"""FastAPI application factory for the MausamSetu service scaffold."""

from collections.abc import AsyncIterator
from contextlib import asynccontextmanager

import structlog
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from mausamsetu_api.deps import ModelCache
from mausamsetu_api.logging import configure_logging
from mausamsetu_api.routers import forecast, health, models, runs, tiles, validate, zones
from mausamsetu_core.runtime import detect_device


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    """Detect runtime hardware once and retain it for request handling."""
    configure_logging()
    app.state.device = detect_device()
    app.state.model_cache = ModelCache()
    structlog.get_logger(__name__).info(
        "device_detected",
        cuda_available=app.state.device.cuda_available,
        gpu_name=app.state.device.gpu_name,
        vram_total_gb=app.state.device.vram_total_gb,
    )
    yield


def create_app() -> FastAPI:
    """Build the HTTP and WebSocket service without domain behavior."""
    app = FastAPI(
        title="MausamSetu API",
        version="0.1.0",
        description="MausamSetu मौसम सेतु service scaffold",
        lifespan=lifespan,
    )
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    app.include_router(health.router)
    app.include_router(zones.router)
    app.include_router(runs.router)
    app.include_router(models.router)
    app.include_router(forecast.router)
    app.include_router(validate.router)
    app.include_router(tiles.router)
    return app


app = create_app()
