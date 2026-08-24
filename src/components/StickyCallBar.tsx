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
      {/* Mobile: two-button bottom bar — slides in once the visitor scrolls,
          so it can't sit under (or get fat-fingered with) the browser's own
          bottom toolbar while the page is at rest */}
      <div
        className={`md:hidden fixed bottom-0 inset-x-0 z-50 bg-coral shadow-[0_-4px_16px_rgba(0,0,0,0.25)] transition-transform duration-300 ${
          isScrolled ? 'translate-y-0 visible' : 'translate-y-full invisible'
        }`}
      >
        {/* Fixed-height row so the bar is one size at every scroll position.
            The !text-sm is required: index.css forces every <button> under
            768px to 16px !important (iOS zoom guard), which otherwise makes
            this half's label larger than the <a> half's. */}
        <div className="grid grid-cols-2 divide-x divide-white/25 h-[52px]">
          <a
            href="tel:+19547644344" suppressHydrationWarning
            className="flex items-center justify-center gap-2 text-white font-semibold !text-sm leading-none active:bg-coral/80"
            data-gtm-id="call-to-book"
          >
            <Phone className="w-4 h-4 flex-shrink-0" /> Call Now
          </a>
          <button
            onClick={openBookingFlow}
            className="flex items-center justify-center gap-2 text-white font-semibold !text-sm leading-none active:bg-coral/80"
            data-gtm-id="book-now"
          >
            <CalendarCheck className="w-4 h-4 flex-shrink-0" /> Check Availability
          </button>
        </div>
        {/* Home-indicator inset painted separately so it can never change the
            height of the touch row above it */}
        <div style={{ height: 'env(safe-area-inset-bottom)' }} aria-hidden="true" />
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
          <Phone className="w-4 h-4 sm:w-5 sm:h-5" /><span className="cr-number" suppressHydrationWarning>Call to Book — (954) 764-4344</span>
        </a>
      </div>
    </>
  );
}
