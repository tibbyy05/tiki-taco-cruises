import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { supabase, CLIENT_ID } from '../lib/supabase';

interface GalleryItem {
  id: string;
  image_url: string;
  caption: string | null;
  display_order: number;
  category?: string | null;
}

const Gallery: React.FC = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  useEffect(() => {
    const fetchGalleryItems = async () => {
      setIsLoading(true);
      const { data } = await supabase
        .from('gallery_photos')
        .select('id, image_url, caption, display_order')
        .eq('client_id', CLIENT_ID)
        .order('display_order', { ascending: true });

      setGalleryItems(data ?? []);
      setIsLoading(false);
    };

    fetchGalleryItems();
  }, []);

  const activeImage = lightboxIndex !== null ? galleryItems[lightboxIndex] : null;

  const closeLightbox = () => setLightboxIndex(null);
  const showPrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return (prev - 1 + galleryItems.length) % galleryItems.length;
    });
  };
  const showNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return (prev + 1) % galleryItems.length;
    });
  };

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
  }, [lightboxIndex, galleryItems.length]);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStartX.current;
    const deltaY = touch.clientY - touchStartY.current;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        showPrev();
      } else {
        showNext();
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

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

        {/* Gallery Grid */}
        <section className="gallery-grid-section">
          <div className="container">
            <div className="gallery-grid">
              {isLoading ? (
                <p style={{ textAlign: 'center', color: '#4a5568' }}>Loading...</p>
              ) : galleryItems.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#4a5568' }}>Gallery coming soon!</p>
              ) : (
                galleryItems.map((image, index) => {
                  const isVideo = /\.(mp4|mov|webm)$/i.test(image.image_url);
                  const captionText = image.caption?.trim() || '';
                  const shouldPreload = index < 2;
                  return (
                    <div key={image.id} className="gallery-card">
                      <div
                        className="gallery-item"
                        onClick={() => setLightboxIndex(index)}
                      >
                        {isVideo ? (
                          <video
                            src={image.image_url}
                            muted
                            playsInline
                            preload={shouldPreload ? 'auto' : 'metadata'}
                          />
                        ) : (
                          <img
                            src={image.image_url}
                            alt={captionText || 'Gallery media'}
                            loading={shouldPreload ? 'eager' : 'lazy'}
                            decoding="async"
                            className="gallery-media"
                          />
                        )}
                        {captionText && (
                          <div className="gallery-overlay">
                            <h3>{captionText}</h3>
                          </div>
                        )}
                      </div>
                      {captionText && (
                        <p className="gallery-caption">{captionText}</p>
                      )}
                    </div>
                  );
                })
              )}
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
            <div
              className="lightbox-content"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <button className="close-btn" onClick={closeLightbox}>×</button>
              <button className="lightbox-nav-btn prev" onClick={showPrev} aria-label="Previous image">
                ‹
              </button>
              <button className="lightbox-nav-btn next" onClick={showNext} aria-label="Next image">
                ›
              </button>
              {/\.(mp4|mov|webm)$/i.test(activeImage.image_url) ? (
                <video src={activeImage.image_url} controls autoPlay muted playsInline />
              ) : (
                <img src={activeImage.image_url} alt={activeImage.caption ?? 'Gallery media'} />
              )}
              {activeImage.caption && (
                <div className="lightbox-caption">
                  <h3>{activeImage.caption}</h3>
                  <p>{activeImage.caption}</p>
                </div>
              )}
            </div>
          </div>
        )}

        <style>{`
          .gallery-page {
            font-family: 'DM Sans', sans-serif;
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

          /* Gallery Grid */
          .gallery-grid-section {
            padding: 4rem 0;
            background: #f7fafc;
          }

          .gallery-grid-section .container {
            max-width: none;
            padding: 0 24px;
          }

          .gallery-grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 20px;
          }

          .gallery-card {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
          }

          .gallery-item {
            position: relative;
            height: 500px;
            overflow: hidden;
            border-radius: 12px;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s;
          }

          @media (max-width: 1199px) {
            .gallery-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }

            .gallery-item {
              height: 380px;
            }
          }

          @media (max-width: 767px) {
            .gallery-grid {
              grid-template-columns: 1fr;
            }

            .gallery-item {
              height: 300px;
            }
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

          .gallery-item {
            position: relative;
          }

          .gallery-media {
            filter: blur(12px);
            transform: scale(1.02);
            transition: filter 0.4s ease, transform 0.4s ease;
          }

          .gallery-media[src] {
            filter: blur(0);
            transform: scale(1);
          }

          .gallery-overlay p {
            font-size: 0.875rem;
            opacity: 0.9;
          }

          .lightbox {
            position: fixed;
            inset: 0;
            background: rgba(6, 12, 24, 0.88);
            backdrop-filter: blur(8px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 50;
            padding: 24px;
          }

          .lightbox-content {
            position: relative;
            max-width: 1200px;
            width: 100%;
            background: rgba(0, 0, 0, 0.6);
            border-radius: 18px;
            padding: 24px;
            animation: lightboxFade 0.25s ease-out;
          }

          .lightbox-content img,
          .lightbox-content video {
            width: 100%;
            max-height: 80vh;
            object-fit: contain;
            border-radius: 12px;
          }

          .lightbox-caption h3 {
            color: white;
            font-size: 1.25rem;
            margin-top: 16px;
            text-align: center;
          }

          .lightbox-caption p {
            color: rgba(255, 255, 255, 0.75);
            text-align: center;
            margin-top: 6px;
          }

          .close-btn {
            position: absolute;
            top: 12px;
            right: 16px;
            font-size: 2rem;
            color: white;
            background: none;
            border: none;
            cursor: pointer;
          }

          .lightbox-nav-btn {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            font-size: 2.5rem;
            color: white;
            background: rgba(0, 0, 0, 0.4);
            border: none;
            border-radius: 999px;
            width: 44px;
            height: 44px;
            cursor: pointer;
          }

          .lightbox-nav-btn.prev {
            left: -12px;
          }

          .lightbox-nav-btn.next {
            right: -12px;
          }

          @keyframes lightboxFade {
            from {
              opacity: 0;
              transform: scale(0.98);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          .gallery-caption {
            font-size: 0.95rem;
            color: #4a5568;
            text-align: center;
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

          @media (max-width: 768px) {
            .hero-content h1 {
              font-size: 2rem;
            }

            .gallery-grid {
              grid-template-columns: 1fr;
            }

          }
        `}</style>
      </div>
      <Footer />
    </>
  );
};

export default Gallery;