
import requests, random

API = "http://localhost:8000"
names = ["Tendai", "Chipo", "Tatenda", "Kuda", "Nyasha", "Farai", "Rufaro", "Simba", "Anesu", "Rudo"]
symptoms = [
    "fever and cough",
    "headache and nausea",
    "chest pain and shortness of breath",
    "fracture in left arm",
    "persistent cough",
    "bleeding from cut",
    "dizziness",
    "stomach pain and nausea",
]

for _ in range(8):
    payload = {
        "name": random.choice(names),
        "phone": "",
        "symptoms": random.choice(symptoms)
    }
    r = requests.post(f"{API}/patients/", json=payload, timeout=5)
    print(r.status_code, r.text)
