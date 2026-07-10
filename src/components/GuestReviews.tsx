import { useEffect, useRef, useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '../data/mockData';
import ScrollReveal from './ScrollReveal';

const ROW_COUNT = 2;
const DRIFT_SPEED = 42; // px per second auto-scroll
const CARD_STEP = 344; // card width + gap, used for arrow slides

// Split reviews across rows; each row scrolls continuously and loops.
const rows = Array.from({ length: ROW_COUNT }, (_, r) =>
  testimonials.filter((_, i) => i % ROW_COUNT === r)
);

function ReviewCard({ name, text, date }: (typeof testimonials)[number]) {
  return (
    <div className="review-card bg-white rounded-2xl shadow-md border border-ocean/10 p-5 text-left">
      <div className="text-coral text-sm mb-2" aria-label="5 out of 5 stars">★★★★★</div>
      <p className="text-gray-700 text-sm leading-relaxed review-text">&ldquo;{text}&rdquo;</p>
      <div className="mt-3">
        <p className="text-ocean font-semibold text-sm">{name}</p>
        <p className="text-gray-500 text-xs">{date}</p>
      </div>
    </div>
  );
}

export default function GuestReviews() {
  // The looped second copy of each row exists purely for the seamless
  // marquee, so it's added client-side only — keeping the prerendered
  // HTML at one copy of each review.
  const [isLooping, setIsLooping] = useState(false);
  const rowRefs = useRef<Array<HTMLDivElement | null>>([]);
  const pausedUntilRef = useRef(0);
  const hoverRef = useRef(false);

  useEffect(() => setIsLooping(true), []);

  useEffect(() => {
    if (!isLooping) return;

    const els = rowRefs.current.filter(Boolean) as HTMLDivElement[];
    // Drift positions are tracked as floats: at 60-144fps the per-frame step
    // is under 1px, and reading back element.scrollLeft (which snaps to whole
    // device pixels) would round the movement away entirely.
    const positions = els.map((el) => {
      // Start in the middle of the duplicated content so both directions have room.
      const start = el.scrollWidth / 2;
      el.scrollLeft = start;
      return start;
    });

    let raf = 0;
    let last = performance.now();
    const step = (now: number) => {
      // Clamp dt so throttled/background tabs don't cause a jump on return.
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      const drifting = !hoverRef.current && now > pausedUntilRef.current;
      els.forEach((el, i) => {
        let pos = positions[i];
        // If the user scrolled this row (swipe/arrows), adopt their position.
        if (Math.abs(el.scrollLeft - pos) > 1.5) {
          pos = el.scrollLeft;
        }
        if (drifting) {
          pos += (i % 2 === 1 ? -1 : 1) * DRIFT_SPEED * dt;
        }
        // Seamless-loop wrap: both halves are identical, so a jump of half
        // the track width is invisible.
        const half = el.scrollWidth / 2;
        if (half > 0) {
          if (pos < 200) pos += half;
          else if (pos > half + 200) pos -= half;
        }
        positions[i] = pos;
        el.scrollLeft = pos;
      });
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [isLooping]);

  const slide = (direction: -1 | 1) => {
    // Pause the drift briefly so the manual slide isn't fought. Native smooth
    // scrolling gets cancelled by the drift/wrap scrollLeft writes, so the
    // slide is animated manually with incremental steps (which survive the
    // seamless-loop wrap jumps).
    pausedUntilRef.current = performance.now() + 3000;
    const delta = direction * CARD_STEP;
    const duration = 400;
    const start = performance.now();
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    let applied = 0;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = easeOut(t) * delta;
      const increment = eased - applied;
      applied = eased;
      rowRefs.current.forEach((el) => {
        if (el) el.scrollLeft += increment;
      });
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  return (
    <section id="testimonials" className="py-12 sm:py-16 md:py-20 bg-sand overflow-hidden">
      <div className="max-w-4xl mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-8 sm:mb-10">
            <div className="flex items-center justify-center gap-1 sm:gap-1.5 mb-3" aria-hidden="true">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-8 h-8 sm:w-10 sm:h-10 fill-[#FFC94A] text-[#FFC94A] drop-shadow-sm" />
              ))}
            </div>
            <p className="text-lg sm:text-xl font-bold text-ocean mb-2">
              5.0 Stars · 88 Google Reviews
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ocean mb-3 sm:mb-4">
              What Guests Say About Our Tiki Cruises
            </h2>
            <p className="text-base sm:text-lg text-gray-700">
              Real experiences from real people
            </p>
          </div>
        </ScrollReveal>
      </div>

      <div
        className="relative"
        onMouseOver={(e) => { hoverRef.current = !!(e.target as Element).closest('.review-card'); }}
        onMouseLeave={() => { hoverRef.current = false; }}
      >
        <div className="space-y-4">
          {rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="marquee-row"
              ref={(el) => { rowRefs.current[rowIndex] = el; }}
              onTouchStart={() => { pausedUntilRef.current = performance.now() + 4000; }}
            >
              <div className="marquee-track">
                {(isLooping ? [...row, ...row] : row).map((review, i) => (
                  <ReviewCard key={`${review.id}-${i}`} {...review} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => slide(-1)}
          aria-label="Previous reviews"
          className="marquee-arrow left-2 sm:left-4"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          type="button"
          onClick={() => slide(1)}
          aria-label="Next reviews"
          className="marquee-arrow right-2 sm:right-4"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="mt-10 text-center px-4">
        <a
          href="https://www.google.com/maps?cid=1115630382324282086"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-ocean hover:bg-ocean/90 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full transition-colors"
        >
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap justify-center">
            <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-coral text-coral" />
            <span className="font-bold text-lg sm:text-xl">5.0</span>
            <span className="text-white/80 text-sm sm:text-base">from 88 Google reviews</span>
          </div>
        </a>
      </div>

      <style>{`
        .marquee-row {
          overflow-x: auto;
          scrollbar-width: none;
          -webkit-mask-image: linear-gradient(to right, transparent, black 6%, black 94%, transparent);
          mask-image: linear-gradient(to right, transparent, black 6%, black 94%, transparent);
        }

        .marquee-row::-webkit-scrollbar {
          display: none;
        }

        .marquee-track {
          display: flex;
          width: max-content;
        }

        .review-card {
          width: 320px;
          flex-shrink: 0;
          margin-right: 16px;
        }

        .review-text {
          display: -webkit-box;
          -webkit-line-clamp: 5;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .marquee-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          width: 44px;
          height: 44px;
          border-radius: 999px;
          border: none;
          cursor: pointer;
          background: white;
          color: #1a365d;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.18);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s, background 0.2s, color 0.2s;
        }

        .marquee-arrow:hover {
          background: #FF6B6B;
          color: white;
          transform: translateY(-50%) scale(1.08);
        }

        @media (max-width: 640px) {
          .review-card {
            width: 260px;
          }
        }
      `}</style>
    </section>
  );
}
