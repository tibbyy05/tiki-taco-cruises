import { BrowserRouter, Routes as RouterRoutes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import { useEffect, useState } from 'react';
import Home from './pages/Home';
import LasOlasCruise from './pages/destinations/LasOlasCruise';
import SandbarParty from './pages/destinations/SandbarParty';
import IntracoastalTour from './pages/destinations/IntracoastalTour';
import BeachCoastCruise from './pages/destinations/BeachCoastCruise';
import FullWaterwayTour from './pages/destinations/FullWaterwayTour';
import Destinations from './pages/Destinations';
import Gallery from './pages/Gallery';
import FAQ from './pages/FAQ';
import AdminLogin from './pages/AdminLogin';
import AdminGallery from './pages/AdminGallery';
import ProtectedRoute from './components/ProtectedRoute';
import PageTransition from './components/PageTransition';
import LoadingScreen from './components/LoadingScreen';
import StickyBookingBar from './components/StickyBookingBar';

function AppRoutes() {
  const location = useLocation();

  useEffect(() => {
    if ('ontouchstart' in window) {
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

  return (
    <AnimatePresence mode="wait">
      <RouterRoutes location={location} key={location.pathname}>
        {/* Home */}
        <Route
          path="/"
          element={(
            <PageTransition>
              <Home />
            </PageTransition>
          )}
        />
        
        {/* Destinations Overview */}
        <Route
          path="/destinations"
          element={(
            <PageTransition>
              <Destinations />
            </PageTransition>
          )}
        />
        
        {/* Individual Destinations */}
        <Route
          path="/destinations/las-olas-cruise"
          element={(
            <PageTransition>
              <LasOlasCruise />
            </PageTransition>
          )}
        />
        <Route
          path="/destinations/sandbar-party"
          element={(
            <PageTransition>
              <SandbarParty />
            </PageTransition>
          )}
        />
        <Route
          path="/destinations/intracoastal-tour"
          element={(
            <PageTransition>
              <IntracoastalTour />
            </PageTransition>
          )}
        />
        <Route
          path="/destinations/beach-coast-cruise"
          element={(
            <PageTransition>
              <BeachCoastCruise />
            </PageTransition>
          )}
        />
        <Route
          path="/destinations/full-waterway-tour"
          element={(
            <PageTransition>
              <FullWaterwayTour />
            </PageTransition>
          )}
        />
        
        {/* Gallery */}
        <Route
          path="/gallery"
          element={(
            <PageTransition>
              <Gallery />
            </PageTransition>
          )}
        />
        
        {/* FAQ */}
        <Route
          path="/faq"
          element={(
            <PageTransition>
              <FAQ />
            </PageTransition>
          )}
        />
        
        {/* Admin */}
        <Route
          path="/admin"
          element={(
            <PageTransition>
              <AdminLogin />
            </PageTransition>
          )}
        />
        <Route
          path="/admin/gallery"
          element={(
            <ProtectedRoute>
              <PageTransition>
                <AdminGallery />
              </PageTransition>
            </ProtectedRoute>
          )}
        />
        
        {/* Legacy redirect - keeps old /routes links working */}
        <Route
          path="/routes"
          element={(
            <PageTransition>
              <Destinations />
            </PageTransition>
          )}
        />
      </RouterRoutes>
    </AnimatePresence>
  );
}

function App() {
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    const hasSeenLoader = sessionStorage.getItem('tiki-taco-loader');
    if (!hasSeenLoader) {
      setShowLoading(true);
      sessionStorage.setItem('tiki-taco-loader', 'true');
    }
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        {showLoading && (
          <LoadingScreen onFinish={() => setShowLoading(false)} />
        )}
        <AppRoutes />
        <StickyBookingBar />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;