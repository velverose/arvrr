// Вместо Foursquare (нужны CLIENT ID/SECRET) используем OpenStreetMap Overpass: ключи не нужны.
const RADIUS = 400;   // метры
const LIMIT = 15;

function setStatus(t) { document.getElementById('status').textContent = t; }

async function fetchPlaces(lat, lon) {
  const q = `[out:json][timeout:20];
    node(around:${RADIUS},${lat},${lon})["name"]["amenity"];
    out ${LIMIT};`;
  const res = await fetch('https://overpass-api.de/api/interpreter?data=' + encodeURIComponent(q));
  if (!res.ok) throw new Error('HTTP ' + res.status);
  return (await res.json()).elements;
}

function renderPlaces(places) {
  const scene = document.querySelector('a-scene');
  places.forEach(p => {
    // a-link показывает название; по клику откроет карту места в OSM
    const link = document.createElement('a-link');
    link.setAttribute('gps-new-entity-place', `latitude: ${p.lat}; longitude: ${p.lon}`);
    link.setAttribute('title', p.tags.name);
    link.setAttribute('href', `https://www.openstreetmap.org/node/${p.id}`);
    link.setAttribute('scale', '15 15 15');
    scene.appendChild(link);
  });
}

let started = false;
window.addEventListener('load', () => {
  document.getElementById('cam').addEventListener('gps-camera-update-position', async (e) => {
    if (started) return;
    started = true;
    const { latitude, longitude } = e.detail.position;
    try {
      const places = await fetchPlaces(latitude, longitude);
      renderPlaces(places);
      setStatus(`Мест рядом: ${places.length}. Смотрите вокруг.`);
    } catch (err) {
      setStatus('Не удалось загрузить места: ' + err.message);
    }
  });
});
