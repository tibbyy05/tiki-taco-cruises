import { Link, useLoaderData } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

interface BlogPostData {
  post: {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string;
    featured_image_url: string | null;
    created_at: string;
    updated_at: string;
  };
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

export default function BlogPost() {
  const { post } = useLoaderData() as BlogPostData;

  const seoTitle = `${post.title} | Tiki Taco Cruises`;
  const seoDescription =
    post.excerpt ??
    'A story from Tiki Taco Cruises — Fort Lauderdale tiki pontoon rentals.';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt ?? undefined,
    image: post.featured_image_url ?? undefined,
    datePublished: post.created_at,
    dateModified: post.updated_at,
    author: {
      '@type': 'Organization',
      name: 'Tiki Taco Cruises',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Tiki Taco Cruises',
      logo: {
        '@type': 'ImageObject',
        url: 'https://tikitacocruises.com/tiki-taco-logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://tikitacocruises.com/blog/${post.slug}`,
    },
  };

  return (
    <>
      <Navigation />
      <SEO
        title={seoTitle}
        description={seoDescription}
        ogImage={post.featured_image_url ?? undefined}
        jsonLd={jsonLd}
      />

      <article className="min-h-screen bg-sand">
        <header className="bg-navy text-white pt-32 pb-12 sm:pt-40 sm:pb-16">
          <div className="max-w-3xl mx-auto px-4">
            <Link
              to="/blog"
              className="inline-flex items-center text-teal hover:text-white text-sm font-semibold mb-6 transition-colors"
            >
              ← All posts
            </Link>
            <p className="text-sm text-white/70 uppercase tracking-wide mb-3">
              {formatDate(post.created_at)}
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="mt-4 text-lg text-white/90 leading-relaxed">
                {post.excerpt}
              </p>
            )}
          </div>
        </header>

        {post.featured_image_url && (
          <div className="max-w-4xl mx-auto px-4 -mt-8 mb-8">
            <img
              src={post.featured_image_url}
              alt={post.title}
              className="w-full aspect-[16/9] object-cover rounded-2xl shadow-xl"
            />
          </div>
        )}

        <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
          <div className="blog-prose bg-white rounded-2xl shadow-lg border border-navy/10 p-6 sm:p-10">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>

          <div className="mt-10 bg-gradient-to-br from-coral to-coral/80 text-white rounded-2xl p-8 sm:p-10 text-center shadow-xl">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Ready to get on the water?
            </h2>
            <p className="text-white/95 mb-6 max-w-md mx-auto">
              Browse our Fort Lauderdale cruise options and pick the one that fits your trip.
            </p>
            <Link
              to="/cruise-destinations"
              className="inline-flex bg-white text-coral px-6 py-3 rounded-full font-semibold hover:bg-sand transition-all duration-300 hover:scale-105"
              data-gtm-id="learn-more"
            >
              Browse Cruises
            </Link>
          </div>
        </div>
      </article>

      <Footer />

      <style>{`
        .blog-prose { color: #1E3A5F; line-height: 1.75; }
        .blog-prose h2 {
          font-size: 1.75rem;
          font-weight: 700;
          color: #1E3A5F;
          margin-top: 2.25rem;
          margin-bottom: 0.75rem;
          line-height: 1.25;
        }
        .blog-prose h2:first-child { margin-top: 0; }
        .blog-prose h3 {
          font-size: 1.35rem;
          font-weight: 600;
          color: #1E3A5F;
          margin-top: 1.75rem;
          margin-bottom: 0.5rem;
        }
        .blog-prose p { margin-bottom: 1.1rem; color: #4A5568; }
        .blog-prose a {
          color: #0891B2;
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .blog-prose a:hover { color: #FF6B6B; }
        .blog-prose strong { color: #1E3A5F; font-weight: 600; }
        .blog-prose ul, .blog-prose ol {
          margin-bottom: 1.1rem;
          padding-left: 1.5rem;
        }
        .blog-prose ul { list-style: disc; }
        .blog-prose ol { list-style: decimal; }
        .blog-prose li {
          margin-bottom: 0.4rem;
          color: #4A5568;
        }
        .blog-prose blockquote {
          border-left: 4px solid #0891B2;
          padding: 0.25rem 0 0.25rem 1rem;
          margin: 1.5rem 0;
          color: #4A5568;
          font-style: italic;
        }
        .blog-prose code {
          background: #F5F7FA;
          padding: 0.15rem 0.4rem;
          border-radius: 0.25rem;
          font-size: 0.9em;
        }
        .blog-prose img {
          border-radius: 0.75rem;
          margin: 1.5rem 0;
        }
        .blog-prose hr {
          border: 0;
          border-top: 1px solid #E2E8F0;
          margin: 2rem 0;
        }
      `}</style>
    </>
  );
}
