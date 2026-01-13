import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Target, Award, Clock, Sparkles } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

interface Destination {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDesc: string;
  duration: string[];
  minPrice: number;
  highlights: string[];
  image: string;
  featured: boolean;
}

const Destinations: React.FC = () => {
  const navigate = useNavigate();

  const handleBookClick = () => {
    // Navigate to home page and scroll to booking section
    navigate('/');
    setTimeout(() => {
      const bookingSection = document.getElementById('booking');
      bookingSection?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const destinations: Destination[] = [
    {
      id: '1',
      name: 'Las Olas & Intracoastal Cruise',
      slug: 'las-olas-cruise',
      description: 'Cruise through Fort Lauderdale\'s famous Intracoastal Waterway, passing luxury waterfront homes and the vibrant Las Olas Boulevard area. Perfect for sightseeing and experiencing the heart of Fort Lauderdale from the water.',
      shortDesc: 'Luxury homes & Las Olas views',
      duration: ['2 hours', '3 hours', '4 hours'],
      minPrice: 1000,
      highlights: ['Las Olas Boulevard views', 'Luxury waterfront estates', 'Perfect for sightseeing', 'Iconic drawbridges'],
      image: '/Night_Intracoastal2.jpg',
      featured: true
    },
    {
      id: '2',
      name: 'Fort Lauderdale Sandbar',
      slug: 'sandbar-party',
      description: 'Anchor at the popular Fort Lauderdale sandbar with stunning waterfront views. Perfect for swimming, relaxation, and creating unforgettable memories in crystal clear waters.',
      shortDesc: 'Swimming & relaxation paradise',
      duration: ['3 hours', '4 hours'],
      minPrice: 1200,
      highlights: ['Popular sandbar destination', 'Crystal clear waters', 'Ideal for photos', 'Swimming & floating'],
      image: '/Sandbar.png',
      featured: true
    },
    {
      id: '3',
      name: 'Intracoastal Waterway Tour',
      slug: 'intracoastal-tour',
      description: 'Explore the beautiful Fort Lauderdale Intracoastal Waterway, passing luxury yachts, waterfront mansions, and the Port Everglades inlet. Experience the Venice of America in style.',
      shortDesc: 'Luxury yachts & mansions',
      duration: ['3 hours', '4 hours'],
      minPrice: 1200,
      highlights: ['Mega yachts & vessels', 'Waterfront mansions', 'Port Everglades views', 'Millionaire\'s Row'],
      image: 'https://vjiybpiuquttbaimywbt.supabase.co/storage/v1/object/public/pontoon/15.png',
      featured: false
    },
    {
      id: '4',
      name: 'Fort Lauderdale Beach & Coast',
      slug: 'beach-coast-cruise',
      description: 'Experience Fort Lauderdale\'s stunning beach coastline with views of the famous beach and A1A. Perfect for sunset cruises and enjoying the Atlantic Ocean breeze.',
      shortDesc: 'Beach views & sunset cruises',
      duration: ['2 hours', '3 hours', '4 hours'],
      minPrice: 1000,
      highlights: ['Beach coastline views', 'Atlantic Ocean experience', 'Sunset atmosphere', 'Famous A1A strip'],
      image: 'https://vjiybpiuquttbaimywbt.supabase.co/storage/v1/object/public/pontoon/16.png',
      featured: false
    },
    {
      id: '5',
      name: 'Full Waterway Tour Cruise',
      slug: 'full-waterway-tour',
      description: 'The ultimate Fort Lauderdale experience! Customize your perfect day with visits to multiple destinations including the Intracoastal, sandbars, and coastal areas. Our most comprehensive tour.',
      shortDesc: 'Complete Fort Lauderdale experience',
      duration: ['2 hours', '3 hours', '4 hours'],
      minPrice: 1000,
      highlights: ['Fully customizable route', 'Multiple destinations', 'Best value for longer trips', 'All highlights included'],
      image: 'https://vjiybpiuquttbaimywbt.supabase.co/storage/v1/object/public/pontoon/Real1.jpg',
      featured: true
    }
  ];

  const featuredDestinations = destinations.filter(d => d.featured);
  const allDestinations = destinations;

  return (
    <>
      <Navigation />
      
      <Helmet>
        <title>Fort Lauderdale Pontoon Rental Destinations | Tiki Taco</title>
        <meta 
          name="description" 
          content="Explore 5 stunning destinations for your Fort Lauderdale pontoon rental. From Las Olas to pristine sandbars, discover the perfect cruise for your group. Tours from $1,000."
        />
        <meta 
          name="keywords" 
          content="Fort Lauderdale boat destinations, Intracoastal cruise routes, sandbar locations Fort Lauderdale, Las Olas cruise, beach coast tour, pontoon rental routes"
        />
        <meta property="og:title" content="Popular Destinations - Tiki Taco Fort Lauderdale" />
        <meta property="og:description" content="Discover 5 incredible destinations for your Fort Lauderdale pontoon adventure." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://pontoon-rental.netlify.app/images/destinations-hero.jpg" />
        <link rel="canonical" href="https://pontoon-rental.netlify.app/destinations" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TouristAttraction",
            "name": "Fort Lauderdale Pontoon Rental Destinations",
            "description": "Premium pontoon rental destinations throughout Fort Lauderdale's waterways",
            "url": "https://pontoon-rental.netlify.app/destinations",
            "provider": {
              "@type": "LocalBusiness",
              "name": "Tiki Taco",
              "telephone": "+1-954-764-4344",
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

      <div className="destinations-page" style={{ minHeight: '100vh', backgroundColor: '#f7fafc' }}>
        {/* Hero Section */}
        <section className="destinations-hero">
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <h1>Popular Destinations</h1>
            <p>Explore Fort Lauderdale's most stunning waterways and iconic locations</p>
          </div>
        </section>

        {/* Featured Destinations */}
        <section className="featured-section">
          <div className="container">
            <h2>Featured Experiences</h2>
            <p className="section-intro">
              Our most popular destinations, handpicked for unforgettable Fort Lauderdale experiences
            </p>
            <div className="destinations-grid featured-grid">
              {featuredDestinations.map(destination => (
                <div key={destination.id} className="destination-card featured">
                  <div className="card-image">
                    <img src={destination.image} alt={destination.name} />
                    <span className="featured-badge">Featured</span>
                  </div>
                  <div className="card-content">
                    <h3>{destination.name}</h3>
                    <p className="short-desc">{destination.shortDesc}</p>
                    <div className="highlights">
                      {destination.highlights.slice(0, 3).map((highlight, idx) => (
                        <span key={idx} className="highlight-tag">✓ {highlight}</span>
                      ))}
                    </div>
                    <div className="card-footer">
                      <button onClick={handleBookClick} className="view-btn">
                        View Details & Book
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* All Destinations */}
        <section className="all-destinations-section">
          <div className="container">
            <h2>All Destinations</h2>
            <p className="section-intro">
              Choose from our complete selection of Fort Lauderdale pontoon cruise experiences
            </p>
            <div className="destinations-list">
              {allDestinations.map(destination => (
                <div key={destination.id} className="destination-row">
                  <div className="row-image">
                    <img src={destination.image} alt={destination.name} />
                  </div>
                  <div className="row-content">
                    <h3>{destination.name}</h3>
                    <p>{destination.description}</p>
                    <div className="row-highlights">
                      {destination.highlights.map((highlight, idx) => (
                        <span key={idx} className="highlight-item">• {highlight}</span>
                      ))}
                    </div>
                    <div className="row-footer">
                      <button onClick={handleBookClick} className="book-btn">
                        Book This Destination
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="why-choose-section">
          <div className="container">
            <h2>Why Choose Tiki Taco Destinations?</h2>
            <div className="reasons-grid">
              <div className="reason-card">
                <div className="reason-icon">
                  <Target className="w-12 h-12" />
                </div>
                <h3>Expertly Curated Routes</h3>
                <p>Each destination is carefully selected to showcase Fort Lauderdale's most beautiful and iconic waterways.</p>
              </div>
              <div className="reason-card">
                <div className="reason-icon">
                  <Award className="w-12 h-12" />
                </div>
                <h3>Professional Captains</h3>
                <p>All tours include a USCG Licensed Captain who knows every hidden gem and best photo spot.</p>
              </div>
              <div className="reason-card">
                <div className="reason-icon">
                  <Clock className="w-12 h-12" />
                </div>
                <h3>Flexible Duration</h3>
                <p>Choose from 2, 3, or 4-hour experiences to match your schedule and budget.</p>
              </div>
              <div className="reason-card">
                <div className="reason-icon">
                  <Sparkles className="w-12 h-12" />
                </div>
                <h3>All-Inclusive</h3>
                <p>Every destination includes premium amenities, fuel, and everything you need for an amazing day.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="destinations-cta">
          <div className="container">
            <h2>Ready to Explore Fort Lauderdale?</h2>
            <p>Book your destination today and experience the best of South Florida's waterways!</p>
            <button onClick={handleBookClick} className="cta-button">Book Your Destination</button>
          </div>
        </section>

        {/* SEO Content Section */}
        <section className="seo-content">
          <div className="container">
            <h2>Fort Lauderdale Pontoon Rental Destinations</h2>
            <p>
              Tiki Taco offers the most comprehensive selection of pontoon rental destinations in Fort Lauderdale. 
              Whether you're looking to cruise the famous Intracoastal Waterway, relax at pristine sandbars, or 
              enjoy stunning sunset views along the coast, we have the perfect destination for your group.
            </p>
            <p>
              All our destinations depart from The Hilton Marina (1881 SE 17th St, Fort Lauderdale) and include 
              a professional USCG Licensed Captain, premium amenities, fuel, and all safety equipment. With flexible 
              2, 3, and 4-hour options, you can customize your Fort Lauderdale pontoon experience to match your 
              preferences and budget.
            </p>
            <p>
              From the luxury estates of Las Olas to the crystal-clear waters of Fort Lauderdale's famous sandbar, 
              each destination offers unique sights and unforgettable experiences. Our captains are local experts 
              who know the best routes, hidden spots, and perfect timing for photos and wildlife sightings.
            </p>
          </div>
        </section>

        <style>{`
          .destinations-page {
            font-family: 'Poppins', sans-serif;
          }

          /* Hero Section */
          .destinations-hero {
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

          /* Container */
          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
          }

          /* Section Styling */
          section {
            padding: 4rem 0;
          }

          h2 {
            font-size: 2.5rem;
            color: #1a365d;
            text-align: center;
            margin-bottom: 1rem;
          }

          .section-intro {
            text-align: center;
            font-size: 1.125rem;
            color: #4a5568;
            margin-bottom: 3rem;
            max-width: 700px;
            margin-left: auto;
            margin-right: auto;
          }

          /* Featured Section */
          .featured-section {
            background: #f7fafc;
          }

          .destinations-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 2rem;
          }

          .destination-card {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s;
            display: flex;
            flex-direction: column;
          }

          .destination-card:hover {
            transform: translateY(-10px);
          }

          .card-image {
            position: relative;
            height: 250px;
            overflow: hidden;
          }

          .card-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s;
          }

          .destination-card:hover .card-image img {
            transform: scale(1.1);
          }

          .featured-badge {
            position: absolute;
            top: 1rem;
            right: 1rem;
            padding: 0.5rem 1rem;
            background: #FF6B6B;
            color: white;
            border-radius: 50px;
            font-size: 0.875rem;
            font-weight: 600;
          }

          .card-content {
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
            flex-grow: 1;
          }

          .card-content h3 {
            font-size: 1.5rem;
            color: #1a365d;
            margin-bottom: 0.5rem;
          }

          .short-desc {
            color: #4a5568;
            margin-bottom: 1rem;
          }

          .highlights {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            margin-bottom: 1.5rem;
          }

          .highlight-tag {
            font-size: 0.875rem;
            color: #48bb78;
            font-weight: 500;
          }

          .card-footer {
            display: flex;
            justify-content: center;
            align-items: center;
            padding-top: 1rem;
            border-top: 2px solid #e2e8f0;
            margin-top: auto;
          }

          .view-btn {
            padding: 0.75rem 1.5rem;
            background: #1a365d;
            color: white;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            font-size: 1rem;
          }

          .view-btn:hover {
            background: #2d4a7c;
            transform: translateY(-2px);
          }

          /* All Destinations Section */
          .all-destinations-section {
            background: white;
          }

          .destinations-list {
            display: flex;
            flex-direction: column;
            gap: 2rem;
          }

          .destination-row {
            display: grid;
            grid-template-columns: 300px 1fr;
            gap: 2rem;
            background: #f7fafc;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }

          .row-image {
            height: 100%;
            min-height: 250px;
          }

          .row-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .row-content {
            padding: 2rem;
          }

          .row-content h3 {
            font-size: 1.75rem;
            color: #1a365d;
            margin-bottom: 1rem;
          }

          .row-content p {
            color: #4a5568;
            line-height: 1.6;
            margin-bottom: 1rem;
          }

          .row-highlights {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 0.5rem;
            margin-bottom: 1.5rem;
          }

          .highlight-item {
            font-size: 0.875rem;
            color: #2d3748;
          }

          .row-footer {
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .book-btn {
            padding: 0.875rem 2rem;
            background: #FF6B6B;
            color: white;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            font-size: 1rem;
          }

          .book-btn:hover {
            background: #e05555;
            transform: translateY(-2px);
          }

          /* Why Choose Section */
          .why-choose-section {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
          }

          .why-choose-section h2 {
            color: white;
          }

          .reasons-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
          }

          .reason-card {
            text-align: center;
            padding: 2rem;
          }

          .reason-icon {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0 auto 1.5rem;
            width: 80px;
            height: 80px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            color: white;
            transition: all 0.3s;
          }
          
          .reason-card:hover .reason-icon {
            background: rgba(255, 255, 255, 0.3);
            transform: scale(1.1);
          }

          .reason-card h3 {
            font-size: 1.25rem;
            margin-bottom: 1rem;
          }

          .reason-card p {
            opacity: 0.9;
            line-height: 1.6;
          }

          /* CTA Section */
          .destinations-cta {
            background: #1a365d;
            color: white;
            text-align: center;
          }

          .destinations-cta h2 {
            color: white;
            margin-bottom: 1rem;
          }

          .destinations-cta p {
            font-size: 1.25rem;
            margin-bottom: 2rem;
            opacity: 0.95;
          }

          .cta-button {
            display: inline-block;
            padding: 1rem 3rem;
            background: #FF6B6B;
            color: white;
            border: none;
            border-radius: 50px;
            font-weight: 600;
            font-size: 1.125rem;
            cursor: pointer;
            transition: all 0.3s;
            box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
          }

          .cta-button:hover {
            background: #e05555;
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(255, 107, 107, 0.5);
          }

          /* SEO Content Section */
          .seo-content {
            background: #f7fafc;
          }

          .seo-content p {
            font-size: 1rem;
            line-height: 1.8;
            color: #4a5568;
            margin-bottom: 1.5rem;
            text-align: center;
            max-width: 900px;
            margin-left: auto;
            margin-right: auto;
          }

          @media (max-width: 768px) {
            .hero-content h1 {
              font-size: 2rem;
            }

            .destinations-grid {
              grid-template-columns: 1fr;
            }

            .destination-row {
              grid-template-columns: 1fr;
            }

            .row-image {
              height: 200px;
              min-height: unset;
            }

            .reasons-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </div>
      
      <Footer />
    </>
  );
};

export default Destinations;