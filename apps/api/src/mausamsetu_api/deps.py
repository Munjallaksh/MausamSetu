"""Dependency providers for runtime state owned by the application."""

from dataclasses import dataclass
from typing import cast

from fastapi import Request

from mausamsetu_core.config import Settings
from mausamsetu_core.runtime import DeviceInfo


@dataclass(slots=True)
class ModelCache:
    """Represent the future model cache without loading a model."""

    loaded: bool = False


def get_settings() -> Settings:
    """Provide immutable-default runtime settings for request dependencies."""
    return Settings()


def get_device(request: Request) -> DeviceInfo:
    """Read the startup-detected device information from application state."""
    return cast(DeviceInfo, request.app.state.device)


def get_model_cache(request: Request) -> ModelCache:
    """Read the application-owned model cache placeholder."""
    return cast(ModelCache, request.app.state.model_cache)
