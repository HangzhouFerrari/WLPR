/**
 * WLPR v2 — App Logic
 */

// ── Shared nav HTML ──────────────────────────
function navHTML(active) {
  const items = [
    { href:'index.html',    key:'home',   icon:'<path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>' },
    { href:'browse.html',   key:'browse', icon:'<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>' },
    { href:'saved.html',    key:'saved',  icon:'<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>' },
    { href:'settings.html', key:'more',   icon:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>' },
  ];
  const isSvgFill = (key) => key === 'home';
  return items.map(item => `
    <a href="${item.href}" class="nav-item${item.key === active ? ' active' : ''}">
      <svg width="22" height="22" viewBox="0 0 24 24" 
           fill="${isSvgFill(item.key) && item.key === active ? 'currentColor' : 'none'}"
           stroke="${isSvgFill(item.key) && item.key === active ? 'none' : 'currentColor'}" stroke-width="2">
        ${item.icon}
      </svg>
      <span>${t(item.key)}</span>
    </a>
  `).join('');
}

function renderNav(active) {
  const nav = document.querySelector('.bottom-nav');
  if (nav) nav.innerHTML = navHTML(active);
}

// ── Card builders ────────────────────────────
function buildCardSm(w) {
  const isLive = w.type === 'live';
  const isApk  = w.type === 'apk';
  const imgSrc = isLive || isApk ? (w.preview || '') : (w.file || '');
  const css    = WP_CLASS[w.id] || '';

  const el = document.createElement('div');
  el.className = 'card-sm';
  el.onclick = () => nav('detail.html?id=' + w.id);

  el.innerHTML = `
    <div class="card-sm-thumb ${css}">
      ${imgSrc ? `<img src="${assetUrl(imgSrc)}" alt="${w.title}" loading="lazy" onerror="this.style.display='none'">` : ''}
      ${isLive ? `<div class="pill pill-live"><span class="live-dot"></span>LIVE</div>` : ''}
      ${isApk  ? `<div class="pill pill-apk">APK</div>` : ''}
      ${w.new  ? `<div class="pill pill-new">${t('new')}</div>` : ''}
    </div>
    <div class="card-sm-info">
      <div class="card-sm-title">${w.title}</div>
      <div class="card-sm-cat">${isApk ? t('type_apk') : w.category?.toUpperCase()}</div>
      ${isApk && w.size ? `<div class="card-apk-size">${w.size}</div>` : ''}
    </div>
  `;
  return el;
}

function buildCardGrid(w) {
  const isLive = w.type === 'live';
  const isApk  = w.type === 'apk';
  const imgSrc = isLive || isApk ? (w.preview || '') : (w.file || '');
  const css    = WP_CLASS[w.id] || '';

  const el = document.createElement('div');
  el.className = 'card-grid ' + css;
  el.onclick = () => nav('detail.html?id=' + w.id);

  el.innerHTML = `
    ${imgSrc ? `<img src="${assetUrl(imgSrc)}" alt="${w.title}" loading="lazy" onerror="this.style.display='none'">` : ''}
    <div class="card-grid-overlay"><div class="card-grid-title">${w.title}</div></div>
    ${isLive ? `<div class="pill pill-live"><span class="live-dot"></span>LIVE</div>` : ''}
    ${isApk  ? `<div class="pill pill-apk">APK</div>` : ''}
    ${w.new  ? `<div class="pill pill-new">${t('new')}</div>` : ''}
  `;
  return el;
}

function buildCollectionCard(c) {
  const el = document.createElement('div');
  el.onclick = () => nav(`browse.html?collection=${c.id}`);
  el.className = 'collection-card';
  el.innerHTML = `
    <div class="collection-thumb">
      <img src="${assetUrl(c.cover)}" alt="${c.title}" loading="lazy" onerror="this.style.display='none'">
    </div>
    <div class="collection-info">
      <div class="collection-badge-text">${t('collection')}</div>
      <div class="collection-title">${c.title}</div>
      <div class="card-apk-size">${t('collection_items', c.count)}</div>
    </div>
  `;
  return el;
}

// ── Page transition helpers ──────────────────
function pageIn() {
  const wrap = document.querySelector('.page-wrap');
  if (!wrap) return;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => wrap.classList.add('visible'));
  });
}

function nav(url) {
  location.href = url;
}

// ── HOME ─────────────────────────────────────
async function initHomePage() {
  applyTheme();
  await loadWallpaperData();
  renderNav('home');
  pageIn();
  renderHero();
  renderHomeSection('newDrops',    allWallpapers().filter(w => w.new).slice(0, 8));
  renderHomeSection('liveSection', WALLPAPERS.live.map(w => ({ ...w, type: 'live' })));
  renderHomeSection('apkSection',  WALLPAPERS.apk.map(w => ({ ...w, type: 'apk' })));
  renderCollections();
  renderHomeGrid(allWallpapers().slice(0, 8));
  setTimeout(initHomeTabs, 0); // na render
  translatePage();
}

let heroIndex = 0;
let heroItems = [];

function renderHero() {
  const banner = document.getElementById('heroBanner');
  if (!banner) return;
  heroItems = allWallpapers().filter(w => w.new).slice(0, 6);
  if (!heroItems.length) heroItems = allWallpapers().slice(0, 3);

  const dots = document.getElementById('heroDots');

  function update(animate) {
    const w = heroItems[heroIndex];
    const css = WP_CLASS[w.id] || '';
    const imgSrc = w.type === 'live' || w.type === 'apk' ? (w.preview || '') : (w.file || '');

    // Reset class
    banner.className = 'hero-banner';
    const bg = document.getElementById('heroBgGradient');
    if (bg) { bg.className = 'hero-bg-gradient ' + css; bg.style.opacity = '1'; }

    const img = document.getElementById('heroBgImg');
    if (img && imgSrc) {
      if (animate) {
        img.style.opacity = '0';
        setTimeout(() => { img.src = assetUrl(imgSrc); img.style.opacity = '1'; }, 200);
      } else {
        img.src = assetUrl(imgSrc);
      }
    }

    const titleEl = document.getElementById('heroTitle');
    const subEl   = document.getElementById('heroSub');
    if (titleEl) {
      if (animate) {
        titleEl.style.opacity = '0';
        setTimeout(() => { titleEl.textContent = w.title; titleEl.style.opacity = '1'; }, 200);
      } else {
        titleEl.textContent = w.title;
      }
    }
    if (subEl) subEl.textContent = `${w.category?.toUpperCase()} · ${w.type.toUpperCase()}`;

    if (dots) {
      dots.innerHTML = '';
      heroItems.forEach((_, i) => {
        const d = document.createElement('div');
        d.className = 'hero-dot' + (i === heroIndex ? ' active' : '');
        dots.appendChild(d);
      });
    }

    banner.onclick = () => nav('detail.html?id=' + w.id);
  }

  update(false);

  // Swipe
  let sx = 0;
  banner.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive: true });
  banner.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 40) {
      heroIndex = dx < 0
        ? (heroIndex + 1) % heroItems.length
        : (heroIndex - 1 + heroItems.length) % heroItems.length;
      update(true);
    }
  });

  // Auto
  setInterval(() => {
    heroIndex = (heroIndex + 1) % heroItems.length;
    update(true);
  }, 4500);
}

function renderHomeSection(id, items) {
  const el = document.getElementById(id);
  if (!el) return;
  items.forEach(w => el.appendChild(buildCardSm(w)));
}

function renderCollections() {
  const el = document.getElementById('collectionsRow');
  if (!el) return;
  (WALLPAPERS.collections || []).forEach(c => el.appendChild(buildCollectionCard(c)));
}

function renderHomeGrid(items) {
  const el = document.getElementById('browseGrid');
  if (!el) return;
  el.innerHTML = '';
  items.forEach(w => el.appendChild(buildCardGrid(w)));
}

function initHomeTabs() {
  document.querySelectorAll('.tabs-bar .tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tabs-bar .tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const type = tab.dataset.tab;
      let items = allWallpapers();
      if (type === 'static') items = items.filter(w => w.type === 'static');
      if (type === 'live')   items = items.filter(w => w.type === 'live');
      if (type === 'apk')    items = items.filter(w => w.type === 'apk');
      renderHomeGrid(items.slice(0, 8));
    });
  });
}

// ── BROWSE ───────────────────────────────────
async function initBrowsePage() {
  applyTheme();
  await loadWallpaperData();
  renderNav('browse');
  pageIn();
  const params = new URLSearchParams(location.search);
  const pre = params.get('filter') || params.get('type') || 'all';
  const collId = params.get('collection');
  if (collId) { /* filter op collectie */ }
  renderFiltered(pre);
  initFilterPills(pre);
  translatePage();
}

function renderFiltered(filter) {
  const grid  = document.getElementById('browseGrid');
  const label = document.getElementById('countLabel');
  if (!grid) return;
  grid.innerHTML = '';
  let items = allWallpapers();
  if (filter === 'static')   items = items.filter(w => w.type === 'static');
  else if (filter === 'live') items = items.filter(w => w.type === 'live');
  else if (filter === 'apk')  items = items.filter(w => w.type === 'apk');
  else if (filter === 'abstract') items = items.filter(w => w.category === 'abstract');
  else if (filter === 'nature')   items = items.filter(w => w.category === 'nature');
  else if (filter === 'new')  items = items.filter(w => w.new);
  items.forEach(w => grid.appendChild(buildCardGrid(w)));
  if (label) label.textContent = t('wallpaper_count', items.length);
}

function initFilterPills(active) {
  document.querySelectorAll('.filter-pill').forEach(pill => {
    if (pill.dataset.filter === active) pill.classList.add('active');
    pill.addEventListener('click', () => {
      document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      renderFiltered(pill.dataset.filter);
    });
  });
}

// ── DETAIL ───────────────────────────────────
let _detailId = null;

async function initDetailPage() {
  applyTheme();
  await loadWallpaperData();
  const id = new URLSearchParams(location.search).get('id');
  if (!id) { history.back(); return; }
  const w = findById(id);
  if (!w) { history.back(); return; }
  _detailId = id;
  renderDetail(w);
  updateSaveBtn(id);
  translatePage();
}

function renderDetail(w) {
  const isApk  = w.type === 'apk';
  const isLive = w.type === 'live';
  const imgSrc = isApk || isLive ? (w.preview || '') : (w.file || '');
  const css    = WP_CLASS[w.id] || '';

  document.getElementById('detailBg')?.classList.add(css);
  const img = document.getElementById('detailImg');
  if (img && imgSrc) {
    img.src = assetUrl(imgSrc);
    img.onerror = () => { img.style.display = 'none'; };
  }

  const badge = document.getElementById('typeBadge');
  if (badge) {
    if (isApk) {
      badge.style.display = 'flex';
      badge.className = 'pill pill-apk';
      badge.innerHTML = `APK`;
    } else if (isLive) {
      badge.style.display = 'flex';
      badge.className = 'pill pill-live';
      badge.innerHTML = `<span class="live-dot"></span>LIVE`;
    }
  }

  const title = document.getElementById('panelTitle');
  const meta  = document.getElementById('panelMeta');
  const swatch = document.getElementById('colorSwatch');
  const tagRow = document.getElementById('tagRow');
  const dlBtn  = document.getElementById('downloadBtn');

  if (title) title.textContent = w.title;
  if (meta)  meta.textContent = isApk ? t('type_apk') : (isLive ? t('type_live') : t('type_static'));
  if (swatch) swatch.style.background = w.color || '#111';

  // Tags
  if (tagRow) {
    tagRow.innerHTML = '';
    if (w.new) {
      const tag = document.createElement('span');
      tag.className = 'tag active';
      tag.textContent = t('new');
      tagRow.appendChild(tag);
    }
    (w.tags || []).forEach(tag => {
      const el = document.createElement('span');
      el.className = 'tag';
      el.textContent = tag.toUpperCase();
      el.onclick = () => nav(`browse.html?filter=${tag}`);
      tagRow.appendChild(el);
    });
  }

  // Download button
  if (dlBtn) {
    if (dlBtn) {
  dlBtn.href = '#';
  dlBtn.onclick = async (e) => {
    e.preventDefault();
    const url = assetUrl(w.file || imgSrc || '');
    if (!url) return;
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = w.title.toLowerCase().replace(/\s+/g,'_') + (isApk ? '.apk' : isLive ? '.mp4' : '.jpg');
      a.click();
      URL.revokeObjectURL(a.href);
    } catch {
      window.open(url, '_blank');
    }
  };
  dlBtn.querySelector('span').textContent = isApk ? t('install_apk') : t('download');
}
  }

  // APK extra info + guide
  const apkSection = document.getElementById('apkSection');
  if (apkSection) {
    if (isApk) {
      apkSection.style.display = 'block';
      // Info chips
      const infoRow = document.getElementById('apkInfoRow');
      if (infoRow) {
        infoRow.innerHTML = `
          ${w.size    ? `<div class="apk-info-chip"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>${t('size')}: ${w.size}</div>` : ''}
          ${w.requires ? `<div class="apk-info-chip"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/></svg>${t('requires')}: ${w.requires}</div>` : ''}
        `;
      }
      // Install steps
      const guide = document.getElementById('apkGuide');
      if (guide) {
        guide.innerHTML = `
          <div class="apk-guide-title">${t('apk_guide_title')}</div>
          ${[1,2,3,4,5,6].map(i => `
            <div class="apk-guide-step">
              <div class="apk-step-num">${i}</div>
              <div class="apk-step-text">${t('apk_step'+i)}</div>
            </div>
          `).join('')}
          <div class="apk-guide-step" style="margin-top:10px; padding-top:10px; border-top:1px solid rgba(192,132,252,0.15)">
            <div class="apk-step-num">!</div>
            <div class="apk-step-text" style="color:rgba(192,132,252,0.6)">${t('apk_note')}</div>
          </div>
        `;
      }
    } else {
      apkSection.style.display = 'none';
    }
  }

  // Similar
  const similar = allWallpapers()
    .filter(x => x.id !== w.id && (x.category === w.category || x.type === w.type))
    .slice(0, 8);
  const simRow = document.getElementById('similarRow');
  if (simRow) similar.forEach(s => simRow.appendChild(buildCardSm(s)));
}

function toggleSave() {
  if (!_detailId) return;
  toggleSaveById(_detailId);
  updateSaveBtn(_detailId);
  if (navigator.vibrate) navigator.vibrate(25);
}

function updateSaveBtn(id) {
  const btn = document.getElementById('saveBtn');
  if (!btn) return;
  const saved = isSaved(id);
  btn.classList.toggle('saved', saved);
  btn.innerHTML = saved
    ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`
    : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;
}

// ── SAVED ────────────────────────────────────
async function initSavedPage() {
  applyTheme();
  await loadWallpaperData();
  renderNav('saved');
  pageIn();
  renderSavedGrid();
  // Translate clear button
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

  if (!ids.length) {
    if (empty) empty.style.display = 'flex';
    grid.style.display = 'none';
    return;
  }

  if (empty) empty.style.display = 'none';
  grid.style.display = 'grid';

  let found = 0;
  ids.forEach(id => {
    const w = findById(id);
    if (w) { grid.appendChild(buildCardGrid(w)); found++; }
  });

  // If nothing resolved (stale IDs), show empty
  if (!found) {
    if (empty) empty.style.display = 'flex';
    grid.style.display = 'none';
  }
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
    const span = document.createElement('span');
    span.className = 'tag';
    span.textContent = tag.toUpperCase();
    span.onclick = () => {
      document.getElementById('searchInput').value = tag;
      renderSearchResults(tag);
    };
    el.appendChild(span);
  });
}

function renderSearchResults(query) {
  const grid  = document.getElementById('searchResults');
  const count = document.getElementById('searchCount');
  if (!grid) return;
  grid.innerHTML = '';
  let items = allWallpapers();
  if (query) {
    items = items.filter(w =>
      w.title?.toLowerCase().includes(query) ||
      w.category?.toLowerCase().includes(query) ||
      w.type?.toLowerCase().includes(query) ||
      (w.tags || []).some(tag => tag.toLowerCase().includes(query))
    );
  }
  items.forEach(w => grid.appendChild(buildCardGrid(w)));
  if (count) {
    count.textContent = query
      ? t('results_for', query.toUpperCase(), items.length)
      : t('search_count', items.length);
  }
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
  const container = document.getElementById('themeOptions');
  if (!container) return;
  const pref = getThemePref();
  ['auto', 'dark', 'light'].forEach(val => {
    const btn = document.createElement('button');
    btn.className = 'theme-opt' + (val === pref ? ' active' : '');
    btn.dataset.theme = val;
    btn.textContent = t('theme_' + val);
    btn.onclick = () => {
      setThemePref(val);
      document.querySelectorAll('.theme-opt').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    };
    container.appendChild(btn);
  });
}

function renderLangOptions() {
  const sel = document.getElementById('langSelect');
  if (!sel) return;
  sel.value = getLang();
  sel.onchange = () => {
    setLang(sel.value);
    translatePage();
    // Re-render nav labels
    renderNav('more');
  };
}

function initGridToggle() {
  const saved = localStorage.getItem('wlpr_cols') || '2';
  document.querySelectorAll('#gridToggle .toggle-btn').forEach(btn => {
    if (btn.dataset.val === saved) btn.classList.add('active');
    btn.onclick = () => {
      document.querySelectorAll('#gridToggle .toggle-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      localStorage.setItem('wlpr_cols', btn.dataset.val);
    };
  });
}

// ── i18n page translate ───────────────────────
function translatePage() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    el.placeholder = t(el.dataset.i18nPh);
  });
}
