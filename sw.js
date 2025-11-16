// Quantum Chat Service Worker
const CACHE_NAME = 'quantum-chat-v3';
const urlsToCache = [
  '/',
  '/index.html',
  '/chat.html',
  '/voice.html',
  '/styles.css',
  '/app.js',
  '/debug.js'
];

console.log('🔧 Quantum Service Worker: Installing...');

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('🔧 Opened quantum cache');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('✅ Quantum cache complete');
      })
      .catch(error => {
        console.error('❌ Cache installation failed:', error);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('🔧 Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

console.log('✅ Quantum Service Worker registered');