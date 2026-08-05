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
      "@id": "https://tikitacocruises.com/north-bound-scenic-cruise/#webpage",
      "url": "https://tikitacocruises.com/north-bound-scenic-cruise/",
      "name": "Northbound Scenic Cruise in Fort Lauderdale",
      "description": "Head north along the Intracoastal Waterway for sightseeing, swimming, relaxing, and a possible Fort Lauderdale sandbar stop when conditions allow.",
      "isPartOf": {
        "@id": "https://tikitacocruises.com/#website"
      },
      "about": {
        "@id": "https://tikitacocruises.com/north-bound-scenic-cruise/#product"
      },
      "mainEntity": {
        "@id": "https://tikitacocruises.com/north-bound-scenic-cruise/#product"
      },
      "breadcrumb": {
        "@id": "https://tikitacocruises.com/north-bound-scenic-cruise/#breadcrumb"
      },
      "primaryImageOfPage": {
        "@type": "ImageObject",
        "url": "https://tikitacocruises.com/images/gallery/a8c9295f-6dd9-4ef8-916a-ba79f966368b/1783648789760_1780177082375_IMG_4880_(1).jpg"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://tikitacocruises.com/north-bound-scenic-cruise/#breadcrumb",
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
          "name": "Northbound Scenic Cruise in Fort Lauderdale",
          "item": "https://tikitacocruises.com/north-bound-scenic-cruise/"
        }
      ]
    },
    {
      "@type": "Product",
      "@id": "https://tikitacocruises.com/north-bound-scenic-cruise/#product",
      "name": "Northbound Scenic Cruise in Fort Lauderdale",
      "url": "https://tikitacocruises.com/north-bound-scenic-cruise/",
      "image": "https://tikitacocruises.com/images/gallery/a8c9295f-6dd9-4ef8-916a-ba79f966368b/1783648789760_1780177082375_IMG_4880_(1).jpg",
      "description": "Head north along the Intracoastal Waterway for sightseeing, swimming, relaxing, and a possible Fort Lauderdale sandbar stop when conditions allow.",
      "category": "Private scenic boat tour",
      "brand": {
        "@id": "https://tikitacocruises.com/#business"
      },
      "mainEntityOfPage": {
        "@id": "https://tikitacocruises.com/north-bound-scenic-cruise/#webpage"
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
        "@id": "https://tikitacocruises.com/north-bound-scenic-cruise/#offer",
        "url": "https://tikitacocruises.com/north-bound-scenic-cruise/",
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
      }
    }
  ]
};

export default function NorthBoundScenicCruise() {
  return (
    <CruisePage
      seo={{
        title: 'Scenic Cruise Tiki Boat | Ft Lauderdale Boat Tours',
        description: 'Take a scenic cruise in Fort Lauderdale along the Intracoastal with optional sandbar stops. Perfect for sightseeing, swimming, and relaxing on the water.',
        canonical: 'https://tikitacocruises.com/north-bound-scenic-cruise/',
        jsonLd,
      }}
      hero={{
        title: 'Northbound Scenic Cruise in Fort Lauderdale',
        subtitle: "This scenic cruise heads north along the Intracoastal, offering a mix of sightseeing, social energy, and time on the water. It's one of the most versatile Fort Lauderdale boat tours.",
        backgroundImage: '/Sandbar.png',
      }}
      pricing={{
        duration: '4 Hours',
        price: 'Starting at $200/hour (2 hour minimum)',
        basePassengers: 'Up to 12 Passengers',
        additionalGuestPrice: '$60',
        startTimes: ['10:00 AM', '2:00 PM'],
      }}
      highlights={[
        'Intracoastal Waterway views',
        'Optional sandbar stop',
        'Swimming, floating & relaxing',
      ]}
      sections={[
        {
          heading: 'What to Expect on a Scenic Cruise',
          subtext: "Head north along the Intracoastal for a mix of sightseeing and fun. This cruise often includes a stop at one of Fort Lauderdale's popular sandbars, making it perfect for swimming, relaxing, and socializing.",
        },
        {
          heading: 'Sandbar Stops & Social Vibes',
          subtext: 'Depending on your route, you may anchor at a popular Fort Lauderdale sandbar, perfect for cooling off, hanging out, and enjoying the water.',
        },
        {
          heading: 'A Flexible Fort Lauderdale Boat Tour',
          subtext: 'This cruise balances sightseeing with fun, making it ideal for tourists, weekend groups, and anyone looking for a classic day cruise experience.',
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
            heading: 'Hour 1: Departure & Northbound Cruise',
            description: 'Depart from The Hilton Marina and head north along the Intracoastal Waterway. Take in scenic waterfront views, luxury homes, and passing boats as you cruise toward the sandbar.',
          },
          {
            label: '2-3',
            heading: 'Hours 2-3: Sandbar & Scenic Stops',
            description: "Anchor at a popular Fort Lauderdale sandbar for swimming, floating, and socializing. Enjoy the crystal-clear water, the floating mat, and the laid-back sandbar atmosphere.",
          },
          {
            label: '4',
            heading: 'Hour 4: Return Journey',
            description: 'Cruise back to The Hilton Marina along the Intracoastal, enjoying any sights you may have missed and wrapping up a perfect day on the water.',
          },
        ],
      }}
      testimonials={[
        {
          text: "Best day on the water! The sandbar stop was amazing — crystal clear water, great vibes, and the captain knew exactly where to take us. Would do this every weekend if we could.",
          name: "Tyler Brooks",
          rating: 5,
        },
        {
          text: "We booked this for a group outing and it was perfect. The scenic cruise was beautiful and the sandbar was a blast. Everyone had an incredible time.",
          name: "Nicole Ramirez",
          rating: 5,
        },
      ]}
      gallery={{
        heading: 'North Bound Scenic Cruise Photo Gallery',
        // TODO: Replace with North Bound Scenic-specific photography when available.
        images: [
          { src: '/Sandbar.png', alt: 'Fort Lauderdale sandbar experience' },
          { src: '/Night_Intracoastal2.jpg', alt: 'Intracoastal Waterway scenic views' },
          { src: '/fort-lauderdale-hero.jpg', alt: 'Fort Lauderdale waterfront skyline' },
        ],
      }}
      faqs={[
        {
          question: 'Will we stop at a sandbar?',
          answer: 'Sandbar stops are a common highlight of this cruise, depending on conditions and your group\'s preference. Your captain will find the best spot.',
        },
        {
          question: 'Where does this cruise depart from?',
          answer: 'All cruises depart from The Hilton Marina at 1881 SE 17th St, Fort Lauderdale, FL 33316.',
        },
        {
          question: 'Can I bring food and drinks on board?',
          answer: 'Yes! You are welcome to bring your own food and beverages. We provide a large cooler stocked with ice to keep everything cold.',
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
