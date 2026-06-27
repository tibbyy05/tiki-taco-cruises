import { createClient } from '@supabase/supabase-js';
import { writeFile } from 'fs/promises';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { loadEnv } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');
const outFile = resolve(projectRoot, 'dist/sitemap.xml');

const SITE_URL = 'https://tikitacocruises.com';

const env = loadEnv('production', projectRoot, 'VITE_');
const SUPABASE_URL = env.VITE_SUPABASE_URL ?? process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = env.VITE_SUPABASE_ANON_KEY ?? process.env.VITE_SUPABASE_ANON_KEY;
const CLIENT_ID = env.VITE_CLIENT_ID ?? process.env.VITE_CLIENT_ID;

const staticRoutes = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/cruise-destinations', changefreq: 'weekly', priority: '0.9' },
  { path: '/new-river-cruise', changefreq: 'monthly', priority: '0.8' },
  { path: '/north-bound-scenic-cruise', changefreq: 'monthly', priority: '0.8' },
  { path: '/las-olas-boat-tour', changefreq: 'monthly', priority: '0.8' },
  { path: '/intracoastal-waterway-corporate-cruise', changefreq: 'monthly', priority: '0.8' },
  { path: '/fort-lauderdale-sunset-cruise', changefreq: 'monthly', priority: '0.8' },
  { path: '/gallery', changefreq: 'monthly', priority: '0.6' },
  { path: '/faq', changefreq: 'monthly', priority: '0.7' },
  { path: '/contact-us', changefreq: 'monthly', priority: '0.7' },
  { path: '/blog', changefreq: 'weekly', priority: '0.7' },
];

const todayIso = new Date().toISOString().slice(0, 10);

async function fetchBlogPosts() {
  if (!SUPABASE_URL || !SUPABASE_KEY || !CLIENT_ID) {
    console.warn('[sitemap] Supabase env vars missing — skipping blog posts');
    return [];
  }
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  const { data, error } = await supabase
    .from('tiki_blog_posts')
    .select('slug, updated_at, created_at')
    .eq('client_id', CLIENT_ID)
    .eq('published', true);
  if (error) {
    console.error('[sitemap] Supabase query failed:', error.message);
    return [];
  }
  return data ?? [];
}

function urlEntry({ loc, lastmod, changefreq, priority }) {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

async function main() {
  const posts = await fetchBlogPosts();

  const entries = [
    ...staticRoutes.map((r) =>
      urlEntry({
        loc: `${SITE_URL}${r.path}`,
        lastmod: todayIso,
        changefreq: r.changefreq,
        priority: r.priority,
      })
    ),
    ...posts.map((p) =>
      urlEntry({
        loc: `${SITE_URL}/blog/${p.slug}`,
        lastmod: (p.updated_at ?? p.created_at ?? new Date().toISOString()).slice(0, 10),
        changefreq: 'monthly',
        priority: '0.6',
      })
    ),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>
`;

  await writeFile(outFile, xml, 'utf8');
  console.log(`[sitemap] Wrote ${entries.length} URLs (${staticRoutes.length} static + ${posts.length} blog posts) → ${outFile}`);
}

main().catch((err) => {
  console.error('[sitemap] Generation failed:', err);
  process.exit(1);
});
