import CruisePage from '../../components/CruisePage';

export default function IntracoastalWaterwayCorporateCruise() {
  return (
    <CruisePage
      seo={{
        title: 'Intracoastal Waterway Corporate Cruise | Tiki Boat Day Cruise',
        description: 'Host a corporate cruise in Fort Lauderdale on a private tiki boat. Ideal for team outings, client events, and company celebrations on the water.',
        canonical: 'https://tikitacocruises.com/intracoastal-waterway-corporate-cruise',
      }}
      hero={{
        title: 'Corporate Cruise in Fort Lauderdale',
        subtitle: "Take your next corporate event offsite\u2014onto the water. This private cruise offers a relaxed, unique setting for team outings, client entertainment, and company events.",
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
          answer: 'Our boat accommodates up to 18 guests comfortably. For larger groups, contact us about booking multiple boats for a fleet experience.',
        },
        {
          question: 'Where does this cruise depart from?',
          answer: 'All cruises depart from The Hilton Marina at 1881 SE 17th St, Fort Lauderdale, FL 33316.',
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
