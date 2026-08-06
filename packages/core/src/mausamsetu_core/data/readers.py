"""Source-reader interfaces; implementation is intentionally deferred."""

from pathlib import Path
from typing import Never


def read_source(source: Path) -> Never:
    """Read a source dataset when reader implementations are introduced."""
    raise NotImplementedError("Dataset readers are not implemented in the scaffold.")
