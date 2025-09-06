self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open("fukuoka-itinerary-v1").then((cache) =>
      cache.addAll(["/", "/index.html", "/manifest.json", "/icons/icon-180.png", "/icons/icon-192.png", "/icons/icon-512.png"])
    )
  );
});
self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  if (url.origin === location.origin) {
    e.respondWith(caches.match(e.request).then((res) => res || fetch(e.request)));
  } else {
    e.respondWith(fetch(e.request));
  }
});