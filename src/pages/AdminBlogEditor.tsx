import { useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import SEO from '../components/SEO';
import AdminNav from '../components/AdminNav';
import { Lightbulb, Sparkles, X } from 'lucide-react';
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

const randomSuffix = () => Math.random().toString(36).slice(2, 6);

async function buildUniqueSlug(title: string, excludeId?: string) {
  const base = slugify(title) || 'post';
  let candidate = base;

  for (let attempt = 0; attempt < 4; attempt++) {
    const query = supabase
      .from('tiki_blog_posts')
      .select('id')
      .eq('slug', candidate)
      .limit(1);
    const { data } = excludeId
      ? await query.neq('id', excludeId)
      : await query;

    if (!data || data.length === 0) return candidate;
    candidate = `${base}-${randomSuffix()}`;
  }

  return `${base}-${Date.now().toString(36)}`;
}

export default function AdminBlogEditor() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [published, setPublished] = useState(true);
  const [featuredImageUrl, setFeaturedImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(isEditing);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [isImproving, setIsImproving] = useState(false);
  const [aiNotice, setAiNotice] = useState('');

  const [isGeneratingIdeas, setIsGeneratingIdeas] = useState(false);
  const [ideas, setIdeas] = useState<Array<{ title: string; description: string }>>([]);

  useEffect(() => {
    if (!isEditing) return;

    const fetchPost = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('tiki_blog_posts')
        .select('title, excerpt, content, featured_image_url, published')
        .eq('id', id)
        .single();

      if (error || !data) {
        setErrorMessage('Unable to load post.');
      } else {
        setTitle(data.title);
        setDescription(data.content ?? '');
        setExcerpt(data.excerpt ?? '');
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

  const handleGenerateIdeas = async () => {
    setIsGeneratingIdeas(true);
    setErrorMessage('');
    setAiNotice('');

    const { data, error } = await supabase.functions.invoke('generate-blog-ideas', {
      body: {}
    });

    setIsGeneratingIdeas(false);

    if (error) {
      setErrorMessage(error.message ?? 'Could not generate ideas.');
      return;
    }
    if (data?.error) {
      setErrorMessage(data.error);
      return;
    }
    if (!Array.isArray(data?.ideas) || data.ideas.length === 0) {
      setErrorMessage('No ideas returned.');
      return;
    }

    setIdeas(data.ideas);
  };

  const handleUseIdea = (idea: { title: string; description: string }) => {
    const hasContent = title.trim() !== '' || description.trim() !== '';
    if (hasContent) {
      const ok = window.confirm('This replaces the current title and description. Continue?');
      if (!ok) return;
    }
    setTitle(idea.title);
    setDescription(idea.description);
    setIdeas([]);
    setAiNotice('Idea loaded. Click "Improve with AI" to expand it into a full post.');
  };

  const handleImproveWithAi = async () => {
    if (title.trim().length < 3 && description.trim().length < 10) {
      setErrorMessage('Add a title and a sentence or two before improving.');
      return;
    }

    setIsImproving(true);
    setErrorMessage('');
    setAiNotice('');

    const { data, error } = await supabase.functions.invoke('expand-blog-post', {
      body: { title: title.trim(), description: description.trim() }
    });

    setIsImproving(false);

    if (error) {
      setErrorMessage(error.message ?? 'AI improvement failed.');
      return;
    }
    if (data?.error) {
      setErrorMessage(data.error);
      return;
    }
    if (!data?.title || !data?.content) {
      setErrorMessage('AI returned an unexpected response.');
      return;
    }

    setTitle(data.title);
    setDescription(data.content);
    setExcerpt(data.excerpt ?? '');
    setAiNotice('Improved by AI. Review and save when ready.');
  };

  const handleSave = async () => {
    if (!title.trim()) {
      setErrorMessage('Title is required.');
      return;
    }
    if (!description.trim()) {
      setErrorMessage('Description is required.');
      return;
    }

    setIsSaving(true);
    setErrorMessage('');

    const slug = await buildUniqueSlug(title, isEditing ? id : undefined);

    const payload = {
      title: title.trim(),
      slug,
      excerpt: excerpt.trim() || description.trim().slice(0, 155),
      content: description,
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

  const canImprove =
    !isImproving && (title.trim().length >= 3 || description.trim().length >= 10);

  return (
    <>
      <SEO
        title={isEditing ? 'Edit Post | Tiki Taco Cruises' : 'New Post | Tiki Taco Cruises'}
        description="Blog post editor."
        noindex={true}
      />
      <div className="min-h-screen bg-sand px-4 py-10 sm:py-12">
        <div className="max-w-6xl mx-auto">
          <AdminNav title={isEditing ? 'Edit Post' : 'New Post'} />

          {errorMessage && (
            <div className="mb-6 rounded-lg border border-coral/30 bg-coral/10 text-coral px-4 py-3">
              {errorMessage}
            </div>
          )}

          {aiNotice && !errorMessage && (
            <div className="mb-6 rounded-lg border border-teal/30 bg-teal/10 text-navy px-4 py-3 text-sm">
              {aiNotice}
            </div>
          )}

          {isLoading ? (
            <div className="text-center text-navy py-16">Loading...</div>
          ) : (
          <>
            {ideas.length > 0 && (
              <section className="mb-6 bg-white rounded-2xl shadow-lg border border-teal/30 p-6 sm:p-8">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-lg font-bold text-navy flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-teal" />
                    Pick an idea to start with
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIdeas([])}
                    className="text-navy/60 hover:text-coral"
                    aria-label="Dismiss ideas"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {ideas.map((idea, index) => (
                    <div
                      key={index}
                      className="border border-teal/30 bg-teal/5 rounded-xl p-5 flex flex-col"
                    >
                      <h4 className="font-bold text-navy mb-3 text-base leading-snug">{idea.title}</h4>
                      <p className="text-sm text-gray-700 flex-1 mb-4 leading-relaxed">{idea.description}</p>
                      <button
                        type="button"
                        onClick={() => handleUseIdea(idea)}
                        className="bg-coral hover:bg-coral/90 text-white text-sm font-semibold px-4 py-2 rounded-full transition-all hover:scale-105"
                      >
                        Use this idea →
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={handleGenerateIdeas}
                  disabled={isGeneratingIdeas}
                  className="w-full mt-5 text-sm text-teal hover:text-coral font-semibold py-2 disabled:opacity-50"
                >
                  {isGeneratingIdeas ? 'Thinking...' : 'Generate 3 more ideas'}
                </button>
              </section>
            )}

            <div className="bg-white rounded-2xl shadow-lg border border-navy/10 p-6 sm:p-8 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-navy mb-2" htmlFor="post-title">
                  Title
                </label>
                <input
                  id="post-title"
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="What's this post about?"
                  className="w-full rounded-lg border border-navy/20 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-navy mb-2" htmlFor="post-description">
                  Description
                </label>
                <textarea
                  id="post-description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Write a rough description of the post. A sentence, a paragraph, or a full draft — anything works. Click 'Improve with AI' to polish it into a full blog post."
                  rows={12}
                  className="w-full rounded-lg border border-navy/20 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal resize-y"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Don't worry about formatting or SEO — AI handles all of that.
                </p>
              </div>

              <div className="space-y-3">
                <div className={ideas.length > 0 ? '' : 'grid grid-cols-1 sm:grid-cols-2 gap-3'}>
                  {ideas.length === 0 && (
                    <button
                      type="button"
                      onClick={handleGenerateIdeas}
                      disabled={isGeneratingIdeas || isImproving}
                      className="flex items-center justify-center gap-2 border-2 border-teal/40 hover:border-teal text-teal hover:bg-teal/5 px-5 py-3.5 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Lightbulb className="w-5 h-5" />
                      {isGeneratingIdeas ? 'Thinking...' : 'Generate Ideas with AI'}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleImproveWithAi}
                    disabled={!canImprove || isGeneratingIdeas}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-teal to-teal/80 hover:from-teal/90 hover:to-teal/70 text-white px-5 py-3.5 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Sparkles className="w-5 h-5" />
                    {isImproving ? 'Improving...' : 'Improve with AI'}
                  </button>
                </div>
                <p className="text-xs text-gray-600 text-center">
                  {ideas.length > 0
                    ? 'Pick an idea on the left, or write your own and improve it.'
                    : 'Stuck? Generate ideas. Already have a draft? Improve it.'}
                </p>
              </div>

              <div className="border-t border-navy/10 pt-6">
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

              <div className="border-t border-navy/10 pt-5 flex items-center">
                <label className="flex items-center gap-2 cursor-pointer">
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
                  disabled={isSaving || isUploading || isImproving}
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
          </>
          )}
        </div>
      </div>
    </>
  );
}
