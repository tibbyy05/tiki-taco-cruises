import React from 'react';
import { Helmet } from 'react-helmet-async';
import BookingCalendar from '../../components/BookingCalendar';

const FullWaterwayTour: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Full Waterway Tour Cruise - Complete Fort Lauderdale Experience | Tiki Taco</title>
        <meta 
          name="description" 
          content="Experience the complete Fort Lauderdale waterway tour. Cruise the Intracoastal, visit sandbars, and explore the stunning coastline. 2-4 hour tours starting at $1,000."
        />
        <meta 
          name="keywords" 
          content="Fort Lauderdale waterway tour, complete cruise experience, Intracoastal tour, Fort Lauderdale boat rental, sandbar cruise, pontoon rental"
        />
        <meta property="og:title" content="Full Waterway Tour Cruise - Tiki Taco Fort Lauderdale" />
        <meta property="og:description" content="Experience the ultimate Fort Lauderdale waterway adventure with our comprehensive tour." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://pontoon-rental.netlify.app/destinations/full-waterway-tour" />
      </Helmet>

      <div className="destination-page">
        {/* Hero Section */}
        <section className="destination-hero">
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <h1>Full Waterway Tour Cruise</h1>
            <p className="hero-subtitle">The Ultimate Fort Lauderdale Experience</p>
            <div className="hero-details">
              <span className="detail-item">⏱ 2-4 Hours</span>
              <span className="detail-item">👥 Up to 18 Guests</span>
              <span className="detail-item">💰 From $1,000</span>
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="destination-overview">
          <div className="container">
            <h2>The Complete Fort Lauderdale Waterway Experience</h2>
            <p className="lead">
              Embark on the ultimate Fort Lauderdale boating adventure with our comprehensive Full Waterway Tour. 
              This customizable cruise takes you through the best of what Fort Lauderdale's waters have to offer - 
              from the iconic Intracoastal Waterway to pristine sandbars and stunning coastal views.
            </p>
            <p>
              Perfect for special occasions, family gatherings, or corporate events, this tour can be tailored 
              to your preferences. Choose from 2, 3, or 4-hour experiences and create your own itinerary with 
              our professional USCG Licensed Captain.
            </p>
          </div>
        </section>

        {/* What's Included */}
        <section className="whats-included">
          <div className="container">
            <h2>What's Included</h2>
            <div className="included-grid">
              <div className="included-item">
                <div className="icon">🎯</div>
                <h3>Professional Captain</h3>
                <p>USCG Licensed & Experienced</p>
              </div>
              <div className="included-item">
                <div className="icon">⛽</div>
                <h3>All Fuel & Fees</h3>
                <p>No hidden costs</p>
              </div>
              <div className="included-item">
                <div className="icon">🎵</div>
                <h3>Bluetooth Sound</h3>
                <p>Premium audio system</p>
              </div>
              <div className="included-item">
                <div className="icon">🧊</div>
                <h3>Cooler & Ice</h3>
                <p>Keep drinks cold all day</p>
              </div>
              <div className="included-item">
                <div className="icon">☂️</div>
                <h3>Bimini Top Shade</h3>
                <p>Full sun protection</p>
              </div>
              <div className="included-item">
                <div className="icon">🦺</div>
                <h3>Safety Equipment</h3>
                <p>Life jackets for all</p>
              </div>
              <div className="included-item">
                <div className="icon">🏊</div>
                <h3>Water Mat</h3>
                <p>Floating fun included</p>
              </div>
              <div className="included-item">
                <div className="icon">🔌</div>
                <h3>USB Charging</h3>
                <p>Keep devices powered</p>
              </div>
            </div>
          </div>
        </section>

        {/* Tour Highlights */}
        <section className="tour-highlights">
          <div className="container">
            <h2>Tour Highlights</h2>
            <div className="highlights-grid">
              <div className="highlight-card">
                <img src="/images/intracoastal.jpg" alt="Intracoastal Waterway" />
                <h3>Intracoastal Waterway</h3>
                <p>Cruise past luxury yachts, waterfront mansions, and mega estates along Fort Lauderdale's famous waterway.</p>
              </div>
              <div className="highlight-card">
                <img src="/images/sandbar.jpg" alt="Fort Lauderdale Sandbar" />
                <h3>Pristine Sandbars</h3>
                <p>Anchor at popular sandbar locations with crystal clear waters perfect for swimming and relaxation.</p>
              </div>
              <div className="highlight-card">
                <img src="/images/las-olas.jpg" alt="Las Olas" />
                <h3>Las Olas Boulevard</h3>
                <p>Experience views of Fort Lauderdale's vibrant Las Olas area and iconic drawbridges.</p>
              </div>
              <div className="highlight-card">
                <img src="/images/coastline.jpg" alt="Fort Lauderdale Coast" />
                <h3>Stunning Coastline</h3>
                <p>Enjoy breathtaking views of Fort Lauderdale Beach and the Atlantic Ocean shoreline.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="pricing-section">
          <div className="container">
            <h2>Flexible Duration & Pricing</h2>
            <div className="pricing-grid">
              <div className="pricing-card">
                <div className="price-badge">Best Value</div>
                <h3>2 Hours</h3>
                <div className="price">$1,000</div>
                <ul className="price-features">
                  <li>Perfect for quick getaway</li>
                  <li>Intracoastal highlights</li>
                  <li>Up to 18 guests</li>
                  <li>All amenities included</li>
                </ul>
              </div>
              <div className="pricing-card featured">
                <div className="price-badge popular">Most Popular</div>
                <h3>3 Hours</h3>
                <div className="price">$1,200</div>
                <ul className="price-features">
                  <li>Ideal cruise duration</li>
                  <li>Multiple destinations</li>
                  <li>Swimming & relaxation time</li>
                  <li>Up to 18 guests</li>
                  <li>All amenities included</li>
                </ul>
              </div>
              <div className="pricing-card">
                <div className="price-badge">Extended</div>
                <h3>4 Hours</h3>
                <div className="price">$1,500</div>
                <ul className="price-features">
                  <li>Ultimate experience</li>
                  <li>Visit all highlights</li>
                  <li>Extended sandbar time</li>
                  <li>Up to 18 guests</li>
                  <li>All amenities included</li>
                </ul>
              </div>
            </div>
            <p className="pricing-note">
              <strong>Extra Guest Pricing:</strong> Base rate includes up to 14 guests. 
              Guests 15-18 are $50 per additional person.
            </p>
          </div>
        </section>

        {/* Booking Section */}
        <section className="booking-section">
          <div className="container">
            <BookingCalendar destinationName="Full Waterway Tour Cruise" />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="destination-faq">
          <div className="container">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-list">
              <div className="faq-item">
                <h3>Can we customize the itinerary?</h3>
                <p>Absolutely! Work with your captain to create a custom route based on your preferences and interests.</p>
              </div>
              <div className="faq-item">
                <h3>What should we bring?</h3>
                <p>Bring sunscreen, towels, food, and beverages. We provide the cooler, ice, and all equipment.</p>
              </div>
              <div className="faq-item">
                <h3>Is this suitable for families?</h3>
                <p>Yes! This tour is perfect for all ages. Life jackets are provided for children and adults.</p>
              </div>
              <div className="faq-item">
                <h3>What time slots are available?</h3>
                <p>We offer departures at 10am, 1pm, 4pm, and 7pm daily. Sunset cruises (7pm) are particularly popular!</p>
              </div>
            </div>
          </div>
        </section>

        <style>{`
          .destination-page {
            font-family: 'Poppins', sans-serif;
          }

          /* Hero Section */
          .destination-hero {
            position: relative;
            height: 60vh;
            min-height: 500px;
            background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
                        url('/images/full-waterway-hero.jpg') center/cover;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            text-align: center;
          }

          .hero-content h1 {
            font-size: 3.5rem;
            font-weight: 700;
            margin-bottom: 1rem;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
          }

          .hero-subtitle {
            font-size: 1.5rem;
            margin-bottom: 2rem;
            opacity: 0.95;
          }

          .hero-details {
            display: flex;
            gap: 2rem;
            justify-content: center;
            flex-wrap: wrap;
          }

          .detail-item {
            font-size: 1.125rem;
            padding: 0.75rem 1.5rem;
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
            border-radius: 50px;
          }

          /* Overview Section */
          .destination-overview {
            padding: 4rem 0;
            background: white;
          }

          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
          }

          h2 {
            font-size: 2.5rem;
            color: #1a365d;
            margin-bottom: 1.5rem;
            text-align: center;
          }

          .lead {
            font-size: 1.25rem;
            line-height: 1.8;
            color: #2d3748;
            margin-bottom: 1rem;
          }

          /* What's Included */
          .whats-included {
            padding: 4rem 0;
            background: #f7fafc;
          }

          .included-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
          }

          .included-item {
            text-align: center;
            padding: 2rem;
            background: white;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s;
          }

          .included-item:hover {
            transform: translateY(-5px);
          }

          .icon {
            font-size: 3rem;
            margin-bottom: 1rem;
          }

          .included-item h3 {
            font-size: 1.25rem;
            color: #1a365d;
            margin-bottom: 0.5rem;
          }

          /* Tour Highlights */
          .tour-highlights {
            padding: 4rem 0;
          }

          .highlights-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
          }

          .highlight-card {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s;
          }

          .highlight-card:hover {
            transform: translateY(-10px);
          }

          .highlight-card img {
            width: 100%;
            height: 200px;
            object-fit: cover;
          }

          .highlight-card h3 {
            padding: 1.5rem 1.5rem 0.5rem;
            font-size: 1.5rem;
            color: #1a365d;
          }

          .highlight-card p {
            padding: 0 1.5rem 1.5rem;
            color: #4a5568;
            line-height: 1.6;
          }

          /* Pricing Section */
          .pricing-section {
            padding: 4rem 0;
            background: #f7fafc;
          }

          .pricing-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
          }

          .pricing-card {
            position: relative;
            background: white;
            padding: 2rem;
            border-radius: 12px;
            border: 2px solid #e2e8f0;
            text-align: center;
            transition: all 0.3s;
          }

          .pricing-card.featured {
            border-color: #FF6B6B;
            transform: scale(1.05);
            box-shadow: 0 8px 20px rgba(255, 107, 107, 0.2);
          }

          .pricing-card:hover {
            border-color: #FF6B6B;
            transform: translateY(-10px);
          }

          .price-badge {
            position: absolute;
            top: -15px;
            left: 50%;
            transform: translateX(-50%);
            background: #4299e1;
            color: white;
            padding: 0.5rem 1.5rem;
            border-radius: 50px;
            font-size: 0.875rem;
            font-weight: 600;
          }

          .price-badge.popular {
            background: #FF6B6B;
          }

          .pricing-card h3 {
            font-size: 2rem;
            color: #1a365d;
            margin: 1.5rem 0 1rem;
          }

          .price {
            font-size: 3rem;
            font-weight: 700;
            color: #FF6B6B;
            margin-bottom: 2rem;
          }

          .price-features {
            list-style: none;
            padding: 0;
            text-align: left;
          }

          .price-features li {
            padding: 0.75rem 0;
            border-bottom: 1px solid #e2e8f0;
            color: #4a5568;
          }

          .price-features li:before {
            content: "✓ ";
            color: #48bb78;
            font-weight: bold;
            margin-right: 0.5rem;
          }

          .pricing-note {
            text-align: center;
            margin-top: 2rem;
            padding: 1rem;
            background: #fff5f5;
            border-left: 4px solid #FF6B6B;
            color: #c53030;
          }

          /* Booking Section */
          .booking-section {
            padding: 4rem 0;
            background: white;
          }

          /* FAQ Section */
          .destination-faq {
            padding: 4rem 0;
            background: #f7fafc;
          }

          .faq-list {
            max-width: 800px;
            margin: 3rem auto 0;
          }

          .faq-item {
            background: white;
            padding: 2rem;
            margin-bottom: 1rem;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          .faq-item h3 {
            color: #1a365d;
            margin-bottom: 1rem;
            font-size: 1.25rem;
          }

          .faq-item p {
            color: #4a5568;
            line-height: 1.6;
          }

          @media (max-width: 768px) {
            .hero-content h1 {
              font-size: 2rem;
            }

            .pricing-card.featured {
              transform: scale(1);
            }

            .included-grid,
            .highlights-grid,
            .pricing-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default FullWaterwayTour;