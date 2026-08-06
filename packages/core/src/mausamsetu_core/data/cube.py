"""Climate-cube loading interface; implementation is intentionally deferred."""

from pathlib import Path
from typing import Never


def load_cube(path: Path) -> Never:
    """Load a climate data cube when data loading is implemented."""
    raise NotImplementedError("Cube loading is not implemented in the scaffold.")
