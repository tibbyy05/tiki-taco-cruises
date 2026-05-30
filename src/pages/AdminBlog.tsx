import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import AdminNav from '../components/AdminNav';
import { Pencil, Trash2 } from 'lucide-react';
import { supabase, CLIENT_ID } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image_url: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export default function AdminBlog() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setErrorMessage('');

      const { data, error } = await supabase
        .from('tiki_blog_posts')
        .select('id, title, slug, excerpt, featured_image_url, published, created_at, updated_at')
        .eq('client_id', CLIENT_ID)
        .order('created_at', { ascending: false });

      if (error) {
        setErrorMessage('Unable to load blog posts.');
      } else {
        setPosts(data ?? []);
      }

      setIsLoading(false);
    };

    fetchPosts();
  }, []);

  if (!user) {
    return <Navigate to="/admin" replace />;
  }

  const handleDelete = async (post: BlogPost) => {
    if (!window.confirm(`Delete "${post.title}"?`)) return;

    if (post.featured_image_url) {
      const marker = '/object/public/tiki-blog-images/';
      const idx = post.featured_image_url.indexOf(marker);
      if (idx >= 0) {
        const path = post.featured_image_url.slice(idx + marker.length);
        await supabase.storage.from('tiki-blog-images').remove([path]);
      }
    }

    const { error } = await supabase.from('tiki_blog_posts').delete().eq('id', post.id);
    if (error) {
      setErrorMessage('Unable to delete post.');
      return;
    }

    setPosts((prev) => prev.filter((p) => p.id !== post.id));
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

  return (
    <>
      <SEO
        title="Blog Manager | Tiki Taco Cruises"
        description="Blog management for Tiki Taco Cruises."
        noindex={true}
      />
      <div className="min-h-screen bg-sand px-4 py-10 sm:py-12">
        <div className="max-w-6xl mx-auto">
          <AdminNav
            title="Blog Manager"
            actions={
              <button
                onClick={() => navigate('/admin/blog/new')}
                className="bg-coral hover:bg-coral/90 text-white px-5 py-2.5 rounded-full font-semibold transition-all duration-300 hover:scale-105"
              >
                New Post
              </button>
            }
          />

          {errorMessage && (
            <div className="mb-6 rounded-lg border border-coral/30 bg-coral/10 text-coral px-4 py-3">
              {errorMessage}
            </div>
          )}

          {isLoading ? (
            <div className="text-center text-navy py-16">Loading...</div>
          ) : posts.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg border border-navy/10 p-10 text-center">
              <h2 className="text-xl font-semibold text-navy mb-2">No posts yet</h2>
              <p className="text-gray-700 mb-6">Get started by creating your first blog post.</p>
              <Link
                to="/admin/blog/new"
                className="inline-flex bg-coral hover:bg-coral/90 text-white px-5 py-2.5 rounded-full font-semibold transition-all duration-300 hover:scale-105"
              >
                Create First Post
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-2xl shadow-lg border border-navy/10 p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4"
                >
                  {post.featured_image_url ? (
                    <img
                      src={post.featured_image_url}
                      alt=""
                      className="w-full sm:w-32 h-32 sm:h-20 object-cover rounded-lg flex-shrink-0"
                    />
                  ) : (
                    <div className="w-full sm:w-32 h-32 sm:h-20 bg-sand rounded-lg flex-shrink-0 flex items-center justify-center text-xs text-gray-500">
                      No image
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-lg font-bold text-navy truncate">{post.title}</h2>
                      {!post.published && (
                        <span className="text-xs font-semibold uppercase tracking-wide bg-navy/10 text-navy px-2 py-0.5 rounded">
                          Draft
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 font-mono truncate mt-0.5">/blog/{post.slug}</p>
                    {post.excerpt && (
                      <p className="text-sm text-gray-700 line-clamp-2 mt-1">{post.excerpt}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      Created {formatDate(post.created_at)}
                      {post.updated_at !== post.created_at && (
                        <> · Updated {formatDate(post.updated_at)}</>
                      )}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 sm:flex-shrink-0">
                    <Link
                      to={`/admin/blog/${post.id}/edit`}
                      className="p-2 rounded-lg border border-navy/10 text-navy hover:border-coral hover:text-coral transition-colors"
                      aria-label="Edit post"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(post)}
                      className="p-2 rounded-lg border border-navy/10 text-navy hover:border-coral hover:text-coral transition-colors"
                      aria-label="Delete post"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
