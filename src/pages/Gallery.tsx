import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  title: string;
  mediaType?: 'image' | 'video';
}

const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const categories = ['all', 'cruising', 'sandbar', 'sunset', 'groups'];

  const galleryImages: GalleryImage[] = [
    {
      id: '1',
      src: 'https://vjiybpiuquttbaimywbt.supabase.co/storage/v1/object/public/pontoon/Real1.jpg',
      alt: 'Sunset cruise with Fort Lauderdale skyline',
      category: 'sunset',
      title: 'Sunset Cruise'
    },
    {
      id: '2',
      src: 'https://vjiybpiuquttbaimywbt.supabase.co/storage/v1/object/public/pontoon/real2.jpg',
      alt: 'Turquoise waters of Fort Lauderdale Intracoastal',
      category: 'sandbar',
      title: 'Turquoise Waters'
    },
    {
      id: '3',
      src: 'https://vjiybpiuquttbaimywbt.supabase.co/storage/v1/object/public/pontoon/real3.jpg',
      alt: 'Pontoon cruising Fort Lauderdale Intracoastal Waterway',
      category: 'cruising',
      title: 'Intracoastal Cruising'
    },
    {
      id: '4',
      src: 'https://vjiybpiuquttbaimywbt.supabase.co/storage/v1/object/public/pontoon/real5.jpg',
      alt: 'Fort Lauderdale waterfront aerial view',
      category: 'cruising',
      title: 'Waterfront Aerial View'
    },
    {
      id: '5',
      src: 'https://vjiybpiuquttbaimywbt.supabase.co/storage/v1/object/public/pontoon/real6.jpg',
      alt: 'Group enjoying Fort Lauderdale waters',
      category: 'groups',
      title: 'Group Experience'
    },
    {
      id: '6',
      src: '/Sandbar.png',
      alt: 'Fort Lauderdale sandbar experience',
      category: 'sandbar',
      title: 'Sandbar Paradise'
    },
    {
      id: '7',
      src: '/Night_Intracoastal2.jpg',
      alt: 'Las Olas & Intracoastal Cruise in Fort Lauderdale',
      category: 'cruising',
      title: 'Las Olas Views'
    },
    {
      id: '8',
      src: 'https://vjiybpiuquttbaimywbt.supabase.co/storage/v1/object/public/pontoon/15.png',
      alt: 'Intracoastal Waterway Tour in Fort Lauderdale',
      category: 'cruising',
      title: 'Intracoastal Tour'
    },
    {
      id: '9',
      src: '/DJI_0062.JPG',
      alt: 'Aerial view of Tiki Taco pontoon experience',
      category: 'cruising',
      title: 'Aerial Cruise'
    },
    {
      id: '10',
      src: '/Good3.JPG',
      alt: 'Tiki Taco boat experience on the water',
      category: 'cruising',
      title: 'On the Water'
    },
    {
      id: '11',
      src: '/Good2.JPG',
      alt: 'Guests enjoying a tiki pontoon cruise',
      category: 'groups',
      title: 'Group Fun'
    },
    {
      id: '12',
      src: '/Good1.MP4',
      alt: 'Tiki Taco pontoon video highlight',
      category: 'cruising',
      title: 'Cruise Highlight',
      mediaType: 'video'
    }
  ];

  const filteredImages = useMemo(() => (
    selectedCategory === 'all'
      ? galleryImages
      : galleryImages.filter(img => img.category === selectedCategory)
  ), [selectedCategory, galleryImages]);

  const activeImage = lightboxIndex !== null ? filteredImages[lightboxIndex] : null;

  const closeLightbox = () => setLightboxIndex(null);
  const showPrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return (prev - 1 + filteredImages.length) % filteredImages.length;
    });
  };
  const showNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return (prev + 1) % filteredImages.length;
    });
  };

  useEffect(() => {
    setLightboxIndex(null);
  }, [selectedCategory]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeLightbox();
      } else if (event.key === 'ArrowLeft') {
        showPrev();
      } else if (event.key === 'ArrowRight') {
        showNext();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex, filteredImages.length]);

  return (
    <>
      <Navigation />
      <Helmet>
        <title>Gallery - Fort Lauderdale Pontoon Rental Photos | Tiki Taco</title>
        <meta 
          name="description" 
          content="Explore stunning photos from Fort Lauderdale pontoon rentals. View our luxury boats, beautiful waterways, sandbar experiences, and sunset cruises. See why guests love Tiki Taco!"
        />
        <meta 
          name="keywords" 
          content="Fort Lauderdale boat rental photos, pontoon rental gallery, Intracoastal cruise photos, sandbar pictures, sunset cruise images, Fort Lauderdale waterway photos"
        />
        <meta property="og:title" content="Gallery - Tiki Taco Fort Lauderdale Pontoon Rentals" />
        <meta property="og:description" content="Browse stunning photos from our Fort Lauderdale pontoon rental experiences." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://pontoon-rental.netlify.app/images/gallery/hero.jpg" />
        <link rel="canonical" href="https://pontoon-rental.netlify.app/gallery" />
        
        {/* Structured Data for Image Gallery */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ImageGallery",
            "name": "Tiki Taco Fort Lauderdale Pontoon Rental Gallery",
            "description": "Photo gallery showcasing Fort Lauderdale pontoon rental experiences",
            "url": "https://pontoon-rental.netlify.app/gallery",
            "provider": {
              "@type": "LocalBusiness",
              "name": "Tiki Taco",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "1881 SE 17th St",
                "addressLocality": "Fort Lauderdale",
                "addressRegion": "FL",
                "postalCode": "33316"
              }
            }
          })}
        </script>
      </Helmet>

      <div className="gallery-page" style={{ minHeight: '100vh', backgroundColor: '#f7fafc' }}>
        {/* Hero Section */}
        <section className="gallery-hero">
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <h1>Experience Gallery</h1>
            <p>Discover unforgettable moments on Fort Lauderdale's most beautiful waters</p>
          </div>
        </section>

        {/* Filter Section */}
        <section className="gallery-filters">
          <div className="container">
            <div className="filter-buttons">
              {categories.map(category => (
                <button
                  key={category}
                  className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="gallery-grid-section">
          <div className="container">
            <div className="gallery-grid">
              {filteredImages.map((image, index) => (
                <div 
                  key={image.id} 
                  className="gallery-item"
                  onClick={() => setLightboxIndex(index)}
                >
                  {image.mediaType === 'video' ? (
                    <video src={image.src} muted playsInline preload="metadata" />
                  ) : (
                    <img src={image.src} alt={image.alt} loading="lazy" />
                  )}
                  <div className="gallery-overlay">
                    <h3>{image.title}</h3>
                    <p>Click to view</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Description Section for SEO */}
        <section className="gallery-description">
          <div className="container">
            <h2>Fort Lauderdale Pontoon Rental Gallery</h2>
            <p>
              Explore our collection of photos showcasing the incredible experiences available through 
              Tiki Taco's luxury pontoon rentals in Fort Lauderdale. Our gallery features stunning images 
              of the Intracoastal Waterway, pristine sandbars, breathtaking sunset cruises, and happy 
              guests enjoying the beauty of South Florida's waterways.
            </p>
            <p>
              From cruising past waterfront mansions on the Intracoastal to anchoring at Fort Lauderdale's 
              famous sandbar, these photos capture the unforgettable moments that make our pontoon rental 
              experiences truly special. Whether you're planning a family outing, celebrating a special 
              occasion, or looking for a unique way to explore Fort Lauderdale, our gallery gives you 
              a glimpse of what awaits.
            </p>
            <p>
              All tours depart from The Hilton Marina and include a professional USCG Licensed Captain, 
              premium amenities, and everything you need for an amazing day on the water. Browse our 
              gallery to see why Tiki Taco is Fort Lauderdale's top-rated pontoon rental service!
            </p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="gallery-cta">
          <div className="container">
            <h2>Ready to Create Your Own Memories?</h2>
            <p>Book your Fort Lauderdale pontoon experience today and be part of our next gallery update!</p>
            <a href="/#booking" className="cta-button">
              Book Now
            </a>
          </div>
        </section>

        {/* Lightbox */}
        {activeImage && (
          <div className="lightbox" onClick={closeLightbox}>
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-btn" onClick={closeLightbox}>×</button>
              <button className="lightbox-nav-btn prev" onClick={showPrev} aria-label="Previous image">
                ‹
              </button>
              <button className="lightbox-nav-btn next" onClick={showNext} aria-label="Next image">
                ›
              </button>
              {activeImage.mediaType === 'video' ? (
                <video src={activeImage.src} controls autoPlay />
              ) : (
                <img src={activeImage.src} alt={activeImage.alt} />
              )}
              <div className="lightbox-caption">
                <h3>{activeImage.title}</h3>
                <p>{activeImage.alt}</p>
              </div>
            </div>
          </div>
        )}

        <style>{`
          .gallery-page {
            font-family: 'Poppins', sans-serif;
          }

          /* Hero Section */
          .gallery-hero {
            position: relative;
            height: 50vh;
            min-height: 400px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            text-align: center;
          }
          
          .hero-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.3);
          }
          
          .hero-content {
            position: relative;
            z-index: 1;
          }

          .hero-content h1 {
            font-size: 3.5rem;
            font-weight: 700;
            margin-bottom: 1rem;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
          }

          .hero-content p {
            font-size: 1.5rem;
            opacity: 0.95;
          }

          /* Filters */
          .gallery-filters {
            padding: 2rem 0;
            background: white;
            border-bottom: 2px solid #e2e8f0;
          }

          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
          }

          .filter-buttons {
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
          }

          .filter-btn {
            padding: 0.75rem 1.5rem;
            border: 2px solid #e2e8f0;
            background: white;
            color: #4a5568;
            border-radius: 50px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
          }

          .filter-btn:hover {
            border-color: #FF6B6B;
            color: #FF6B6B;
          }

          .filter-btn.active {
            background: #FF6B6B;
            color: white;
            border-color: #FF6B6B;
          }

          /* Gallery Grid */
          .gallery-grid-section {
            padding: 4rem 0;
            background: #f7fafc;
          }

          .gallery-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 2rem;
          }

          .gallery-item {
            position: relative;
            aspect-ratio: 4/3;
            overflow: hidden;
            border-radius: 12px;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s;
          }

          .gallery-item:hover {
            transform: scale(1.05);
          }

          .gallery-item img,
          .gallery-item video {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s;
          }

          .gallery-item:hover img,
          .gallery-item:hover video {
            transform: scale(1.1);
          }

          .gallery-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 1.5rem;
            background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
            color: white;
            transform: translateY(100%);
            transition: transform 0.3s;
          }

          .gallery-item:hover .gallery-overlay {
            transform: translateY(0);
          }

          .gallery-overlay h3 {
            font-size: 1.25rem;
            margin-bottom: 0.5rem;
          }

          .gallery-overlay p {
            font-size: 0.875rem;
            opacity: 0.9;
          }

          /* Description Section */
          .gallery-description {
            padding: 4rem 0;
            background: white;
          }

          .gallery-description h2 {
            font-size: 2.5rem;
            color: #1a365d;
            margin-bottom: 2rem;
            text-align: center;
          }

          .gallery-description p {
            font-size: 1.125rem;
            line-height: 1.8;
            color: #4a5568;
            margin-bottom: 1.5rem;
            text-align: center;
            max-width: 900px;
            margin-left: auto;
            margin-right: auto;
          }

          /* CTA Section */
          .gallery-cta {
            padding: 4rem 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-align: center;
          }

          .gallery-cta h2 {
            font-size: 2.5rem;
            margin-bottom: 1rem;
          }

          .gallery-cta p {
            font-size: 1.25rem;
            margin-bottom: 2rem;
            opacity: 0.95;
          }

          .cta-button {
            display: inline-block;
            padding: 1rem 3rem;
            background: #FF6B6B;
            color: white;
            text-decoration: none;
            border-radius: 50px;
            font-weight: 600;
            font-size: 1.125rem;
            transition: all 0.3s;
            box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
          }

          .cta-button:hover {
            background: #e05555;
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(255, 107, 107, 0.5);
          }

          /* Lightbox */
          .lightbox {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            padding: 2rem;
          }

          .lightbox-content {
            position: relative;
            width: min(900px, 90vw);
            max-height: 90vh;
          }

          .lightbox-content img,
          .lightbox-content video {
            max-width: 100%;
            max-height: 80vh;
            border-radius: 8px;
          }

          .close-btn {
            position: absolute;
            top: -40px;
            right: 0;
            background: transparent;
            border: none;
            color: white;
            font-size: 3rem;
            cursor: pointer;
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .lightbox-nav-btn {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(0, 0, 0, 0.6);
            border: none;
            color: white;
            font-size: 2.5rem;
            width: 48px;
            height: 48px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.2s ease;
          }

          .lightbox-nav-btn:hover {
            background: rgba(0, 0, 0, 0.8);
          }

          .lightbox-nav-btn.prev {
            left: 16px;
          }

          .lightbox-nav-btn.next {
            right: 16px;
          }

          @media (max-width: 768px) {
            .lightbox-nav-btn.prev {
              left: -10px;
            }

            .lightbox-nav-btn.next {
              right: -10px;
            }
          }

          .lightbox-caption {
            margin-top: 1rem;
            color: white;
            text-align: center;
          }

          .lightbox-caption h3 {
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
          }

          .lightbox-caption p {
            opacity: 0.8;
          }

          @media (max-width: 768px) {
            .hero-content h1 {
              font-size: 2rem;
            }

            .gallery-grid {
              grid-template-columns: 1fr;
            }

            .filter-buttons {
              flex-direction: column;
              align-items: stretch;
            }

            .filter-btn {
              width: 100%;
            }
          }
        `}</style>
      </div>
      <Footer />
    </>
  );
};

export default Gallery;