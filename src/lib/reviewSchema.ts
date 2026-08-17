import { GOOGLE_RATING, GOOGLE_REVIEW_COUNT } from '../data/mockData';

/**
 * Product + AggregateRating JSON-LD, per Kosta's 2026-08-13 spec.
 *
 * This is deliberately a SEPARATE block from the existing LocalBusiness /
 * WebSite / WebPage / ItemList @graph on each page — it is emitted through
 * SEO's `extraJsonLd` prop as its own <script>, so none of the existing
 * schema is touched.
 *
 * It must only render on pages that actually display the review widget:
 *   /  ·  /north-bound-scenic-cruise/  ·  /las-olas-boat-tour/
 *   /new-river-cruise/  ·  /fort-lauderdale-sunset-cruise/
 *   /intracoastal-waterway-corporate-cruise/
 *   /pontoon-boat-rental-fort-lauderdale/  ·  /contact-us/
 *
 * The rating and count are read from the same two constants the widget
 * renders from, so the markup can never drift from what's on the page —
 * bump GOOGLE_REVIEW_COUNT in src/data/mockData.ts and both update together.
 */
export const productAggregateRatingSchema: Record<string, unknown> = {
  '@context': 'https://schema.org/',
  '@type': 'Product',
  name: 'Tiki Taco Cruises',
  image: 'https://tikitacocruises.com/tiki-logo-white.png',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: Number(GOOGLE_RATING),
    bestRating: 5,
    worstRating: 1,
    ratingCount: GOOGLE_REVIEW_COUNT,
  },
};
