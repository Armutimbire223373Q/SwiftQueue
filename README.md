
# Swift Queue — AI-Powered Hospital Queue Management (Prototype)

This is a working prototype split into **3 parts** for a 3-person team:

1) **Backend API (FastAPI + SQLite)** — REST endpoints for patients, queues, staff actions, notifications.
2) **AI Engine (services/ai.py + services/scheduler.py)** — triage scoring & wait-time prediction used by the API.
3) **Frontend (vanilla HTML/JS/CSS)** — lightweight web UI with Patient Check-in and Staff Dashboard.

## Quickstart (Local)
- Requires: Python 3.10+
```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app:app --reload --port 8000
```
- Open the frontend:
  - Open `frontend/index.html` in your browser (it calls the API at `http://localhost:8000`).

## Seed sample data
```bash
cd scripts
python seed.py
```

## Team Split
- **Teammate A — Backend**: CRUD, auth stubs, queue actions, notifications.
- **Teammate B — AI Engine**: improve `services/ai.py` and `services/scheduler.py` (ML model, analytics).
- **Teammate C — Frontend**: expand UI/UX, add routing, validation, toasts, charts.

## Notes
- Auth is intentionally a stub (demo). Replace with JWT/OAuth and RBAC.
- Notifications (SMS/email) are mocked; wire up real providers later.
- DB is SQLite for demo; use PostgreSQL/MySQL in production.
