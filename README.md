<<<<<<< HEAD
# Swiftqueue

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.2.0.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
=======

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
>>>>>>> a59c86ee577a90a81757c795e55fa4ceb321a01e
