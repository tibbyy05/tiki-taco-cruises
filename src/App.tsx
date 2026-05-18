import type { RouteRecord } from 'vite-react-ssg';
import Layout from './Layout';
import PageTransition from './components/PageTransition';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import FAQ from './pages/FAQ';
import AdminLogin from './pages/AdminLogin';
import AdminGallery from './pages/AdminGallery';
import NotFound from './pages/NotFound';
import CruiseDestinations from './pages/cruises/CruiseDestinations';
import NewRiverCruise from './pages/cruises/NewRiverCruise';
import NorthBoundScenicCruise from './pages/cruises/NorthBoundScenicCruise';
import LasOlasBoatTour from './pages/cruises/LasOlasBoatTour';
import IntracoastalWaterwayCorporateCruise from './pages/cruises/IntracoastalWaterwayCorporateCruise';
import FortLauderdaleSunsetCruise from './pages/cruises/FortLauderdaleSunsetCruise';

const wrap = (node: JSX.Element) => <PageTransition>{node}</PageTransition>;

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: wrap(<Home />) },
      { path: 'gallery', element: wrap(<Gallery />) },
      { path: 'faq', element: wrap(<FAQ />) },
      { path: 'admin', element: wrap(<AdminLogin />) },
      {
        path: 'admin/gallery',
        element: (
          <ProtectedRoute>
            <PageTransition>
              <AdminGallery />
            </PageTransition>
          </ProtectedRoute>
        ),
      },
      { path: 'cruise-destinations', element: wrap(<CruiseDestinations />) },
      { path: 'new-river-cruise', element: wrap(<NewRiverCruise />) },
      { path: 'north-bound-scenic-cruise', element: wrap(<NorthBoundScenicCruise />) },
      { path: 'las-olas-boat-tour', element: wrap(<LasOlasBoatTour />) },
      { path: 'intracoastal-waterway-corporate-cruise', element: wrap(<IntracoastalWaterwayCorporateCruise />) },
      { path: 'fort-lauderdale-sunset-cruise', element: wrap(<FortLauderdaleSunsetCruise />) },
      { path: '*', element: wrap(<NotFound />) },
    ],
  },
];
