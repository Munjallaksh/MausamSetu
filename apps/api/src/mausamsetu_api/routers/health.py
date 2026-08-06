"""Operational health endpoint."""

import platform
from datetime import datetime
from typing import Annotated
from zoneinfo import ZoneInfo

import torch
from fastapi import APIRouter, Depends

from mausamsetu_api.deps import ModelCache, get_device, get_model_cache
from mausamsetu_api.schemas import HealthResponse
from mausamsetu_core.runtime import DeviceInfo

router = APIRouter(tags=["health"])


@router.get("/health", response_model=HealthResponse)
def health(
    device: Annotated[DeviceInfo, Depends(get_device)],
    model_cache: Annotated[ModelCache, Depends(get_model_cache)],
) -> HealthResponse:
    """Report service, Python, Torch, GPU, and IST clock status."""
    return HealthResponse(
        status="ok",
        api_version="0.1.0",
        python_version=platform.python_version(),
        torch_version=torch.__version__,
        cuda_available=device.cuda_available,
        gpu_name=device.gpu_name,
        vram_total_gb=device.vram_total_gb,
        vram_used_gb=device.vram_used_gb,
        model_loaded=model_cache.loaded,
        data_manifest=None,
        ist_time=datetime.now(ZoneInfo("Asia/Kolkata")),
    )
