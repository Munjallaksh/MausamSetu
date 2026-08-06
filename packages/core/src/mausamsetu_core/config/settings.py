"""Typed configuration schemas without runtime configuration logic."""

from pathlib import Path
from typing import Literal

from pydantic import BaseModel, Field


class Settings(BaseModel):
    """Describe runtime paths and device preferences for the scaffold."""

    environment: Literal["development", "test", "production"] = "development"
    data_dir: Path = Path("data")
    checkpoints_dir: Path = Path("checkpoints")
    device: str = "cuda"


class ExperimentConfig(BaseModel):
    """Describe the minimum metadata required for a future experiment."""

    name: str = Field(min_length=1)
    zone_id: str = Field(min_length=1)
    seed: int = 42
