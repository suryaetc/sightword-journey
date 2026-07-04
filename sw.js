/* ============================================================
   SightWord Journey — sw.js (service worker)
   Caches the app shell so it works offline after first load.
   Note: service workers only run over http(s), not file://.
   ============================================================ */

const CACHE = "sightword-journey-v9";
const ASSETS = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./apple-touch-icon.png",
  "./Baloo2.ttf"
];

// Install: pre-cache the app shell.
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      return cache.addAll(ASSETS);
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

// Activate: clean up old caches.
self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (k) { return k !== CACHE; })
            .map(function (k) { return caches.delete(k); })
      );
    }).then(function () { return self.clients.claim(); })
  );
});

// Fetch: cache-first for our own assets, network fallback.
self.addEventListener("fetch", function (event) {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then(function (cached) {
      return cached || fetch(event.request).then(function (resp) {
        // Cache same-origin successful responses for next time.
        if (resp && resp.status === 200 && resp.type === "basic") {
          const copy = resp.clone();
          caches.open(CACHE).then(function (c) { c.put(event.request, copy); });
        }
        return resp;
      }).catch(function () { return cached; });
    })
  );
});
