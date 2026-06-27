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
      "@id": "https://tikitacocruises.com/north-bound-scenic-cruise#webpage",
      "url": "https://tikitacocruises.com/north-bound-scenic-cruise",
      "name": "Northbound Scenic Cruise in Fort Lauderdale",
      "description": "A 4-hour private Fort Lauderdale tiki cruise heading north along the Intracoastal Waterway with scenic views and an optional sandbar stop.",
      "about": { "@id": "https://tikitacocruises.com/north-bound-scenic-cruise#service" },
      "mainEntity": { "@id": "https://tikitacocruises.com/north-bound-scenic-cruise#service" }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://tikitacocruises.com/north-bound-scenic-cruise#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://tikitacocruises.com/" },
        { "@type": "ListItem", "position": 2, "name": "Cruises", "item": "https://tikitacocruises.com/cruise-destinations" },
        { "@type": "ListItem", "position": 3, "name": "Northbound Scenic Cruise in Fort Lauderdale", "item": "https://tikitacocruises.com/north-bound-scenic-cruise" }
      ]
    },
    {
      "@type": "Service",
      "@id": "https://tikitacocruises.com/north-bound-scenic-cruise#service",
      "name": "Northbound Scenic Cruise in Fort Lauderdale",
      "serviceType": "Private tiki boat cruise",
      "category": "Boat tour",
      "url": "https://tikitacocruises.com/north-bound-scenic-cruise",
      "mainEntityOfPage": { "@id": "https://tikitacocruises.com/north-bound-scenic-cruise#webpage" },
      "description": "Head north along the Intracoastal for a mix of sightseeing, swimming, relaxing, and an optional Fort Lauderdale sandbar stop.",
      "provider": { "@id": "https://tikitacocruises.com/#business" },
      "areaServed": { "@type": "City", "name": "Fort Lauderdale" },
      "offers": {
        "@type": "Offer",
        "@id": "https://tikitacocruises.com/north-bound-scenic-cruise#offer",
        "url": "https://tikitacocruises.com/north-bound-scenic-cruise",
        "price": "1140",
        "priceCurrency": "USD",
        "itemOffered": { "@id": "https://tikitacocruises.com/north-bound-scenic-cruise#service" },
        "priceSpecification": [
          { "@type": "PriceSpecification", "price": "1140", "priceCurrency": "USD", "description": "Base price for a 4-hour private cruise for up to 12 passengers." },
          { "@type": "UnitPriceSpecification", "price": "285", "priceCurrency": "USD", "unitText": "HOUR", "description": "Equivalent hourly rate." },
          { "@type": "UnitPriceSpecification", "price": "60", "priceCurrency": "USD", "unitText": "PERSON", "description": "Additional guest price." }
        ]
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
        price: '$1,140',
        basePassengers: 'Up to 12 Passengers',
        additionalGuestPrice: '$60',
        hourlyRate: '$285',
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
          path: '/new-river-cruise',
          description: 'A relaxed, scenic cruise through the heart of Fort Lauderdale along the New River.',
          image: '/Night_Intracoastal2.jpg',
        },
        {
          name: 'Las Olas & Intracoastal Party Cruise',
          path: '/las-olas-boat-tour',
          description: 'Iconic Las Olas views with a lively, social cruise experience.',
          image: '/Night_Intracoastal2.jpg',
        },
      ]}
    />
  );
}
