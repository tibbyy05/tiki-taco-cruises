import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function StickyBookingBar() {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'
      }`}
    >
      <button
        onClick={handleClick}
        className="bg-coral hover:bg-coral/90 text-white px-5 sm:px-7 py-2.5 sm:py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 text-sm sm:text-base magnetic-btn shadow-xl"
        data-magnetic
        data-gtm-id="book-now"
      >
        Book Now $285/Hour
      </button>
    </div>
  );
}
