import type { RouteRecord } from 'vite-react-ssg';
import Layout from './Layout';
import PageTransition from './components/PageTransition';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import FAQ from './pages/FAQ';
import ContactUs from './pages/ContactUs';
import AdminLogin from './pages/AdminLogin';
import AdminGallery from './pages/AdminGallery';
import AdminBlog from './pages/AdminBlog';
import AdminBlogEditor from './pages/AdminBlogEditor';
import AdminAccount from './pages/AdminAccount';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';
import NotFound from './pages/NotFound';
import { supabase, CLIENT_ID } from './lib/supabase';
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
      { path: 'contact-us', element: wrap(<ContactUs />) },
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
      {
        path: 'admin/blog',
        element: (
          <ProtectedRoute>
            <PageTransition>
              <AdminBlog />
            </PageTransition>
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin/blog/new',
        element: (
          <ProtectedRoute>
            <PageTransition>
              <AdminBlogEditor />
            </PageTransition>
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin/blog/:id/edit',
        element: (
          <ProtectedRoute>
            <PageTransition>
              <AdminBlogEditor />
            </PageTransition>
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin/account',
        element: (
          <ProtectedRoute>
            <PageTransition>
              <AdminAccount />
            </PageTransition>
          </ProtectedRoute>
        ),
      },
      {
        path: 'blog',
        element: wrap(<BlogList />),
        loader: async () => {
          const { data } = await supabase
            .from('tiki_blog_posts')
            .select('id, title, slug, excerpt, featured_image_url, created_at')
            .eq('client_id', CLIENT_ID)
            .eq('published', true)
            .order('created_at', { ascending: false });
          return { posts: data ?? [] };
        },
      },
      {
        path: 'blog/:slug',
        element: wrap(<BlogPost />),
        loader: async ({ params }) => {
          const { data } = await supabase
            .from('tiki_blog_posts')
            .select('id, title, slug, excerpt, content, featured_image_url, created_at, updated_at')
            .eq('slug', params.slug ?? '')
            .eq('published', true)
            .maybeSingle();
          if (!data) {
            throw new Response('Post not found', { status: 404 });
          }
          return { post: data };
        },
        getStaticPaths: async () => {
          const { data } = await supabase
            .from('tiki_blog_posts')
            .select('slug')
            .eq('client_id', CLIENT_ID)
            .eq('published', true);
          return data?.map((p) => `/blog/${p.slug}`) ?? [];
        },
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
