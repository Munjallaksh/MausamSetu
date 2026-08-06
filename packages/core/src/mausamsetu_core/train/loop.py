"""Training-loop interface; implementation is intentionally deferred."""

from typing import Never


def run_training_loop(max_epochs: int) -> Never:
    """Run a training loop when model training is implemented."""
    raise NotImplementedError("Training loops are not implemented in the scaffold.")
