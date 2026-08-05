import { useEffect, useState } from 'react';
import { Phone, Users, Clock, Anchor, Snowflake, Fuel, Music2 } from 'lucide-react';
import { GOOGLE_RATING, GOOGLE_REVIEW_COUNT } from '../data/mockData';

const slides = [
  { src: '/hero-slide-1.jpg', alt: 'Guests boarding a Tiki Taco cruise at the dock in Fort Lauderdale' },
  { src: '/hero-slide-2.jpg', alt: 'Group celebrating on board a Tiki Taco cruise' },
  { src: '/hero-slide-3.jpg', alt: 'Friends celebrating on the water in Fort Lauderdale' },
  { src: '/hero-slide-4.jpg', alt: 'Group enjoying a sunset Tiki Taco cruise' },
  { src: '/hero-slide-5.jpg', alt: 'Guests swimming at a Fort Lauderdale sandbar next to the Tiki Taco boat' },
];

const SLIDE_INTERVAL_MS = 4500;

function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [paused]);

  return (
    <div
      className="relative w-full sm:w-11/12 lg:w-full max-w-[545px] sm:max-w-[620px] lg:max-w-[880px] aspect-square lg:aspect-auto lg:h-[clamp(420px,60vh,700px)] rounded-2xl shadow-2xl ring-1 ring-white/15 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((slide, i) => (
        <picture key={slide.src}>
          <source type="image/webp" srcSet={slide.src.replace('.jpg', '.webp')} />
          <img
            src={slide.src}
            alt={slide.alt}
            width={1000}
            height={1000}
            loading={i === 0 ? 'eager' : 'lazy'}
            decoding="async"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              i === active ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </picture>
      ))}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Show photo ${i + 1}`}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === active ? 'w-6 bg-white' : 'w-2.5 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

const features = [
  { icon: Users, title: 'Up to 18 Guests', detail: 'Private group cruises' },
  { icon: Clock, title: '2 or 4 Hours', detail: 'Morning, Afternoon, Sunset & More' },
  { icon: Anchor, title: 'Licensed Captain', detail: 'USCG Licensed & Experienced' },
  { icon: Snowflake, title: 'Ice & Cooler', detail: 'Included at no extra charge' },
  { icon: Fuel, title: 'Fuel Included', detail: 'No hidden fees or surprises' },
  { icon: Music2, title: 'Bluetooth Sound', detail: 'Connect & play your favorite tunes' },
];

export function openBookingFlow() {
  if (window.location.pathname === '/') {
    const bookingSection = document.getElementById('booking');
    bookingSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.dispatchEvent(new CustomEvent('open-booking-modal'));
    const modalOpener = (window as { openBookingModal?: () => void }).openBookingModal;
    modalOpener?.();
    return;
  }
  sessionStorage.setItem('open-booking-modal', 'true');
  window.location.href = '/#booking';
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative w-full overflow-hidden flex flex-col min-h-[100svh]"
      style={{ background: 'radial-gradient(ellipse at 30% 20%, #14304f 0%, #0a192f 70%)' }}
    >
      {/* Mobile-only full-bleed photo behind the text (desktop uses the
          framed carousel instead) */}
      <div className="absolute inset-0 lg:hidden">
        {/* contain + top anchor shows the whole photo (no zoom-crop); the
            navy section background fills the space below it */}
        <picture>
          {/* Explicit media split (not srcset densities): high-DPR phones
              would otherwise pull the 1000px file — 750px is plenty for a
              ~390px-wide viewport and 40% smaller. */}
          <source media="(max-width: 640px)" type="image/webp" srcSet="/hero-slide-1-mobile.webp" />
          <source type="image/webp" srcSet="/hero-slide-1.webp" />
          <source media="(max-width: 640px)" srcSet="/hero-slide-1-mobile.jpg" />
          <img
            src="/hero-slide-1.jpg"
            width={1000}
            height={1000}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-contain object-top"
            decoding="async"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a192f]/25 via-[#0a192f]/60 to-[#0a192f]" />
      </div>

      {/* Text + photo card — mobile content hugs the bottom so the photo
          stays visible above it */}
      <div className="relative flex-1 flex items-end lg:items-center w-full">
        <div className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-12 pt-40 sm:pt-40 md:pt-44 pb-4 lg:pb-10 grid lg:grid-cols-[1fr_1.7fr] items-center gap-10 lg:gap-12">
          <div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left text-white">
            <p className="text-[0.6rem] sm:text-xs font-semibold tracking-[0.25em] uppercase text-white/85 mb-2.5 sm:mb-4">
              Private <span className="text-coral">•</span> Captained <span className="text-coral">•</span> Up to 18 Guests
            </p>
            <h1 className="font-bold leading-[1.05] text-[1.9rem] sm:text-6xl lg:text-[3.6rem] mb-3 sm:mb-5">
              Your Private<br />
              <span className="text-coral">Fort Lauderdale</span><br />
              Tiki Cruise{' '}
              <svg
                viewBox="0 0 48 14"
                className="inline-block w-9 h-auto align-baseline text-teal"
                aria-hidden="true"
              >
                <path d="M2 8 Q8 2 14 8 T26 8 T38 8 T50 8" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </h1>
            <p className="text-sm sm:text-lg text-white/90 leading-relaxed mb-4 sm:mb-7 max-w-md mx-auto lg:mx-0">
              Cruise the scenic waterways of Fort Lauderdale on a private tiki boat with a
              licensed captain. Perfect for parties, sandbar days, sightseeing, and
              unforgettable celebrations.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-4 mb-4 sm:mb-6">
              <a
                href="tel:+19547644344" suppressHydrationWarning
                className="w-full sm:w-auto justify-center bg-coral hover:bg-coral/90 text-white px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-lg font-semibold text-sm sm:text-base inline-flex items-center gap-2 transition-all duration-300 hover:scale-[1.03] shadow-lg shadow-coral/30 min-h-[44px] sm:min-h-[48px] magnetic-btn"
                data-magnetic
                data-gtm-id="call-to-book"
              >
                <Phone className="w-5 h-5" /><span className="cr-number" suppressHydrationWarning>Call to Book — (954) 764-4344</span>
              </a>
              <a
                href="/cruise-destinations/"
                className="w-full sm:w-auto justify-center border border-white/50 hover:border-white hover:bg-white/10 text-white px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-lg font-semibold text-sm sm:text-base inline-flex items-center transition-all duration-300 min-h-[44px] sm:min-h-[48px]"
                data-gtm-id="learn-more"
              >
                Compare Cruises
              </a>
            </div>
            <a
              href="https://www.google.com/maps?cid=1115630382324282086"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-white/90 hover:text-white transition-colors"
              aria-label={`Rated ${GOOGLE_RATING} from ${GOOGLE_REVIEW_COUNT} Google reviews — read them on Google Maps`}
            >
              <span className="text-[#FFC94A] tracking-[0.15em] text-base" aria-hidden="true">★★★★★</span>
              <span className="font-semibold">{GOOGLE_RATING}</span>
              <span className="text-white/70">{`from ${GOOGLE_REVIEW_COUNT} Google Reviews`}</span>
            </a>
          </div>

          {/* Framed photo carousel (desktop) — slide 1 is an eager real <img>
              so the page always has an LCP candidate; without one PageSpeed
              fails (NO_FCP). On mobile the full-bleed background above serves
              that role. */}
          <div className="hidden lg:flex justify-center lg:justify-end">
            <HeroCarousel />
          </div>
        </div>
      </div>

      {/* Feature strip */}
      <div className="relative w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pb-20 md:pb-8">
          <div className="bg-[#0c1f3a]/90 backdrop-blur-sm border border-white/10 rounded-2xl grid grid-cols-6 divide-x divide-white/10">
            {features.map((f) => (
              <div key={f.title} className="flex flex-col items-center text-center gap-1 px-1 py-2.5 lg:flex-row lg:items-start lg:text-left lg:gap-3 lg:px-4 lg:py-4">
                <f.icon className="w-4 h-4 lg:w-5 lg:h-5 text-teal flex-shrink-0 lg:mt-0.5" aria-hidden="true" />
                <div>
                  <div className="text-white text-[0.5rem] sm:text-[0.65rem] lg:text-xs font-bold tracking-wide uppercase leading-tight">{f.title}</div>
                  <div className="text-white/60 text-[0.45rem] sm:text-[0.6rem] lg:text-xs leading-snug mt-0.5">{f.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
