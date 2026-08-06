"""FiLM construction interface; model implementation is deferred."""

from typing import Never


def build_film(feature_channels: int, condition_channels: int) -> Never:
    """Build a FiLM module when architecture implementation is introduced."""
    raise NotImplementedError("FiLM construction is not implemented in the scaffold.")
