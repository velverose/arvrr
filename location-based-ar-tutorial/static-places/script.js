// ЗАМЕНИТЕ координаты на точку рядом с вами (latlong.net)
const PLACE = { latitude: 41.892590, longitude: 12.489820 };

// Для каждой модели свои размер, поворот и цвет (аналог «конфигурации» из статьи)
const MODELS = [
  { info: 'Куб',   tag: 'a-box',    attrs: { color: '#e53935', width: 1, height: 1, depth: 1 }, scale: '8 8 8' },
  { info: 'Сфера', tag: 'a-sphere', attrs: { color: '#1e88e5', radius: 0.7 },                   scale: '8 8 8' },
  { info: 'Конус', tag: 'a-cone',   attrs: { color: '#43a047', 'radius-bottom': 0.7, height: 1.5 }, scale: '8 8 8' }
];

let modelIndex = 0;

function createEntity(model) {
  const el = document.createElement(model.tag);
  Object.entries(model.attrs).forEach(([k, v]) => el.setAttribute(k, v));
  el.setAttribute('scale', model.scale);
  el.setAttribute('gps-new-entity-place',
    `latitude: ${PLACE.latitude}; longitude: ${PLACE.longitude}`);
  el.setAttribute('animation',
    'property: rotation; to: 0 360 0; dur: 8000; easing: linear; loop: true');
  el.setAttribute('data-model', 'true');
  return el;
}

function setModel() {
  const scene = document.querySelector('a-scene');
  const old = document.querySelector('[data-model]');
  if (old) old.remove();

  const model = MODELS[modelIndex];
  scene.appendChild(createEntity(model));
  document.getElementById('title').textContent = 'Фигура: ' + model.info;
}

window.onload = () => {
  setModel();
  document.querySelector('[data-action="change"]').addEventListener('click', () => {
    modelIndex = (modelIndex + 1) % MODELS.length;
    setModel();
  });
};
