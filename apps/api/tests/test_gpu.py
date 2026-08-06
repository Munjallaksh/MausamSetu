"""CUDA-specific checks excluded from no-GPU CI."""

import pytest
import torch


@pytest.mark.gpu
def test_cuda_is_available_when_a_gpu_is_required() -> None:
    """The development machine exposes the CUDA build to PyTorch."""
    assert torch.cuda.is_available()
