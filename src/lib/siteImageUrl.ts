const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;

// Public-facing pages serve Supabase-hosted media through our own domain via
// Netlify proxy rules (see public/_redirects). Keep the two lists in sync.
// Admin pages keep raw Supabase URLs — their delete/compress logic parses them.
const BUCKET_ROUTES: Array<[bucket: string, route: string]> = [
  ['gallery-photos', '/images/gallery/'],
  ['tiki-blog-images', '/images/blog/'],
  ['pontoon', '/images/site/'],
];

/**
 * Map a Supabase storage public URL to its branded /images/... path.
 * Returns the input unchanged for non-Supabase URLs, unknown buckets, or in
 * dev (the proxy rules only exist on Netlify).
 */
export function siteImageUrl(url: string): string {
  if (!import.meta.env.PROD || !url || !SUPABASE_URL) return url;
  for (const [bucket, route] of BUCKET_ROUTES) {
    const prefix = `${SUPABASE_URL}/storage/v1/object/public/${bucket}/`;
    if (url.startsWith(prefix)) return route + url.slice(prefix.length);
  }
  return url;
}

/** Absolute variant for og:image / JSON-LD, which require full URLs. */
export function absoluteSiteImageUrl(url: string): string {
  const mapped = siteImageUrl(url);
  return mapped.startsWith('/') ? `https://tikitacocruises.com${mapped}` : mapped;
}
