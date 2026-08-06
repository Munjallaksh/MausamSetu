"""Run API stubs and heartbeat WebSocket."""

import asyncio
from datetime import datetime
from typing import Never
from zoneinfo import ZoneInfo

from fastapi import APIRouter, WebSocket, WebSocketDisconnect

router = APIRouter(prefix="/api/v1/runs", tags=["runs"])


@router.get("", response_model=None)
def list_runs() -> Never:
    """List runs when run persistence is implemented."""
    raise NotImplementedError("Run resources are not implemented in the scaffold.")


@router.websocket("/{run_id}/events")
async def run_events(websocket: WebSocket, run_id: str) -> None:
    """Keep a run-events connection alive with a two-second heartbeat."""
    await websocket.accept()
    try:
        while True:
            await websocket.send_json(
                {
                    "type": "heartbeat",
                    "run_id": run_id,
                    "ist_time": datetime.now(ZoneInfo("Asia/Kolkata")).isoformat(),
                }
            )
            await asyncio.sleep(2)
    except WebSocketDisconnect:
        return
