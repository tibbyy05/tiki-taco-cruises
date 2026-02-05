import { useEffect, useMemo, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, Navigate } from 'react-router-dom';
import { ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import { supabase, CLIENT_ID } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

interface GalleryPhoto {
  id: string;
  image_url: string;
  caption: string | null;
  display_order: number;
}

export default function AdminGallery() {
  const { user, signOut } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [captionDrafts, setCaptionDrafts] = useState<Record<string, string>>({});

  const maxDisplayOrder = useMemo(() => (
    photos.reduce((max, photo) => Math.max(max, photo.display_order), 0)
  ), [photos]);

  useEffect(() => {
    const fetchPhotos = async () => {
      setIsLoading(true);
      setErrorMessage('');

      const { data, error } = await supabase
        .from('gallery_photos')
        .select('id, image_url, caption, display_order')
        .eq('client_id', CLIENT_ID)
        .order('display_order', { ascending: true });

      if (error) {
        setErrorMessage('Unable to load gallery photos.');
      } else {
        setPhotos(data ?? []);
        const draftState: Record<string, string> = {};
        data?.forEach((photo) => {
          draftState[photo.id] = photo.caption ?? '';
        });
        setCaptionDrafts(draftState);
      }

      setIsLoading(false);
    };

    fetchPhotos();
  }, []);

  if (!user) {
    return <Navigate to="/admin" replace />;
  }

  const refreshPhotos = async () => {
    const { data } = await supabase
      .from('gallery_photos')
      .select('id, image_url, caption, display_order')
      .eq('client_id', CLIENT_ID)
      .order('display_order', { ascending: true });

    setPhotos(data ?? []);
    const draftState: Record<string, string> = {};
    data?.forEach((photo) => {
      draftState[photo.id] = photo.caption ?? '';
    });
    setCaptionDrafts(draftState);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleUploadFiles = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    if (!files.length) return;

    setIsUploading(true);
    setErrorMessage('');

    let nextOrder = maxDisplayOrder + 1;

    for (const file of files) {
      const safeName = file.name.replace(/\s+/g, '_');
      const filePath = `${CLIENT_ID}/${Date.now()}_${safeName}`;

      const { data, error } = await supabase.storage
        .from('gallery-photos')
        .upload(filePath, file, {
          contentType: file.type,
          upsert: false
        });

      if (error) {
        console.error('Upload error details:', JSON.stringify(error));
      }

      if (error) {
        setErrorMessage('One or more uploads failed.');
        continue;
      }

      const { data: publicUrlData } = supabase
        .storage
        .from('gallery-photos')
        .getPublicUrl(filePath);

      const publicUrl = publicUrlData.publicUrl;

      await supabase
        .from('gallery_photos')
        .insert({
          client_id: CLIENT_ID,
          image_url: publicUrl,
          display_order: nextOrder,
          caption: null
        });

      nextOrder += 1;
    }

    event.target.value = '';
    setIsUploading(false);
    await refreshPhotos();
  };

  const handleCaptionBlur = async (photo: GalleryPhoto) => {
    const newCaption = captionDrafts[photo.id]?.trim() ?? '';
    if ((photo.caption ?? '') === newCaption) return;

    await supabase
      .from('gallery_photos')
      .update({ caption: newCaption.length ? newCaption : null })
      .eq('id', photo.id);

    await refreshPhotos();
  };

  const extractStoragePath = (imageUrl: string) => {
    const marker = '/object/public/gallery-photos/';
    const index = imageUrl.indexOf(marker);
    return index >= 0 ? imageUrl.slice(index + marker.length) : '';
  };

  const handleDelete = async (photo: GalleryPhoto) => {
    if (!window.confirm('Delete this photo?')) return;

    const storagePath = extractStoragePath(photo.image_url);
    if (storagePath) {
      await supabase.storage.from('gallery-photos').remove([storagePath]);
    }

    await supabase.from('gallery_photos').delete().eq('id', photo.id);
    await refreshPhotos();
  };

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= photos.length) return;

    const current = photos[index];
    const target = photos[targetIndex];

    await supabase
      .from('gallery_photos')
      .update({ display_order: target.display_order })
      .eq('id', current.id);

    await supabase
      .from('gallery_photos')
      .update({ display_order: current.display_order })
      .eq('id', target.id);

    await refreshPhotos();
  };

  return (
    <>
      <Helmet>
        <title>Gallery Manager | Tiki Taco Cruises</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="min-h-screen bg-sand px-4 py-10 sm:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-navy">Gallery Manager</h1>
              <Link to="/" className="text-teal hover:text-coral transition-colors inline-flex mt-2">
                Back to Website
              </Link>
            </div>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                onClick={handleUploadClick}
                disabled={isUploading}
                className="bg-coral hover:bg-coral/90 text-white px-5 py-2.5 rounded-full font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isUploading ? 'Uploading...' : 'Upload Photos'}
              </button>
              <button
                onClick={signOut}
                className="border border-navy/20 text-navy px-5 py-2.5 rounded-full font-semibold hover:border-coral hover:text-coral transition-all duration-300"
              >
                Sign Out
              </button>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,video/mp4,video/quicktime,video/webm"
            multiple
            onChange={handleUploadFiles}
            className="hidden"
          />

          {errorMessage && (
            <div className="mb-6 rounded-lg border border-coral/30 bg-coral/10 text-coral px-4 py-3">
              {errorMessage}
            </div>
          )}

          {isLoading ? (
            <div className="text-center text-navy py-16">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {photos.map((photo, index) => {
                const isVideo = /\.(mp4|mov|webm)$/i.test(photo.image_url);
                return (
                <div key={photo.id} className="bg-white rounded-2xl shadow-lg border border-navy/10 overflow-hidden">
                  <div className="relative">
                    {isVideo ? (
                      <video
                        src={photo.image_url}
                        controls
                        muted
                        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                      />
                    ) : (
                      <img
                        src={photo.image_url}
                        alt={photo.caption ?? 'Gallery photo'}
                        className="w-full h-[200px] object-cover"
                      />
                    )}
                    <button
                      onClick={() => handleDelete(photo)}
                      className="absolute top-3 right-3 bg-white/90 hover:bg-coral text-navy hover:text-white rounded-full p-2 transition-colors"
                      aria-label="Delete photo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <span className="absolute top-3 left-3 bg-white/90 text-navy text-xs font-semibold px-2 py-1 rounded-full">
                      {isVideo ? 'Video' : 'Photo'}
                    </span>
                  </div>

                  <div className="p-4 space-y-3">
                    <input
                      type="text"
                      value={captionDrafts[photo.id] ?? ''}
                      onChange={(event) => setCaptionDrafts((prev) => ({
                        ...prev,
                        [photo.id]: event.target.value
                      }))}
                      onBlur={() => handleCaptionBlur(photo)}
                      placeholder="Click to add a caption"
                      className="w-full text-sm text-gray-700 border border-navy/10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal"
                    />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleMove(index, 'up')}
                          disabled={index === 0}
                          className="p-2 rounded-lg border border-navy/10 text-navy hover:border-coral hover:text-coral transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                          aria-label="Move up"
                        >
                          <ChevronUp className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleMove(index, 'down')}
                          disabled={index === photos.length - 1}
                          className="p-2 rounded-lg border border-navy/10 text-navy hover:border-coral hover:text-coral transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                          aria-label="Move down"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="text-xs text-gray-500">Order {photo.display_order}</span>
                    </div>
                  </div>
                </div>
              );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
