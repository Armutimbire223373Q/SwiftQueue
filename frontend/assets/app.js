
const API = 'http://localhost:8000';

async function post(path, data){
  const res = await fetch(API + path, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  });
  return res.json();
}

async function get(path){
  const res = await fetch(API + path);
  return res.json();
}

document.getElementById('checkin-form').addEventListener('submit', async (e)=>{
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const symptoms = document.getElementById('symptoms').value.trim();
  const data = await post('/patients/', {name, phone, symptoms});
  document.getElementById('ticket').textContent = `Ticket: ${data.ticket}\nUrgency: ${data.urgency}\nStatus: ${data.status}`;
  await loadQueue();
  e.target.reset();
});

async function loadQueue(){
  const q = await get('/patients/queue');
  const ul = document.getElementById('queue');
  ul.innerHTML = '';
  q.forEach(item=>{
    const li = document.createElement('li');
    li.textContent = `${item.ticket} — ${item.name} — urgency ${item.urgency} — ${item.status}`;
    ul.appendChild(li);
  });
}
document.getElementById('refresh-queue').addEventListener('click', loadQueue);
loadQueue();

document.getElementById('call-next').addEventListener('click', async ()=>{
  const res = await post('/staff/next', {});
  const out = document.getElementById('staff-output');
  if(!res.patient){
    out.textContent = 'No patients waiting.';
  }else{
    out.textContent = `Calling: ${res.patient.ticket} — ${res.patient.name}\nNew estimated wait: ${res.estimated_wait_minutes.toFixed(1)} min`;
  }
  await loadQueue();
});

document.getElementById('estimate').addEventListener('click', async ()=>{
  const res = await get('/staff/queue/estimate');
  document.getElementById('staff-output').textContent = `Estimated wait: ${res.estimated_wait_minutes.toFixed(1)} minutes`;
});
