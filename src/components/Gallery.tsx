import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const galleryImages = [
  {
    id: 1,
    src: 'https://vjiybpiuquttbaimywbt.supabase.co/storage/v1/object/public/pontoon/Real1.jpg',
    alt: 'Sunset cruise with Fort Lauderdale skyline',
    category: 'sunset'
  },
  {
    id: 2,
    src: 'https://vjiybpiuquttbaimywbt.supabase.co/storage/v1/object/public/pontoon/real2.jpg',
    alt: 'Turquoise waters of Fort Lauderdale Intracoastal',
    category: 'sandbar'
  },
  {
    id: 3,
    src: 'https://vjiybpiuquttbaimywbt.supabase.co/storage/v1/object/public/pontoon/real3.jpg',
    alt: 'Pontoon cruising Fort Lauderdale Intracoastal Waterway',
    category: 'cruising'
  },
  {
    id: 4,
    src: 'https://vjiybpiuquttbaimywbt.supabase.co/storage/v1/object/public/pontoon/real5.jpg',
    alt: 'Fort Lauderdale waterfront aerial view',
    category: 'destinations'
  },
  {
    id: 5,
    src: 'https://vjiybpiuquttbaimywbt.supabase.co/storage/v1/object/public/pontoon/real6.jpg',
    alt: 'Group enjoying Fort Lauderdale waters',
    category: 'sandbar'
  },
  {
    id: 6,
    src: '/Sandbar.png',
    alt: 'Fort Lauderdale sandbar experience',
    category: 'sandbar'
  },
  {
    id: 7,
    src: '/Night_Intracoastal2.jpg',
    alt: 'Las Olas & Intracoastal Cruise in Fort Lauderdale',
    category: 'cruising'
  },
  {
    id: 8,
    src: 'https://vjiybpiuquttbaimywbt.supabase.co/storage/v1/object/public/pontoon/15.png',
    alt: 'Intracoastal Waterway Tour in Fort Lauderdale',
    category: 'cruising'
  },
  {
    id: 9,
    src: 'https://vjiybpiuquttbaimywbt.supabase.co/storage/v1/object/public/pontoon/16.png',
    alt: 'Fort Lauderdale Beach & Coast cruise',
    category: 'sunset'
  }
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

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
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
            Experience Gallery
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto px-4">
            Discover unforgettable moments on Fort Lauderdale's most beautiful waters
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className="relative aspect-[4/3] overflow-hidden rounded-xl cursor-pointer group min-h-[200px] sm:min-h-0"
              onClick={() => openLightbox(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ocean via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-medium text-sm sm:text-base">{image.alt}</p>
                </div>
              </div>
            </div>
          ))}
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
            <img
              src={galleryImages[selectedImage].src}
              alt={galleryImages[selectedImage].alt}
              className="w-full h-full object-contain"
            />
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
