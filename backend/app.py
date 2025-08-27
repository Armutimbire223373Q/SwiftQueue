
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import Base, engine
from . import models
from .routers import patients, staff

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Swift Queue API", version="0.1.0")

# CORS (allow localhost frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(patients.router)
app.include_router(staff.router)

@app.get("/health")
def health():
    return {"status": "ok"}
