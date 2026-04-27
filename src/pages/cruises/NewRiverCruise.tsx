import CruisePage from '../../components/CruisePage';

export default function NewRiverCruise() {
  return (
    <CruisePage
      seo={{
        title: 'New River Cruise | Stranahan House Fort Lauderdale',
        description: 'Cruise the New River on a Fort Lauderdale tiki boat. Enjoy a scenic historic tour with waterfront views, downtown sights, and the Stranahan House from the water.',
        canonical: 'https://tikitacocruises.com/new-river-cruise',
      }}
      hero={{
        title: 'New River Cruise in Fort Lauderdale',
        subtitle: "Experience a New River cruise through the heart of Fort Lauderdale. This scenic tiki boat tour blends historic landmarks, waterfront homes, and a relaxed, easygoing ride along one of the city's most iconic waterways.",
        backgroundImage: '/Night_Intracoastal2.jpg',
      }}
      pricing={{
        duration: '4 Hours',
        price: '$1,500',
        basePassengers: 'Up to 18 Guests',
        startTimes: [],
      }}
      highlights={[
        'Historic downtown Fort Lauderdale views',
        'Waterfront mansions & local landmarks',
        'Calm, scenic cruising route',
      ]}
      sections={[
        {
          heading: 'What to Expect on a New River Historic Cruise',
          subtext: "Cruise through the heart of Fort Lauderdale along the New River, passing historic landmarks, downtown views, and waterfront homes. This route is ideal for those looking for a more relaxed, scenic experience with a touch of local history.",
        },
        {
          heading: "A Relaxed, Scenic Fort Lauderdale Boat Tour",
          subtext: "This route is ideal for those who want a quieter, more scenic experience. Cruise past hidden canals, classic Florida architecture, and the areas that helped shape Fort Lauderdale into the 'Venice of America.'",
        },
        {
          heading: 'Perfect for Small Groups & Private Cruises',
          subtext: "If you're visiting or local, this New River cruise works well for couples, families, and small groups looking for a laid-back day cruise on the water.",
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
            heading: 'Hour 1: Departure & New River Entrance',
            description: 'Depart from The Hilton Marina and cruise toward the New River, passing through Fort Lauderdale\'s downtown waterfront. Take in the city skyline and early waterfront landmarks.',
          },
          {
            label: '2-3',
            heading: 'Hours 2-3: Historic Landmarks & Hidden Canals',
            description: 'Explore the heart of the New River, passing the Stranahan House, waterfront mansions, and hidden canals lined with classic Florida architecture. Your captain shares local history and insider knowledge.',
          },
          {
            label: '4',
            heading: 'Hour 4: Return Journey',
            description: 'Enjoy a relaxing return cruise to The Hilton Marina, soaking in the views you may have missed and wrapping up a memorable day on the water.',
          },
        ],
      }}
      testimonials={[
        {
          text: "The New River cruise was a highlight of our trip. So peaceful and scenic — the captain knew every landmark and made it feel like a private tour. Highly recommend for anyone who wants a relaxed day on the water.",
          name: "Karen Mitchell",
          rating: 5,
        },
        {
          text: "We loved seeing the Stranahan House from the water. The whole route felt like a hidden gem. Perfect for our family outing — not too wild, just right.",
          name: "James Patel",
          rating: 5,
        },
      ]}
      gallery={{
        heading: 'New River Tiki Cruise Photo Gallery',
        // TODO: Replace with New River-specific photography when available.
        images: [
          { src: '/Night_Intracoastal2.jpg', alt: 'Fort Lauderdale waterway night view' },
          { src: '/Sandbar.png', alt: 'Tiki pontoon cruising Fort Lauderdale' },
          { src: '/fort-lauderdale-hero.jpg', alt: 'Fort Lauderdale waterfront skyline' },
        ],
      }}
      faqs={[
        {
          question: 'Where does the New River Cruise depart from?',
          answer: 'All cruises depart from The Hilton Marina at 1881 SE 17th St, Fort Lauderdale, FL 33316.',
        },
        {
          question: 'Is this cruise suitable for children?',
          answer: 'Absolutely! The New River cruise is one of our most family-friendly routes with calm waters and scenic views perfect for all ages.',
        },
        {
          question: 'Can I bring food and drinks on board?',
          answer: 'Yes! You are welcome to bring your own food and beverages. We provide a large cooler stocked with ice to keep everything cold.',
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
          name: 'Las Olas & Intracoastal Party Cruise',
          path: '/las-olas-boat-tour',
          description: 'Iconic Las Olas views with a lively, social cruise experience.',
          image: '/Night_Intracoastal2.jpg',
        },
      ]}
    />
  );
}
