"""Pydantic response and request schemas for the API scaffold."""

from datetime import datetime

from pydantic import BaseModel


class HealthResponse(BaseModel):
    """Describe the operational state of the API host."""

    status: str
    api_version: str
    python_version: str
    torch_version: str
    cuda_available: bool
    gpu_name: str | None
    vram_total_gb: float | None
    vram_used_gb: float | None
    model_loaded: bool
    data_manifest: str | None
    ist_time: datetime


class ZoneResponse(BaseModel):
    """Describe a future regional zone resource."""

    id: str
    name: str


class RunResponse(BaseModel):
    """Describe a future run resource."""

    id: str
    status: str


class ModelResponse(BaseModel):
    """Describe a future registered model resource."""

    id: str
    name: str


class ForecastRequest(BaseModel):
    """Describe a future forecast submission."""

    zone_id: str


class ValidationRequest(BaseModel):
    """Describe a future validation submission."""

    run_id: str
