"""Model interfaces for MausamSetu."""

from mausamsetu_core.model.convlstm import build_convlstm
from mausamsetu_core.model.film import build_film

__all__ = ["build_convlstm", "build_film"]
