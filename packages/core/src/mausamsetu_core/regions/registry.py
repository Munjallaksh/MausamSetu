"""Nine-zone registry contract; geographic lookup is intentionally deferred."""

from dataclasses import dataclass
from typing import Never


@dataclass(frozen=True, slots=True)
class Zone:
    """Describe a displayable forecast zone."""

    id: str
    name: str
    latitude: float
    longitude: float


ZONE_IDS: tuple[str, ...] = (
    "northwest",
    "north",
    "northeast",
    "west",
    "central",
    "east",
    "southwest",
    "south",
    "southeast",
)
"""Stable identifiers for the nine planned regional zones."""


def get_zone(zone_id: str) -> Never:
    """Resolve a zone when the authoritative registry is implemented."""
    raise NotImplementedError("Zone lookup is not implemented in the scaffold.")
