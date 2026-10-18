import type {Atlas} from './anatomy';
import {readCachedChunk,writeCachedChunk} from './model-cache';
type Chunk=Atlas['chunks'][number];
/** Static hosts may serve .gz as a compressed response or as a gzip file.
 * Fetch already decodes Content-Encoding; inspect the payload to avoid decoding twice.
 */
export async function decodeModelPayload(payload:ArrayBuffer,expectedBytes:number,compressed:boolean):Promise<ArrayBuffer>{
 const signature=new Uint8Array(payload,0,Math.min(2,payload.byteLength));
 const gzip=compressed&&signature[0]===0x1f&&signature[1]===0x8b;
 const buffer=gzip?await new Response(new Blob([payload]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer():payload;
 if(buffer.byteLength!==expectedBytes)throw new Error('An anatomy file was incomplete. Please reload the viewer.');
 return buffer;
}
const compressedSource=(chunk:Chunk)=>!!chunk.gzip&&typeof DecompressionStream!=='undefined';
/** The build stamps each chunk with a content hash; dev servers fall back to its size. */
export const modelCacheKey=(chunk:Chunk)=>`${compressedSource(chunk)?chunk.gzip:chunk.url}#${chunk.hash??chunk.bytes}`;
function wait(ms:number,signal:AbortSignal){
 return new Promise<void>((resolve,reject)=>{
  const abort=()=>{clearTimeout(timer);reject(signal.reason);},timer=setTimeout(()=>{signal.removeEventListener('abort',abort);resolve();},ms);
  signal.addEventListener('abort',abort,{once:true});
 });
}
/** Load a geometry chunk from this device's cache, or download it with retries for busy servers and flaky Wi-Fi. */
export async function loadModelChunk(chunk:Chunk,signal:AbortSignal):Promise<ArrayBuffer>{
 const compressed=compressedSource(chunk),url=compressed?chunk.gzip!:chunk.url,key=modelCacheKey(chunk);
 const cached=await readCachedChunk(key);
 if(cached)try{return await decodeModelPayload(cached,chunk.bytes,compressed);}catch{/* Damaged entry: download it again. */}
 for(let attempt=1;;attempt++){
  try{
   const response=await fetch(url,{signal});
   if(!response.ok)throw Object.assign(new Error('An anatomy file could not be loaded.'),{retry:response.status>=500||response.status===429});
   const payload=await response.arrayBuffer(),buffer=await decodeModelPayload(payload,chunk.bytes,compressed);
   void writeCachedChunk(key,payload);
   return buffer;
  }catch(error){
   if(signal.aborted||attempt>=3||(error as {retry?:boolean}).retry===false)throw error;
   await wait(attempt*800,signal);
  }
 }
}
