import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Phone, CalendarCheck } from 'lucide-react';
import { openBookingFlow } from './Hero';

export default function StickyCallBar() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (location.pathname.startsWith('/admin')) {
      setIsScrolled(false);
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      {/* Mobile: persistent two-button bottom bar */}
      <div
        className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-coral shadow-[0_-4px_16px_rgba(0,0,0,0.25)] grid grid-cols-2 divide-x divide-white/25"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <a
          href="tel:+19547644344" suppressHydrationWarning
          className="flex items-center justify-center gap-2 text-white font-semibold text-sm py-3.5 min-h-[52px] active:bg-coral/80"
          data-gtm-id="call-to-book"
        >
          <Phone className="w-4 h-4" /> Call Now
        </a>
        <button
          onClick={openBookingFlow}
          className="flex items-center justify-center gap-2 text-white font-semibold text-sm py-3.5 min-h-[52px] active:bg-coral/80"
          data-gtm-id="book-now"
        >
          <CalendarCheck className="w-4 h-4" /> Check Availability
        </button>
      </div>

      {/* Desktop/tablet: floating pill after scrolling */}
      <div
        className={`hidden md:block fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
          isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'
        }`}
      >
        <a
          href="tel:+19547644344" suppressHydrationWarning
          className="bg-coral hover:bg-coral/90 text-white px-5 sm:px-7 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 text-sm sm:text-base magnetic-btn shadow-xl whitespace-nowrap inline-flex items-center gap-2 min-h-[44px]"
          data-magnetic
          data-gtm-id="call-to-book"
        >
          <Phone className="w-4 h-4 sm:w-5 sm:h-5" /> Call to Book — (954) 764-4344
        </a>
      </div>
    </>
  );
}
