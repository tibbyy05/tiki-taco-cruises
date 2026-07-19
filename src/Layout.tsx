import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import ScrollToTop from './components/ScrollToTop';
import StickyCallBar from './components/StickyCallBar';
import { trackPageView, trackCtaClick } from './lib/trackPageView';

function PageViewTracker() {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);

  // Delegated CTA click tracking; capture phase so stopPropagation in
  // button handlers can't hide clicks from us.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const el = (event.target as Element | null)?.closest?.('[data-gtm-id]');
      if (el) trackCtaClick(el.getAttribute('data-gtm-id') ?? '');
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return null;
}

function MagneticCursor() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined' || 'ontouchstart' in window) {
      return;
    }

    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-magnetic]'));
    const handlers = elements.map((element) => {
      const handleMove = (event: MouseEvent) => {
        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        const moveX = Math.max(Math.min(x / 6, 12), -12);
        const moveY = Math.max(Math.min(y / 6, 12), -12);
        element.style.transform = `translate(${moveX}px, ${moveY}px)`;
      };

      const handleLeave = () => {
        element.style.transform = 'translate(0, 0)';
      };

      element.addEventListener('mousemove', handleMove);
      element.addEventListener('mouseleave', handleLeave);
      element.style.willChange = 'transform';

      return { element, handleMove, handleLeave };
    });

    return () => {
      handlers.forEach(({ element, handleMove, handleLeave }) => {
        element.removeEventListener('mousemove', handleMove);
        element.removeEventListener('mouseleave', handleLeave);
        element.style.willChange = '';
      });
    };
  }, [location.pathname]);

  return null;
}

export default function Layout() {
  const location = useLocation();

  return (
    <AuthProvider>
      <ScrollToTop />
      <MagneticCursor />
      <PageViewTracker />
      <AnimatePresence mode="wait">
        <div key={location.pathname}>
          <Outlet />
        </div>
      </AnimatePresence>
      <StickyCallBar />
    </AuthProvider>
  );
}
