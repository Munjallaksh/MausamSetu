"""Import coverage for the core package scaffold."""

import mausamsetu_core
import mausamsetu_core.config
import mausamsetu_core.data
import mausamsetu_core.data.cube
import mausamsetu_core.data.manifest
import mausamsetu_core.data.readers
import mausamsetu_core.eval
import mausamsetu_core.eval.baselines
import mausamsetu_core.eval.metrics
import mausamsetu_core.eval.validation
import mausamsetu_core.model
import mausamsetu_core.model.convlstm
import mausamsetu_core.model.film
import mausamsetu_core.regions
import mausamsetu_core.runtime
import mausamsetu_core.runtime.event_queue
import mausamsetu_core.runtime.executor
import mausamsetu_core.train
import mausamsetu_core.train.callbacks
import mausamsetu_core.train.loop
import mausamsetu_core.train.trainer


def test_core_imports_expose_version() -> None:
    """All core modules import and the package identifies its version."""
    assert mausamsetu_core.__version__ == "0.1.0"
