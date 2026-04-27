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
  ogImage?: string;
  noindex?: boolean;
}

const DEFAULT_OG_IMAGE = 'https://tikitacocruises.com/fort-lauderdale-hero.jpg';

export default function SEO({ title, description, canonical, ogImage, noindex = false }: SEOProps) {
  const { pathname } = useLocation();
  const url = canonical || `https://tikitacocruises.com${pathname}`;
  const image = ogImage || DEFAULT_OG_IMAGE;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {noindex && <meta name="robots" content="noindex" />}
    </Helmet>
  );
}
