const SITE_HOST = 'tikitacocruises.com';

/**
 * Force links to our own domain into the canonical form: https, no www, and a
 * trailing slash on extensionless paths.
 *
 * Blog bodies are LLM-generated (supabase/functions/expand-blog-post) and the
 * model has emitted `http://tikitacocruises.com` self-links. The prompt now
 * forbids it, but a prompt is guidance rather than a guarantee — this makes it
 * deterministic, and repairs any post already stored with the bad form.
 *
 * External URLs, relative paths, and mailto:/tel: are returned untouched.
 */
export function canonicalHref(href: string): string {
  if (!href || !/^https?:\/\//i.test(href)) return href;

  let url: URL;
  try {
    url = new URL(href);
  } catch {
    return href;
  }

  if (url.hostname.replace(/^www\./i, '').toLowerCase() !== SITE_HOST) return href;

  url.protocol = 'https:';
  url.hostname = SITE_HOST;
  // Match the trailing-slash canonicalisation enforced in public/_redirects.
  if (!url.pathname.endsWith('/') && !/\.[a-z0-9]+$/i.test(url.pathname)) {
    url.pathname += '/';
  }
  return url.toString();
}
