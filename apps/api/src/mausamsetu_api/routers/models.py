"""Model API stubs."""

from typing import Never

from fastapi import APIRouter

router = APIRouter(prefix="/api/v1/models", tags=["models"])


@router.get("", response_model=None)
def list_models() -> Never:
    """List models when the registry is implemented."""
    raise NotImplementedError("Model resources are not implemented in the scaffold.")
