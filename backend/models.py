
from sqlalchemy import Column, Integer, String, DateTime, Float, Enum, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base
import enum

class PatientStatus(str, enum.Enum):
    waiting = "waiting"
    in_service = "in_service"
    completed = "completed"
    cancelled = "cancelled"

class Patient(Base):
    __tablename__ = "patients"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    phone = Column(String, nullable=True)
    symptoms = Column(String, nullable=True)
    urgency = Column(Integer, default=0)   # 0-100 AI computed score
    ticket = Column(String, unique=True, index=True)
    status = Column(Enum(PatientStatus), default=PatientStatus.waiting)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Staff(Base):
    __tablename__ = "staff"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    role = Column(String, default="nurse")  # nurse | doctor | admin

class Visit(Base):
    __tablename__ = "visits"
    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"))
    staff_id = Column(Integer, ForeignKey("staff.id"), nullable=True)
    started_at = Column(DateTime, nullable=True)
    ended_at = Column(DateTime, nullable=True)
    notes = Column(String, nullable=True)

    patient = relationship("Patient")
    staff = relationship("Staff")
