#!/usr/bin/env node
// Production server for intranet deployments. Needs only Node.js and a built dist/ folder (no npm packages):
// copy dist/ and this file to the server and run `node serve.mjs`, or `npm start` inside the repository.
//   PORT (default 3016), HOST (default 0.0.0.0), ATLAS_DIST (default: a dist/ folder beside this file, else ../dist)
import http from 'node:http';
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {pipeline} from 'node:stream';
import {fileURLToPath} from 'node:url';

const here=path.dirname(fileURLToPath(import.meta.url));
const root=path.resolve(process.env.ATLAS_DIST??[path.join(here,'dist'),path.join(here,'../dist')].find(dir=>fs.existsSync(path.join(dir,'index.html')))??path.join(here,'../dist'));
const port=Number(process.env.PORT??3016),host=process.env.HOST??'0.0.0.0';
if(!fs.existsSync(path.join(root,'index.html'))){console.error(`No build found in ${root}. Run "npm run build" first, or set ATLAS_DIST.`);process.exit(1);}

const TYPES={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.ico':'image/x-icon','.woff2':'font/woff2','.md':'text/markdown; charset=utf-8','.txt':'text/plain; charset=utf-8','.bin':'application/octet-stream','.gz':'application/octet-stream'};
// Text and raw geometry have precompressed siblings. A .bin.gz requested by name is sent as-is: the viewer inflates it itself.
const PRECOMPRESSED=new Set(['.html','.js','.css','.json','.svg','.md','.bin']);
const ENCODINGS=[['br','.br'],['gzip','.gz']];

const stat=file=>fsp.stat(file).then(s=>s.isFile()?s:null,()=>null);
function accepts(header,encoding){
 return String(header??'').split(',').some(part=>{const [name,...params]=part.trim().split(';');return name.trim()===encoding&&!params.some(p=>/^\s*q=0(\.0*)?\s*$/.test(p));});
}
function send(res,status,message){res.writeHead(status,{'Content-Type':'text/plain; charset=utf-8','Cache-Control':'no-store'});res.end(message);}
async function handle(req,res){
 res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','same-origin');
 if(req.method!=='GET'&&req.method!=='HEAD'){res.setHeader('Allow','GET, HEAD');return send(res,405,'Method not allowed');}
 let pathname;
 try{pathname=decodeURIComponent(new URL(req.url??'/','http://localhost').pathname);}catch{return send(res,400,'Bad request');}
 if(pathname.includes('\0'))return send(res,400,'Bad request');
 let file=path.join(root,path.normalize(pathname));
 if(file!==root&&!file.startsWith(root+path.sep))return send(res,403,'Forbidden');
 if(pathname.endsWith('/'))file=path.join(file,'index.html');
 let info=await stat(file);
 if(!info){
  // Unknown pages fall back to the app; unknown files must 404 so the viewer never parses HTML as data.
  if(path.extname(pathname)||!String(req.headers.accept??'').includes('text/html'))return send(res,404,'Not found');
  file=path.join(root,'index.html');info=await stat(file);
  if(!info)return send(res,503,'Build missing');
 }
 const ext=path.extname(file),relative=path.relative(root,file).split(path.sep).join('/');
 let body=file,encoding='';
 if(PRECOMPRESSED.has(ext)){
  res.setHeader('Vary','Accept-Encoding');
  for(const [name,suffix] of ENCODINGS){
   if(!accepts(req.headers['accept-encoding'],name))continue;
   const variant=await stat(file+suffix);
   if(variant){body=file+suffix;encoding=name;info=variant;break;}
  }
 }
 const etag=`W/"${info.size.toString(16)}-${Math.floor(info.mtimeMs).toString(16)}${encoding&&'-'+encoding}"`;
 res.setHeader('Content-Type',TYPES[ext]??'application/octet-stream');
 // Hashed bundles never change; everything else revalidates cheaply with an ETag (304, no body).
 res.setHeader('Cache-Control',relative.startsWith('assets/')?'public, max-age=31536000, immutable':'no-cache');
 res.setHeader('ETag',etag);
 if(encoding)res.setHeader('Content-Encoding',encoding);
 if(String(req.headers['if-none-match']??'').split(',').some(tag=>tag.trim()===etag)){res.writeHead(304);return res.end();}
 res.setHeader('Content-Length',info.size);
 if(req.method==='HEAD')return res.end();
 pipeline(fs.createReadStream(body),res,()=>{/* A client that leaves mid-download is normal; pipeline already closed both ends. */});
}

const server=http.createServer((req,res)=>{handle(req,res).catch(error=>{console.error(error);if(!res.headersSent)send(res,500,'Server error');else res.destroy();});});
server.keepAliveTimeout=30_000;server.headersTimeout=35_000;
server.on('error',error=>{console.error(error.code==='EADDRINUSE'?`Port ${port} is already in use. Set PORT to another value.`:error);process.exit(1);});
server.listen(port,host,()=>{
 const lan=Object.values(os.networkInterfaces()).flat().filter(a=>a&&a.family==='IPv4'&&!a.internal).map(a=>`  http://${a.address}:${port}`);
 console.log(`Human Atlas is serving ${root}\n  http://localhost:${port}${lan.length?`\nOn other devices in this network:\n${lan.join('\n')}`:''}`);
});
const stop=()=>{server.close(()=>process.exit(0));server.closeIdleConnections();setTimeout(()=>process.exit(0),5000).unref();};
process.on('SIGINT',stop);process.on('SIGTERM',stop);
