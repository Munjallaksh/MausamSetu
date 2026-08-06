"""Trainer construction interface; implementation is intentionally deferred."""

from typing import Never


def create_trainer(experiment_name: str) -> Never:
    """Create a trainer when training support is implemented."""
    raise NotImplementedError("Trainer construction is not implemented in the scaffold.")
