import CruisePage from '../../components/CruisePage';
import { productAggregateRatingSchema } from '../../lib/reviewSchema';

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
      "@id": "https://tikitacocruises.com/las-olas-boat-tour/#webpage",
      "url": "https://tikitacocruises.com/las-olas-boat-tour/",
      "name": "Las Olas & Intracoastal Party Cruise",
      "description": "A private Fort Lauderdale party cruise with Las Olas views, Intracoastal sightseeing, music, drinks, and space for group celebrations.",
      "isPartOf": {
        "@id": "https://tikitacocruises.com/#website"
      },
      "about": {
        "@id": "https://tikitacocruises.com/las-olas-boat-tour/#product"
      },
      "mainEntity": {
        "@id": "https://tikitacocruises.com/las-olas-boat-tour/#product"
      },
      "breadcrumb": {
        "@id": "https://tikitacocruises.com/las-olas-boat-tour/#breadcrumb"
      },
      "primaryImageOfPage": {
        "@type": "ImageObject",
        "url": "https://tikitacocruises.com/images/gallery/a8c9295f-6dd9-4ef8-916a-ba79f966368b/1783648794455_1770258227569_real6.jpg"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://tikitacocruises.com/las-olas-boat-tour/#breadcrumb",
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
          "name": "Cruises",
          "item": "https://tikitacocruises.com/cruise-destinations/"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Las Olas & Intracoastal Party Cruise",
          "item": "https://tikitacocruises.com/las-olas-boat-tour/"
        }
      ]
    },
    {
      "@type": "Product",
      "@id": "https://tikitacocruises.com/las-olas-boat-tour/#product",
      "name": "Las Olas & Intracoastal Party Cruise",
      "url": "https://tikitacocruises.com/las-olas-boat-tour/",
      "image": "https://tikitacocruises.com/images/gallery/a8c9295f-6dd9-4ef8-916a-ba79f966368b/1783648794455_1770258227569_real6.jpg",
      "description": "A private Fort Lauderdale party cruise with Las Olas views, Intracoastal sightseeing, music, drinks, and space for group celebrations.",
      "category": "Private party boat tour",
      "brand": {
        "@id": "https://tikitacocruises.com/#business"
      },
      "mainEntityOfPage": {
        "@id": "https://tikitacocruises.com/las-olas-boat-tour/#webpage"
      },
      "additionalProperty": [
        {
          "@type": "PropertyValue",
          "name": "Duration",
          "value": "Booked hourly (3 hour minimum)"
        },
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
          "name": "Start times",
          "value": "10:00 AM or 2:00 PM"
        },
        {
          "@type": "PropertyValue",
          "name": "Departure point",
          "value": "The Hilton Marina, 1881 SE 17th St, Fort Lauderdale, FL 33316"
        }
      ],
      "offers": {
        "@type": "Offer",
        "@id": "https://tikitacocruises.com/las-olas-boat-tour/#offer",
        "url": "https://tikitacocruises.com/las-olas-boat-tour/",
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
    }
  ]
};

export default function LasOlasBoatTour() {
  return (
    <CruisePage
      seo={{
        title: 'Tiki Taco Party Pontoon Boat | Las Olas Boat Tour',
        description: 'Book a party pontoon boat in Fort Lauderdale. Cruise Las Olas and the Intracoastal with music, drinks, and the perfect setup for bachelorettes and groups.',
        canonical: 'https://tikitacocruises.com/las-olas-boat-tour/',
        jsonLd,
        extraJsonLd: productAggregateRatingSchema,
      }}
      hero={{
        title: 'Las Olas & Intracoastal Party Cruise',
        subtitle: "This is the go-to party pontoon boat experience in Fort Lauderdale. Cruise along Las Olas and the Intracoastal with your crew, music playing, and plenty of space to celebrate.",
        backgroundImage: '/Night_Intracoastal2.jpg',
      }}
      pricing={{
        rate: '$225 per hour',
        minimumHours: '3 hours',
        minimumPrice: '$675',
        includedGuests: '14',
        maxCapacity: '18',
        extraGuestFee: '$60 each',
        startTimes: ['10:00 AM', '2:00 PM'],
      }}
      highlights={[
        'Las Olas Boulevard views',
        'Bring your own drinks & playlist',
        'Built for groups & celebrations',
      ]}
      sections={[
        {
          heading: 'What to Expect on the Las Olas & Intracoastal Party Cruise',
          subtext: "Take in iconic Las Olas views while enjoying a lively, social cruise experience. This route is popular for celebrations, group outings, and anyone looking to combine sightseeing with a party atmosphere.",
        },
        {
          heading: 'Perfect for Bachelorettes, Birthdays & Groups',
          subtext: "If it's a bachelorette party, birthday, or weekend trip, this cruise is designed for fun, flexibility, and a high-energy atmosphere on the water.",
        },
        {
          heading: 'A Social Cruise Through Fort Lauderdale',
          subtext: 'Enjoy a mix of sightseeing and celebration as you pass luxury homes, yachts, and some of the most iconic waterfront views in the city.',
        },
      ]}
      whatToExpect={{
        heading: 'Everything You Need for the Perfect Day',
        bullets: [
          'Professional USCG Licensed Captain',
          'All Fuel & Marina Fees',
          'Premium Bluetooth Sound System',
          'Large Cooler Stocked with Ice',
          'Bimini Top Shade Protection',
          'Safety Equipment & Life Jackets',
          'Floating Water Mat',
          'Cup Holders & Seating for 12+',
          'USB Charging Ports',
          'Departure from The Hilton Marina',
        ],
      }}
      itinerary={{
        heading: 'A Sample 4-Hour Journey',
        steps: [
          {
            label: '1',
            heading: 'Hour 1: Departure & Las Olas Cruise',
            description: 'Depart from The Hilton Marina and cruise past the iconic Las Olas Boulevard area. Take in the luxury waterfront homes, yachts, and vibrant energy of Fort Lauderdale.',
          },
          {
            label: '2-3',
            heading: 'Hours 2-3: Intracoastal & Celebration Time',
            description: "Continue along the Intracoastal Waterway with music, drinks, and good vibes. This is your time to celebrate, socialize, and enjoy the open water with your crew.",
          },
          {
            label: '4',
            heading: 'Hour 4: Return Journey',
            description: 'Cruise back to The Hilton Marina along the waterway, soaking in the views and wrapping up an unforgettable party on the water.',
          },
        ],
      }}
      gallery={{
        heading: 'Las Olas Boat Tour Photo Gallery',
        // TODO: Replace with Las Olas Boat Tour-specific photography when available.
        images: [
          { src: '/Night_Intracoastal2.jpg', alt: 'Las Olas Intracoastal night cruise' },
          { src: '/Sandbar.png', alt: 'Party pontoon Fort Lauderdale experience' },
          { src: '/fort-lauderdale-hero.jpg', alt: 'Fort Lauderdale waterfront views' },
        ],
      }}
      faqs={[
        {
          question: 'Can I bring my own music and drinks?',
          answer: 'Absolutely! We have a premium Bluetooth sound system for your playlist and a large cooler with ice for your drinks.',
        },
        {
          question: 'Is this cruise good for bachelorette parties?',
          answer: 'Yes — this is one of our most popular options for bachelorette parties, birthdays, and group celebrations.',
        },
        {
          question: 'Where does this cruise depart from?',
          answer: 'All cruises depart from The Hilton Marina at 1881 SE 17th St, Fort Lauderdale, FL 33316.',
        },
      ]}
      relatedRoutes={[
        {
          name: 'Northbound Sandbar & Scenic Cruise',
          path: '/north-bound-scenic-cruise/',
          description: 'Head north along the Intracoastal for a mix of sightseeing and sandbar fun.',
          image: '/northbound-sandbar-tile.jpg',
        },
        {
          name: 'Corporate & Private Event Cruise',
          path: '/intracoastal-waterway-corporate-cruise/',
          description: 'A private, customizable cruise for team outings and client events.',
          image: '/Night_Intracoastal2.jpg',
        },
      ]}
    />
  );
}
