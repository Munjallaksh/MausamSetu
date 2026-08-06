"""Validation API stub."""

from typing import Never

from fastapi import APIRouter

from mausamsetu_api.schemas import ValidationRequest

router = APIRouter(prefix="/api/v1", tags=["validation"])


@router.post("/validate", response_model=None)
def validate_run(request: ValidationRequest) -> Never:
    """Validate a run when validation execution is implemented."""
    del request
    raise NotImplementedError("Validation is not implemented in the scaffold.")
