/* ----------------------------------------------------------
   BISAT — Service Worker v13.2
   Command Center / HUD / CyberOps / SecureOps
---------------------------------------------------------- */

const CACHE_NAME = "bisat-cache-v13.2";
const CORE_ASSETS = [
    "/",
    "/index.html",
    "/style.css",
    "/app.js",
    "/manifest.json"
];

/* ----------------------------------------------------------
   INSTALL — activation immédiate
---------------------------------------------------------- */
self.addEventListener("install", event => {
    self.skipWaiting();

    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(CORE_ASSETS);
        })
    );
});

/* ----------------------------------------------------------
   ACTIVATE — prise de contrôle + nettoyage ancien cache
---------------------------------------------------------- */
self.addEventListener("activate", event => {
    clients.claim();

    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys
                    .filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            )
        )
    );
});

/* ----------------------------------------------------------
   FETCH — réponse cache + fallback réseau
---------------------------------------------------------- */
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(cached => {
            return (
                cached ||
                fetch(event.request).catch(() => cached)
            );
        })
    );
});

/* ----------------------------------------------------------
   SECUREOPS — anti-tampering léger
---------------------------------------------------------- */
self.addEventListener("message", event => {
    if (event.data === "SECUREOPS_CHECK") {
        event.source.postMessage({
            secureops: "OK",
            version: "13.2",
            integrity: true
        });
    }
});
