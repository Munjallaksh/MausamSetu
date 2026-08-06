"""Map-tile API stub."""

from typing import Never

from fastapi import APIRouter

router = APIRouter(prefix="/tiles", tags=["tiles"])


@router.get("/{z}/{x}/{y}.png", response_model=None)
def get_tile(z: int, x: int, y: int) -> Never:
    """Render a tile when tile generation is implemented."""
    del z, x, y
    raise NotImplementedError("Tile rendering is not implemented in the scaffold.")
