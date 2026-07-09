// Canonicalize /blog URLs to the trailing-slash form.
//
// This cannot be done in _redirects: Netlify's redirect matching ignores
// trailing slashes, so any "/blog/:slug -> /blog/:slug/" rule also matches
// the slash form and 301s to itself — an infinite loop for every blog URL
// with no static file (deleted/unpublished/mistyped posts).
//
// Here: no trailing slash -> 301 to the slash form; already has one ->
// continue to static files (real posts) or the SPA fallback, which renders
// "Post not found" for unknown slugs.
export default async (request, context) => {
  const url = new URL(request.url);
  if (!url.pathname.endsWith('/')) {
    url.pathname += '/';
    return Response.redirect(url, 301);
  }
  return context.next();
};

export const config = { path: '/blog/*' };
