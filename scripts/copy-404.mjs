// Copy the prerendered /404 route to dist/404.html — the file Netlify serves
// (with a real 404 status) for any URL that matches no static file and no
// redirect rule. Without this, unknown URLs soft-404 through the SPA fallback.
import { copyFile } from 'fs/promises';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dist = resolve(__dirname, '../dist');

await copyFile(resolve(dist, '404/index.html'), resolve(dist, '404.html'));
console.log('[copy-404] dist/404/index.html → dist/404.html');
