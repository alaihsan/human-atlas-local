import {fileURLToPath} from 'node:url';
import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/postcss';
import fs from 'node:fs';
import pathModule from 'node:path';
const path=(relative:string)=>fileURLToPath(new URL(relative,import.meta.url));

function snapshotSaverPlugin() {
  return {
    name: 'snapshot-saver',
    configureServer(server: any) {
      server.middlewares.use('/api/save-snapshot', (req: any, res: any) => {
        let body = '';
        req.on('data', (chunk: any) => body += chunk);
        req.on('end', async () => {
          try {
            const { name, dataUrl } = JSON.parse(body);
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

export default defineConfig({root:path('./web'),publicDir:path('./public'),plugins:[react(), snapshotSaverPlugin()],resolve:{alias:{'@':path('./')}},css:{postcss:{plugins:[tailwindcss()]}},server:{watch:{usePolling:true}},build:{outDir:path('./dist'),emptyOutDir:true}});
