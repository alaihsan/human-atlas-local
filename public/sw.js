// Offline shell for Human Atlas: with it, a device that has visited once can open the app even when the server is off.
// Browsers run service workers only on HTTPS or localhost. Over a plain-HTTP intranet address the app works without it,
// and geometry chunks are cached in IndexedDB by the page either way (app/model-cache.ts), so they are not handled here.
// `npm run build` fills in the placeholder below with the shell's file list and a content version.
const {version,files}=self.__PRECACHE__;
const PREFIX='human-atlas-shell-',SHELL=PREFIX+version,precached=new Set(files);
// A slow or switched-off server must not leave the device waiting: after this long, answer from the cache.
const NETWORK_TIMEOUT=4000;

self.addEventListener('install',event=>{
 event.waitUntil(caches.open(SHELL).then(cache=>cache.addAll(files.map(url=>new Request(url,{cache:'reload'})))).then(()=>self.skipWaiting()));
});
// Every bundle loads at startup (no lazy chunks), so open pages keep working when a new version takes over.
self.addEventListener('activate',event=>{
 event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith(PREFIX)&&key!==SHELL).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));
});

async function networkFirst(request,key=request){
 const cache=await caches.open(SHELL);
 const network=fetch(request).then(response=>{if(response.ok)void cache.put(key,response.clone());return response;});
 network.catch(()=>{});
 try{
  const response=await Promise.race([network,new Promise((_,reject)=>setTimeout(reject,NETWORK_TIMEOUT))]);
  if(response.ok)return response;
  return (await cache.match(key))??response;
 }catch{
  return (await cache.match(key))??network;
 }
}
async function cacheFirst(request){
 const cached=await caches.match(request);
 if(cached)return cached;
 const response=await fetch(request);
 if(response.ok){const copy=response.clone();void caches.open(SHELL).then(cache=>cache.put(request,copy));}
 return response;
}

self.addEventListener('fetch',event=>{
 const request=event.request,url=new URL(request.url);
 if(request.method!=='GET'||url.origin!==self.location.origin)return;
 // Page loads get the app; opening a file directly (an image in its own tab) is answered with that file.
 const isFile=/\.[^/]+$/.test(url.pathname)&&!url.pathname.endsWith('.html');
 if(request.mode==='navigate'&&!isFile)event.respondWith(networkFirst(request,'/index.html'));
 else if(url.pathname==='/models/atlas.json')event.respondWith(networkFirst(request));
 else if(url.pathname.startsWith('/assets/')||precached.has(url.pathname))event.respondWith(cacheFirst(request));
});
