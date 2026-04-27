import { BrowserRouter, Routes as RouterRoutes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import { useEffect, useState } from 'react';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import FAQ from './pages/FAQ';
import AdminLogin from './pages/AdminLogin';
import AdminGallery from './pages/AdminGallery';
import ProtectedRoute from './components/ProtectedRoute';
import PageTransition from './components/PageTransition';
import LoadingScreen from './components/LoadingScreen';
import StickyBookingBar from './components/StickyBookingBar';
import NotFound from './pages/NotFound';
import CruiseDestinations from './pages/cruises/CruiseDestinations';
import NewRiverCruise from './pages/cruises/NewRiverCruise';
import NorthBoundScenicCruise from './pages/cruises/NorthBoundScenicCruise';
import LasOlasBoatTour from './pages/cruises/LasOlasBoatTour';
import IntracoastalWaterwayCorporateCruise from './pages/cruises/IntracoastalWaterwayCorporateCruise';
import FortLauderdaleSunsetCruise from './pages/cruises/FortLauderdaleSunsetCruise';

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
        
        {/* New cruise pages (Phase 2) */}
        <Route
          path="/cruise-destinations"
          element={(
            <PageTransition>
              <CruiseDestinations />
            </PageTransition>
          )}
        />
        <Route
          path="/new-river-cruise"
          element={(
            <PageTransition>
              <NewRiverCruise />
            </PageTransition>
          )}
        />
        <Route
          path="/north-bound-scenic-cruise"
          element={(
            <PageTransition>
              <NorthBoundScenicCruise />
            </PageTransition>
          )}
        />
        <Route
          path="/las-olas-boat-tour"
          element={(
            <PageTransition>
              <LasOlasBoatTour />
            </PageTransition>
          )}
        />
        <Route
          path="/intracoastal-waterway-corporate-cruise"
          element={(
            <PageTransition>
              <IntracoastalWaterwayCorporateCruise />
            </PageTransition>
          )}
        />
        <Route
          path="/fort-lauderdale-sunset-cruise"
          element={(
            <PageTransition>
              <FortLauderdaleSunsetCruise />
            </PageTransition>
          )}
        />

        {/* 404 */}
        <Route
          path="*"
          element={(
            <PageTransition>
              <NotFound />
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