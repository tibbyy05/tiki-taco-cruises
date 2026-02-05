import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function StickyBookingBar() {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [hideForBooking, setHideForBooking] = useState(false);

  useEffect(() => {
    if (location.pathname.startsWith('/admin')) {
      setIsVisible(false);
      return;
    }

    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname !== '/') {
      setHideForBooking(false);
      return;
    }

    const bookingSection = document.getElementById('booking');
    if (!bookingSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHideForBooking(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    observer.observe(bookingSection);
    return () => observer.disconnect();
  }, [location.pathname]);

  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  const handleClick = () => {
    if (location.pathname === '/') {
      const modalOpener = (window as { openBookingModal?: () => void }).openBookingModal;
      const bookingSection = document.getElementById('booking');
      bookingSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (modalOpener) {
        modalOpener();
      } else {
        window.location.hash = '';
        window.location.hash = 'booking';
      }
      return;
    }
    sessionStorage.setItem('open-booking-modal', 'true');
    window.location.href = '/#booking';
  };

  const shouldShow = isVisible && !hideForBooking;

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        shouldShow ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'
      }`}
    >
      <div className="bg-white/95 backdrop-blur-md shadow-xl border border-black/5 rounded-full px-4 py-2 sm:px-6 sm:py-3 flex items-center gap-3 sm:gap-4">
        <div className="hidden sm:flex flex-col leading-tight">
          <span className="text-xs uppercase tracking-[0.2em] text-gray-500">Book Now</span>
          <span className="text-sm sm:text-base font-semibold text-ocean">
            From $285/hr • 3-hour minimum
          </span>
        </div>
        <button
          onClick={handleClick}
          className="bg-coral hover:bg-coral/90 text-white px-4 sm:px-6 py-2 rounded-full font-semibold transition-all duration-300 hover:scale-105 text-sm sm:text-base magnetic-btn"
          data-magnetic
        >
          Reserve
        </button>
      </div>
    </div>
  );
}
