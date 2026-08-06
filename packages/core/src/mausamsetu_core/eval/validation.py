"""Validation interface; implementation is intentionally deferred."""

from typing import Never


def validate_forecast() -> Never:
    """Validate a forecast when evaluation behavior is implemented."""
    raise NotImplementedError("Forecast validation is not implemented in the scaffold.")
