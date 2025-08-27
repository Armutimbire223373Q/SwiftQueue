
# Simple triage + wait-time predictor (stub for teammate B to improve)

import math
from typing import List

SYMPTOM_WEIGHTS = {
    "chest pain": 40,
    "shortness of breath": 35,
    "bleeding": 30,
    "unconscious": 100,
    "fever": 10,
    "cough": 5,
    "headache": 8,
    "fracture": 25,
    "nausea": 6,
}

def triage_score(symptoms_text: str | None) -> int:
    if not symptoms_text:
        return 10  # baseline
    s = symptoms_text.lower()
    score = 0
    for key, w in SYMPTOM_WEIGHTS.items():
        if key in s:
            score += w
    # Clamp to 0..100
    return max(0, min(100, score if score > 0 else 15))

def predict_wait_minutes(queue_length: int, avg_service_minutes: float = 8.0, staff_on_duty: int = 2) -> float:
    staff_on_duty = max(1, staff_on_duty)
    # M/M/c-ish very rough estimate: people ahead * service_time / servers
    return max(0.0, (queue_length * avg_service_minutes) / staff_on_duty)
