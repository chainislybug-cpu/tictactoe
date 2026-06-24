import * as THREE from 'three';

const canvas = document.getElementById('peak-canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(240, 160);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x000000, 0);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(42, 240 / 160, 0.1, 100);
camera.position.set(0, 1.2, 5);
camera.lookAt(0, 0.4, 0);

const ambient = new THREE.AmbientLight(0x334466, 1.5);
const sun = new THREE.DirectionalLight(0xffffff, 2.5);
sun.position.set(3, 5, 3);
const fill = new THREE.DirectionalLight(0x224488, 0.6);
fill.position.set(-3, 2, -2);
scene.add(ambient, sun, fill);

let meshGroup = null;
let animId = null;

function seededVal(seed) {
  const x = Math.sin(seed + 7.3) * 43758.5453;
  return x - Math.floor(x);
}

function buildMesh(peak) {
  if (meshGroup) {
    scene.remove(meshGroup);
    meshGroup.traverse(c => {
      if (c.isMesh) { c.geometry.dispose(); c.material.dispose(); }
    });
  }

  meshGroup = new THREE.Group();

  const elevNorm = Math.max(0, Math.min(1, (peak.elevation - 800) / (4634 - 800)));
  const height = 0.9 + elevNorm * 1.4;
  const radSegs = 5 + (peak.id % 4);

  // Main mountain body
  const geo = new THREE.ConeGeometry(1.0, height, radSegs, 1);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i);
    if (y > height * 0.15) {
      const frac = (y - height * 0.15) / (height * 0.85);
      const jitter = seededVal(peak.id * 13 + i) * 0.12 * frac;
      pos.setX(i, pos.getX(i) + (seededVal(peak.id + i) - 0.5) * jitter);
      pos.setZ(i, pos.getZ(i) + (seededVal(peak.id * 2 + i) - 0.5) * jitter);
    }
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();

  let bodyColor;
  if (elevNorm > 0.72) bodyColor = 0xa0a8b8;
  else if (elevNorm > 0.45) bodyColor = 0x7a6e62;
  else if (elevNorm > 0.25) bodyColor = 0x6a7858;
  else bodyColor = 0x5a6e48;

  const mat = new THREE.MeshLambertMaterial({ color: bodyColor, flatShading: true });
  const body = new THREE.Mesh(geo, mat);
  body.position.y = -height / 2 + 0.1;
  meshGroup.add(body);

  // Snow cap for peaks above 2400m
  if (peak.elevation > 2400) {
    const snowFrac = Math.min(1, (peak.elevation - 2400) / 2200);
    const snowR = 0.28 + snowFrac * 0.18;
    const snowH = 0.22 + snowFrac * 0.18;
    const snowGeo = new THREE.ConeGeometry(snowR, snowH, radSegs, 1);
    const snowMat = new THREE.MeshLambertMaterial({ color: 0xe8eef5, flatShading: true });
    const snow = new THREE.Mesh(snowGeo, snowMat);
    snow.position.y = body.position.y + height / 2 - snowH * 0.3;
    meshGroup.add(snow);
  }

  // Small base plane
  const baseGeo = new THREE.CylinderGeometry(1.3, 1.3, 0.05, 16);
  const baseMat = new THREE.MeshLambertMaterial({ color: 0x1a2a1a });
  const base = new THREE.Mesh(baseGeo, baseMat);
  base.position.y = body.position.y - height / 2;
  meshGroup.add(base);

  scene.add(meshGroup);
}

function stars(n) {
  return '★'.repeat(n) + '☆'.repeat(5 - n);
}

const CANTON_NAMES = {
  AG:'Aargau', AI:'Appenzell Innerrhoden', AR:'Appenzell Ausserrhoden',
  BE:'Bern', BL:'Basel-Landschaft', BS:'Basel-Stadt', FR:'Fribourg',
  GE:'Geneva', GL:'Glarus', GR:'Graubünden', JU:'Jura', LU:'Lucerne',
  NE:'Neuchâtel', NW:'Nidwalden', OW:'Obwalden', SG:'St. Gallen',
  SH:'Schaffhausen', SO:'Solothurn', SZ:'Schwyz', TG:'Thurgau',
  TI:'Ticino', UR:'Uri', VD:'Vaud', VS:'Valais', ZG:'Zug', ZH:'Zürich'
};

function updateCard(peak) {
  document.getElementById('peak-name').textContent = peak.name;
  document.getElementById('peak-canton').textContent = CANTON_NAMES[peak.canton] || peak.canton;
  document.getElementById('si-elev').textContent = peak.elevation.toLocaleString() + ' m';
  document.getElementById('si-prom').textContent = peak.prominence.toLocaleString() + ' m';
  document.getElementById('si-isol').textContent = peak.isolation + ' km';
  document.getElementById('si-canton').textContent = peak.canton;
  document.getElementById('si-diff').textContent = stars(peak.difficulty);
  document.getElementById('si-beauty').textContent = stars(peak.beauty);
  document.getElementById('si-nature').textContent = stars(peak.nature);
  const tagEl = document.getElementById('si-tags');
  tagEl.innerHTML = peak.tags.map(t => `<span class="peak-tag">${t}</span>`).join('');
}

function positionCard(x, y) {
  const card = document.getElementById('peak-card');
  const w = 240, h = 380;
  const vw = window.innerWidth, vh = window.innerHeight;
  let left = x + 18;
  let top = y - h / 2;
  if (left + w > vw - 10) left = x - w - 18;
  if (top < 10) top = 10;
  if (top + h > vh - 10) top = vh - h - 10;
  card.style.left = left + 'px';
  card.style.top = top + 'px';
}

function animate() {
  animId = requestAnimationFrame(animate);
  if (meshGroup) meshGroup.rotation.y += 0.009;
  renderer.render(scene, camera);
}

export function showPeakCard(peak, clientX, clientY) {
  buildMesh(peak);
  updateCard(peak);
  positionCard(clientX, clientY);
  document.getElementById('peak-card').style.display = 'block';
  if (!animId) animate();
}

export function hidePeakCard() {
  document.getElementById('peak-card').style.display = 'none';
  if (animId) { cancelAnimationFrame(animId); animId = null; }
}
