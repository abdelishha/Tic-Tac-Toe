const CACHE_NAME = 'tic-tac-toe-v1';

// Helper function to validate URLs
const isValidUrl = (url) => {
  try {
    const urlObj = new URL(url, self.location.origin);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    return false;
  }
};

const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/src/main.tsx',
  '/src/App.tsx',
  '/src/Homepage.tsx',
  '/src/Game.tsx',
  '/src/OfflinePage.tsx',
  '/src/index.css',
  '/vite.svg',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
].filter(url => isValidUrl(url));

// Install event - cache resources
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        // Filter out invalid URLs and add them individually with error handling
        return Promise.allSettled(
          urlsToCache.map(url => 
            cache.add(url).catch(error => {
              console.log('Failed to cache:', url, error);
              return null; // Continue with other URLs even if one fails
            })
          )
        );
      })
      .catch((error) => {
        console.log('Cache failed:', error);
      })
  );
  // Force the waiting service worker to become the active service worker
  self.skipWaiting();
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests and invalid URLs
  if (event.request.method !== 'GET' || !isValidUrl(event.request.url)) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version if available
        if (response) {
          return response;
        }
        
        // Try to fetch from network
        return fetch(event.request)
          .then((response) => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone the response
            const responseToCache = response.clone();
            
            // Only cache successful responses with valid URLs
            if (isValidUrl(event.request.url) && !event.request.url.includes('chrome-extension')) {
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                })
                .catch((error) => {
                  console.log('Failed to cache:', event.request.url, error);
                });
            }
            
            return response;
          })
          .catch(() => {
            // If network fails and it's a document request, return cached index.html
            if (event.request.destination === 'document') {
              return caches.match('/index.html');
            }
            // For other requests, return a fallback response
            return new Response('Offline content not available', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({
                'Content-Type': 'text/plain',
              }),
            });
          });
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Take control of all clients immediately
      return self.clients.claim();
    })
  );
});

// Handle app updates
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
}); 