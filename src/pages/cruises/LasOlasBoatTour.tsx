import CruisePage from '../../components/CruisePage';

export default function LasOlasBoatTour() {
  return (
    <CruisePage
      seo={{
        title: 'Tiki Taco Party Pontoon Boat | Las Olas Boat Tour',
        description: 'Book a party pontoon boat in Fort Lauderdale. Cruise Las Olas and the Intracoastal with music, drinks, and the perfect setup for bachelorettes and groups.',
        canonical: 'https://tikitacocruises.com/las-olas-boat-tour',
      }}
      hero={{
        title: 'Las Olas & Intracoastal Party Cruise',
        subtitle: "This is the go-to party pontoon boat experience in Fort Lauderdale. Cruise along Las Olas and the Intracoastal with your crew, music playing, and plenty of space to celebrate.",
        backgroundImage: '/Night_Intracoastal2.jpg',
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
        heading: 'Your 4-Hour Journey',
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
      testimonials={[
        {
          text: "Best bachelorette party ever! The boat was perfect, the captain was awesome, and cruising past Las Olas with music blasting was an experience we'll never forget.",
          name: "Rachel Kim",
          rating: 5,
        },
        {
          text: "We rented this for my birthday and it exceeded expectations. The tiki vibe, the views, the space — everything was spot on. Already planning our next trip.",
          name: "Marcus Johnson",
          rating: 5,
        },
      ]}
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
          path: '/north-bound-scenic-cruise',
          description: 'Head north along the Intracoastal for a mix of sightseeing and sandbar fun.',
          image: '/Sandbar.png',
        },
        {
          name: 'Corporate & Private Event Cruise',
          path: '/intracoastal-waterway-corporate-cruise',
          description: 'A private, customizable cruise for team outings and client events.',
          image: '/Night_Intracoastal2.jpg',
        },
      ]}
    />
  );
}
