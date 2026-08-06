"""Runtime device inspection used by the service scaffold."""

from dataclasses import dataclass

import torch


@dataclass(frozen=True, slots=True)
class DeviceInfo:
    """Describe the CUDA device state detected during application startup."""

    cuda_available: bool
    gpu_name: str | None
    vram_total_gb: float | None
    vram_used_gb: float | None


def detect_device() -> DeviceInfo:
    """Inspect the primary CUDA device without constructing a model."""
    if not torch.cuda.is_available():
        return DeviceInfo(False, None, None, None)

    properties = torch.cuda.get_device_properties(0)
    total_gb = round(properties.total_memory / (1024**3), 2)
    used_gb = round(torch.cuda.memory_allocated(0) / (1024**3), 2)
    return DeviceInfo(True, torch.cuda.get_device_name(0), total_gb, used_gb)
