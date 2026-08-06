"""Training callback interface; implementation is intentionally deferred."""

from typing import Never


def create_callbacks() -> Never:
    """Create callbacks when training lifecycle support is implemented."""
    raise NotImplementedError("Training callbacks are not implemented in the scaffold.")
