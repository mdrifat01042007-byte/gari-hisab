// সবসময় আগে ইন্টারনেট থেকে নতুন ফাইল নেয়, না পেলে পুরনো কপি দেখায়
const C = 'gari-hisab-v1';
self.addEventListener('install', e => { self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET' || new URL(r.url).origin !== location.origin) return;
  e.respondWith(fetch(r).then(res => {
    const copy = res.clone(); caches.open(C).then(c => c.put(r, copy)); return res;
  }).catch(() => caches.match(r)));
});
