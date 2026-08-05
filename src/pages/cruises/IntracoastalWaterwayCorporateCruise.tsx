import CruisePage from '../../components/CruisePage';

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
      "@id": "https://tikitacocruises.com/intracoastal-waterway-corporate-cruise/#webpage",
      "url": "https://tikitacocruises.com/intracoastal-waterway-corporate-cruise/",
      "name": "Corporate Cruise in Fort Lauderdale",
      "description": "A private and customizable Fort Lauderdale corporate cruise for team outings, client entertainment, and group events along the Intracoastal Waterway.",
      "isPartOf": {
        "@id": "https://tikitacocruises.com/#website"
      },
      "about": {
        "@id": "https://tikitacocruises.com/intracoastal-waterway-corporate-cruise/#product"
      },
      "mainEntity": {
        "@id": "https://tikitacocruises.com/intracoastal-waterway-corporate-cruise/#product"
      },
      "breadcrumb": {
        "@id": "https://tikitacocruises.com/intracoastal-waterway-corporate-cruise/#breadcrumb"
      },
      "primaryImageOfPage": {
        "@type": "ImageObject",
        "url": "https://tikitacocruises.com/images/gallery/a8c9295f-6dd9-4ef8-916a-ba79f966368b/1783648793415_1780173066864_Untitled.jpg"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://tikitacocruises.com/intracoastal-waterway-corporate-cruise/#breadcrumb",
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
          "name": "Corporate Cruise in Fort Lauderdale",
          "item": "https://tikitacocruises.com/intracoastal-waterway-corporate-cruise/"
        }
      ]
    },
    {
      "@type": "Product",
      "@id": "https://tikitacocruises.com/intracoastal-waterway-corporate-cruise/#product",
      "name": "Corporate Cruise in Fort Lauderdale",
      "url": "https://tikitacocruises.com/intracoastal-waterway-corporate-cruise/",
      "image": "https://tikitacocruises.com/images/gallery/a8c9295f-6dd9-4ef8-916a-ba79f966368b/1783648793415_1780173066864_Untitled.jpg",
      "description": "A private and customizable Fort Lauderdale corporate cruise for team outings, client entertainment, and group events along the Intracoastal Waterway.",
      "category": "Private corporate boat tour",
      "brand": {
        "@id": "https://tikitacocruises.com/#business"
      },
      "mainEntityOfPage": {
        "@id": "https://tikitacocruises.com/intracoastal-waterway-corporate-cruise/#webpage"
      },
      "additionalProperty": [
        {
          "@type": "PropertyValue",
          "name": "Duration",
          "value": "4 hours"
        },
        {
          "@type": "PropertyValue",
          "name": "Minimum booking",
          "value": "2 hours"
        },
        {
          "@type": "PropertyValue",
          "name": "Included guests",
          "value": "Up to 12 passengers"
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
        "@id": "https://tikitacocruises.com/intracoastal-waterway-corporate-cruise/#offer",
        "url": "https://tikitacocruises.com/intracoastal-waterway-corporate-cruise/",
        "price": "200",
        "priceCurrency": "USD",
        "seller": {
          "@id": "https://tikitacocruises.com/#business"
        },
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "200",
          "priceCurrency": "USD",
          "unitCode": "HUR",
          "unitText": "hour",
          "referenceQuantity": {
            "@type": "QuantitativeValue",
            "value": 1,
            "unitCode": "HUR"
          },
          "description": "Starting price per hour. Two-hour minimum booking."
        }
      },
      "audience": {
        "@type": "BusinessAudience",
        "name": "Corporate groups, teams, and private event planners"
      }
    }
  ]
};

export default function IntracoastalWaterwayCorporateCruise() {
  return (
    <CruisePage
      seo={{
        title: 'Intracoastal Waterway Corporate Cruise | Tiki Boat Day Cruise',
        description: 'Host a corporate cruise in Fort Lauderdale on a private tiki boat. Ideal for team outings, client events, and company celebrations on the water.',
        canonical: 'https://tikitacocruises.com/intracoastal-waterway-corporate-cruise/',
        jsonLd,
      }}
      hero={{
        title: 'Corporate Cruise in Fort Lauderdale',
        subtitle: "Take your next corporate event offsite\u2014onto the water. This private cruise offers a relaxed, unique setting for team outings, client entertainment, and company events.",
        backgroundImage: '/Night_Intracoastal2.jpg',
      }}
      pricing={{
        duration: '4 Hours',
        price: 'Starting at $200/hour (2 hour minimum)',
        basePassengers: 'Up to 12 Passengers',
        additionalGuestPrice: '$60',
        startTimes: ['10:00 AM', '2:00 PM'],
      }}
      highlights={[
        'Private, customizable experience',
        'Comfortable group setup',
        'Scenic Intracoastal route',
      ]}
      sections={[
        {
          heading: 'What to Expect on a Corporate Cruise',
          subtext: 'Host your next event on the water with a fully customizable cruise. Ideal for corporate outings, client entertainment, or private group gatherings along the Intracoastal Waterway.',
        },
        {
          heading: 'Ideal for Team Outings & Client Events',
          subtext: 'From small teams to larger groups, this corporate cruise creates a casual environment that makes it easy to connect, celebrate, and get out of the office.',
        },
        {
          heading: 'A Unique Fort Lauderdale Event Experience',
          subtext: "Swap conference rooms for waterfront views and give your team something they'll actually enjoy.",
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
        heading: 'Your 4-Hour Journey',
        steps: [
          {
            label: '1',
            heading: 'Hour 1: Departure & Intracoastal Views',
            description: 'Depart from The Hilton Marina and cruise along the Intracoastal Waterway. Take in the waterfront scenery while your team settles into the relaxed atmosphere.',
          },
          {
            label: '2-3',
            heading: 'Hours 2-3: Scenic Cruise & Group Time',
            description: 'Continue along the waterway past luxury homes, yachts, and scenic canals. This is your time for team bonding, client conversations, or simply enjoying the views together.',
          },
          {
            label: '4',
            heading: 'Hour 4: Return Journey',
            description: 'Cruise back to The Hilton Marina, wrapping up a memorable corporate outing with final views of the Fort Lauderdale waterfront.',
          },
        ],
      }}
      testimonials={[
        {
          text: "We hosted a team outing on the tiki boat and it was the best company event we've ever done. Everyone loved being on the water — way better than another happy hour.",
          name: "Laura Chen",
          rating: 5,
        },
        {
          text: "Used this for a client event and it made a huge impression. The boat was clean, the captain was professional, and the Intracoastal views were stunning. Highly recommend.",
          name: "Brian Foster",
          rating: 5,
        },
      ]}
      gallery={{
        heading: 'Tiki Taco Corporate Cruise Photo Gallery',
        // TODO: Replace with Corporate Cruise-specific photography when available.
        images: [
          { src: '/Night_Intracoastal2.jpg', alt: 'Fort Lauderdale Intracoastal corporate cruise' },
          { src: '/fort-lauderdale-hero.jpg', alt: 'Fort Lauderdale waterfront skyline' },
          { src: '/Sandbar.png', alt: 'Tiki pontoon on the water' },
        ],
      }}
      faqs={[
        {
          question: 'Can we customize the cruise route?',
          answer: 'Yes! Your captain can tailor the route based on your group\'s preferences, whether you want more sightseeing, a sandbar stop, or a relaxed cruise.',
        },
        {
          question: 'Is this suitable for larger corporate groups?',
          answer: 'Your booking covers up to 12 guests, and the boat comfortably holds up to 18 — additional guests beyond 12 are $60 per person. For larger groups, contact us about booking multiple boats for a fleet experience.',
        },
        {
          question: 'Where does this cruise depart from?',
          answer: 'All cruises depart from The Hilton Marina at 1881 SE 17th St, Fort Lauderdale, FL 33316.',
        },
      ]}
      relatedRoutes={[
        {
          name: 'New River Historic Cruise',
          path: '/new-river-cruise/',
          description: 'A relaxed, scenic cruise through the heart of Fort Lauderdale along the New River.',
          image: '/new-river-tile.jpg',
        },
        {
          name: 'Las Olas & Intracoastal Party Cruise',
          path: '/las-olas-boat-tour/',
          description: 'Iconic Las Olas views with a lively, social cruise experience.',
          image: '/Night_Intracoastal2.jpg',
        },
      ]}
    />
  );
}
