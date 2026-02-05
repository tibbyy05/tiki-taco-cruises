import { ChevronDown } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure video plays when component mounts
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log('Video autoplay prevented:', error);
      });
    }
  }, []);

  const scrollToRoutes = () => {
    const routesSection = document.getElementById('routes');
    routesSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative h-[100svh] w-full overflow-hidden">
      {/* Fullscreen Video Background */}
      <div className="absolute inset-0 hero-video-container">
        <video
          ref={videoRef}
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
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
          <Link to="/#booking" className="hero-cta">
            Book Now
          </Link>
          <button className="hero-secondary" onClick={scrollToRoutes}>
            Explore Destinations
          </button>
        </div>
      </div>

      {/* Scroll down indicator */}
      <button
        onClick={scrollToRoutes}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white animate-bounce min-h-[44px] min-w-[44px] flex items-center justify-center z-20 hover:scale-110 transition-transform"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-8 h-8" />
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
        }

        .hero-video-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.1) 0%,
            rgba(0, 0, 0, 0) 20%,
            rgba(0, 0, 0, 0) 80%,
            rgba(0, 0, 0, 0.2) 100%
          );
          pointer-events: none;
          z-index: 1;
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
          transform: translateY(-50%);
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
          text-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
        }

        .hero-content p {
          font-size: clamp(1rem, 2.3vw, 1.25rem);
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 28px;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 16px;
        }

        .hero-cta {
          background: #FF6B6B;
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

        @media (max-width: 768px) {
          .hero-video {
            object-position: center 70%;
          }
        }
      `}</style>
    </section>
  );
}
