"""Evaluation metrics interface; implementation is intentionally deferred."""

from typing import Never


def calculate_metrics() -> Never:
    """Calculate metrics when evaluation behavior is implemented."""
    raise NotImplementedError("Metrics calculation is not implemented in the scaffold.")
