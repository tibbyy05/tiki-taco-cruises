import CruisePage from '../../components/CruisePage';

export default function LasOlasCruise() {
  return (
    <CruisePage
      seo={{
        title: 'Las Olas & Intracoastal Cruise | Tiki Taco Cruises Fort Lauderdale',
        description: 'Private Las Olas and Intracoastal cruise in Fort Lauderdale. Tour luxury waterfront homes, iconic drawbridges, and the heart of Fort Lauderdale by water.',
      }}
      hero={{
        title: 'Las Olas & Intracoastal Cruise',
        subtitle: 'Experience Fort Lauderdale\'s Most Iconic Waterway',
        backgroundImage: '/Night_Intracoastal2.jpg',
      }}
      pricing={{
        duration: '3 Hours',
        price: '$1,200',
        basePassengers: 'Up to 18 Guests',
        startTimes: [],
      }}
      highlights={['Las Olas views', 'Luxury waterfront homes', 'Perfect for sightseeing']}
      sections={[
        {
          heading: "Experience Fort Lauderdale's Most Iconic Waterway",
          subtext: "Cruise through Fort Lauderdale's famous Intracoastal Waterway aboard our luxury tiki pontoon. This 3-hour journey takes you past magnificent waterfront estates, mega yachts, and the vibrant Las Olas Boulevard area.\n\nPerfect for sightseeing, special celebrations, or a relaxing afternoon on the water. Your professional captain will navigate Fort Lauderdale's most beautiful waterways while you and your guests enjoy the tropical tiki bar atmosphere, music, and stunning views.\n\nDeparting from The Hilton Marina, this route showcases why Fort Lauderdale is known as the 'Venice of America' with its intricate canal system and breathtaking architecture.",
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
        heading: 'Your 3-Hour Journey',
        steps: [
          {
            label: '1',
            heading: 'Hour 1: Departure & Initial Cruise',
            description: 'Depart from The Hilton Marina and begin your journey along the Intracoastal Waterway. Take in the stunning views as you cruise past luxury waterfront properties and mega yachts.',
          },
          {
            label: '2',
            heading: 'Hour 2: Las Olas Boulevard & Waterfront Estates',
            description: "Experience the vibrant Las Olas Boulevard area from the water, cruise past magnificent waterfront estates, and see why Fort Lauderdale is known as the Venice of America.",
          },
          {
            label: '3',
            heading: 'Hour 3: Return Journey',
            description: "Enjoy a relaxing cruise back to The Hilton Marina, taking in any sights you may have missed and enjoying the beautiful Fort Lauderdale waterways.",
          },
        ],
      }}
      testimonials={[
        {
          text: "The Las Olas cruise was absolutely stunning! We passed by incredible waterfront mansions and the views of Las Olas Boulevard were picture-perfect. The captain was knowledgeable and made the experience unforgettable.",
          name: "Amanda Rodriguez",
          rating: 5,
        },
        {
          text: "Perfect 3-hour sightseeing experience. The Intracoastal Waterway is beautiful, and seeing Fort Lauderdale from the water gives you such a different perspective. Highly recommend!",
          name: "David Chen",
          rating: 5,
        },
      ]}
      relatedRoutes={[
        {
          name: 'Fort Lauderdale Sandbar Party',
          path: '/destinations/sandbar-party',
          description: 'Anchor at the popular Fort Lauderdale sandbar with stunning waterfront views.',
          image: '/Sandbar.png',
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
