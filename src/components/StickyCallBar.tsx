import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Phone } from 'lucide-react';

export default function StickyCallBar() {
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

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'
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
  );
}
