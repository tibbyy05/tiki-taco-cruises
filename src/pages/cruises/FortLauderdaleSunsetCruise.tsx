import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Clock, Check, ChevronRight, ArrowRight, Sunrise, Sunset, Phone } from 'lucide-react';
import SEO from '../../components/SEO';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import SquareBooking from '../../components/SquareBooking';

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://tikitacocruises.com/#business",
      "name": "Tiki Taco Cruises",
      "url": "https://tikitacocruises.com/",
      "telephone": "+1-954-764-4344",
      "email": "tikitacocruises@gmail.com",
      "logo": "https://tikitacocruises.com/tiki-taco-logo.png",
      "hasMap": "https://www.google.com/maps?cid=1115630382324282086",
      "priceRange": "$60-$1140",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "1881 SE 17th St",
        "addressLocality": "Fort Lauderdale",
        "addressRegion": "FL",
        "postalCode": "33316",
        "addressCountry": "US"
      }
    },
    {
      "@type": "WebPage",
      "@id": "https://tikitacocruises.com/fort-lauderdale-sunset-cruise/#webpage",
      "url": "https://tikitacocruises.com/fort-lauderdale-sunset-cruise/",
      "name": "Fort Lauderdale Sunset Cruise & Morning Cruise",
      "description": "A 2-hour Fort Lauderdale tiki cruise option available as a morning cruise or sunset cruise along the Intracoastal Waterway.",
      "about": { "@id": "https://tikitacocruises.com/fort-lauderdale-sunset-cruise/#service" },
      "mainEntity": { "@id": "https://tikitacocruises.com/fort-lauderdale-sunset-cruise/#service" }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://tikitacocruises.com/fort-lauderdale-sunset-cruise/#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://tikitacocruises.com/" },
        { "@type": "ListItem", "position": 2, "name": "Cruises", "item": "https://tikitacocruises.com/cruise-destinations/" },
        { "@type": "ListItem", "position": 3, "name": "Fort Lauderdale Sunset Cruise & Morning Cruise", "item": "https://tikitacocruises.com/fort-lauderdale-sunset-cruise/" }
      ]
    },
    {
      "@type": "Service",
      "@id": "https://tikitacocruises.com/fort-lauderdale-sunset-cruise/#service",
      "name": "Fort Lauderdale Sunset Cruise & Morning Cruise",
      "serviceType": "2-hour tiki boat cruise",
      "category": "Boat tour",
      "url": "https://tikitacocruises.com/fort-lauderdale-sunset-cruise/",
      "mainEntityOfPage": { "@id": "https://tikitacocruises.com/fort-lauderdale-sunset-cruise/#webpage" },
      "description": "A shorter 2-hour Fort Lauderdale tiki cruise available as a morning cruise or sunset cruise, ideal for sightseeing, skyline views, and a relaxed Intracoastal experience.",
      "provider": { "@id": "https://tikitacocruises.com/#business" },
      "areaServed": { "@type": "City", "name": "Fort Lauderdale" },
      "hoursAvailable": [
        {
          "@type": "OpeningHoursSpecification",
          "name": "Morning Cruise",
          "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
          "opens": "08:00",
          "closes": "10:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "name": "Sunset Cruise",
          "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
          "opens": "18:00",
          "closes": "20:00"
        }
      ],
      "offers": {
        "@type": "Offer",
        "@id": "https://tikitacocruises.com/fort-lauderdale-sunset-cruise/#offer",
        "url": "https://tikitacocruises.com/fort-lauderdale-sunset-cruise/",
        "price": "60",
        "priceCurrency": "USD",
        "itemOffered": { "@id": "https://tikitacocruises.com/fort-lauderdale-sunset-cruise/#service" },
        "eligibleQuantity": {
          "@type": "QuantitativeValue",
          "minValue": 6,
          "unitText": "PERSON"
        },
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "60",
          "priceCurrency": "USD",
          "unitText": "PERSON",
          "description": "Price per person for a 2-hour morning or sunset cruise. Six-person minimum."
        }
      }
    }
  ]
};

export default function FortLauderdaleSunsetCruise() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      <SEO
        title="Fort Lauderdale Sunset Cruise & Morning Cruise | 2-Hour Cruise"
        description="Enjoy a Fort Lauderdale sunset cruise or morning cruise on a 2-hour tiki boat ride. Scenic views, relaxed vibes, and perfect for smaller groups."
        canonical="https://tikitacocruises.com/fort-lauderdale-sunset-cruise/"
        jsonLd={jsonLd}
      />
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] sm:min-h-[80vh] w-full overflow-hidden flex items-center">
        <div className="absolute inset-0">
          <img
            src="/fort-lauderdale-hero.jpg"
            alt="Fort Lauderdale sunset cruise on the Intracoastal"
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>
        <div className="relative w-full flex items-center justify-center px-4 sm:px-6 pt-32 sm:pt-36 md:pt-28 pb-12 md:pb-0">
          <div className="text-center text-white max-w-4xl mx-auto w-full">
            <div className="inline-flex items-center gap-2 bg-coral/90 backdrop-blur-sm px-4 py-2 rounded-full mb-4 text-sm sm:text-base">
              <Clock className="w-4 h-4" />
              <span>2 Hours</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 tracking-tight leading-tight">
              Fort Lauderdale Sunset Cruise & Morning Cruise
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Looking for a shorter option? This 2-hour cruise gives you the full Fort Lauderdale experience, whether you're starting your day on the water or catching the sunset.
            </p>
            <a
              href="tel:+19547644344" suppressHydrationWarning
              className="bg-coral hover:bg-coral/90 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl min-h-[44px] inline-flex items-center gap-2"
              data-gtm-id="call-to-book"
            >
              <Phone className="w-5 h-5" /> Call to Book — (954) 764-4344
            </a>
          </div>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="bg-sand/30 py-3 px-4">
        <div className="max-w-7xl mx-auto text-sm text-ocean/70">
          <div className="flex items-center gap-2">
            <Link to="/" className="hover:text-coral transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/cruise-destinations/" className="hover:text-coral transition-colors">Cruises</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-ocean">Sunset & Morning Cruise</span>
          </div>
        </div>
      </div>

      {/* 2-Hour Cruise Options (Pricing Block) */}
      <section className="py-12 sm:py-16 md:py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ocean mb-8 sm:mb-12 text-center">
            2-Hour Cruise Options
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="bg-sand/40 rounded-2xl p-6 sm:p-8 text-center">
              <Sunrise className="w-10 h-10 text-coral mx-auto mb-3" />
              <h3 className="text-xl font-bold text-ocean mb-2">Morning Cruise</h3>
              <p className="text-ocean/70 text-lg">8:00 AM – 10:00 AM</p>
            </div>
            <div className="bg-sand/40 rounded-2xl p-6 sm:p-8 text-center">
              <Sunset className="w-10 h-10 text-coral mx-auto mb-3" />
              <h3 className="text-xl font-bold text-ocean mb-2">Sunset Cruise</h3>
              <p className="text-ocean/70 text-lg">6:00 PM – 8:00 PM</p>
            </div>
          </div>
          <div className="text-center">
            <div className="inline-block bg-coral/10 border-2 border-coral rounded-xl px-6 py-4">
              <div className="text-2xl sm:text-3xl font-bold text-coral mb-2 price-text">$60 per person</div>
              <div className="text-ocean/70 text-sm sm:text-base">6-person minimum</div>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect on a Sunset Cruise */}
      <section className="py-12 sm:py-16 md:py-20 px-4 bg-gradient-to-b from-white to-sand/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-ocean mb-8 sm:mb-12 text-center">
            What to Expect on a Sunset Cruise
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {[
              'Golden hour & skyline views',
              'Relaxed, scenic atmosphere',
              'Perfect end-of-day experience',
              'Great for photos',
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm">
                <Check className="w-5 h-5 text-coral flex-shrink-0 mt-0.5" />
                <span className="text-ocean/80 text-base">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* A Calm Start with a Morning Cruise */}
      <section className="py-12 sm:py-16 md:py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ocean mb-6 sm:mb-8">
            A Calm Start with a Morning Cruise
          </h2>
          <div className="prose prose-lg max-w-none text-ocean/80 text-base sm:text-lg leading-relaxed">
            <p>
              Start your day with a quieter ride along the Intracoastal, ideal for relaxing, sightseeing, and enjoying the water before the crowds.
            </p>
          </div>
        </div>
      </section>

      {/* Perfect for Smaller Groups & Tight Schedules */}
      <section className="py-12 sm:py-16 md:py-20 px-4 bg-gradient-to-b from-sand/20 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ocean mb-6 sm:mb-8">
            Perfect for Smaller Groups & Tight Schedules
          </h2>
          <div className="prose prose-lg max-w-none text-ocean/80 text-base sm:text-lg leading-relaxed">
            <p>
              This option is ideal if you don't need a longer private cruise but still want to experience Fort Lauderdale from the water.
            </p>
          </div>
        </div>
      </section>

      {/* Sunset Cruise Photo Gallery */}
      <section className="py-12 sm:py-16 md:py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-ocean mb-8 sm:mb-12 text-center">
            Sunset Cruise Photo Gallery
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { src: '/fort-lauderdale-hero.jpg', alt: 'Fort Lauderdale sunset over the waterway' },
              { src: '/Night_Intracoastal2.jpg', alt: 'Intracoastal Waterway evening views' },
              { src: '/Sandbar.png', alt: 'Tiki pontoon cruising Fort Lauderdale' },
            ].map((img, index) => (
              <div key={index} className="rounded-xl overflow-hidden shadow-md">
                <img src={img.src} alt={img.alt} className="w-full h-56 object-cover" loading="lazy" decoding="async" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <SquareBooking />

      {/* Secondary CTA */}
      <section className="py-12 sm:py-16 px-4 bg-sand">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-ocean mb-6">
            Ready to Book Your 2-Hour Cruise?
          </h2>
          <a
            href="tel:+19547644344" suppressHydrationWarning
            className="bg-coral hover:bg-coral/90 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl min-h-[44px] inline-flex items-center gap-2"
            data-gtm-id="call-to-book"
          >
            <Phone className="w-5 h-5" /> Call to Book — (954) 764-4344
          </a>
        </div>
      </section>

      {/* Related Cruises */}
      <section className="py-12 sm:py-16 md:py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-ocean mb-8 sm:mb-12 text-center">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {[
              {
                name: 'New River Historic Cruise',
                path: '/new-river-cruise/',
                description: 'A 4-hour scenic cruise through downtown Fort Lauderdale along the New River.',
                image: '/Night_Intracoastal2.jpg',
              },
              {
                name: 'Northbound Sandbar & Scenic Cruise',
                path: '/north-bound-scenic-cruise/',
                description: 'Head north along the Intracoastal for sightseeing and sandbar fun.',
                image: '/Sandbar.png',
              },
            ].map((route, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                onClick={() => navigate(route.path)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={route.image}
                    alt={route.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-ocean mb-2">{route.name}</h3>
                  <p className="text-ocean/70 text-sm mb-4">{route.description}</p>
                  <button
                    onClick={(e) => { e.stopPropagation(); navigate(route.path); }}
                    className="w-full bg-ocean hover:bg-ocean/90 text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 min-h-[44px]"
                  >
                    View Details <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky Call to Book (Mobile) */}
      {isScrolled && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl z-40 md:hidden p-4 border-t border-ocean/10">
          <a
            href="tel:+19547644344" suppressHydrationWarning
            className="w-full bg-coral hover:bg-coral/90 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 min-h-[44px] flex items-center justify-center gap-2"
            data-gtm-id="call-to-book"
          >
            <Phone className="w-5 h-5" /> Call to Book — (954) 764-4344
          </a>
        </div>
      )}

      <Footer />
    </div>
  );
}
