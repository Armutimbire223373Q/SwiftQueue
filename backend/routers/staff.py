
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from .. import models, schemas
from ..services import scheduler
from ..services.sms import send_sms
from datetime import datetime

router = APIRouter(prefix="/staff", tags=["staff"])

@router.post("/next", response_model=schemas.NextPatientOut)
def call_next_patient(db: Session = Depends(get_db)):
    p = scheduler.next_patient(db)
    if not p:
        return {"patient": None, "estimated_wait_minutes": 0}
    p.status = models.PatientStatus.in_service
    visit = models.Visit(patient_id=p.id, started_at=datetime.utcnow())
    db.add(visit)
    db.commit()
    db.refresh(p)
    if p.phone:
        send_sms(p.phone, f"It's your turn now. Please proceed. Ticket: {p.ticket}")
    return {"patient": p, "estimated_wait_minutes": scheduler.estimated_wait(db)}

@router.post("/complete/{ticket}")
def complete_visit(ticket: str, db: Session = Depends(get_db)):
    p = db.query(models.Patient).filter(models.Patient.ticket == ticket).first()
    if not p:
        raise HTTPException(404, "Ticket not found")
    p.status = models.PatientStatus.completed
    # Close the active visit if any
    visit = db.query(models.Visit).filter(models.Visit.patient_id == p.id, models.Visit.ended_at == None).first()
    if visit:
        visit.ended_at = datetime.utcnow()
    db.commit()
    return {"status": "ok"}

@router.get("/queue/estimate", response_model=schemas.NextPatientOut)
def estimate(db: Session = Depends(get_db)):
    return {"patient": None, "estimated_wait_minutes": scheduler.estimated_wait(db)}
