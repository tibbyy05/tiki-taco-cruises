import { Star } from 'lucide-react';
import { testimonials, GOOGLE_RATING, GOOGLE_REVIEW_COUNT } from '../data/mockData';
import ScrollReveal from './ScrollReveal';

// Compact counterpart to <GuestReviews>, for the service pages and /contact-us.
// The homepage keeps the full marquee; this one is a static three-card strip so
// it adds no animation cost to pages whose job is conversion.
//
// Rating, count and review text all come from src/data/mockData.ts — the same
// single source the homepage widget and the Product/AggregateRating JSON-LD
// read from, so the three can never disagree.
const CARD_COUNT = 3;

const GOOGLE_MAPS_URL = 'https://www.google.com/maps?cid=1115630382324282086';

/** Google's four-colour "G". Inlined because we ship no external logo assets. */
function GoogleG({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

export default function CompactReviews() {
  const reviews = testimonials.slice(0, CARD_COUNT);

  return (
    <section className="py-12 sm:py-16 px-4 bg-sand">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          {/* Header: rating, count, and an unambiguous "Google Reviews" label */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="flex items-center gap-2 mb-2">
              <GoogleG className="w-6 h-6 sm:w-7 sm:h-7" />
              <span className="text-ocean font-semibold text-base sm:text-lg">Google Reviews</span>
            </div>

            <div className="flex items-center gap-2 flex-wrap justify-center">
              <span className="text-2xl sm:text-3xl font-bold text-ocean">{GOOGLE_RATING}</span>
              <span className="flex items-center gap-0.5" aria-hidden="true">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 sm:w-6 sm:h-6 fill-[#FFC94A] text-[#FFC94A]" />
                ))}
              </span>
              <span className="text-gray-700 text-sm sm:text-base">
                {`from ${GOOGLE_REVIEW_COUNT} Google reviews`}
              </span>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl shadow-md border border-ocean/10 p-5 text-left flex flex-col"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-coral text-sm" aria-label="5 out of 5 stars">★★★★★</span>
                <GoogleG className="w-4 h-4 shrink-0" />
              </div>
              <p className="text-gray-700 text-sm leading-relaxed compact-review-text">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="mt-3 pt-3 border-t border-ocean/5">
                <p className="text-ocean font-semibold text-sm">{review.name}</p>
                <p className="text-gray-500 text-xs">{review.date}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-2 border-ocean text-ocean hover:bg-ocean hover:text-white font-semibold px-6 py-2.5 rounded-full transition-colors"
          >
            <GoogleG className="w-4 h-4" />
            {`Read all ${GOOGLE_REVIEW_COUNT} reviews on Google`}
          </a>
        </div>
      </div>

      <style>{`
        .compact-review-text {
          display: -webkit-box;
          -webkit-line-clamp: 6;
          -webkit-box-orient: vertical;
          overflow: hidden;
          flex: 1 1 auto;
        }
      `}</style>
    </section>
  );
}
