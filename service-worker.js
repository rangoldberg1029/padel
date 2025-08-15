// Service worker v14: force update + auto-activate
const CACHE = "padel-buddy-v14";
const ASSETS = ["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png"];
self.addEventListener("install",(e)=>{ self.skipWaiting(); e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));});
self.addEventListener("activate",(e)=>{ e.waitUntil((async()=>{ const keys=await caches.keys(); await Promise.all(keys.map(k=>k!==CACHE&&caches.delete(k))); await self.clients.claim(); })());});
self.addEventListener("fetch",(e)=>{
  const url=new URL(e.request.url);
  if(url.origin===location.origin){
    e.respondWith(caches.match(e.request).then(res=>res||fetch(e.request)));
  }
});