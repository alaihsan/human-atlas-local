import {fileURLToPath} from 'node:url';
import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/postcss';
import fs from 'node:fs';
import pathModule from 'node:path';
import {createHash} from 'node:crypto';
import {promisify} from 'node:util';
import zlib from 'node:zlib';
const path=(relative:string)=>fileURLToPath(new URL(relative,import.meta.url));

function snapshotSaverPlugin() {
  return {
    name: 'snapshot-saver',
    configureServer(server: any) {
      server.middlewares.use('/api/save-snapshot', (req: any, res: any) => {
        let body = '';
        // `npm run dev` listens on the whole network: cap the upload and keep writes inside public/images/quiz.
        req.on('data', (chunk: any) => { body += chunk; if (body.length > 20_000_000) req.destroy(); });
        req.on('end', async () => {
          try {
            const { name, dataUrl } = JSON.parse(body);
            if (typeof name !== 'string' || !/^[a-z0-9-]{1,64}$/.test(name) || typeof dataUrl !== 'string') {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: 'Invalid snapshot name.' }));
              return;
            }
            const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
            const targetPath = pathModule.resolve(process.cwd(), 'public/images/quiz', `${name}.png`);
            fs.mkdirSync(pathModule.dirname(targetPath), { recursive: true });
            const rawBuf = Buffer.from(base64Data, 'base64');
            let outputBuf = rawBuf;
            try {
              const sharpModule: any = await import('sharp');
              const sharp = sharpModule.default || sharpModule;
              outputBuf = await sharp(rawBuf)
                .trim({ background: '#f2f3f3', threshold: 12 })
                .extend({ top: 28, bottom: 28, left: 28, right: 28, background: '#f2f3f3' })
                .resize({ width: 520, height: 390, fit: 'contain', background: '#f2f3f3' })
                .png({ quality: 92 })
                .toBuffer();
            } catch (err) {
              console.warn('Sharp image process fallback:', err);
            }
            fs.writeFileSync(targetPath, outputBuf);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, file: targetPath }));
          } catch (e: any) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: e.message }));
          }
        });
      });
      server.middlewares.use('/api/check-snapshots', (_req: any, res: any) => {
        const heartPath = pathModule.resolve(process.cwd(), 'public/images/quiz/heart.png');
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ exists: fs.existsSync(heartPath) }));
      });
    }
  };
}

const gzip = promisify(zlib.gzip), brotli = promisify(zlib.brotliCompress);
const walk = (dir: string): string[] => fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(pathModule.join(dir, e.name)) : [pathModule.join(dir, e.name)]);

/** Prepares dist/ for self-hosted (intranet) serving:
 * - stamps each geometry chunk in atlas.json with a content hash, so device caches refresh only when a model really changes;
 * - writes .br/.gz siblings of text assets for scripts/serve.mjs (or nginx gzip_static) to send without compressing per request.
 */
function intranetBuildPlugin() {
  let outDir = '';
  return {
    name: 'intranet-build',
    apply: 'build' as const,
    configResolved(config: any) { outDir = config.build.outDir; },
    async closeBundle() {
      const atlasPath = pathModule.join(outDir, 'models/atlas.json');
      if (fs.existsSync(atlasPath)) {
        const atlas = JSON.parse(fs.readFileSync(atlasPath, 'utf8'));
        for (const chunk of atlas.chunks) chunk.hash = createHash('sha256').update(fs.readFileSync(pathModule.join(outDir, chunk.url))).digest('hex').slice(0, 16);
        fs.writeFileSync(atlasPath, JSON.stringify(atlas));
      }
      const text = walk(outDir).filter(file => /\.(html|js|css|json|svg|md)$/.test(file) && fs.statSync(file).size > 1024);
      await Promise.all(text.map(async file => {
        const source = fs.readFileSync(file);
        const [gz, br] = await Promise.all([gzip(source, { level: 9 }), brotli(source, { params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 11, [zlib.constants.BROTLI_PARAM_SIZE_HINT]: source.length } })]);
        if (gz.length < source.length * .9) fs.writeFileSync(`${file}.gz`, gz);
        if (br.length < source.length * .9) fs.writeFileSync(`${file}.br`, br);
      }));
    },
  };
}

export default defineConfig({root:path('./web'),publicDir:path('./public'),plugins:[react(), snapshotSaverPlugin(), intranetBuildPlugin()],resolve:{alias:{'@':path('./')}},css:{postcss:{plugins:[tailwindcss()]}},server:{watch:{usePolling:true}},build:{outDir:path('./dist'),emptyOutDir:true,rolldownOptions:{output:{codeSplitting:{groups:[{name:'three',test:/node_modules[\\/]three[\\/]/,priority:2},{name:'vendor',test:/node_modules/,priority:1}]}}}}});
