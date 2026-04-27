import CruisePage from '../../components/CruisePage';

export default function SandbarParty() {
  return (
    <CruisePage
      seo={{
        title: 'Fort Lauderdale Sandbar Cruise | Tiki Taco Cruises',
        description: "Anchor at the popular Fort Lauderdale sandbar with stunning waterfront views. Perfect for swimming, relaxing, and unforgettable memories on the water.",
      }}
      hero={{
        title: 'Fort Lauderdale Sandbar Party',
        subtitle: 'The Ultimate Floating Party Destination',
        backgroundImage: '/Sandbar.png',
      }}
      pricing={{
        duration: '4 Hours',
        price: '$1,500',
        basePassengers: 'Up to 18 Guests',
        startTimes: [],
      }}
      highlights={['Popular sandbar destination', 'Crystal clear waters', 'Ideal for photos']}
      sections={[
        {
          heading: 'The Ultimate Floating Party Destination',
          subtext: "Experience Fort Lauderdale's legendary sandbar \u2013 the ultimate floating party destination! This 4-hour adventure takes you to the iconic sandbar where you'll anchor alongside other boaters in crystal-clear turquoise waters.\n\nJump in, swim, float, and socialize in this unique party atmosphere. Our tiki pontoon becomes your floating home base complete with music, shade, and all the amenities you need for an unforgettable day on the water.\n\nPerfect for bachelorette parties, birthdays, corporate events, or just a fun day with friends. The sandbar offers a one-of-a-kind experience you won't find anywhere else!",
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
        heading: 'Your 4-Hour Adventure',
        steps: [
          {
            label: '1',
            heading: 'Hour 1: Departure & Cruise to Sandbar',
            description: "Depart from The Hilton Marina and enjoy a scenic cruise to Fort Lauderdale's famous sandbar. Take in the beautiful views as you make your way to this unique floating destination.",
          },
          {
            label: '2-3',
            heading: 'Hours 2-3: Sandbar Experience',
            description: "Anchor at the sandbar and enjoy the ultimate floating party experience! Swim in the crystal-clear turquoise waters, float on the water mat, socialize with other boaters, and make unforgettable memories. Your tiki pontoon provides the perfect home base with music, shade, and all amenities.",
          },
          {
            label: '4',
            heading: 'Hour 4: Return Journey',
            description: "After an amazing time at the sandbar, enjoy a relaxing cruise back to The Hilton Marina, taking in the beautiful Fort Lauderdale scenery along the way.",
          },
        ],
      }}
      testimonials={[
        {
          text: "The sandbar party was absolutely incredible! We anchored with other boats, swam in the crystal-clear water, and had the best time. Our tiki pontoon was the perfect floating party base. Unforgettable experience!",
          name: "Jessica Martinez",
          rating: 5,
        },
        {
          text: "Perfect for our bachelorette party! The sandbar is such a unique Fort Lauderdale experience. The water was beautiful, the atmosphere was amazing, and everyone had a blast. Highly recommend!",
          name: "Sarah Thompson",
          rating: 5,
        },
      ]}
      relatedRoutes={[
        {
          name: 'Las Olas & Intracoastal Cruise',
          path: '/destinations/las-olas-cruise',
          description: "Cruise through Fort Lauderdale's famous Intracoastal Waterway and Las Olas area.",
          image: '/Night_Intracoastal2.jpg',
        },
        {
          name: 'Intracoastal Waterway Tour',
          path: '/destinations/intracoastal-tour',
          description: 'Explore luxury yachts, waterfront mansions, and Port Everglades.',
          image: 'https://vjiybpiuquttbaimywbt.supabase.co/storage/v1/object/public/pontoon/15.png',
        },
      ]}
    />
  );
}
