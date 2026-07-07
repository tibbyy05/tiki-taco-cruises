import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { X, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { staticGalleryImages } from '../data/galleryImages';
import { supabase, CLIENT_ID } from '../lib/supabase';

interface GalleryMedia {
  id: string;
  src: string;
  alt: string;
  mediaType?: 'video';
}

const staticMedia: GalleryMedia[] = staticGalleryImages.map((img) => ({
  id: `static-${img.id}`,
  src: img.src,
  alt: img.alt,
  mediaType: img.mediaType,
}));

const HOMEPAGE_PHOTO_LIMIT = 12;

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [galleryImages, setGalleryImages] = useState<GalleryMedia[]>(staticMedia);

  useEffect(() => {
    // Same source as the Gallery page (owner-managed via admin), so the
    // homepage always reflects the latest uploads. Static images remain
    // the prerendered fallback until data arrives (or if the table is empty).
    const fetchLatest = async () => {
      const { data } = await supabase
        .from('gallery_photos')
        .select('id, image_url, caption, display_order')
        .eq('client_id', CLIENT_ID)
        .order('display_order', { ascending: false })
        .limit(HOMEPAGE_PHOTO_LIMIT);

      if (data && data.length > 0) {
        setGalleryImages(
          data.map((item) => ({
            id: item.id,
            src: item.image_url,
            alt: item.caption?.trim() || 'Tiki Taco cruise in Fort Lauderdale',
            mediaType: /\.(mp4|mov|webm)$/i.test(item.image_url) ? ('video' as const) : undefined,
          }))
        );
        setSelectedImage(null);
      }
    };

    fetchLatest();
  }, []);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % galleryImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  return (
    <section id="gallery" className="py-12 sm:py-16 md:py-20 px-4 bg-ocean">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
              Fort Lauderdale Boat Tour Experience Gallery
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto px-4">
              Discover unforgettable moments on Fort Lauderdale's most beautiful waters
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className="relative aspect-[4/3] overflow-hidden rounded-xl cursor-pointer group min-h-[200px] sm:min-h-0"
              onClick={() => openLightbox(index)}
            >
              {image.mediaType === 'video' ? (
                <video
                  src={image.src}
                  muted
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-ocean via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-medium text-sm sm:text-base">{image.alt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/gallery/"
            className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-8 py-3.5 rounded-full font-semibold transition-all duration-300 hover:scale-105 inline-flex items-center gap-2 min-h-[44px]"
            data-gtm-id="learn-more"
          >
            View Full Gallery <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-coral transition-colors p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-white hover:text-coral transition-colors p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-white hover:text-coral transition-colors p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          <div className="max-w-6xl max-h-[90vh] w-full">
            {galleryImages[selectedImage].mediaType === 'video' ? (
              <video
                src={galleryImages[selectedImage].src}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={galleryImages[selectedImage].src}
                alt={galleryImages[selectedImage].alt}
                className="w-full h-full object-contain"
              />
            )}
            <p className="text-white text-center mt-4 text-lg">
              {galleryImages[selectedImage].alt}
            </p>
            <p className="text-white/60 text-center text-sm">
              {selectedImage + 1} / {galleryImages.length}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
