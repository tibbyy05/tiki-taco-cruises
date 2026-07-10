import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Award, Anchor, Shield, BadgeCheck, ArrowRight, Check } from 'lucide-react';
import SEO from '../components/SEO';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import Gallery from '../components/Gallery';
import Features from '../components/Features';
import GuestReviews from '../components/GuestReviews';
import SquareBooking from '../components/SquareBooking';
import LocationSection from '../components/LocationSection';
import Footer from '../components/Footer';
import ScrollReveal from '../components/ScrollReveal';

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://tikitacocruises.com/#business",
      "name": "Tiki Taco Cruises",
      "description": "Tiki Taco Cruises offers private tiki boat tours, pontoon rentals, scenic cruises, party cruises, sunset cruises, and corporate cruise experiences in Fort Lauderdale.",
      "url": "https://tikitacocruises.com/",
      "logo": "https://tikitacocruises.com/tiki-taco-logo.png",
      "image": [
        "https://tikitacocruises.com/Night_Intracoastal2.jpg"
      ],
      "telephone": "+1-954-764-4344",
      "email": "tikitacocruises@gmail.com",
      "priceRange": "$60-$1140",
      "hasMap": "https://www.google.com/maps?cid=1115630382324282086",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "1881 SE 17th St",
        "addressLocality": "Fort Lauderdale",
        "addressRegion": "FL",
        "postalCode": "33316",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 26.0998,
        "longitude": -80.1186
      },
      "areaServed": {
        "@type": "City",
        "name": "Fort Lauderdale"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "08:00",
        "closes": "20:00"
      },
      "sameAs": [
        "https://www.instagram.com/tikitacocruises"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://tikitacocruises.com/#website",
      "url": "https://tikitacocruises.com/",
      "name": "Tiki Taco Cruises",
      "publisher": {
        "@id": "https://tikitacocruises.com/#business"
      }
    },
    {
      "@type": "WebPage",
      "@id": "https://tikitacocruises.com/#webpage",
      "url": "https://tikitacocruises.com/",
      "name": "Fort Lauderdale Tiki Cruise & Private Boat Tour",
      "description": "Experience Fort Lauderdale from the water with a private tiki cruise designed for relaxation, celebration, and unforgettable views.",
      "isPartOf": {
        "@id": "https://tikitacocruises.com/#website"
      },
      "about": {
        "@id": "https://tikitacocruises.com/#business"
      }
    },
    {
      "@type": "ItemList",
      "@id": "https://tikitacocruises.com/#popular-cruises",
      "name": "Popular Tiki Cruise Destinations",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "New River Historic Cruise",
          "url": "https://tikitacocruises.com/new-river-cruise/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Northbound Sandbar & Scenic Cruise",
          "url": "https://tikitacocruises.com/north-bound-scenic-cruise/"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Las Olas & Intracoastal Party Cruise",
          "url": "https://tikitacocruises.com/las-olas-boat-tour/"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Corporate & Private Event Cruise",
          "url": "https://tikitacocruises.com/intracoastal-waterway-corporate-cruise/"
        },
        {
          "@type": "ListItem",
          "position": 5,
          "name": "2-Hour Morning & Sunset Cruises",
          "url": "https://tikitacocruises.com/fort-lauderdale-sunset-cruise/"
        }
      ]
    }
  ]
};

const trustBadges = [
  { icon: Award, label: '40 Years of Experience' },
  { icon: Anchor, label: 'USCG Licensed' },
  { icon: Shield, label: 'Fully Insured' },
  { icon: BadgeCheck, label: 'COI Vessel' },
];

const popularCruises = [
  {
    title: 'New River Historic Cruise',
    subtext: 'Cruise through downtown Fort Lauderdale with a touch of local history',
    link: '/new-river-cruise/',
    image: '/new-river-tile.jpg',
    bullets: [
      'Historic downtown & New River landmarks',
      'Waterfront homes, yachts & hidden canals',
      'Calm, scenic cruising route',
      'Max capacity: 18 people',
      'Price starting at $285/hour',
    ],
  },
  {
    title: 'Northbound Sandbar & Scenic Cruise',
    subtext: 'Swim, float, and relax at a Fort Lauderdale sandbar',
    link: '/north-bound-scenic-cruise/',
    image: '/northbound-sandbar-tile.jpg',
    bullets: [
      'Popular Fort Lauderdale sandbar stop',
      'Swimming, floating & relaxing',
      'Scenic Intracoastal views',
      'Max capacity: 18 people',
      'Price starting at $285/hour',
    ],
  },
  {
    title: 'Intracoastal Scenic Day Cruise',
    subtext: 'Calm waters and panoramic views on a classic Fort Lauderdale cruise',
    link: '/intracoastal-waterway-corporate-cruise/',
    image: '/fort-lauderdale-hero.jpg',
    bullets: [
      'Relaxing Intracoastal Waterway ride',
      'Panoramic skyline & waterfront views',
      'Perfect for groups & celebrations',
      'Max capacity: 18 people',
      'Price starting at $285/hour',
    ],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <SEO
        title="Tiki Cruise Pontoon Rental | Fort Lauderdale Charter"
        ogTitle="Tiki Taco Cruises - Fort Lauderdale Pontoon Charter"
        description="Book a private tiki cruise in Fort Lauderdale. Explore the Intracoastal, sandbars, and sunset views with premium amenities and flexible day or evening tours."
        canonical="https://tikitacocruises.com/"
        jsonLd={localBusinessSchema}
      />
      {/* Kick off the LCP hero image download immediately (homepage only —
          index.html is shared by all SSG pages, so it can't live there) */}
      <Helmet>
        <link
          rel="preload"
          as="image"
          imageSrcSet="/hero-slide-1-mobile.webp 750w, /hero-slide-1.webp 1000w"
          imageSizes="100vw"
          {...({ fetchpriority: 'high' } as Record<string, string>)}
        />
      </Helmet>
      <Navigation />
      <Hero />
      <GuestReviews />

      {/* About Our Fort Lauderdale Tiki Cruises */}
      <section className="py-12 sm:py-16 md:py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ocean mb-6 sm:mb-8">
              About Our Fort Lauderdale Tiki Cruises
            </h2>
            <div className="space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed">
              <p>
                Tiki Taco Cruises offers private tiki boat tours in Fort Lauderdale designed for groups who want a more personalized experience on the water. Whether you're cruising the Intracoastal Waterway, exploring the New River, or heading to a local sandbar, each trip is built around your group and your vibe.
              </p>
              <p>
                Our boats are fully equipped for comfort and fun, with Bluetooth sound, shaded seating, and space to relax or celebrate. Each COI boat is designed to meet Coast Guard inspected vessel requirements, giving your group a safe, reliable, and memorable way to experience Fort Lauderdale from the water.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-8 sm:py-10 px-4 bg-sand/40">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {trustBadges.map((badge, i) => (
              <div key={i} className="text-center">
                <badge.icon className="w-10 h-10 sm:w-12 sm:h-12 text-coral mx-auto mb-2 sm:mb-3" />
                <span className="text-sm sm:text-base font-semibold text-ocean">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Tiki Cruise Destinations */}
      <section id="routes" className="py-12 sm:py-16 md:py-20 px-4 bg-sand">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-10 sm:mb-12 md:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ocean mb-3 sm:mb-4">
                Popular Tiki Cruise Destinations
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-2xl mx-auto px-4">
                Explore the stunning Intracoastal waterway on your private guided cruise.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {popularCruises.map((cruise, index) => (
              <ScrollReveal key={index} delay={index * 0.1} className="h-full">
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group h-full flex flex-col">
                  <div className="relative h-56 overflow-hidden">
                    <picture>
                      <source type="image/webp" srcSet={cruise.image.replace(/\.(jpg|png)$/, '.webp')} />
                      <img
                        src={cruise.image}
                        alt={cruise.title}
                        width={1200}
                        height={675}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                        decoding="async"
                      />
                    </picture>
                  </div>
                  <div className="p-5 sm:p-6 flex flex-col flex-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-ocean mb-2">{cruise.title}</h3>
                    <p className="text-ocean/70 mb-4 text-sm sm:text-base">{cruise.subtext}</p>
                    <ul className="space-y-2 mb-6 flex-1">
                      {cruise.bullets.map((bullet, bi) => (
                        <li key={bi} className="flex items-start gap-2 text-black sm:text-ocean/80 text-sm sm:text-base">
                          <Check className="w-4 h-4 text-coral flex-shrink-0 mt-1" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      to={cruise.link}
                      className="w-full bg-coral hover:bg-coral/90 text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 text-base min-h-[44px] flex items-center justify-center gap-2"
                      data-gtm-id="learn-more"
                    >
                      Learn More <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="text-center mt-10 sm:mt-12">
            <Link
              to="/cruise-destinations/"
              className="bg-ocean hover:bg-ocean/90 text-white px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 inline-flex items-center gap-2 min-h-[44px]"
              data-gtm-id="learn-more"
            >
              View All Cruises <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <ScrollReveal amount="some">
        <Gallery />
      </ScrollReveal>
      <Features />
      <ScrollReveal>
        <SquareBooking />
      </ScrollReveal>
      <LocationSection />
      <Footer />
    </div>
  );
}
