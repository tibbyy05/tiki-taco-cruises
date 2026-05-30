import { useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import SEO from '../components/SEO';
import AdminNav from '../components/AdminNav';
import { Sparkles, X } from 'lucide-react';
import { supabase, CLIENT_ID } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

const slugify = (text: string) =>
  text
    .normalize('NFKD')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80);

export default function AdminBlogEditor() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [slugTouched, setSlugTouched] = useState(false);
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [published, setPublished] = useState(true);
  const [featuredImageUrl, setFeaturedImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(isEditing);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [isAiPanelOpen, setIsAiPanelOpen] = useState(false);
  const [aiBrief, setAiBrief] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiError, setAiError] = useState('');

  useEffect(() => {
    if (!isEditing) return;

    const fetchPost = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('tiki_blog_posts')
        .select('title, slug, excerpt, content, featured_image_url, published')
        .eq('id', id)
        .single();

      if (error || !data) {
        setErrorMessage('Unable to load post.');
      } else {
        setTitle(data.title);
        setSlug(data.slug ?? '');
        setSlugTouched(true);
        setExcerpt(data.excerpt ?? '');
        setContent(data.content ?? '');
        setPublished(data.published ?? true);
        setFeaturedImageUrl(data.featured_image_url);
      }
      setIsLoading(false);
    };

    fetchPost();
  }, [id, isEditing]);

  if (!user) {
    return <Navigate to="/admin" replace />;
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setErrorMessage('');

    const safeName = file.name.replace(/\s+/g, '_');
    const filePath = `${CLIENT_ID}/${Date.now()}_${safeName}`;

    const { error } = await supabase.storage
      .from('tiki-blog-images')
      .upload(filePath, file, { contentType: file.type, upsert: false });

    if (error) {
      setErrorMessage('Image upload failed.');
      setIsUploading(false);
      event.target.value = '';
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from('tiki-blog-images')
      .getPublicUrl(filePath);

    setFeaturedImageUrl(publicUrlData.publicUrl);
    setIsUploading(false);
    event.target.value = '';
  };

  const handleRemoveImage = async () => {
    if (!featuredImageUrl) return;
    const marker = '/object/public/tiki-blog-images/';
    const idx = featuredImageUrl.indexOf(marker);
    if (idx >= 0) {
      const path = featuredImageUrl.slice(idx + marker.length);
      await supabase.storage.from('tiki-blog-images').remove([path]);
    }
    setFeaturedImageUrl(null);
  };

  const handleGenerateWithAi = async () => {
    if (aiBrief.trim().length < 10) {
      setAiError('Please write at least a sentence or two about the post.');
      return;
    }

    const hasExistingContent =
      title.trim() !== '' || excerpt.trim() !== '' || content.trim() !== '';
    if (hasExistingContent) {
      const ok = window.confirm(
        'This will replace the current title, excerpt, and content. Continue?'
      );
      if (!ok) return;
    }

    setIsGenerating(true);
    setAiError('');

    const { data, error } = await supabase.functions.invoke('expand-blog-post', {
      body: { brief: aiBrief.trim() }
    });

    setIsGenerating(false);

    if (error) {
      setAiError(error.message ?? 'AI generation failed.');
      return;
    }

    if (data?.error) {
      setAiError(data.error);
      return;
    }

    if (!data?.title || !data?.content) {
      setAiError('AI returned an unexpected response.');
      return;
    }

    setTitle(data.title);
    if (!isEditing && !slugTouched) {
      setSlug(slugify(data.title));
    }
    setExcerpt(data.excerpt ?? '');
    setContent(data.content);
    setIsAiPanelOpen(false);
    setAiBrief('');
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!slugTouched) {
      setSlug(slugify(value));
    }
  };

  const handleSlugChange = (value: string) => {
    setSlug(slugify(value));
    setSlugTouched(true);
  };

  const handleSave = async () => {
    if (!title.trim()) {
      setErrorMessage('Title is required.');
      return;
    }
    if (!slug.trim()) {
      setErrorMessage('Slug is required.');
      return;
    }

    setIsSaving(true);
    setErrorMessage('');

    const payload = {
      title: title.trim(),
      slug: slug.trim(),
      excerpt: excerpt.trim() || null,
      content,
      featured_image_url: featuredImageUrl,
      published
    };

    if (isEditing) {
      const { error } = await supabase
        .from('tiki_blog_posts')
        .update(payload)
        .eq('id', id);

      if (error) {
        setErrorMessage('Unable to save post.');
        setIsSaving(false);
        return;
      }
    } else {
      const { error } = await supabase
        .from('tiki_blog_posts')
        .insert({ ...payload, client_id: CLIENT_ID });

      if (error) {
        setErrorMessage('Unable to create post.');
        setIsSaving(false);
        return;
      }
    }

    navigate('/admin/blog');
  };

  return (
    <>
      <SEO
        title={isEditing ? 'Edit Post | Tiki Taco Cruises' : 'New Post | Tiki Taco Cruises'}
        description="Blog post editor."
        noindex={true}
      />
      <div className="min-h-screen bg-sand px-4 py-10 sm:py-12">
        <div className="max-w-3xl mx-auto">
          <AdminNav title={isEditing ? 'Edit Post' : 'New Post'} />

          {errorMessage && (
            <div className="mb-6 rounded-lg border border-coral/30 bg-coral/10 text-coral px-4 py-3">
              {errorMessage}
            </div>
          )}

          {isLoading ? (
            <div className="text-center text-navy py-16">Loading...</div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg border border-navy/10 p-6 sm:p-8 space-y-5">
              {!isAiPanelOpen ? (
                <button
                  type="button"
                  onClick={() => setIsAiPanelOpen(true)}
                  className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-teal/30 hover:border-teal text-teal hover:bg-teal/5 rounded-lg px-4 py-3 font-semibold transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                  Expand with AI
                </button>
              ) : (
                <div className="border border-teal/30 bg-teal/5 rounded-lg p-4 sm:p-5 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2 text-navy font-semibold">
                      <Sparkles className="w-4 h-4 text-teal" />
                      Expand with AI
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setIsAiPanelOpen(false);
                        setAiError('');
                      }}
                      className="text-navy/60 hover:text-coral"
                      aria-label="Close AI panel"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-700">
                    Describe the post in a few sentences. AI will draft a title, excerpt, and full markdown body you can edit.
                  </p>
                  <textarea
                    value={aiBrief}
                    onChange={(event) => setAiBrief(event.target.value)}
                    placeholder="e.g. A post about why the New River sunset cruise is the best way to see Fort Lauderdale. Mention the historic homes along Las Olas, the wildlife, and how it's perfect for date nights."
                    rows={4}
                    disabled={isGenerating}
                    className="w-full rounded-lg border border-navy/20 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal resize-y disabled:bg-gray-100"
                  />
                  {aiError && (
                    <div className="text-sm text-coral bg-coral/10 border border-coral/30 rounded-lg px-3 py-2">
                      {aiError}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={handleGenerateWithAi}
                      disabled={isGenerating || aiBrief.trim().length < 10}
                      className="bg-teal hover:bg-teal/90 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isGenerating ? 'Generating...' : 'Generate Draft'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsAiPanelOpen(false);
                        setAiError('');
                      }}
                      disabled={isGenerating}
                      className="border border-navy/20 text-navy px-5 py-2 rounded-full text-sm font-semibold hover:border-coral hover:text-coral transition-colors disabled:opacity-60"
                    >
                      Cancel
                    </button>
                  </div>
                  {isGenerating && (
                    <p className="text-xs text-gray-600">
                      This usually takes 10–30 seconds.
                    </p>
                  )}
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-navy mb-2" htmlFor="post-title">
                  Title <span className="text-coral">*</span>
                </label>
                <input
                  id="post-title"
                  type="text"
                  value={title}
                  onChange={(event) => handleTitleChange(event.target.value)}
                  placeholder="Your blog post title"
                  className="w-full rounded-lg border border-navy/20 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-navy mb-2" htmlFor="post-slug">
                  URL Slug <span className="text-coral">*</span>
                </label>
                <div className="flex items-center gap-2 rounded-lg border border-navy/20 px-4 py-3 focus-within:ring-2 focus-within:ring-teal">
                  <span className="text-sm text-gray-500 whitespace-nowrap">/blog/</span>
                  <input
                    id="post-slug"
                    type="text"
                    value={slug}
                    onChange={(event) => handleSlugChange(event.target.value)}
                    placeholder="url-friendly-slug"
                    className="flex-1 min-w-0 focus:outline-none text-sm font-mono"
                  />
                </div>
                {isEditing && (
                  <p className="text-xs text-gray-500 mt-1">
                    Changing the slug breaks any existing links to the old URL.
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-navy mb-2" htmlFor="post-excerpt">
                  Excerpt / SEO Description
                </label>
                <textarea
                  id="post-excerpt"
                  value={excerpt}
                  onChange={(event) => setExcerpt(event.target.value)}
                  placeholder="A short summary shown on the blog list and in search results (150–160 characters)"
                  rows={2}
                  className="w-full rounded-lg border border-navy/20 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal resize-y"
                />
                <p className="text-xs text-gray-500 mt-1">{excerpt.length} characters</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-navy mb-2">
                  Featured Image
                </label>
                {featuredImageUrl ? (
                  <div className="relative inline-block">
                    <img
                      src={featuredImageUrl}
                      alt="Featured"
                      className="max-w-full sm:max-w-md rounded-lg border border-navy/10"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 bg-white/90 hover:bg-coral text-navy hover:text-white rounded-full p-2 transition-colors"
                      aria-label="Remove image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="border-2 border-dashed border-navy/20 hover:border-coral text-navy rounded-lg px-6 py-8 w-full text-center transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isUploading ? 'Uploading...' : 'Click to upload featured image'}
                  </button>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-navy mb-2" htmlFor="post-content">
                  Content (Markdown)
                </label>
                <textarea
                  id="post-content"
                  value={content}
                  onChange={(event) => setContent(event.target.value)}
                  placeholder="Write your post in markdown. Use **bold**, *italic*, # headings, [links](url), etc."
                  rows={16}
                  className="w-full rounded-lg border border-navy/20 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal font-mono text-sm resize-y"
                />
              </div>

              <div className="flex items-center gap-3 pt-2 border-t border-navy/10">
                <label className="flex items-center gap-2 cursor-pointer pt-4">
                  <input
                    type="checkbox"
                    checked={published}
                    onChange={(event) => setPublished(event.target.checked)}
                    className="w-4 h-4 rounded border-navy/30 text-coral focus:ring-teal"
                  />
                  <span className="text-sm font-semibold text-navy">Published</span>
                  <span className="text-xs text-gray-500">
                    (visible on /blog after next deploy)
                  </span>
                </label>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={isSaving || isUploading}
                  className="bg-coral hover:bg-coral/90 text-white px-6 py-2.5 rounded-full font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSaving ? 'Saving...' : isEditing ? 'Save Changes' : 'Create Post'}
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/admin/blog')}
                  className="border border-navy/20 text-navy px-6 py-2.5 rounded-full font-semibold hover:border-coral hover:text-coral transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
