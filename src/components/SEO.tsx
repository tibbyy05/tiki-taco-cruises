/**
 * Reusable SEO component for consistent meta tag management across all pages.
 *
 * Usage:
 *   <SEO
 *     title="Las Olas & Intracoastal Cruise | Tiki Taco Cruises Fort Lauderdale"
 *     description="Private Las Olas and Intracoastal cruise in Fort Lauderdale."
 *     ogImage="/fort-lauderdale-hero.jpg"
 *     noindex={false}
 *   />
 */
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogTitle?: string;
  ogImage?: string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown>;
}

const DEFAULT_OG_IMAGE = 'https://tikitacocruises.com/fort-lauderdale-hero.jpg';

export default function SEO({ title, description, canonical, ogTitle, ogImage, noindex = false, jsonLd }: SEOProps) {
  const { pathname } = useLocation();
  const normalizedPath = pathname.endsWith('/') ? pathname : `${pathname}/`;
  const url = canonical || `https://tikitacocruises.com${normalizedPath}`;
  const image = ogImage || DEFAULT_OG_IMAGE;
  const socialTitle = ogTitle || title;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:site_name" content="Tiki Taco Cruises" />
      <meta property="og:title" content={socialTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={socialTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {noindex && <meta name="robots" content="noindex" />}

      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
}
