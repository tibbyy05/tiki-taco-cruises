import { Link, useLoaderData } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

interface BlogPostSummary {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image_url: string | null;
  created_at: string;
}

interface BlogListData {
  posts: BlogPostSummary[];
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

export default function BlogList() {
  const loaderData = useLoaderData() as BlogListData | null;
  const posts = loaderData?.posts ?? [];

  return (
    <>
      <Navigation />
      <SEO
        title="Blog | Tiki Taco Cruises Fort Lauderdale"
        description="Stories, tips, and guides for getting the most out of a Fort Lauderdale cruise — destinations, planning advice, and the best routes on our tiki pontoon."
      />

      <div className="min-h-screen bg-sand">
        <section className="relative bg-navy text-white pt-24 pb-12 sm:pt-40 sm:pb-20">
          <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy/95 to-teal/40" />
          <div className="relative max-w-5xl mx-auto px-4 text-center">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-3 sm:mb-4 leading-tight">
              The Tiki Taco Blog
            </h1>
            <p className="text-base sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Stories, routes, and tips from Fort Lauderdale's most fun way to see the water.
            </p>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 py-8 sm:py-16">
          {posts.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg border border-navy/10 p-8 sm:p-12 text-center">
              <h2 className="text-xl sm:text-2xl font-semibold text-navy mb-3">
                New posts coming soon
              </h2>
              <p className="text-gray-700 max-w-md mx-auto mb-6">
                We're putting the finishing touches on our first stories. In the meantime, come see Fort Lauderdale from the water.
              </p>
              <Link
                to="/cruise-destinations"
                className="inline-flex bg-coral hover:bg-coral/90 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
                data-gtm-id="learn-more"
              >
                Browse Cruises
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              {posts.map((post, i) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="group bg-white rounded-2xl shadow-lg border border-navy/10 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                  data-gtm-id="learn-more"
                >
                  <div className="aspect-[16/9] bg-sand overflow-hidden">
                    {post.featured_image_url ? (
                      <img
                        src={post.featured_image_url}
                        alt=""
                        loading={i === 0 ? 'eager' : 'lazy'}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-teal/20 to-navy/20" />
                    )}
                  </div>
                  <div className="p-5 sm:p-6">
                    <p className="text-xs text-teal font-semibold uppercase tracking-wide mb-2">
                      {formatDate(post.created_at)}
                    </p>
                    <h2 className="text-lg sm:text-xl font-bold text-navy mb-2 group-hover:text-coral transition-colors leading-snug">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-sm text-gray-700 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                    )}
                    <p className="mt-3 sm:mt-4 text-sm font-semibold text-coral group-hover:underline">
                      Read more →
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>

      <Footer />
    </>
  );
}
