import { showPeakCard, hidePeakCard } from './peak-card.js';

const CANTON_GEOJSON_URL = 'https://raw.githubusercontent.com/empet/Datasets/master/GeoJSON-data/swiss-cantons.geojson';
const CANTON_BACKUP_URL  = 'https://raw.githubusercontent.com/altomani/switzerland/master/cantons.geojson';

const TAGS = ['glacier','rocky','protected reserve','panoramic views','remote','via ferrata','ski resort nearby','forest','lake nearby'];

// ── STATE ────────────────────────────────────────────────────────────────────
const STATE = {
  filters: {
    elev:   [0, 5000],
    prom:   [0, 5000],
    isol:   [0, 600],
    diff:   [1, 5],
    beauty: [1, 5],
    nature: [1, 5],
    tags:   [],
    tagMode: 'any'
  }
};

// ── MAP INIT ─────────────────────────────────────────────────────────────────
const map = L.map('map', { zoomControl: true }).setView([46.8182, 8.2275], 8);

L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
  subdomains: 'abcd',
  maxZoom: 19
}).addTo(map);

// ── CANTON GEOJSON ───────────────────────────────────────────────────────────
async function loadCantons() {
  const urls = [CANTON_GEOJSON_URL, CANTON_BACKUP_URL];
  for (const url of urls) {
    try {
      const res = await fetch(url);
      if (!res.ok) continue;
      const data = await res.json();
      L.geoJSON(data, {
        style: { color: '#4fc3f7', weight: 1.5, fillOpacity: 0.04, fillColor: '#4fc3f7' },
        onEachFeature(feature, layer) {
          const name = feature.properties.name || feature.properties.NAME || feature.properties.KANTONSNAME || '';
          if (name) layer.bindTooltip(name, { sticky: true, className: 'canton-tip' });
        }
      }).addTo(map);
      return;
    } catch (_) {}
  }
  // Silent fail — map still works without canton outlines
}
loadCantons();

// ── ICONS ────────────────────────────────────────────────────────────────────
const dotIcon = L.divIcon({ className: 'peak-dot', iconSize: [6, 6], iconAnchor: [3, 3] });

const GLOW_ICONS = [1,2,3,4,5].map(d => {
  const hue = Math.round(120 - (d - 1) * 30);
  return L.divIcon({
    className: 'peak-glow-wrap',
    html: `<div class="peak-glow-inner" style="color:hsl(${hue},100%,55%);background:hsl(${hue},100%,55%)"></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7]
  });
});

// ── BUILD MARKERS ────────────────────────────────────────────────────────────
const markers = [];

window.MOUNTAINS.forEach((m, i) => {
  const marker = L.marker([m.lat, m.lng], { icon: dotIcon });

  marker.on('mouseover', e => {
    showPeakCard(m, e.originalEvent.clientX, e.originalEvent.clientY);
  });
  marker.on('mouseout', () => hidePeakCard());
  marker.on('mousemove', e => {
    // Reposition card as mouse moves over the marker
    const card = document.getElementById('peak-card');
    if (card.style.display === 'block') {
      const w = 240, h = 380;
      const vw = window.innerWidth, vh = window.innerHeight;
      let left = e.originalEvent.clientX + 18;
      let top  = e.originalEvent.clientY - h / 2;
      if (left + w > vw - 10) left = e.originalEvent.clientX - w - 18;
      if (top < 10) top = 10;
      if (top + h > vh - 10) top = vh - h - 10;
      card.style.left = left + 'px';
      card.style.top  = top  + 'px';
    }
  });

  marker.addTo(map);
  markers.push(marker);
});

updateCount(window.MOUNTAINS.length);

// ── TAG CHECKBOXES ────────────────────────────────────────────────────────────
const tagsGrid = document.getElementById('tags-grid');
TAGS.forEach(tag => {
  const el = document.createElement('label');
  el.className = 'tag-check';
  el.innerHTML = `<input type="checkbox" value="${tag}"><span class="tag-dot"></span>${tag}`;
  el.querySelector('input').addEventListener('change', e => {
    el.classList.toggle('checked', e.target.checked);
    const active = [...tagsGrid.querySelectorAll('input:checked')].map(x => x.value);
    STATE.filters.tags = active;
    scheduleFilter();
  });
  tagsGrid.appendChild(el);
});

// ── SLIDER WIRING ─────────────────────────────────────────────────────────────
const SLIDER_DEFS = [
  { key:'elev',   minId:'elev-min',   maxId:'elev-max',   valId:'val-elev',   unit:'m',  fmt: v => v.toLocaleString() },
  { key:'prom',   minId:'prom-min',   maxId:'prom-max',   valId:'val-prom',   unit:'m',  fmt: v => v.toLocaleString() },
  { key:'isol',   minId:'isol-min',   maxId:'isol-max',   valId:'val-isol',   unit:'km', fmt: v => v },
  { key:'diff',   minId:'diff-min',   maxId:'diff-max',   valId:'val-diff',   unit:'',   fmt: v => v },
  { key:'beauty', minId:'beauty-min', maxId:'beauty-max', valId:'val-beauty', unit:'',   fmt: v => v },
  { key:'nature', minId:'nature-min', maxId:'nature-max', valId:'val-nature', unit:'',   fmt: v => v },
];

SLIDER_DEFS.forEach(({ key, minId, maxId, valId, unit, fmt }) => {
  const minEl = document.getElementById(minId);
  const maxEl = document.getElementById(maxId);
  const valEl = document.getElementById(valId);

  function sync() {
    let lo = +minEl.value, hi = +maxEl.value;
    if (lo > hi) { [lo, hi] = [hi, lo]; minEl.value = lo; maxEl.value = hi; }
    STATE.filters[key] = [lo, hi];
    const sep = unit ? ` – ` : ' – ';
    valEl.textContent = `${fmt(lo)}${unit}${sep}${fmt(hi)}${unit}`;
    scheduleFilter();
  }

  minEl.addEventListener('input', sync);
  maxEl.addEventListener('input', sync);
});

// ── TAG MODE ──────────────────────────────────────────────────────────────────
window.setTagMode = function(mode) {
  STATE.filters.tagMode = mode;
  document.getElementById('tag-mode-any').classList.toggle('active', mode === 'any');
  document.getElementById('tag-mode-all').classList.toggle('active', mode === 'all');
  scheduleFilter();
};

// ── FILTER LOGIC ──────────────────────────────────────────────────────────────
let filterRaf = null;
function scheduleFilter() {
  if (filterRaf) cancelAnimationFrame(filterRaf);
  filterRaf = requestAnimationFrame(applyFilters);
}

function matchesTags(m, tags, mode) {
  if (!tags.length) return true;
  if (mode === 'all') return tags.every(t => m.tags.includes(t));
  return tags.some(t => m.tags.includes(t));
}

function isDefault(f) {
  return f.elev[0] === 0 && f.elev[1] === 5000 &&
    f.prom[0] === 0 && f.prom[1] === 5000 &&
    f.isol[0] === 0 && f.isol[1] === 600 &&
    f.diff[0] === 1 && f.diff[1] === 5 &&
    f.beauty[0] === 1 && f.beauty[1] === 5 &&
    f.nature[0] === 1 && f.nature[1] === 5 &&
    f.tags.length === 0;
}

function applyFilters() {
  const f = STATE.filters;
  let count = 0;

  if (isDefault(f)) {
    markers.forEach(mk => { mk.setOpacity(1); mk.setIcon(dotIcon); });
    count = window.MOUNTAINS.length;
  } else {
    window.MOUNTAINS.forEach((m, i) => {
      const passes =
        m.elevation  >= f.elev[0]   && m.elevation  <= f.elev[1] &&
        m.prominence >= f.prom[0]   && m.prominence <= f.prom[1] &&
        m.isolation  >= f.isol[0]   && m.isolation  <= f.isol[1] &&
        m.difficulty >= f.diff[0]   && m.difficulty <= f.diff[1] &&
        m.beauty     >= f.beauty[0] && m.beauty     <= f.beauty[1] &&
        m.nature     >= f.nature[0] && m.nature     <= f.nature[1] &&
        matchesTags(m, f.tags, f.tagMode);

      if (passes) {
        markers[i].setOpacity(1);
        markers[i].setIcon(GLOW_ICONS[m.difficulty - 1]);
        count++;
      } else {
        markers[i].setOpacity(0.06);
        markers[i].setIcon(dotIcon);
      }
    });
  }

  updateCount(count);
}

function updateCount(n) {
  document.getElementById('filter-count').textContent =
    `${n.toLocaleString()} of ${window.MOUNTAINS.length.toLocaleString()} mountains match`;
}

// ── RESET ─────────────────────────────────────────────────────────────────────
window.resetFilters = function() {
  document.getElementById('elev-min').value   = 0;
  document.getElementById('elev-max').value   = 5000;
  document.getElementById('prom-min').value   = 0;
  document.getElementById('prom-max').value   = 5000;
  document.getElementById('isol-min').value   = 0;
  document.getElementById('isol-max').value   = 600;
  document.getElementById('diff-min').value   = 1;
  document.getElementById('diff-max').value   = 5;
  document.getElementById('beauty-min').value = 1;
  document.getElementById('beauty-max').value = 5;
  document.getElementById('nature-min').value = 1;
  document.getElementById('nature-max').value = 5;

  document.getElementById('val-elev').textContent   = '0m – 5,000m';
  document.getElementById('val-prom').textContent   = '0m – 5,000m';
  document.getElementById('val-isol').textContent   = '0km – 600km';
  document.getElementById('val-diff').textContent   = '1 – 5';
  document.getElementById('val-beauty').textContent = '1 – 5';
  document.getElementById('val-nature').textContent = '1 – 5';

  tagsGrid.querySelectorAll('input').forEach(x => { x.checked = false; });
  tagsGrid.querySelectorAll('.tag-check').forEach(x => x.classList.remove('checked'));

  STATE.filters = {
    elev: [0,5000], prom: [0,5000], isol: [0,600],
    diff: [1,5], beauty: [1,5], nature: [1,5],
    tags: [], tagMode: STATE.filters.tagMode
  };

  applyFilters();
};
