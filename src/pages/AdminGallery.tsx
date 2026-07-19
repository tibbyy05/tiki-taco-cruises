import { useEffect, useMemo, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import SEO from '../components/SEO';
import AdminNav from '../components/AdminNav';
import { ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import { supabase, CLIENT_ID } from '../lib/supabase';
import { compressImage } from '../lib/compressImage';
import { useAuth } from '../context/AuthContext';

interface GalleryPhoto {
  id: string;
  image_url: string;
  caption: string | null;
  display_order: number;
}

export default function AdminGallery() {
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizeStatus, setOptimizeStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [highlightedIds, setHighlightedIds] = useState<Set<string>>(new Set());
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
        .order('display_order', { ascending: false });

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
      .order('display_order', { ascending: false });

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
    setSuccessMessage('');

    let nextOrder = maxDisplayOrder + 1;
    const failures: string[] = [];
    const newIds: string[] = [];

    for (const rawFile of files) {
      // Phone photos arrive at up to ~6 MB; shrink images before upload so
      // the public gallery stays fast. Videos pass through untouched.
      const file = await compressImage(rawFile);
      const safeName = file.name.replace(/\s+/g, '_');
      const filePath = `${CLIENT_ID}/${Date.now()}_${safeName}`;

      const { error: uploadError } = await supabase.storage
        .from('gallery-photos')
        .upload(filePath, file, {
          contentType: file.type,
          upsert: false
        });

      if (uploadError) {
        console.error('Storage upload failed:', uploadError);
        failures.push(`${file.name}: storage upload — ${uploadError.message}`);
        continue;
      }

      const { data: publicUrlData } = supabase
        .storage
        .from('gallery-photos')
        .getPublicUrl(filePath);

      const publicUrl = publicUrlData.publicUrl;

      const { data: inserted, error: insertError } = await supabase
        .from('gallery_photos')
        .insert({
          client_id: CLIENT_ID,
          image_url: publicUrl,
          display_order: nextOrder,
          caption: null
        })
        .select('id')
        .single();

      if (insertError) {
        console.error('DB insert failed:', insertError);
        failures.push(`${file.name}: ${insertError.message}`);
        await supabase.storage.from('gallery-photos').remove([filePath]);
        continue;
      }

      if (inserted?.id) newIds.push(inserted.id);
      nextOrder += 1;
    }

    event.target.value = '';
    setIsUploading(false);
    if (failures.length) {
      setErrorMessage(`${failures.length} of ${files.length} failed. ${failures[0]}`);
    }
    await refreshPhotos();

    if (newIds.length) {
      setSuccessMessage(`Uploaded ${newIds.length} new ${newIds.length === 1 ? 'item' : 'items'} — showing at the top.`);
      setHighlightedIds(new Set(newIds));
      setTimeout(() => {
        const firstNew = document.getElementById(`gallery-card-${newIds[0]}`);
        firstNew?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
      setTimeout(() => {
        setHighlightedIds(new Set());
        setSuccessMessage('');
      }, 6000);
    }
  };

  // One-time cleanup: photos uploaded before compression was added are
  // full-size originals (up to ~6 MB). Re-encode each one in the browser,
  // swap the DB row to the smaller copy, and delete the fat original.
  const handleOptimizeExisting = async () => {
    const targets = photos.filter((photo) => !/\.(mp4|mov|webm)$/i.test(photo.image_url));
    if (!targets.length) return;
    if (!window.confirm(`Compress ${targets.length} existing photos? This replaces each image file with a web-optimized copy.`)) return;

    setIsOptimizing(true);
    setErrorMessage('');
    setSuccessMessage('');

    let optimized = 0;
    let skipped = 0;
    let savedBytes = 0;
    const failures: string[] = [];

    for (let i = 0; i < targets.length; i++) {
      const photo = targets[i];
      setOptimizeStatus(`Compressing photo ${i + 1} of ${targets.length}…`);

      try {
        const oldPath = extractStoragePath(photo.image_url);
        if (!oldPath) { skipped += 1; continue; }

        const response = await fetch(photo.image_url);
        if (!response.ok) throw new Error(`download failed (${response.status})`);
        const blob = await response.blob();
        const originalName = oldPath.split('/').pop() ?? 'photo.jpg';
        const originalFile = new File([blob], originalName, { type: blob.type || 'image/jpeg' });

        const compressed = await compressImage(originalFile);
        // Not worth churning storage for marginal gains
        if (compressed.size >= blob.size * 0.85) { skipped += 1; continue; }

        const newPath = `${CLIENT_ID}/${Date.now()}_${compressed.name.replace(/\s+/g, '_')}`;
        const { error: uploadError } = await supabase.storage
          .from('gallery-photos')
          .upload(newPath, compressed, { contentType: compressed.type, upsert: false });
        if (uploadError) throw new Error(uploadError.message);

        const { data: publicUrlData } = supabase.storage
          .from('gallery-photos')
          .getPublicUrl(newPath);

        const { error: updateError } = await supabase
          .from('gallery_photos')
          .update({ image_url: publicUrlData.publicUrl })
          .eq('id', photo.id);
        if (updateError) {
          // DB still points at the original; remove the orphaned new copy
          await supabase.storage.from('gallery-photos').remove([newPath]);
          throw new Error(updateError.message);
        }

        await supabase.storage.from('gallery-photos').remove([oldPath]);
        optimized += 1;
        savedBytes += blob.size - compressed.size;
      } catch (error) {
        failures.push(`${photo.image_url.split('/').pop()}: ${error instanceof Error ? error.message : 'failed'}`);
      }
    }

    setOptimizeStatus('');
    setIsOptimizing(false);
    await refreshPhotos();

    const savedMb = (savedBytes / 1048576).toFixed(1);
    if (failures.length) {
      setErrorMessage(`${failures.length} photo(s) failed to compress. ${failures[0]}`);
    }
    setSuccessMessage(`Compressed ${optimized} photo(s), saved ${savedMb} MB.${skipped ? ` ${skipped} already small enough.` : ''}`);
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
      <SEO
        title="Gallery Manager | Tiki Taco Cruises"
        description="Gallery management for Tiki Taco Cruises."
        noindex={true}
      />
      <div className="min-h-screen bg-sand px-4 py-6 sm:py-10 lg:pl-72 lg:pr-8">
        <div className="max-w-6xl mx-auto lg:mx-0 lg:max-w-[1400px]">
          <AdminNav
            title="Gallery Manager"
            actions={
              <div className="flex items-center gap-3">
                <button
                  onClick={handleOptimizeExisting}
                  disabled={isUploading || isOptimizing || isLoading}
                  className="border-2 border-navy/20 hover:border-teal text-navy px-5 py-2 rounded-full font-semibold transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isOptimizing ? 'Compressing...' : 'Compress Existing'}
                </button>
                <button
                  onClick={handleUploadClick}
                  disabled={isUploading || isOptimizing}
                  className="bg-coral hover:bg-coral/90 text-white px-5 py-2.5 rounded-full font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isUploading ? 'Uploading...' : 'Upload Photos'}
                </button>
              </div>
            }
          />

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,video/mp4,video/quicktime,video/webm"
            multiple
            onChange={handleUploadFiles}
            className="hidden"
          />

          {optimizeStatus && (
            <div className="mb-6 rounded-lg border border-navy/20 bg-white text-navy px-4 py-3 text-sm">
              {optimizeStatus}
            </div>
          )}

          {errorMessage && (
            <div className="mb-6 rounded-lg border border-coral/30 bg-coral/10 text-coral px-4 py-3">
              {errorMessage}
            </div>
          )}

          {successMessage && !errorMessage && (
            <div className="mb-6 rounded-lg border border-teal/40 bg-teal/10 text-navy px-4 py-3 text-sm">
              {successMessage}
            </div>
          )}

          {isLoading ? (
            <div className="text-center text-navy py-16">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {photos.map((photo, index) => {
                const isVideo = /\.(mp4|mov|webm)$/i.test(photo.image_url);
                return (
                <div
                  key={photo.id}
                  id={`gallery-card-${photo.id}`}
                  className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 ${
                    highlightedIds.has(photo.id)
                      ? 'border-2 border-coral ring-4 ring-coral/30'
                      : 'border border-navy/10'
                  }`}
                >
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
