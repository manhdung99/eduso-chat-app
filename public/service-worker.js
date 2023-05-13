const cacheName = "v1";
const cacheAssets = ["index.html"];

self.addEventListener("install", (e) => {
  console.log("Service Worker: Install");
  e.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting)
  );
});

self.addEventListener("fetch", (e) => {
  console.log("Service Worker: Fetching");
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
