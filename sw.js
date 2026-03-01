const CACHE_NAME = "squawk-7856ade";
const ASSETS = ["index.html", "manifest.json", "squawk.css", "squawk.ico", "squawk.js", "sw.js", "tod.js", "ui.js"];

self.addEventListener("install", (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return Promise.all(
                ASSETS.map((url) => {
                    // fetch each asset individually
                    return fetch(url, { cache: "reload" })
                        .then((response) => {
                            if (!response.ok) return;
                            if (response.status === 200 || response.status === 0) {
                                return cache.put(url, response);
                            }
                        })
                        .catch((err) => console.error("Failed to fetch:", url, err));
                }),
            );
        }),
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(self.clients.claim()); // claim any clients immediately so the new service worker takes control right away
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                }),
            );
        }),
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches
            .match(event.request, {
                ignoreSearch: true,
                ignoreVary: true,
            })
            .then((response) => {
                return response || fetch(event.request);
            }),
    );
});
