// Keeps the Oscar app's own files on the phone so it opens with no signal.
// Scans are never handled here; the page queues them itself. Bump VERSION when the app files change.
const VERSION = 'oscar-v1';
const FILES = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  // Only this app's own files; the request to Oscar (another site) always goes to the network.
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  // Network first, so updates show up; the saved copy when offline.
  e.respondWith(fetch(req).then((res) => {
    const copy = res.clone();
    caches.open(VERSION).then((c) => c.put(req, copy));
    return res;
  }).catch(() => caches.match(req).then((hit) => hit || caches.match('index.html'))));
});
