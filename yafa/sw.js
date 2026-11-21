const C='yafa-v7';
const FILES=['./','index.html','logo.png','room.jpg','icon-192.png','icon-512.png','apple-touch-icon.png','manifest.webmanifest'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(FILES)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
  const req=e.request.mode==='navigate'||/\.html($|\?)/.test(e.request.url)?new Request(e.request.url,{cache:'no-cache'}):e.request;
  e.respondWith(fetch(req).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r}).catch(()=>caches.match(e.request)))});
