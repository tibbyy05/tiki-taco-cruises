import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, ChevronRight, ChevronDown, ArrowRight, Phone, Users, Anchor, MapPin } from 'lucide-react';
import { FaBluetooth, FaSnowflake, FaUmbrellaBeach, FaSwimmer, FaGasPump, FaLifeRing } from 'react-icons/fa';
import SEO from '../components/SEO';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SquareBooking from '../components/SquareBooking';
import { productAggregateRatingSchema } from '../lib/reviewSchema';
import CompactReviews from '../components/CompactReviews';

const faqs = [
  {
    question: 'How much does it cost to rent a pontoon boat in Fort Lauderdale?',
    answer:
      'Our private captained pontoon rental is $225 per hour with a 3-hour minimum — a 3-hour rental is $675. That covers 14 guests; the boat holds up to 18, and guests 15 through 18 are $60 each. Fuel, cooler, ice, and your licensed captain are all included — no hidden fees.',
  },
  {
    question: 'Do I need a boating license to rent the pontoon?',
    answer:
      'No. Every rental comes with a USCG-licensed captain who handles the driving, so there’s no license, boating experience, or safety course required. You and your group just relax and enjoy the water.',
  },
  {
    question: 'How many people fit on the pontoon boat?',
    answer:
      'Your booking covers 14 guests, and the boat comfortably holds up to 18 — guests 15 through 18 are $60 each. Every cruise is private — it’s always just your group on board.',
  },
  {
    question: 'Can we bring our own food and drinks?',
    answer:
      'Yes — the boat is BYOB. Bring your favorite drinks and snacks, and we’ll have a cooler with ice ready for you on board.',
  },
  {
    question: 'Where does the pontoon rental depart from?',
    answer:
      'All rentals depart from the Hilton Marina at 1881 SE 17th St, Fort Lauderdale, FL 33316 — minutes from the beach, Las Olas, and downtown.',
  },
  {
    question: 'Where can we go during the rental?',
    answer:
      'Popular routes include the New River through downtown, the Intracoastal Waterway past Las Olas Isles mansions, and northbound sandbar stops where you can anchor and swim. Your captain will tailor the route to your group.',
  },
];

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
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "1881 SE 17th St",
        "addressLocality": "Fort Lauderdale",
        "addressRegion": "FL",
        "postalCode": "33316",
        "addressCountry": "US"
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
        "opens": "07:00",
        "closes": "22:30"
      }
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
      "@id": "https://tikitacocruises.com/pontoon-boat-rental-fort-lauderdale/#webpage",
      "url": "https://tikitacocruises.com/pontoon-boat-rental-fort-lauderdale/",
      "name": "Pontoon Boat Rental in Fort Lauderdale",
      "description": "A private captained tiki-style pontoon boat rental in Fort Lauderdale for Intracoastal cruises, New River sightseeing, sandbar stops, swimming, and group celebrations.",
      "isPartOf": {
        "@id": "https://tikitacocruises.com/#website"
      },
      "about": {
        "@id": "https://tikitacocruises.com/pontoon-boat-rental-fort-lauderdale/#product"
      },
      "mainEntity": {
        "@id": "https://tikitacocruises.com/pontoon-boat-rental-fort-lauderdale/#product"
      },
      "breadcrumb": {
        "@id": "https://tikitacocruises.com/pontoon-boat-rental-fort-lauderdale/#breadcrumb"
      },
      "primaryImageOfPage": {
        "@type": "ImageObject",
        "url": "https://tikitacocruises.com/images/gallery/a8c9295f-6dd9-4ef8-916a-ba79f966368b/1783648798903_1770257699997_Sandbar.jpg"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://tikitacocruises.com/pontoon-boat-rental-fort-lauderdale/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://tikitacocruises.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Pontoon Boat Rental",
          "item": "https://tikitacocruises.com/pontoon-boat-rental-fort-lauderdale/"
        }
      ]
    },
    {
      "@type": "Product",
      "@id": "https://tikitacocruises.com/pontoon-boat-rental-fort-lauderdale/#product",
      "name": "Pontoon Boat Rental in Fort Lauderdale",
      "url": "https://tikitacocruises.com/pontoon-boat-rental-fort-lauderdale/",
      "image": "https://tikitacocruises.com/images/gallery/a8c9295f-6dd9-4ef8-916a-ba79f966368b/1783648798903_1770257699997_Sandbar.jpg",
      "description": "A private captained tiki-style pontoon boat rental in Fort Lauderdale for Intracoastal cruises, New River sightseeing, sandbar stops, swimming, and group celebrations.",
      "category": "Private captained pontoon boat rental",
      "brand": {
        "@id": "https://tikitacocruises.com/#business"
      },
      "mainEntityOfPage": {
        "@id": "https://tikitacocruises.com/pontoon-boat-rental-fort-lauderdale/#webpage"
      },
      "additionalProperty": [
        {
          "@type": "PropertyValue",
          "name": "Minimum booking",
          "value": "3 hours"
        },
        {
          "@type": "PropertyValue",
          "name": "Included guests",
          "value": "Up to 14 passengers"
        },
        {
          "@type": "PropertyValue",
          "name": "Maximum capacity",
          "value": "18 passengers"
        },
        {
          "@type": "PropertyValue",
          "name": "Additional guest fee",
          "value": "USD 60 per person"
        },
        {
          "@type": "PropertyValue",
          "name": "Captain and fuel",
          "value": "Included"
        },
        {
          "@type": "PropertyValue",
          "name": "Departure point",
          "value": "The Hilton Marina, 1881 SE 17th St, Fort Lauderdale, FL 33316"
        }
      ],
      "offers": {
        "@type": "Offer",
        "@id": "https://tikitacocruises.com/pontoon-boat-rental-fort-lauderdale/#offer",
        "url": "https://tikitacocruises.com/pontoon-boat-rental-fort-lauderdale/",
        "price": "225",
        "priceCurrency": "USD",
        "seller": {
          "@id": "https://tikitacocruises.com/#business"
        },
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "225",
          "priceCurrency": "USD",
          "unitCode": "HUR",
          "unitText": "hour",
          "referenceQuantity": {
            "@type": "QuantitativeValue",
            "value": 1,
            "unitCode": "HUR"
          },
          "description": "Starting price per hour. Three-hour minimum booking."
        }
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://tikitacocruises.com/pontoon-boat-rental-fort-lauderdale/#faq",
      "mainEntity": faqs.map((f) => ({
        "@type": "Question",
        "name": f.question,
        "acceptedAnswer": { "@type": "Answer", "text": f.answer }
      }))
    }
  ]
};

const amenities = [
  { icon: FaBluetooth, title: 'Bluetooth Sound System', description: 'Connect your music and set the vibe for your time on the water.' },
  { icon: FaSnowflake, title: 'Cooler & Ice Provided', description: 'BYOB-friendly — bring your drinks and we keep them cold all cruise long.' },
  { icon: FaUmbrellaBeach, title: 'Bimini Top Shade', description: 'Stay cool and comfortable with shaded coverage during daytime rentals.' },
  { icon: FaSwimmer, title: 'Dual Swimming Ladders', description: 'Oversized ladders at bow and stern make sandbar swim stops easy for everyone.' },
  { icon: FaGasPump, title: 'Fuel Included', description: 'No fuel surcharges or hidden fees — fuel is included in every rental.' },
  { icon: FaLifeRing, title: 'Life Jackets Included', description: 'Safety-first experience with life jackets available for all guests.' },
];

const routeIdeas = [
  {
    name: 'Northbound Sandbar & Scenic Cruise',
    path: '/north-bound-scenic-cruise/',
    description: 'Anchor at a Fort Lauderdale sandbar, swim, and float — the classic pontoon day.',
    image: '/northbound-sandbar-tile.jpg',
  },
  {
    name: 'New River Historic Cruise',
    path: '/new-river-cruise/',
    description: 'Wind through downtown Fort Lauderdale past Riverwalk and historic waterfront homes.',
    image: '/new-river-tile.jpg',
  },
  {
    name: 'Las Olas & Intracoastal Party Cruise',
    path: '/las-olas-boat-tour/',
    description: 'Cruise Millionaire’s Row and the Las Olas Isles on the Intracoastal Waterway.',
    image: '/fort-lauderdale-hero.jpg',
  },
];

export default function PontoonBoatRental() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      <SEO
        title="Pontoon Boat Rental Fort Lauderdale | Private & Captained"
        description="Rent a private captained pontoon boat in Fort Lauderdale for up to 18 guests. BYOB, cooler & ice, fuel included. Sandbars, Intracoastal & New River. From $225/hour."
        canonical="https://tikitacocruises.com/pontoon-boat-rental-fort-lauderdale/"
        jsonLd={jsonLd}
        extraJsonLd={productAggregateRatingSchema}
      />
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] sm:min-h-[80vh] w-full overflow-hidden flex items-center">
        <div className="absolute inset-0">
          <img
            src="/hero-slide-1.jpg"
            alt="Private pontoon boat rental boarding at the dock in Fort Lauderdale"
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>
        <div className="relative w-full flex items-center justify-center px-4 sm:px-6 pt-36 sm:pt-40 md:pt-44 lg:pt-36 pb-12 md:pb-0">
          <div className="text-center text-white max-w-4xl mx-auto w-full">
            <div className="inline-flex items-center gap-2 bg-coral/90 backdrop-blur-sm px-4 py-2 rounded-full mb-4 text-sm sm:text-base">
              <Users className="w-4 h-4" />
              <span>Up to 18 Guests · Captain Included</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 tracking-tight leading-tight">
              Pontoon Boat Rental in Fort Lauderdale
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Rent a private tiki-style pontoon with a licensed captain — no boating license needed. Cruise the Intracoastal, explore the New River, or anchor at a sandbar and swim.
            </p>
            <a
              href="tel:+19547644344" suppressHydrationWarning
              className="bg-coral hover:bg-coral/90 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl min-h-[44px] inline-flex items-center gap-2"
              data-gtm-id="call-to-book"
            >
              <Phone className="w-5 h-5" /><span className="cr-number" suppressHydrationWarning>Call to Book — (954) 764-4344</span>
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
            <span className="text-ocean">Pontoon Boat Rental</span>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <section className="py-12 sm:py-16 md:py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ocean mb-8 sm:mb-12 text-center">
            Pontoon Rental Pricing
          </h2>
          <div className="text-center mb-8">
            <div className="inline-block bg-coral/10 border-2 border-coral rounded-xl px-6 py-4">
              <div className="text-2xl sm:text-3xl font-bold text-coral mb-2 price-text">Starting at $225/hour (3 hour minimum)</div>
              <div className="text-ocean/70 text-sm sm:text-base">Private captained rental · up to 14 passengers included · additional guests $60/person (max 18)</div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {[
              { icon: Anchor, title: 'Captain & Fuel Included', text: 'A USCG-licensed captain drives — no boating license or experience needed.' },
              { icon: Users, title: 'Always Private', text: 'Never shared with strangers. Every rental is just your group on board.' },
              { icon: MapPin, title: 'Hilton Marina Departure', text: '1881 SE 17th St — minutes from the beach, Las Olas, and downtown.' },
            ].map((item, index) => (
              <div key={index} className="bg-sand/40 rounded-2xl p-6 text-center">
                <item.icon className="w-10 h-10 text-coral mx-auto mb-3" />
                <h3 className="text-lg font-bold text-ocean mb-2">{item.title}</h3>
                <p className="text-ocean/70 text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Boat */}
      <section className="py-12 sm:py-16 md:py-20 px-4 bg-gradient-to-b from-white to-sand/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-ocean mb-4 text-center">
            The Boat: A Tiki-Style Party Pontoon
          </h2>
          <p className="text-ocean/80 text-base sm:text-lg max-w-3xl mx-auto text-center mb-8 sm:mb-12">
            Our pontoon is built for Fort Lauderdale days on the water — a stable, spacious deck boat with tiki-bar styling, room for up to 18 guests, and everything your group needs already on board.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {amenities.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-2xl shadow-md">
                  <Icon size={36} color="#0891B2" className="mb-4" />
                  <h3 className="text-lg font-bold text-ocean mb-2">{feature.title}</h3>
                  <p className="text-gray-700 text-sm sm:text-base">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why captained */}
      <section className="py-12 sm:py-16 md:py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ocean mb-6 sm:mb-8">
            No License? No Problem — Your Captain Is Included
          </h2>
          <div className="prose prose-lg max-w-none text-ocean/80 text-base sm:text-lg leading-relaxed">
            <p className="mb-4">
              Unlike bareboat pontoon rentals, every Tiki Taco rental comes with a licensed, insured captain. You skip the safety courses, security deposits, and navigation stress — and nobody in your group has to stay sober behind the wheel.
            </p>
            <p>
              Your captain knows Fort Lauderdale&rsquo;s waterways — the calm spots, the best sandbars, the mansion-lined canals — and tailors the route to whatever kind of day your group wants.
            </p>
          </div>
        </div>
      </section>

      {/* Where you can go */}
      <section className="py-12 sm:py-16 md:py-20 px-4 bg-gradient-to-b from-sand/20 to-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-ocean mb-4 text-center">
            Where Your Pontoon Rental Can Take You
          </h2>
          <p className="text-ocean/80 text-base sm:text-lg max-w-3xl mx-auto text-center mb-8 sm:mb-12">
            Rent by the hour and go where you want — or pick one of our favorite Fort Lauderdale routes.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {routeIdeas.map((route, index) => (
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
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-ocean mb-2">{route.name}</h3>
                  <p className="text-ocean/70 text-sm mb-4">{route.description}</p>
                  <button
                    onClick={(e) => { e.stopPropagation(); navigate(route.path); }}
                    className="w-full bg-ocean hover:bg-ocean/90 text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 min-h-[44px]"
                    data-gtm-id="learn-more"
                  >
                    Learn More <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Good for */}
      <section className="py-12 sm:py-16 md:py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-ocean mb-8 sm:mb-12 text-center">
            Perfect for Any Group
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {[
              'Birthdays & celebrations on the water',
              'Bachelorette & bachelor parties',
              'Family sandbar days & swim stops',
              'Corporate outings & team events',
              'Sunset cruises with drinks & music',
              'Visitors who want the real Fort Lauderdale',
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3 bg-sand/40 p-4 rounded-xl">
                <Check className="w-5 h-5 text-coral flex-shrink-0 mt-0.5" />
                <span className="text-ocean/80 text-base">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SquareBooking />

      {/* FAQ */}
      <section className="py-12 sm:py-16 md:py-20 px-4 bg-gradient-to-b from-white to-sand/20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-ocean mb-8 sm:mb-12 text-center">
            Pontoon Rental FAQs
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between gap-3 text-left px-5 py-4 min-h-[44px]"
                  aria-expanded={openFaq === index}
                >
                  <span className="font-semibold text-ocean">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-coral flex-shrink-0 transition-transform ${openFaq === index ? 'rotate-180' : ''}`}
                  />
                </button>
                {openFaq === index && (
                  <p className="px-5 pb-5 text-ocean/80 text-base leading-relaxed">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Secondary CTA */}
      <section className="py-12 sm:py-16 px-4 bg-sand">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-ocean mb-6">
            Ready to Get on the Water?
          </h2>
          <a
            href="tel:+19547644344" suppressHydrationWarning
            className="bg-coral hover:bg-coral/90 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl min-h-[44px] inline-flex items-center gap-2"
            data-gtm-id="call-to-book"
          >
            <Phone className="w-5 h-5" /><span className="cr-number" suppressHydrationWarning>Call to Book — (954) 764-4344</span>
          </a>
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
            <Phone className="w-5 h-5" /><span className="cr-number" suppressHydrationWarning>Call to Book — (954) 764-4344</span>
          </a>
        </div>
      )}

      <CompactReviews />

      <Footer />
    </div>
  );
}
