
from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from enum import Enum

class PatientStatus(str, Enum):
    waiting = "waiting"
    in_service = "in_service"
    completed = "completed"
    cancelled = "cancelled"

class PatientCreate(BaseModel):
    name: str
    phone: Optional[str] = None
    symptoms: Optional[str] = None

class PatientOut(BaseModel):
    id: int
    name: str
    phone: Optional[str]
    symptoms: Optional[str]
    urgency: int
    ticket: str
    status: PatientStatus
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class StaffCreate(BaseModel):
    name: str
    role: str = "nurse"

class StaffOut(BaseModel):
    id: int
    name: str
    role: str
    class Config:
        from_attributes = True

class QueueEntry(BaseModel):
    id: int
    name: str
    ticket: str
    urgency: int
    status: PatientStatus

    class Config:
        from_attributes = True

class NextPatientOut(BaseModel):
    patient: Optional[QueueEntry]
    estimated_wait_minutes: float
