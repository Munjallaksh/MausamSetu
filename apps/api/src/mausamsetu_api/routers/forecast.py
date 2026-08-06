"""Forecast API stub."""

from typing import Never

from fastapi import APIRouter

from mausamsetu_api.schemas import ForecastRequest

router = APIRouter(prefix="/api/v1", tags=["forecast"])


@router.post("/forecast", response_model=None)
def create_forecast(request: ForecastRequest) -> Never:
    """Create a forecast when forecast execution is implemented."""
    del request
    raise NotImplementedError("Forecasting is not implemented in the scaffold.")
