"""ConvLSTM construction interface; model implementation is deferred."""

from typing import Never


def build_convlstm(input_channels: int, hidden_channels: int) -> Never:
    """Build a ConvLSTM model when architecture implementation is introduced."""
    raise NotImplementedError("ConvLSTM construction is not implemented in the scaffold.")
