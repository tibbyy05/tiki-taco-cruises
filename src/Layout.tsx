import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import LoadingScreen from './components/LoadingScreen';
import ScrollToTop from './components/ScrollToTop';

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
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    const hasSeenLoader = sessionStorage.getItem('tiki-taco-loader');
    if (!hasSeenLoader) {
      setShowLoading(true);
      sessionStorage.setItem('tiki-taco-loader', 'true');
    }
  }, []);

  return (
    <AuthProvider>
      <ScrollToTop />
      <MagneticCursor />
      {showLoading && (
        <LoadingScreen onFinish={() => setShowLoading(false)} />
      )}
      <AnimatePresence mode="wait">
        <div key={location.pathname}>
          <Outlet />
        </div>
      </AnimatePresence>
    </AuthProvider>
  );
}
