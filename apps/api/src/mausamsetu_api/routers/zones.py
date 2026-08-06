"""Zone API stubs."""

from typing import Never

from fastapi import APIRouter

router = APIRouter(prefix="/api/v1/zones", tags=["zones"])


@router.get("", response_model=None)
def list_zones() -> Never:
    """List zones when the zone resource is implemented."""
    raise NotImplementedError("Zone resources are not implemented in the scaffold.")
