
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from .. import models, schemas
from ..services.ai import triage_score
from ..services.sms import send_sms
import random, string

router = APIRouter(prefix="/patients", tags=["patients"])

def _ticket():
    return 'T' + ''.join(random.choices(string.digits, k=5))

@router.post("/", response_model=schemas.PatientOut)
def register_patient(payload: schemas.PatientCreate, db: Session = Depends(get_db)):
    urgency = triage_score(payload.symptoms)
    ticket = _ticket()
    patient = models.Patient(
        name=payload.name,
        phone=payload.phone,
        symptoms=payload.symptoms,
        urgency=urgency,
        ticket=ticket,
        status=models.PatientStatus.waiting,
    )
    db.add(patient)
    db.commit()
    db.refresh(patient)
    if patient.phone:
        send_sms(patient.phone, f"Registered. Ticket {patient.ticket}. We'll notify you when it's your turn.")
    return patient

@router.get("/", response_model=list[schemas.QueueEntry])
def list_patients(db: Session = Depends(get_db)):
    rows = db.query(models.Patient).order_by(models.Patient.created_at.desc()).all()
    return rows

@router.get("/queue", response_model=list[schemas.QueueEntry])
def queue(db: Session = Depends(get_db)):
    rows = db.query(models.Patient).filter(models.Patient.status == models.PatientStatus.waiting).order_by(
        models.Patient.urgency.desc(), models.Patient.created_at.asc()
    ).all()
    return rows

@router.get("/{ticket}", response_model=schemas.PatientOut)
def by_ticket(ticket: str, db: Session = Depends(get_db)):
    p = db.query(models.Patient).filter(models.Patient.ticket == ticket).first()
    if not p:
        raise HTTPException(404, "Ticket not found")
    return p
