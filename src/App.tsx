import { BrowserRouter, Routes as RouterRoutes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LasOlasCruise from './pages/destinations/LasOlasCruise';
import SandbarParty from './pages/destinations/SandbarParty';
import IntracoastalTour from './pages/destinations/IntracoastalTour';
import BeachCoastCruise from './pages/destinations/BeachCoastCruise';
import FullWaterwayTour from './pages/destinations/FullWaterwayTour';
import Destinations from './pages/Destinations';
import Gallery from './pages/Gallery';
import AdminGallery from './admin/AdminGallery';

function App() {
  return (
    <BrowserRouter>
      <RouterRoutes>
        {/* Home */}
        <Route path="/" element={<Home />} />
        
        {/* Destinations Overview */}
        <Route path="/destinations" element={<Destinations />} />
        
        {/* Individual Destinations */}
        <Route path="/destinations/las-olas-cruise" element={<LasOlasCruise />} />
        <Route path="/destinations/sandbar-party" element={<SandbarParty />} />
        <Route path="/destinations/intracoastal-tour" element={<IntracoastalTour />} />
        <Route path="/destinations/beach-coast-cruise" element={<BeachCoastCruise />} />
        <Route path="/destinations/full-waterway-tour" element={<FullWaterwayTour />} />
        
        {/* Gallery */}
        <Route path="/gallery" element={<Gallery />} />
        
        {/* Admin */}
        <Route path="/admin/gallery" element={<AdminGallery />} />
        
        {/* Legacy redirect - keeps old /routes links working */}
        <Route path="/routes" element={<Destinations />} />
      </RouterRoutes>
    </BrowserRouter>
  );
}

export default App;