import { ChevronDown, Phone } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const [parallaxOffset, setParallaxOffset] = useState(0);

  useEffect(() => {
    // Ensure video plays when component mounts
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log('Video autoplay prevented:', error);
      });
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollHint(window.scrollY < 100);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleParallax = () => {
      const offset = Math.min(window.scrollY * 0.2, 40);
      setParallaxOffset(offset);
    };

    handleParallax();
    window.addEventListener('scroll', handleParallax);
    return () => window.removeEventListener('scroll', handleParallax);
  }, []);

  const scrollToRoutes = () => {
    const routesSection = document.getElementById('routes');
    routesSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative h-[100svh] w-full overflow-hidden"
      style={
        {
          '--hero-parallax': `${parallaxOffset}px`,
          '--hero-overlay-parallax': `${parallaxOffset * 0.4}px`
        } as React.CSSProperties
      }
    >
      {/* Fullscreen Video Background */}
      <div className="absolute inset-0 hero-video-container">
        {/* Static poster rendered as a real <img> so the page always has an
            LCP candidate — a bare autoplay video emits none in headless
            Chrome, which made Lighthouse/PageSpeed fail with NO_FCP. The
            video paints over it once frames decode. */}
        <img
          src="/hero-poster.jpg"
          alt="Aerial view of the Fort Lauderdale Intracoastal Waterway"
          className="hero-poster"
          decoding="async"
        />
        <video
          ref={videoRef}
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src="https://vjiybpiuquttbaimywbt.supabase.co/storage/v1/object/public/Website%20Stuff/Tiki%20Taco%20Website/HeroVideo2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Subtle overlay for better text readability if needed */}
        <div className="hero-video-overlay"></div>
      </div>

      <div className="hero-content">
        <span className="hero-badge">Made for Big Celebrations – Up to 18 Guests</span>
        <h1>Fort Lauderdale Tiki Cruise & Private Boat Tour</h1>
        <p>Experience Fort Lauderdale from the water with a private tiki cruise designed for relaxation, celebration, and unforgettable views.</p>
        <div className="hero-actions">
          <a
            href="tel:+19547644344" suppressHydrationWarning
            className="hero-cta magnetic-btn"
            data-magnetic
            data-gtm-id="call-to-book"
          >
            <Phone className="w-5 h-5" /> Call to Book — (954) 764-4344
          </a>
          <a href="/cruise-destinations/" className="hero-secondary magnetic-btn" data-magnetic>
            View All Cruises
          </a>
        </div>
        <a
          href="https://www.google.com/maps?cid=1115630382324282086"
          target="_blank"
          rel="noreferrer"
          className="hero-reviews"
          aria-label="Rated 5.0 from 88 Google reviews — read them on Google Maps"
        >
          <span className="hero-reviews-stars" aria-hidden="true">★★★★★</span>
          <span className="hero-reviews-text">5.0 · 88 Google Reviews</span>
        </a>
      </div>

      {/* Scroll down indicator */}
      <button
        onClick={scrollToRoutes}
        className={`hero-scroll-hint ${showScrollHint ? 'is-visible' : ''}`}
        aria-label="Explore our cruises"
      >
        <span className="hero-scroll-text">Explore Our Cruises</span>
        <ChevronDown className="w-6 h-6" />
      </button>

      <style>{`
        .hero-video-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .hero-poster {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }

        .hero-video {
          position: relative;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          /* Keep video stable to avoid perceived shake on playback */
          transform: translateZ(0);
          will-change: transform;
        }

        .hero-video-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.15) 0%,
            rgba(0, 0, 0, 0.5) 100%
          );
          pointer-events: none;
          z-index: 1;
          transform: translateY(var(--hero-overlay-parallax));
        }

        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 720px;
          margin: 0 auto;
          padding: 0 24px;
          text-align: center;
          color: white;
          top: 50%;
          transform: translateY(calc(-50% + var(--hero-parallax)));
          animation: heroFadeUp 1.1s ease-out both;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 999px;
          background: rgba(30, 58, 95, 0.7);
          font-size: 0.85rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 16px;
        }

        .hero-content h1 {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 800;
          margin-bottom: 16px;
          text-shadow: 0 2px 20px rgba(0, 0, 0, 0.5);
        }

        .hero-content p {
          font-size: clamp(1rem, 2.3vw, 1.25rem);
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 28px;
          text-shadow: 0 2px 20px rgba(0, 0, 0, 0.5);
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 16px;
        }

        .hero-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          white-space: nowrap;
          background: rgba(255, 107, 107, 0.85);
          backdrop-filter: blur(10px);
          color: white;
          padding: 14px 36px;
          border-radius: 999px;
          font-weight: 700;
          text-decoration: none;
          box-shadow: 0 12px 30px rgba(255, 107, 107, 0.35);
          transition: transform 0.3s, box-shadow 0.3s;
          animation: heroPulse 2.8s ease-in-out infinite;
        }

        .hero-cta:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 16px 38px rgba(255, 107, 107, 0.45);
        }

        .hero-secondary {
          background: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.35);
          color: white;
          padding: 14px 28px;
          border-radius: 999px;
          font-weight: 600;
          transition: background 0.3s, transform 0.3s;
        }

        .hero-secondary:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: translateY(-2px);
        }

        @keyframes heroFadeUp {
          from {
            opacity: 0;
            transform: translateY(-40%);
          }
          to {
            opacity: 1;
            transform: translateY(-50%);
          }
        }

        @keyframes heroPulse {
          0%, 100% {
            box-shadow: 0 12px 30px rgba(255, 107, 107, 0.35);
          }
          50% {
            box-shadow: 0 18px 45px rgba(255, 107, 107, 0.55);
          }
        }

        .hero-reviews {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 18px;
          padding: 6px 14px;
          border-radius: 999px;
          background: rgba(0, 0, 0, 0.35);
          backdrop-filter: blur(6px);
          color: white;
          font-size: 0.9rem;
          font-weight: 600;
          text-decoration: none;
          transition: background 0.3s;
        }

        .hero-reviews:hover {
          background: rgba(0, 0, 0, 0.5);
        }

        .hero-reviews-stars {
          color: #FFC94A;
          letter-spacing: 2px;
          font-size: 0.95rem;
          line-height: 1;
        }

        .hero-scroll-hint {
          position: absolute;
          bottom: 28px;
          left: 50%;
          transform: translateX(-50%);
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          color: white;
          background: transparent;
          border: none;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
          z-index: 20;
        }

        .hero-scroll-hint.is-visible {
          opacity: 1;
          pointer-events: auto;
        }

        .hero-scroll-text {
          font-size: 0.75rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .hero-scroll-hint svg {
          animation: scrollBounce 1.6s ease-in-out infinite;
        }

        @keyframes scrollBounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(8px);
          }
        }

        @media (max-width: 768px) {
          .hero-video,
          .hero-poster {
            object-position: center 70%;
          }
        }

        /* Compact hero stack on small screens so the badge clears the fixed
           nav + banner and the reviews pill clears the scroll hint */
        @media (max-width: 640px) {
          .hero-content {
            top: 53%;
          }

          .hero-badge {
            font-size: 0.7rem;
            margin-bottom: 10px;
          }

          .hero-content h1 {
            font-size: 1.9rem;
            margin-bottom: 10px;
          }

          .hero-content p {
            font-size: 0.9rem;
            margin-bottom: 16px;
          }

          .hero-actions {
            gap: 10px;
          }

          .hero-cta,
          .hero-secondary {
            padding: 10px 22px;
            font-size: 0.9rem;
          }

          .hero-reviews {
            margin-top: 12px;
            padding: 4px 12px;
            font-size: 0.8rem;
            gap: 6px;
          }

          .hero-reviews-stars {
            font-size: 0.85rem;
          }

          .hero-scroll-hint {
            bottom: 12px;
          }

          .hero-scroll-text {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
