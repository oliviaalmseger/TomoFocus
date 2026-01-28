const CACHE_NAME = "tomofocus-v1"; // Cache version for offline support

/* Runs on first install. 
 Caches index.html to enable offline startup and client side routing fallback.*/
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.add("/index.html");
    })
  );
  self.skipWaiting(); // Activate the new SW immediately
});

self.addEventListener("activate", (event) => { // Clean up old cache versions when a new SW activates
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
  );
  self.clients.claim(); // So the SW takes control immediately
});

self.addEventListener("fetch", (event) => { // Use cached index.html for navigation requests (offline support)
  const { request } = event;
  if (request.mode === "navigate") {
    event.respondWith(
      caches.match("/index.html").then((response) => {
        return response || fetch(request);
      })
    );
    return;
  }
  if (request.url.includes("/assets/")) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          if (!response || response.status !== 200) {
            return response;
          }
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });
          return response;
        });
      })
    );
  }
});

self.addEventListener("notificationclick", (event) => { // Handles clicks on notifications
  event.notification.close();

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if ("focus" in client) return client.focus();
        }
        if (clients.openWindow) {
          return clients.openWindow("/");
        }
      })
  );
});
