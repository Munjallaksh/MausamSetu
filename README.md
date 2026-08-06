# MausamSetu मौसम सेतु

MausamSetu is a GPU-accelerated climate digital-twin platform for building, training, evaluating, and serving regional weather and climate forecasts across India. This repository is a monorepo containing the SvelteKit web client, FastAPI service, and reusable Python ML core; the current phase establishes the development scaffold only, with no application logic.

## Prerequisites

- Windows 11, macOS, or Linux with Git
- Python 3.12 or newer
- Node.js 20 or newer and pnpm
- [uv](https://docs.astral.sh/uv/)
- NVIDIA GPU and a CUDA-compatible driver for GPU-backed training
- Docker Desktop (optional, for containers)

## Quickstart

```bash
# Install the Python workspace and web dependencies.
make setup

# Start the API and SvelteKit development servers.
make dev

# Run all checks.
make lint
make test
```

The web application runs at `http://localhost:5173` and the API documentation will be available at `http://localhost:8000/docs`.

## Layout

- `apps/web` — SvelteKit 2 frontend
- `apps/api` — FastAPI service
- `packages/core` — importable Python ML package
- `data` — local raw and processed datasets (not committed)
- `checkpoints` — local model artifacts (not committed)
- `docs` — project documentation
- `docker` — container definitions
