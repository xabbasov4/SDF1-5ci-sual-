const API_URL = 'http://localhost:3000/api';

document.addEventListener('DOMContentLoaded', () => {
  fetchEvents();
  fetchStats();

  document.getElementById('registration-form').addEventListener('submit', handleRegister);
});

async function fetchEvents() {
  const search = document.getElementById('search-input').value;
  const category = document.getElementById('category-filter').value;
  
  const response = await fetch(`${API_URL}/events?search=${search}&category=${category}`);
  const events = await response.json();
  
  const container = document.getElementById('events-list');
  container.innerHTML = '';

  if (events.length === 0) {
    container.innerHTML = '<p>Heç bir tədbir tapılmadı.</p>';
    return;
  }

  const now = new Date();

  events.forEach(event => {
    const isPast = new Date(event.event_date) < now;
    const card = document.createElement('div');
    card.className = `event-card ${isPast ? 'past' : ''}`;
    
    card.innerHTML = `
      <span class="badge ${isPast ? 'past-badge' : ''}">${isPast ? 'Keçmiş' : 'Gələcək'}</span>
      <h4>${event.title}</h4>
      <p><strong>Kateqoriya:</strong> ${event.category_name || 'Ümumi'}</p>
      <p><strong>Tarix:</strong> ${new Date(event.event_date).toLocaleString('az-AZ')}</p>
      <p><strong>Məkan:</strong> ${event.location}</p>
      <p><strong>Qeydiyyat:</strong> ${event.registered_count} / ${event.max_capacity}</p>
      ${!isPast && event.registered_count < event.max_capacity 
        ? `<button onclick="selectEventForReg(${event.id}, '${event.title}')">Qeydiyyatdan keç</button>` 
        : `<button disabled style="background:#ccc;">${isPast ? 'Tədbir bitib' : 'Limit dolub'}</button>`}
    `;
    container.appendChild(card);
  });
}

async function fetchStats() {
  const res = await fetch(`${API_URL}/stats`);
  const data = await res.json();
  document.getElementById('stat-total-events').innerText = data.totalEvents;
  document.getElementById('stat-total-regs').innerText = data.totalRegistrations;
}

function selectEventForReg(id, title) {
  document.getElementById('reg-event-id').value = id;
  document.getElementById('selected-event-title').innerText = `Seçilmiş tədbir: ${title}`;
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

async function handleRegister(e) {
  e.preventDefault();
  const event_id = document.getElementById('reg-event-id').value;
  const full_name = document.getElementById('reg-name').value;
  const email = document.getElementById('reg-email').value;

  if (!event_id) {
    alert('Zəhmət olmasa siyahıdan tədbir seçin.');
    return;
  }

  const res = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event_id, full_name, email })
  });

  const data = await res.json();
  if (res.ok) {
    alert(data.message);
    document.getElementById('registration-form').reset();
    document.getElementById('selected-event-title').innerText = '';
    fetchEvents();
    fetchStats();
  } else {
    alert(`Xəta: ${data.error}`);
  }
}