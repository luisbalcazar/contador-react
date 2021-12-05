const CACHE_ELEMENTS = [
    "./",
    "https://unpkg.com/react@17/umd/react.production.min.js",
    "https://unpkg.com/react-dom@17/umd/react-dom.production.min.js",
    "https://unpkg.com/@babel/standalone/babel.min.js",
    "./style.css",
    "./components/Contador.js",
    "./index.js"
];

const CACHE_NAME = "v2_cache_contador_react";

//Instalacion del ServiceWorker
self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            cache.addAll(CACHE_ELEMENTS).then(() => {
               self.skipWaiting(); 
            }).catch(console.log);
        })
    )
});

//Evaluamos la cantidad de Caches que tenemos, y eliminamos las antiguas comparandolas con la actual
self.addEventListener("activate", (e) => {

    const cacheWhiteList = [CACHE_NAME];

    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(cacheNames.map(cacheName => {
               return cacheWhiteList.indexOf(cacheName) === -1 && caches.delete(cacheName)
            }))
        }).then(() => self.clients.claim()) // Por ultimo, reclamamos el ultimo cache
    )
})

self.addEventListener("fetch", (e) => {

    e.respondWith( caches.match(e.request).then(res => res ? res : fetch(e.request)))
    
})