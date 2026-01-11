import { ChevronDown } from 'lucide-react';
import { useEffect, useRef } from 'react';

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
    <section id="home" className="relative h-screen w-full overflow-hidden">
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
          <source src="/hero-video2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Subtle overlay for better text readability if needed */}
        <div className="hero-video-overlay"></div>
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

        @media (max-width: 768px) {
          .hero-video {
            object-position: center;
          }
        }
      `}</style>
    </section>
  );
}
