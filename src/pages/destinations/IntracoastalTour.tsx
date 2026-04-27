import CruisePage from '../../components/CruisePage';

export default function IntracoastalTour() {
  return (
    <CruisePage
      seo={{
        title: 'Intracoastal Waterway Tour | Tiki Taco Cruises Fort Lauderdale',
        description: "Explore Fort Lauderdale's Intracoastal Waterway by private pontoon. Cruise past mega yachts, waterfront mansions, and Port Everglades with a licensed captain.",
      }}
      hero={{
        title: 'Intracoastal Waterway Tour',
        subtitle: "Explore Fort Lauderdale's Most Scenic Waterways",
        backgroundImage: 'https://vjiybpiuquttbaimywbt.supabase.co/storage/v1/object/public/pontoon/15.png',
      }}
      pricing={{
        duration: '4 Hours',
        price: '$1,500',
        basePassengers: 'Up to 18 Guests',
        startTimes: [],
      }}
      highlights={['Luxury yachts', 'Waterfront mansions', 'Port Everglades views']}
      sections={[
        {
          heading: "Explore Fort Lauderdale's Most Scenic Waterways",
          subtext: "Embark on an extended 4-hour journey through the beautiful Fort Lauderdale Intracoastal Waterway. This comprehensive tour takes you past luxury yachts, stunning waterfront mansions, and the scenic Port Everglades inlet.\n\nExperience the full beauty of Fort Lauderdale's interconnected waterways with extra time to take in the sights, swim, and relax. Your captain will share local knowledge about the area's history and point out celebrity homes and notable landmarks.\n\nThis extended tour is perfect for those who want more time on the water, combining sightseeing with relaxation and the opportunity to anchor at scenic spots along the way.",
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
            heading: 'Hour 1: Departure & Cruise to Destination',
            description: "Depart from The Hilton Marina and begin your extended journey along the Intracoastal Waterway. Your captain will start sharing local knowledge about Fort Lauderdale's waterways and notable landmarks.",
          },
          {
            label: '2-3',
            heading: 'Hours 2-3: Main Experience & Scenic Stops',
            description: "Explore the full beauty of Fort Lauderdale's Intracoastal Waterway. See luxury yachts, stunning waterfront mansions, and Port Everglades. Your captain will point out celebrity homes and share historical insights. Take time to anchor at scenic spots, swim, and relax while taking in the breathtaking views.",
          },
          {
            label: '4',
            heading: 'Hour 4: Return Journey',
            description: "Enjoy a relaxing cruise back to The Hilton Marina, taking in any final sights and enjoying the beautiful Fort Lauderdale waterways on your return journey.",
          },
        ],
      }}
      testimonials={[
        {
          text: "The extended Intracoastal tour was perfect for our group! We had plenty of time to see luxury yachts, stunning waterfront mansions, and Port Everglades. The captain was great at pointing out landmarks and sharing local knowledge.",
          name: "Michael Johnson",
          rating: 5,
        },
        {
          text: "Absolutely loved the 4-hour tour. The extra time allowed us to really take in all the sights, anchor at scenic spots, and relax. Fort Lauderdale's waterways are beautiful, and this tour showcases the best of them.",
          name: "Emily Davis",
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
          name: 'Fort Lauderdale Sandbar Party',
          path: '/destinations/sandbar-party',
          description: 'Anchor at the popular Fort Lauderdale sandbar with stunning waterfront views.',
          image: '/Sandbar.png',
        },
      ]}
    />
  );
}
