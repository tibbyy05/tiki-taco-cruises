import { ChevronDown } from 'lucide-react';
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
        <video
          ref={videoRef}
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/DJI_0062.JPG"
        >
          <source src="https://vjiybpiuquttbaimywbt.supabase.co/storage/v1/object/public/Website%20Stuff/Tiki%20Taco%20Website/HeroVideo2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Subtle overlay for better text readability if needed */}
        <div className="hero-video-overlay"></div>
      </div>

      <div className="hero-content">
        <span className="hero-badge">Fort Lauderdale’s Premier Tiki Cruise</span>
        <h1>Unforgettable Tiki Boat Adventures</h1>
        <p>Sunset cruises, sandbar parties, and private pontoon experiences — all from The Hilton Marina.</p>
        <div className="hero-actions">
          <button
            type="button"
            onClick={() => {
              const bookingSection = document.getElementById('booking');
              bookingSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              const modalOpener = (window as { openBookingModal?: () => void }).openBookingModal;
              if (modalOpener) {
                modalOpener();
              } else {
                window.location.hash = '';
                window.location.hash = 'booking';
              }
            }}
            className="hero-cta magnetic-btn"
            data-magnetic
          >
            Book Now
          </button>
          <button className="hero-secondary magnetic-btn" onClick={scrollToRoutes} data-magnetic>
            Explore Destinations
          </button>
        </div>
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

        .hero-video {
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
          .hero-video {
            object-position: center 70%;
          }
        }
      `}</style>
    </section>
  );
}
