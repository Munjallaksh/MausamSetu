"""Dataset-manifest schema and loading interface."""

from pathlib import Path
from typing import Never

from pydantic import BaseModel, Field


class DatasetManifest(BaseModel):
    """Describe a future prepared dataset without reading it."""

    dataset_id: str = Field(min_length=1)
    version: str = Field(min_length=1)
    path: Path


def load_manifest(path: Path) -> Never:
    """Load a dataset manifest when manifest I/O is implemented."""
    raise NotImplementedError("Manifest loading is not implemented in the scaffold.")
