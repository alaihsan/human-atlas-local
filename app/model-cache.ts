/** Per-device store for downloaded anatomy chunks. IndexedDB is used instead of the Cache API or a
 * service worker because it also works on plain-HTTP intranet hosts. Every failure (private window,
 * blocked storage, full disk) degrades to a cache miss, so the viewer falls back to the network.
 */
const DB_NAME='human-atlas',STORE='model-chunks';
let opening:Promise<IDBDatabase|null>|undefined;
/** Some WebKit versions never settle indexedDB.open, and a stuck store must not stall loading: give up and use the network. */
const settleWithin=<T,>(ms:number,promise:Promise<T>,fallback:T)=>Promise.race([promise,new Promise<T>(resolve=>setTimeout(resolve,ms,fallback))]);
/** Open early (for example while atlas.json downloads) so the first chunk lookup does not wait for it. */
export function openModelCache(){
 return opening??=settleWithin(4000,new Promise<IDBDatabase|null>(resolve=>{
  try{
   const request=indexedDB.open(DB_NAME,1);
   request.onupgradeneeded=()=>request.result.createObjectStore(STORE);
   request.onsuccess=()=>{const db=request.result;db.onversionchange=()=>db.close();resolve(db);};
   request.onerror=()=>resolve(null);request.onblocked=()=>resolve(null);
  }catch{resolve(null);}
 }),null);
}
function run<T>(mode:IDBTransactionMode,work:(store:IDBObjectStore)=>IDBRequest<T>|void){
 return openModelCache().then(db=>new Promise<T|undefined>(resolve=>{
  if(!db)return resolve(undefined);
  try{
   const tx=db.transaction(STORE,mode),request=work(tx.objectStore(STORE));
   tx.oncomplete=()=>resolve(request?request.result:undefined);
   tx.onerror=()=>resolve(undefined);tx.onabort=()=>resolve(undefined);
  }catch{resolve(undefined);}
 }));
}
export const readCachedChunk=(key:string)=>settleWithin(10000,run<unknown>('readonly',store=>store.get(key)),undefined).then(value=>value instanceof ArrayBuffer?value:undefined);
export const writeCachedChunk=(key:string,payload:ArrayBuffer)=>run('readwrite',store=>{store.put(payload,key);}).then(()=>{});
/** Remove chunks left by earlier model versions so each device keeps exactly one atlas. */
export const pruneCachedChunks=(keep:Set<string>)=>run('readwrite',store=>{const keys=store.getAllKeys();keys.onsuccess=()=>{for(const key of keys.result)if(!keep.has(String(key)))store.delete(key);};}).then(()=>{});
/** Ask the browser not to evict the cache under storage pressure. Only available in secure contexts. */
export function requestPersistentStorage(){
 try{void navigator.storage?.persisted?.().then(persisted=>persisted||navigator.storage.persist()).catch(()=>{});}catch{/* Optional capability. */}
}
