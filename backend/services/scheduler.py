
from sqlalchemy.orm import Session
from .. import models
from .ai import predict_wait_minutes

def queue_snapshot(db: Session):
    return db.query(models.Patient).filter(models.Patient.status == models.PatientStatus.waiting).order_by(
        models.Patient.urgency.desc(), models.Patient.created_at.asc()
    ).all()

def next_patient(db: Session):
    q = queue_snapshot(db)
    return q[0] if q else None

def estimated_wait(db: Session, staff_on_duty: int = 2):
    q = queue_snapshot(db)
    queue_len = len(q)
    return predict_wait_minutes(queue_len, avg_service_minutes=8.0, staff_on_duty=staff_on_duty)
