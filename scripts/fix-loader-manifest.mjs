/**
 * vite-react-ssg's client runtime resolves static loader data by exact
 * pathname (manifest[pathname]). Our canonical URLs use trailing slashes,
 * so "/blog/" would miss the generated "/blog" key and loaders would
 * return null on client-side navigation (e.g. blog list showing no posts).
 * This adds a trailing-slash alias for every manifest key.
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const distDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist');

const manifestFile = readdirSync(distDir).find(
  (f) => f.startsWith('static-loader-data-manifest-') && f.endsWith('.json')
);

if (!manifestFile) {
  console.warn('[fix-loader-manifest] No static loader data manifest found — skipping');
  process.exit(0);
}

const manifestPath = path.join(distDir, manifestFile);
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));

let added = 0;
for (const [key, value] of Object.entries(manifest)) {
  if (key !== '/' && !key.endsWith('/') && !(key + '/' in manifest)) {
    manifest[key + '/'] = value;
    added++;
  }
}

writeFileSync(manifestPath, JSON.stringify(manifest));
console.log(`[fix-loader-manifest] Added ${added} trailing-slash aliases to ${manifestFile}`);
