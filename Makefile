UV ?= uv
PNPM ?= pnpm

.PHONY: setup api web dev test lint format clean

setup:
	$(UV) sync --all-packages --group dev
	$(PNPM) --dir apps/web install --frozen-lockfile

api:
	$(UV) run --package mausamsetu-api uvicorn mausamsetu_api.main:app --reload --port 8000

web:
	$(PNPM) --dir apps/web dev --host 0.0.0.0 --port 5173

dev:
	@trap 'kill 0' INT TERM EXIT; \
	$(UV) run --package mausamsetu-api uvicorn mausamsetu_api.main:app --reload --port 8000 & \
	$(PNPM) --dir apps/web dev --host 0.0.0.0 --port 5173 & \
	wait

test:
	$(UV) run pytest
	$(PNPM) --dir apps/web run test:unit -- --run

lint:
	$(UV) run ruff check packages/core/src apps/api/src packages/core/tests apps/api/tests
	$(UV) run mypy
	$(PNPM) --dir apps/web lint
	$(PNPM) --dir apps/web check

format:
	$(UV) run ruff format packages/core/src apps/api/src packages/core/tests apps/api/tests
	$(PNPM) --dir apps/web format

clean:
	rm -rf .pytest_cache .mypy_cache .ruff_cache apps/web/.svelte-kit apps/web/build apps/web/coverage
