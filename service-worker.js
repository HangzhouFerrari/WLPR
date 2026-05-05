const CACHE = 'wlpr-v2';
const PRECACHE = [
  '/', '/index.html', '/browse.html', '/detail.html',
  '/saved.html', '/search.html', '/settings.html',
  '/assets/style.css', '/assets/app.js', '/assets/data.js', '/assets/i18n.js',
  '/wallpapers.json',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(PRECACHE)).catch(() => {}));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // Network-first for wallpaper assets
  if (e.request.url.includes('raw.githubusercontent.com') ||
      e.request.url.includes('wallpapers.json')) {
    e.respondWith(
      fetch(e.request).then(res => {
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return res;
      }).catch(() => caches.match(e.request))
    );
    return;
  }
  // Cache-first for app shell
  e.respondWith(
    caches.match(e.request).then(cached => cached ||
      fetch(e.request).then(res => {
        if (res && res.status === 200) {
          caches.open(CACHE).then(c => c.put(e.request, res.clone()));
        }
        return res;
      })
    )
  );
});
