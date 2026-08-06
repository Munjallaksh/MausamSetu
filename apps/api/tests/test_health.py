"""Health and WebSocket plumbing tests."""

from fastapi.testclient import TestClient

from mausamsetu_api.main import create_app


def test_health_reports_required_runtime_fields() -> None:
    """The live health endpoint includes all specified scaffold status fields."""
    with TestClient(create_app()) as client:
        response = client.get("/health")

    assert response.status_code == 200
    payload = response.json()
    assert payload["status"] == "ok"
    assert payload["torch_version"].startswith("2.")
    assert isinstance(payload["cuda_available"], bool)
    assert payload["gpu_name"] is None or isinstance(payload["gpu_name"], str)
    assert payload["model_loaded"] is False
    assert payload["data_manifest"] is None
    assert payload["ist_time"].endswith("+05:30")


def test_run_events_sends_heartbeat() -> None:
    """The run-events WebSocket sends its initial immediate heartbeat."""
    with (
        TestClient(create_app()) as client,
        client.websocket_connect("/api/v1/runs/test-run/events") as websocket,
    ):
        payload = websocket.receive_json()

    assert payload["type"] == "heartbeat"
    assert payload["run_id"] == "test-run"
    assert payload["ist_time"].endswith("+05:30")
