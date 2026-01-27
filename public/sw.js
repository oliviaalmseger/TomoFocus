const CACHE_NAME = "tomofocus-v1";

/*Install när SW installeras första gången. 
 Cachar index.html för att kunna starta appen offline som en fallback för alla interna routes.*/
self.addEventListener("install", (event) => {
    event.waitUntil(caches.open(CACHE_NAME).then((cache) => {
        return cache.add("/index.html");
    }));
    self.skipWaiting(); // Så att den nya SW aktiveras direkt.
}); 

self.addEventListener("activate", (event) => { // Körs när SW aktiveras & rensar gamla cacheversioner
    event.waitUntil(
        caches.keys().then((keys) => Promise.all(
                keys
                .filter((key) => key !== CACHE_NAME)
                .map((key) => caches.delete(key))
        ))
    );
    self.clients.claim(); // Så att SW börjar användas direkt utan att omladdning av sidan krävs
});

/*Fångar upp navigeringsförfrågningar så att index-html hämtas från cache vid offlineläge, dvs routingen fungerar även offline */
self.addEventListener("fetch", (event) => {
    if (event.request.mode === "navigate") {
        event.respondWith(caches.match("/index.html").then((response) => {
            return response || fetch(event.request);
        }));
    }
});


self.addEventListener("notificationclick", event => { // Hanterar klick på notiser.
    event.notification.close();

    event.waitUntil(
        clients.matchAll({type: "window", includeUncontrolled: true}).then(clientList => {
            for (const client of clientList) {
                if ("focus" in client) return client.focus();
            }
            if (clients.openWindow) {
                return clients.openWindow("/");
            }
        })
    );
});

