"""Runtime executor interface; implementation is intentionally deferred."""

from typing import Never


def execute_run(run_id: str) -> Never:
    """Execute a run when runtime orchestration is implemented."""
    raise NotImplementedError("Run execution is not implemented in the scaffold.")
