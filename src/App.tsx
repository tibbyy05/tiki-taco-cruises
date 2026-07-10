import { lazy, Suspense, ReactNode, ComponentType } from 'react';
import type { RouteRecord } from 'vite-react-ssg';
import Layout from './Layout';
import PageTransition from './components/PageTransition';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';

// Admin pages are client-only (never prerendered) and only used by two
// people — lazy-load them so their code stays out of the public bundle.
// Public pages must stay statically imported: React.lazy would replace
// their prerendered HTML with a Suspense fallback and gut SEO.
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminGallery = lazy(() => import('./pages/AdminGallery'));
const AdminBlog = lazy(() => import('./pages/AdminBlog'));
const AdminBlogEditor = lazy(() => import('./pages/AdminBlogEditor'));
const AdminAccount = lazy(() => import('./pages/AdminAccount'));
const AdminAnalytics = lazy(() => import('./pages/AdminAnalytics'));

const adminFallback = (
  <div className="min-h-screen flex items-center justify-center bg-sand text-navy">
    Loading...
  </div>
);

const adminPage = (node: ReactNode) => (
  <ProtectedRoute>
    <PageTransition>
      <Suspense fallback={adminFallback}>{node}</Suspense>
    </PageTransition>
  </ProtectedRoute>
);
import { supabase, CLIENT_ID } from './lib/supabase';

const wrap = (node: JSX.Element) => <PageTransition>{node}</PageTransition>;

// Route-level code splitting for public pages. vite-react-ssg awaits
// route.lazy during prerendering, so each page's static HTML keeps its full
// content (verified in dist/ output) while its JS stays out of the shared
// bundle until the route is visited. Only Home stays in the entry bundle.
const lazyPage = (importer: () => Promise<{ default: ComponentType }>) =>
  async () => {
    const Page = (await importer()).default;
    return {
      Component: () => (
        <PageTransition>
          <Page />
        </PageTransition>
      ),
    };
  };

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: wrap(<Home />) },
      { path: 'gallery', lazy: lazyPage(() => import('./pages/Gallery')) },
      { path: 'faq', lazy: lazyPage(() => import('./pages/FAQ')) },
      { path: 'contact-us', lazy: lazyPage(() => import('./pages/ContactUs')) },
      {
        path: 'admin',
        element: wrap(<Suspense fallback={adminFallback}><AdminLogin /></Suspense>),
      },
      { path: 'admin/gallery', element: adminPage(<AdminGallery />) },
      { path: 'admin/blog', element: adminPage(<AdminBlog />) },
      { path: 'admin/blog/new', element: adminPage(<AdminBlogEditor />) },
      { path: 'admin/blog/:id/edit', element: adminPage(<AdminBlogEditor />) },
      { path: 'admin/analytics', element: adminPage(<AdminAnalytics />) },
      { path: 'admin/account', element: adminPage(<AdminAccount />) },
      {
        path: 'blog',
        lazy: lazyPage(() => import('./pages/BlogList')),
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
        lazy: lazyPage(() => import('./pages/BlogPost')),
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
      { path: 'cruise-destinations', lazy: lazyPage(() => import('./pages/cruises/CruiseDestinations')) },
      { path: 'new-river-cruise', lazy: lazyPage(() => import('./pages/cruises/NewRiverCruise')) },
      { path: 'north-bound-scenic-cruise', lazy: lazyPage(() => import('./pages/cruises/NorthBoundScenicCruise')) },
      { path: 'las-olas-boat-tour', lazy: lazyPage(() => import('./pages/cruises/LasOlasBoatTour')) },
      { path: 'intracoastal-waterway-corporate-cruise', lazy: lazyPage(() => import('./pages/cruises/IntracoastalWaterwayCorporateCruise')) },
      { path: 'fort-lauderdale-sunset-cruise', lazy: lazyPage(() => import('./pages/cruises/FortLauderdaleSunsetCruise')) },
      { path: '*', lazy: lazyPage(() => import('./pages/NotFound')) },
    ],
  },
];
