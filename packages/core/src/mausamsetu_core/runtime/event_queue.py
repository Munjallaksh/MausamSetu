"""Runtime event-queue interface; implementation is intentionally deferred."""

from typing import Never


def enqueue_event(event_type: str) -> Never:
    """Queue an event when runtime orchestration is implemented."""
    raise NotImplementedError("Event queues are not implemented in the scaffold.")
