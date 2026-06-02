// AXIOM Service Worker — caching mínimo para que la app sea instalable
// y funcione (parcialmente) sin conexión, con actualización OTA automática.

const CACHE_NAME = "axiom-v2";

// Recursos que cacheamos al instalar (los esenciales del shell).
const PRECACHE_URLS = [
  "/",
  "/dashboard",
  "/aprende",
];

// Al instalar el SW: precachea los recursos del shell y se activa enseguida.
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS)).catch(() => {})
  );
  self.skipWaiting();
});

// Al activarse: borra caches viejas y toma control de las pestañas abiertas.
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

// Permite que la página fuerce la activación inmediata del SW nuevo
// (lo usa PWARegister para la actualización OTA con recarga automática).
self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Estrategia: network-first con fallback a cache.
// Así el usuario ve siempre lo último cuando hay internet, pero la app
// sigue funcionando offline si abrió antes las páginas.
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Solo GETs del mismo origen.
  if (request.method !== "GET") return;
  if (new URL(request.url).origin !== self.location.origin) return;

  // No cacheamos API ni rutas dinámicas /api/*
  if (request.url.includes("/api/")) return;

  event.respondWith(
    fetch(request)
      .then((response) => {
        // Cachear solo HTML, CSS, JS, e imágenes.
        const ct = response.headers.get("content-type") || "";
        if (
          response.ok &&
          (ct.includes("text/html") ||
            ct.includes("text/css") ||
            ct.includes("javascript") ||
            ct.includes("image/"))
        ) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return response;
      })
      .catch(() => caches.match(request).then((r) => r || caches.match("/")))
  );
});
