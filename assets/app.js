/**
 * WLPR v2 — App Logic
 */

// ── Nav ──────────────────────────────────────
function renderNav(active) {
  const nav = document.querySelector('.bottom-nav');
  if (!nav) return;
  const items = [
    {href:'index.html',    key:'home',   svgFill:true,  d:'<path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>'},
    {href:'browse.html',   key:'browse', svgFill:false, d:'<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>'},
    {href:'saved.html',    key:'saved',  svgFill:false, d:'<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>'},
    {href:'settings.html', key:'more',   svgFill:false, d:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>'},
  ];
  nav.innerHTML = items.map(item => {
    const isActive = item.key === active;
    const fill = item.svgFill && isActive ? 'currentColor' : 'none';
    const stroke = item.svgFill && isActive ? 'none' : 'currentColor';
    return `<a href="${item.href}" class="nav-item${isActive?' active':''}">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="${fill}" stroke="${stroke}" stroke-width="2">${item.d}</svg>
      <span>${t(item.key)}</span>
    </a>`;
  }).join('');
}

// ── Card builders ────────────────────────────
function buildCardSm(w) {
  const isLive = w.type==='live', isApk = w.type==='apk';
  const imgSrc = (isLive||isApk) ? (w.preview||'') : (w.file||'');
  const css = WP_CLASS[w.id]||'';
  const el = document.createElement('div');
  el.className = 'card-sm';
  el.onclick = () => location.href = 'detail.html?id=' + w.id;
  el.innerHTML = `
    <div class="card-sm-thumb ${css}">
      ${imgSrc?`<img src="${assetUrl(imgSrc)}" alt="${w.title}" loading="lazy" onerror="this.style.display='none'">`:''}
      ${isLive?`<div class="pill pill-live"><span class="live-dot"></span>LIVE</div>`:''}
      ${isApk ?`<div class="pill pill-apk">APK</div>`:''}
      ${w.new ?`<div class="pill pill-new">${t('new')}</div>`:''}
    </div>
    <div class="card-sm-info">
      <div class="card-sm-title">${w.title}</div>
      <div class="card-sm-cat">${isApk?t('type_apk'):w.category?.toUpperCase()}</div>
      ${isApk&&w.size?`<div class="card-apk-size">${w.size}</div>`:''}
    </div>`;
  return el;
}

function buildCardGrid(w, cols) {
  const isLive = w.type==='live', isApk = w.type==='apk';
  const imgSrc = (isLive||isApk) ? (w.preview||'') : (w.file||'');
  const css = WP_CLASS[w.id]||'';
  const el = document.createElement('div');
  el.className = 'card-grid ' + css;
  if (cols===3) el.style.aspectRatio = '9/16';
  el.onclick = () => location.href = 'detail.html?id=' + w.id;
  el.innerHTML = `
    ${imgSrc?`<img src="${assetUrl(imgSrc)}" alt="${w.title}" loading="lazy" onerror="this.style.display='none'">`:''}
    <div class="card-grid-overlay"><div class="card-grid-title">${w.title}</div></div>
    ${isLive?`<div class="pill pill-live"><span class="live-dot"></span>LIVE</div>`:''}
    ${isApk ?`<div class="pill pill-apk">APK</div>`:''}
    ${w.new ?`<div class="pill pill-new">${t('new')}</div>`:''}`;
  return el;
}

function buildCollectionCard(c) {
  const el = document.createElement('div');
  el.className = 'collection-card';
  el.onclick = () => location.href = 'collection.html?id=' + c.id;
  el.innerHTML = `
    <div class="collection-thumb">
      <img src="${assetUrl(c.cover)}" alt="${c.title}" loading="lazy" onerror="this.style.display='none'">
    </div>
    <div class="collection-info">
      <div class="collection-badge-text">${t('collection')}</div>
      <div class="collection-title">${c.title}</div>
      <div class="card-apk-size">${t('collection_items', c.count)}</div>
    </div>`;
  return el;
}

// ── Page in animation ────────────────────────
function pageIn() {
  const wrap = document.querySelector('.page-wrap');
  if (!wrap) return;
  requestAnimationFrame(() => requestAnimationFrame(() => wrap.classList.add('visible')));
}

const RTL_LANGS = ['ar', 'he', 'fa', 'ur'];

function applyDir() {
  const lang = getLang();
  const isRtl = RTL_LANGS.includes(lang);
  document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
  document.documentElement.setAttribute('lang', lang);
}

function translatePage() {
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => { el.placeholder = t(el.dataset.i18nPh); });
  applyDir();
}

function getGridCols() { return parseInt(localStorage.getItem('wlpr_cols') || '2'); }

// ── HOME ─────────────────────────────────────
async function initHomePage() {
  applyTheme();
  await loadWallpaperData();
  renderNav('home');
  pageIn();
  renderHero();
  renderHomeSection('newDrops',   allWallpapers().filter(w=>w.new).slice(0,8));
  renderHomeSection('liveSection',WALLPAPERS.live.map(w=>({...w,type:'live'})));
  renderHomeSection('apkSection', WALLPAPERS.apk.map(w=>({...w,type:'apk'})));
  renderCollections();
  renderHomeGrid('all');
  initHomeTabs();
  translatePage();
}

let _heroIndex = 0, _heroItems = [];

function renderHero() {
  const banner = document.getElementById('heroBanner');
  if (!banner) return;
  _heroItems = allWallpapers().filter(w=>w.new).slice(0,6);
  if (!_heroItems.length) _heroItems = allWallpapers().slice(0,3);
  const dots = document.getElementById('heroDots');

  function update(animate) {
    const w = _heroItems[_heroIndex];
    const css = WP_CLASS[w.id]||'';
    const imgSrc = (w.type==='live'||w.type==='apk') ? (w.preview||'') : (w.file||'');
    const grad = document.getElementById('heroBgGradient');
    if (grad) grad.className = 'hero-bg-gradient ' + css;
    const img = document.getElementById('heroBgImg');
    if (img && imgSrc) {
      if (animate) { img.style.opacity='0'; setTimeout(()=>{ img.src=assetUrl(imgSrc); img.style.opacity='1'; img.style.transition='opacity 0.4s'; }, 200); }
      else { img.src = assetUrl(imgSrc); }
    }
    const titleEl = document.getElementById('heroTitle');
    const subEl   = document.getElementById('heroSub');
    if (titleEl) {
      if (animate) { titleEl.style.opacity='0'; setTimeout(()=>{ titleEl.textContent=w.title; titleEl.style.opacity='1'; },200); }
      else titleEl.textContent = w.title;
    }
    if (subEl) subEl.textContent = `${w.category?.toUpperCase()} · ${w.type.toUpperCase()}`;
    if (dots) {
      dots.innerHTML='';
      _heroItems.forEach((_,i)=>{
        const d=document.createElement('div');
        d.className='hero-dot'+(i===_heroIndex?' active':'');
        dots.appendChild(d);
      });
    }
    banner.onclick = () => location.href = 'detail.html?id=' + w.id;
  }
  update(false);

  let sx=0;
  banner.addEventListener('touchstart', e => { sx=e.touches[0].clientX; }, {passive:true});
  banner.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx)>40) {
      _heroIndex = dx<0 ? (_heroIndex+1)%_heroItems.length : (_heroIndex-1+_heroItems.length)%_heroItems.length;
      update(true);
    }
  });
  setInterval(()=>{ _heroIndex=(_heroIndex+1)%_heroItems.length; update(true); }, 4500);
}

function renderHomeSection(id, items) {
  const el = document.getElementById(id);
  if (!el) return;
  items.forEach(w => el.appendChild(buildCardSm(w)));
}

function renderCollections() {
  const el = document.getElementById('collectionsRow');
  if (!el) return;
  (WALLPAPERS.collections||[]).forEach(c => el.appendChild(buildCollectionCard(c)));
}

function renderHomeGrid(filter) {
  const el = document.getElementById('browseGrid');
  if (!el) return;
  el.innerHTML = '';
  const cols = getGridCols();
  el.className = cols===3 ? 'grid-3col' : 'grid-2col';
  let items = allWallpapers();
  if (filter==='static') items = items.filter(w=>w.type==='static');
  else if (filter==='live') items = items.filter(w=>w.type==='live');
  else if (filter==='apk')  items = items.filter(w=>w.type==='apk');
  items.slice(0,8).forEach(w => el.appendChild(buildCardGrid(w, cols)));
}

function initHomeTabs() {
  // Use event delegation so tabs work regardless of DOM order / page-wrap opacity
  document.addEventListener('click', function tabHandler(e) {
    const tab = e.target.closest('.tabs-bar .tab');
    if (!tab) return;
    document.querySelectorAll('.tabs-bar .tab').forEach(t2 => t2.classList.remove('active'));
    tab.classList.add('active');
    renderHomeGrid(tab.dataset.tab);
  });
}

// ── BROWSE ───────────────────────────────────
async function initBrowsePage() {
  applyTheme();
  await loadWallpaperData();
  renderNav('browse');
  pageIn();
  const params = new URLSearchParams(location.search);
  const pre = params.get('filter') || params.get('type') || params.get('collection') || 'all';
  renderFiltered(pre);
  initFilterPills(pre);
  translatePage();
}

function renderFiltered(filter) {
  const grid  = document.getElementById('browseGrid');
  const label = document.getElementById('countLabel');
  if (!grid) return;
  grid.innerHTML = '';
  const cols = getGridCols();
  grid.className = cols===3 ? 'grid-3col' : 'grid-2col';
  let items = allWallpapers();
  if (filter==='static')   items = items.filter(w=>w.type==='static');
  else if (filter==='live') items = items.filter(w=>w.type==='live');
  else if (filter==='apk')  items = items.filter(w=>w.type==='apk');
  else if (filter==='abstract') items = items.filter(w=>w.category==='abstract');
  else if (filter==='nature')   items = items.filter(w=>w.category==='nature');
  else if (filter==='new')  items = items.filter(w=>w.new);
  else if (filter && filter.startsWith('c')) {
    // collection filter — show all items tagged with that collection
    const col = (WALLPAPERS.collections||[]).find(c=>c.id===filter);
    // fallback: show all static from qbocc for now
    items = items.filter(w=>w.source==='qbocc');
  }
  items.forEach(w => grid.appendChild(buildCardGrid(w, cols)));
  if (label) label.textContent = t('wallpaper_count', items.length);
}

function initFilterPills(active) {
  document.querySelectorAll('.filter-pill').forEach(pill => {
    if (pill.dataset.filter===active) pill.classList.add('active');
    pill.addEventListener('click', () => {
      document.querySelectorAll('.filter-pill').forEach(p=>p.classList.remove('active'));
      pill.classList.add('active');
      renderFiltered(pill.dataset.filter);
    });
  });
}

// ── DETAIL ───────────────────────────────────
let _detailId = null;
let _detailW  = null;

async function initDetailPage() {
  applyTheme();
  await loadWallpaperData();
  const id = new URLSearchParams(location.search).get('id');
  if (!id) { history.back(); return; }
  const w = findById(id);
  if (!w) { history.back(); return; }
  _detailId = id;
  _detailW  = w;
  renderDetail(w);
  updateSaveBtn(id);
  initDetailPanel();
  translatePage();
}

function renderDetail(w) {
  const isApk  = w.type==='apk';
  const isLive = w.type==='live';
  const imgSrc = (isApk||isLive) ? (w.preview||'') : (w.file||'');
  const css    = WP_CLASS[w.id]||'';

  document.getElementById('detailBg')?.classList.add(css);
  const img = document.getElementById('detailImg');
  if (img && imgSrc) { img.src=assetUrl(imgSrc); img.onerror=()=>img.style.display='none'; }

  const badge = document.getElementById('typeBadge');
  if (badge) {
    if (isApk) {
      badge.style.display = 'inline-flex';
      // pill class but override position:absolute since badge is now in-flow
      badge.style.cssText = 'display:inline-flex;align-self:flex-start;background:rgba(0,0,0,0.7);border:1px solid rgba(108,99,255,0.5);color:#c084fc;font-family:"Space Mono",monospace;font-size:0.5rem;letter-spacing:2px;padding:2px 6px;border-radius:2px;align-items:center;gap:4px;height:18px;margin-bottom:-4px';
      badge.innerHTML = 'APK';
    } else if (isLive) {
      badge.style.cssText = 'display:inline-flex;align-self:flex-start;background:rgba(0,0,0,0.65);border:1px solid rgba(255,255,255,0.15);color:#fff;font-family:"Space Mono",monospace;font-size:0.5rem;letter-spacing:2px;padding:2px 6px;border-radius:2px;align-items:center;gap:4px;height:18px;margin-bottom:-4px';
      badge.innerHTML = '<span class="live-dot"></span>LIVE';
    }
  }

  // Panel content
  const titleEl  = document.getElementById('panelTitle');
  const metaEl   = document.getElementById('panelMeta');
  const swatchEl = document.getElementById('colorSwatch');
  const tagRow   = document.getElementById('tagRow');
  const dlBtn    = document.getElementById('downloadBtn');

  if (titleEl) titleEl.textContent = w.title;
  if (metaEl)  metaEl.textContent  = isApk ? t('type_apk') : isLive ? t('type_live') : t('type_static');
  if (swatchEl) swatchEl.style.background = w.color||'#111';

  if (tagRow) {
    tagRow.innerHTML = '';
    if (w.new) { const tg=document.createElement('span'); tg.className='tag active'; tg.textContent=t('new'); tagRow.appendChild(tg); }
    (w.tags||[]).forEach(tag => {
      const tg=document.createElement('span'); tg.className='tag'; tg.textContent=tag.toUpperCase();
      tg.onclick=()=>location.href=`browse.html?filter=${tag}`; tagRow.appendChild(tg);
    });
  }

  // Download button — uses fetch blob for cross-origin images
  if (dlBtn) {
    dlBtn.querySelector('span').textContent = isApk ? t('install_apk') : t('download');
    dlBtn.onclick = async (e) => {
      e.preventDefault();
      const url = assetUrl(w.file || imgSrc || '');
      if (!url) return;
      dlBtn.style.opacity = '0.6';
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error();
        const blob = await res.blob();
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = w.title.toLowerCase().replace(/\s+/g,'_') + (isApk?'.apk':isLive?'.mp4':'.jpg');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(a.href);
      } catch {
        window.open(url, '_blank');
      } finally {
        dlBtn.style.opacity = '1';
      }
    };
  }

  // APK section
  const apkSection = document.getElementById('apkSection');
  if (apkSection) {
    apkSection.style.display = isApk ? 'block' : 'none';
    if (isApk) {
      const infoRow = document.getElementById('apkInfoRow');
      if (infoRow) infoRow.innerHTML = `
        ${w.size   ?`<div class="apk-info-chip"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>${t('size')}: ${w.size}</div>`:''}
        ${w.requires?`<div class="apk-info-chip"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2"/></svg>${t('requires')}: ${w.requires}</div>`:''}`;
      const guide = document.getElementById('apkGuide');
      if (guide) guide.innerHTML = `
        <div class="apk-guide-title">${t('apk_guide_title')}</div>
        ${[1,2,3,4,5,6].map(i=>`<div class="apk-guide-step"><div class="apk-step-num">${i}</div><div class="apk-step-text">${t('apk_step'+i)}</div></div>`).join('')}
        <div class="apk-guide-step" style="margin-top:10px;padding-top:10px;border-top:1px solid rgba(192,132,252,0.15)">
          <div class="apk-step-num">!</div>
          <div class="apk-step-text" style="color:rgba(192,132,252,0.6)">${t('apk_note')}</div>
        </div>`;
    }
  }

  // Similar
  const simRow = document.getElementById('similarRow');
  if (simRow) {
    allWallpapers().filter(x=>x.id!==w.id&&(x.category===w.category||x.type===w.type)).slice(0,8)
      .forEach(s=>simRow.appendChild(buildCardSm(s)));
  }
}

// ── Detail panel — 3-state swipe ────────────
function initDetailPanel() {
  const panel    = document.getElementById('detailPanel');
  const dragZone = document.getElementById('panelDragZone');
  const bg       = document.getElementById('detailBg');
  if (!panel || !dragZone) return;

  let state = 'normal';
  panel.dataset.state = state;

  function setState(s) {
    state = s;
    panel.dataset.state = s;
    if (s !== 'full') panel.scrollTop = 0;
  }

  // ── Universal pointer handler (touch + mouse for desktop testing) ──
  // Attach to the panel itself so the whole top area is draggable
  let startY = 0, startState = '', didMove = false;

  function onStart(y) {
    startY     = y;
    startState = state;
    didMove    = false;
  }
  function onMove(y) {
    didMove = true;
  }
  function onEnd(y) {
    if (!didMove) return;
    const dy = y - startY;
    const threshold = 28;
    if (startState === 'normal' && dy >  threshold) setState('mini');
    if (startState === 'normal' && dy < -threshold) setState('full');
    if (startState === 'mini'   && dy < -threshold) setState('normal');
    if (startState === 'full'   && dy >  threshold) setState('normal');
  }

  // Touch events on drag zone
  dragZone.addEventListener('touchstart', e => onStart(e.touches[0].clientY), {passive: true});
  dragZone.addEventListener('touchmove',  e => onMove(e.touches[0].clientY),  {passive: true});
  dragZone.addEventListener('touchend',   e => onEnd(e.changedTouches[0].clientY), {passive: true});

  // Mouse events for desktop/laptop testing
  let mouseDown = false;
  dragZone.addEventListener('mousedown', e => { mouseDown = true; onStart(e.clientY); });
  window.addEventListener('mousemove', e => { if (mouseDown) onMove(e.clientY); });
  window.addEventListener('mouseup',   e => { if (mouseDown) { mouseDown = false; onEnd(e.clientY); } });

  // ── Panel inner: touch up from normal → full, also mouse wheel ──
  const inner = document.getElementById('panelInner');
  if (inner) {
    // Touch: swipe up on content area triggers full
    let iStartY = 0;
    inner.addEventListener('touchstart', e => { iStartY = e.touches[0].clientY; }, {passive: true});
    inner.addEventListener('touchmove',  e => {
      if (state === 'normal' && e.touches[0].clientY - iStartY < -10) setState('full');
    }, {passive: true});

    // Mouse wheel on laptop: scroll down → full, scroll up in mini → normal
    panel.addEventListener('wheel', e => {
      if (state === 'normal' && e.deltaY > 0) setState('full');
      if (state === 'full'   && e.deltaY < 0 && panel.scrollTop === 0) setState('normal');
      if (state === 'mini'   && e.deltaY < 0) setState('normal');
    }, {passive: true});
  }

  // ── Tap background → toggle mini ↔ normal ──
  bg.addEventListener('click', () => {
    if (state === 'mini')        setState('normal');
    else if (state === 'normal') setState('mini');
  });

  // ── Tap drag zone when mini → back to normal ──
  dragZone.addEventListener('click', () => {
    if (state === 'mini') setState('normal');
  });
}

// ── Save / Share ─────────────────────────────
function toggleSave() {
  if (!_detailId) return;
  toggleSaveById(_detailId);
  updateSaveBtn(_detailId);
  if (navigator.vibrate) navigator.vibrate(22);
}

function updateSaveBtn(id) {
  const btn = document.getElementById('saveBtn');
  if (!btn) return;
  const saved = isSaved(id);
  btn.classList.toggle('saved', saved);
  btn.innerHTML = saved
    ? `<svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`
    : `<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;
}

function openShare() {
  const overlay = document.getElementById('shareOverlay');
  const sheet   = document.getElementById('shareSheet');
  if (!overlay || !sheet || !_detailW) return;

  const w = _detailW;
  const imgSrc = (w.type==='apk'||w.type==='live') ? (w.preview||'') : (w.file||'');

  // Populate title row
  const thumb = document.getElementById('shareThumb');
  if (thumb && imgSrc) { const i=document.createElement('img'); i.src=assetUrl(imgSrc); thumb.appendChild(i); }
  const titleEl = document.getElementById('shareWpTitle');
  if (titleEl) titleEl.textContent = w.title;
  const subEl = document.getElementById('shareWpSub');
  if (subEl) subEl.textContent = `WLPR · ${(w.type==='apk'?t('type_apk'):w.type==='live'?t('type_live'):t('type_static'))}`;

  overlay.classList.add('open');
  sheet.classList.add('open');
}

function closeShare() {
  document.getElementById('shareOverlay')?.classList.remove('open');
  document.getElementById('shareSheet')?.classList.remove('open');
}

function shareTo(app) {
  if (!_detailW) return;
  const url = location.href;
  const text = `Check out ${_detailW.title} on WLPR`;
  const links = {
    whatsapp:  `https://wa.me/?text=${encodeURIComponent(text+' '+url)}`,
    messenger: `fb-messenger://share?link=${encodeURIComponent(url)}`,
    instagram: `https://www.instagram.com/`,
    tiktok:    `https://www.tiktok.com/`,
    outlook:   `mailto:?subject=${encodeURIComponent(_detailW.title+' — WLPR')}&body=${encodeURIComponent(text+'\n'+url)}`,
    telegram:  `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
    x:         `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
  };
  if (links[app]) window.open(links[app], '_blank');
  closeShare();
}

function copyLink() {
  navigator.clipboard.writeText(location.href).then(() => {
    const btn = document.querySelector('[data-share-action="copy"]');
    if (btn) { const orig=btn.innerHTML; btn.textContent=t('copied'); setTimeout(()=>btn.innerHTML=orig, 2000); }
  }).catch(() => {});
  closeShare();
}

function nativeShare() {
  if (!_detailW) return;
  if (navigator.share) {
    navigator.share({ title: _detailW.title, text: `WLPR — ${_detailW.title}`, url: location.href });
  } else { copyLink(); }
  closeShare();
}

// ── SAVED ────────────────────────────────────
async function initSavedPage() {
  applyTheme();
  await loadWallpaperData();
  renderNav('saved');
  pageIn();
  renderSavedGrid();
  const btn = document.getElementById('clearBtn');
  if (btn) btn.textContent = t('clear');
  translatePage();
}

function renderSavedGrid() {
  const grid  = document.getElementById('savedGrid');
  const empty = document.getElementById('emptyState');
  if (!grid) return;
  const ids = getSaved();
  grid.innerHTML = '';
  if (!ids.length) { if(empty) empty.style.display='flex'; grid.style.display='none'; return; }
  if (empty) empty.style.display='none';
  const cols = getGridCols();
  grid.className = cols===3 ? 'grid-3col' : 'grid-2col';
  grid.style.display='grid';
  let found = 0;
  ids.forEach(id => { const w=findById(id); if(w){ grid.appendChild(buildCardGrid(w,cols)); found++; } });
  if (!found) { if(empty) empty.style.display='flex'; grid.style.display='none'; }
}

function clearSaved() {
  if (confirm('Remove all saved wallpapers?')) {
    localStorage.removeItem('wlpr_saved');
    renderSavedGrid();
  }
}

// ── SEARCH ───────────────────────────────────
async function initSearchPage() {
  applyTheme();
  await loadWallpaperData();
  pageIn();
  renderPopularTags();
  renderSearchResults('');
  const input = document.getElementById('searchInput');
  if (input) {
    input.placeholder = t('search_placeholder');
    input.addEventListener('input', () => renderSearchResults(input.value.trim().toLowerCase()));
  }
  translatePage();
}

function renderPopularTags() {
  const el = document.getElementById('popularTags');
  if (!el) return;
  ['dark','minimal','nature','abstract','warm','fireworks','apk','live','new'].forEach(tag => {
    const span=document.createElement('span'); span.className='tag'; span.textContent=tag.toUpperCase();
    span.onclick=()=>{ const i=document.getElementById('searchInput'); if(i){i.value=tag;} renderSearchResults(tag); };
    el.appendChild(span);
  });
}

function renderSearchResults(query) {
  const grid  = document.getElementById('searchResults');
  const count = document.getElementById('searchCount');
  if (!grid) return;
  grid.innerHTML='';
  const cols = getGridCols();
  grid.className = cols===3 ? 'grid-3col' : 'grid-2col';
  let items = allWallpapers();
  if (query) items = items.filter(w => w.title?.toLowerCase().includes(query)||w.category?.toLowerCase().includes(query)||w.type?.toLowerCase().includes(query)||(w.tags||[]).some(tg=>tg.toLowerCase().includes(query)));
  items.forEach(w => grid.appendChild(buildCardGrid(w,cols)));
  if (count) count.textContent = query ? t('results_for', query.toUpperCase(), items.length) : t('search_count', items.length);
}

// ── SETTINGS ─────────────────────────────────
function initSettingsPage() {
  applyTheme();
  renderNav('more');
  pageIn();
  renderThemeOptions();
  renderLangOptions();
  initGridToggle();
  translatePage();
}

function renderThemeOptions() {
  const el = document.getElementById('themeOptions');
  if (!el) return;
  el.innerHTML = '';
  const pref = getThemePref();
  ['auto','dark','light'].forEach(val => {
    const btn=document.createElement('button');
    btn.className='theme-opt'+(val===pref?' active':'');
    btn.dataset.theme=val;
    btn.textContent=t('theme_'+val);
    btn.onclick=()=>{ setThemePref(val); document.querySelectorAll('.theme-opt').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); };
    el.appendChild(btn);
  });
}

function renderLangOptions() {
  const sel = document.getElementById('langSelect');
  if (!sel) return;
  sel.value = getLang();
  sel.onchange = () => { setLang(sel.value); translatePage(); renderNav('more'); };
}

function initGridToggle() {
  const saved = getGridCols().toString();
  document.querySelectorAll('#gridToggle .toggle-btn').forEach(btn => {
    if (btn.dataset.val===saved) btn.classList.add('active');
    btn.onclick = () => {
      document.querySelectorAll('#gridToggle .toggle-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      localStorage.setItem('wlpr_cols', btn.dataset.val);
    };
  });
}
