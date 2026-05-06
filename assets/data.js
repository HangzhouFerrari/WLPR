/**
 * WLPR v2 — Data & Theme Layer
 */

const QBOCC_RAW = 'https://raw.githubusercontent.com/HangzhouFerrari/Q-BOCC/main/';
const GITHUB_USER   = 'HangzhouFerrari';
const GITHUB_REPO   = 'WLPR';
const GITHUB_BRANCH = 'main';
const OWN_RAW = `https://raw.githubusercontent.com/${GITHUB_USER}/${GITHUB_REPO}/${GITHUB_BRANCH}/`;

let WALLPAPERS = { static: [], collections: [], live: [], apk: [] };

async function loadWallpaperData() {
  try {
    const res = await fetch('wallpapers.json?' + Date.now());
    WALLPAPERS = await res.json();
  } catch {
    WALLPAPERS = FALLBACK_DATA;
  }
}

function assetUrl(path) {
  if (!path) return '';
  const isLocal = location.protocol === 'file:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1';
  if (isLocal) return path;
  if (path.startsWith('Library/')) return QBOCC_RAW + encodeURI(path);
  return OWN_RAW + path;
}

function allWallpapers() {
  return [
    ...(WALLPAPERS.static  || []).map(w => ({ ...w, type: 'static'  })),
    ...(WALLPAPERS.live    || []).map(w => ({ ...w, type: 'live'    })),
    ...(WALLPAPERS.apk     || []).map(w => ({ ...w, type: 'apk'     })),
  ];
}

function findById(id) {
  return allWallpapers().find(w => w.id === id) || null;
}

// ── Saved ────────────────────────────────────
function getSaved() {
  try { return JSON.parse(localStorage.getItem('wlpr_saved') || '[]'); }
  catch { return []; }
}
function isSaved(id) { return getSaved().includes(String(id)); }
function toggleSaveById(id) {
  const saved = getSaved();
  const sid = String(id);
  const idx = saved.indexOf(sid);
  if (idx === -1) saved.unshift(sid);
  else saved.splice(idx, 1);
  localStorage.setItem('wlpr_saved', JSON.stringify(saved));
  return idx === -1;
}

// ── Theme ────────────────────────────────────
function getThemePref() { return localStorage.getItem('wlpr_theme') || 'auto'; }
function setThemePref(pref) { localStorage.setItem('wlpr_theme', pref); applyTheme(); }
function applyTheme() {
  const pref = getThemePref();
  const resolved = pref === 'auto'
    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : pref;
  document.documentElement.setAttribute('data-theme', resolved);
  document.querySelectorAll('.theme-opt').forEach(opt => {
    opt.classList.toggle('active', opt.dataset.theme === pref);
  });
}
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  if (getThemePref() === 'auto') applyTheme();
});
// Apply before paint
;(function() {
  const pref = localStorage.getItem('wlpr_theme') || 'auto';
  const resolved = pref === 'auto'
    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : pref;
  document.documentElement.setAttribute('data-theme', resolved);
})();

// ── CSS gradient map ─────────────────────────
const WP_CLASS = {
  s001:'wp-s001',s002:'wp-s002',s003:'wp-s003',s004:'wp-s004',
  s005:'wp-s005',s006:'wp-s006',s007:'wp-s007',s008:'wp-s008',
  s009:'wp-s009',s010:'wp-s010',s011:'wp-s011',s012:'wp-s012',
  l001:'wp-l001',l002:'wp-l002',l003:'wp-l003',
  a001:'wp-a001',a002:'wp-a002',a003:'wp-a003',a004:'wp-a004',a005:'wp-a005',
};

// ── Fallback data ────────────────────────────
const FALLBACK_DATA = {
  static: [
    {id:'s001',title:'ORIGIN WAVE',     category:'abstract',color:'#1a3a5c',accent:'#4fc3f7',tags:['wave','blue','minimal'],      file:'Library/static wallpapers/standard/Origin_wave/cover.png',     new:true,  source:'qbocc'},
    {id:'s002',title:'AQUA RING',        category:'abstract',color:'#0d3349',accent:'#00e5ff',tags:['ring','water','dark'],         file:'Library/static wallpapers/standard/Aqua_ring/cover.png',        new:true,  source:'qbocc'},
    {id:'s003',title:'GOLDEN FIREWORKS', category:'abstract',color:'#1a0e00',accent:'#ffd700',tags:['gold','fireworks','dark'],     file:'Library/static wallpapers/standard/Golden_fireworks/cover.png', new:true,  source:'qbocc'},
    {id:'s004',title:'RED FIREWORKS',    category:'abstract',color:'#1a0000',accent:'#ff4444',tags:['red','fireworks','dark'],      file:'Library/static wallpapers/standard/Red_fireworks/cover.png',    new:false, source:'qbocc'},
    {id:'s005',title:'BLUE FIREWORKS',   category:'abstract',color:'#00143a',accent:'#4488ff',tags:['blue','fireworks','dark'],     file:'Library/static wallpapers/standard/Blue_fireworks/cover.png',   new:false, source:'qbocc'},
    {id:'s006',title:'FLAT MOUNTAIN',    category:'nature',  color:'#2c3e50',accent:'#ecf0f1',tags:['mountain','flat','minimal'],  file:'Library/static wallpapers/standard/Flat_mountain/cover.png',    new:false, source:'qbocc'},
    {id:'s007',title:'GRASSY MOUNTAIN',  category:'nature',  color:'#1a3a1a',accent:'#7ec850',tags:['mountain','green','nature'],  file:'Library/static wallpapers/standard/Grassy_mountain/cover.png',  new:false, source:'qbocc'},
    {id:'s008',title:'SUNSHINE MOUNTAIN',category:'nature',  color:'#ff8c00',accent:'#ffe066',tags:['mountain','sun','warm'],       file:'Library/static wallpapers/standard/Sunshine_mountain/cover.png',new:false, source:'qbocc'},
    {id:'s009',title:'SUNSET MOUNTAIN',  category:'nature',  color:'#3b1a00',accent:'#ff7043',tags:['mountain','sunset','warm'],   file:'Library/static wallpapers/standard/Sunset_mountain/cover.png',  new:false, source:'qbocc'},
    {id:'s010',title:'GOLDEN FESTIVE',   category:'abstract',color:'#1a0e00',accent:'#ffd700',tags:['gold','festive'],             file:'Library/static wallpapers/standard/Golden_festive/cover.png',   new:false, source:'qbocc'},
    {id:'s011',title:'RED FESTIVE',      category:'abstract',color:'#1a0000',accent:'#ff4444',tags:['red','festive'],              file:'Library/static wallpapers/standard/Red_festive/cover.png',      new:false, source:'qbocc'},
    {id:'s012',title:'BLUE FESTIVE',     category:'abstract',color:'#00143a',accent:'#4488ff',tags:['blue','festive'],             file:'Library/static wallpapers/standard/Blue_festive/cover.png',     new:false, source:'qbocc'},
  ],
  collections: [
    {id:'c001',title:'4000 WALLPAPERS',  color:'#111',   accent:'#fff',   count:4000,cover:'Library/static wallpapers/collections/4000_wallpapers/cover.png', source:'qbocc'},
    {id:'c002',title:'SILK',             color:'#f0e0d0',accent:'#c0826a',count:24,  cover:'Library/static wallpapers/collections/Silk/cover.png',             source:'qbocc'},
    {id:'c003',title:'COLOROS ROUNDS',   color:'#1a1a2e',accent:'#6c63ff',count:16,  cover:'Library/static wallpapers/collections/ColorOS_rounds/cover.png',   source:'qbocc'},
    {id:'c004',title:'LIGHT BLOCKS',     color:'#f5f5f5',accent:'#0088ff',count:12,  cover:'Library/static wallpapers/collections/Light_blocks/cover.png',     source:'qbocc'},
    {id:'c005',title:'COLORFUL RADIANCE',color:'#0a0a0a',accent:'#ff6b9d',count:18,  cover:'Library/static wallpapers/collections/Colorful_radiance/cover.png',source:'qbocc'},
    {id:'c006',title:'DESERT',           color:'#8b6914',accent:'#f5deb3',count:8,   cover:'Library/static wallpapers/collections/Desert/cover.png',            source:'qbocc'},
  ],
  live: [
    {id:'l001',title:'PULSE', category:'abstract',color:'#0a0a0a',accent:'#00ff88',tags:['dark','animated'],preview:'wallpapers/live/pulse_preview.jpg', file:'wallpapers/live/pulse.mp4', new:true},
    {id:'l002',title:'FLOW',  category:'abstract',color:'#0d1b2a',accent:'#4cc9f0',tags:['water','blue'],   preview:'wallpapers/live/flow_preview.jpg',  file:'wallpapers/live/flow.mp4',  new:true},
    {id:'l003',title:'BURN',  category:'abstract',color:'#1a0500',accent:'#ff6b35',tags:['fire','warm'],    preview:'wallpapers/live/burn_preview.jpg',  file:'wallpapers/live/burn.mp4',  new:false},
  ],
  apk: [
    {id:'a001',title:'PIXEL RAIN', category:'apk',color:'#050d1a',accent:'#00e5ff',tags:['rain','pixel','dark'],   preview:'wallpapers/apk/pixel_rain_preview.jpg', file:'wallpapers/apk/pixel_rain.apk', new:true, size:'4.2 MB',requires:'Android 8.0+'},
    {id:'a002',title:'EMBER DRIFT',category:'apk',color:'#1a0800',accent:'#ff6b35',tags:['fire','particles'],      preview:'wallpapers/apk/ember_drift_preview.jpg',file:'wallpapers/apk/ember_drift.apk',new:true, size:'3.8 MB',requires:'Android 8.0+'},
    {id:'a003',title:'AURORA',     category:'apk',color:'#020d1a',accent:'#00ff99',tags:['aurora','night','sky'],  preview:'wallpapers/apk/aurora_preview.jpg',      file:'wallpapers/apk/aurora.apk',     new:false,size:'5.1 MB',requires:'Android 9.0+'},
    {id:'a004',title:'INK DROP',   category:'apk',color:'#0a0a0a',accent:'#c084fc',tags:['ink','minimal','purple'],preview:'wallpapers/apk/ink_drop_preview.jpg',    file:'wallpapers/apk/ink_drop.apk',   new:false,size:'2.9 MB',requires:'Android 8.0+'},
    {id:'a005',title:'SAND DUNES', category:'apk',color:'#3d2200',accent:'#f5c842',tags:['desert','sand','warm'],  preview:'wallpapers/apk/sand_dunes_preview.jpg',  file:'wallpapers/apk/sand_dunes.apk', new:false,size:'6.3 MB',requires:'Android 9.0+'},
  ]
};
