import CruisePage from '../../components/CruisePage';

export default function NorthBoundScenicCruise() {
  return (
    <CruisePage
      seo={{
        title: 'Scenic Cruise Tiki Boat | Ft Lauderdale Boat Tours',
        description: 'Take a scenic cruise in Fort Lauderdale along the Intracoastal with optional sandbar stops. Perfect for sightseeing, swimming, and relaxing on the water.',
        canonical: 'https://tikitacocruises.com/north-bound-scenic-cruise',
      }}
      hero={{
        title: 'Northbound Scenic Cruise in Fort Lauderdale',
        subtitle: "This scenic cruise heads north along the Intracoastal, offering a mix of sightseeing, social energy, and time on the water. It's one of the most versatile Fort Lauderdale boat tours.",
        backgroundImage: '/Sandbar.png',
      }}
      pricing={{
        duration: '4 Hours',
        price: '$1,500',
        basePassengers: 'Up to 18 Guests',
        startTimes: [],
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
          'Cup Holders & Seating for 18',
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
