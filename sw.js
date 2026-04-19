/* ══════════════════════════════════════════
   Shiv Sutra — Service Worker v2
   Pre-cache everything on install.
   Cache-first strategy. Posts progress to app.
   ══════════════════════════════════════════ */

const CACHE = 'shiv-sutra-v2';

const PRECACHE = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
];

const FONT_URLS = [
  'https://fonts.googleapis.com/css2?family=Noto+Serif+Devanagari:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Marcellus&display=swap'
];

function broadcast(msg) {
  self.clients.matchAll({ includeUncontrolled: true, type: 'window' })
    .then(clients => clients.forEach(c => c.postMessage(msg)));
}

/* ── INSTALL: pre-cache all core assets ── */
self.addEventListener('install', event => {
  self.skipWaiting();

  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);

    broadcast({ type: 'CACHE_PROGRESS', msg: '📦 App save हो रहा है…' });

    let done = 0;
    for (const url of PRECACHE) {
      try {
        await cache.add(new Request(url, { cache: 'reload' }));
        done++;
        broadcast({ type: 'CACHE_PROGRESS', msg: `📦 Saving… ${done}/${PRECACHE.length} files` });
      } catch (e) {
        console.warn('[SW] Could not cache:', url, e);
      }
    }

    for (const url of FONT_URLS) {
      try { await cache.add(new Request(url)); } catch (_) {}
    }

    broadcast({ type: 'CACHED', msg: '✓ Offline के लिए save हो गया' });
  })());
});

/* ── ACTIVATE: remove old caches ── */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* ── FETCH: cache-first strategy ── */
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  if (event.request.url.startsWith('chrome-extension://')) return;

  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(res => {
          caches.open(CACHE).then(c => c.put(event.request, res.clone()));
          return res;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(res => {
        if (res && res.status === 200 && res.type !== 'opaque') {
          caches.open(CACHE).then(c => c.put(event.request, res.clone()));
        }
        return res;
      }).catch(() => new Response('Offline', { status: 503 }));
    })
  );
});
