import { Boat, Route, Testimonial, FAQItem } from '../types';

export const boats: Boat[] = [
  {
    id: '1',
    name: 'Coastal Cruiser',
    capacity: 18,
    length: 22,
    hourlyRate: 150,
    dailyRate: 950,
    amenities: ['Bluetooth Sound', 'Bimini Top', 'Cooler & Ice', 'Swimming Ladder'],
    image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&auto=format&fit=crop'
  },
  {
    id: '2',
    name: 'Paradise Explorer',
    capacity: 18,
    length: 24,
    hourlyRate: 180,
    dailyRate: 1150,
    amenities: ['Premium Sound System', 'Bimini Top', 'Large Cooler', 'Swimming Platform', 'Extra Seating'],
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&auto=format&fit=crop'
  },
  {
    id: '3',
    name: 'Luxury Yacht Pontoon',
    capacity: 18,
    length: 26,
    hourlyRate: 220,
    dailyRate: 1450,
    amenities: ['Premium Audio', 'Full Shade', 'Built-in Coolers', 'Water Slide', 'Deluxe Seating', 'LED Lighting'],
    image: '/hero-pontoon-miami.jpg'
  }
];

export const routes: Route[] = [
  {
    id: '1',
    name: 'Las Olas & Intracoastal Cruise',
    description: 'Cruise through Fort Lauderdale\'s famous Intracoastal Waterway, passing luxury waterfront homes and the vibrant Las Olas Boulevard area.',
    duration: '3 hours',
    highlights: ['Las Olas views', 'Luxury waterfront homes', 'Perfect for sightseeing'],
    image: '/Night_Intracoastal2.jpg'
  },
  {
    id: '2',
    name: 'Fort Lauderdale Sandbar',
    description: 'Anchor at the popular Fort Lauderdale sandbar with stunning waterfront views. Perfect for swimming and relaxation.',
    duration: '4 hours',
    highlights: ['Popular sandbar destination', 'Crystal clear waters', 'Ideal for photos'],
    image: '/Sandbar.png'
  },
  {
    id: '3',
    name: 'Intracoastal Waterway Tour',
    description: 'Explore the beautiful Fort Lauderdale Intracoastal Waterway, passing luxury yachts, waterfront mansions, and the Port Everglades inlet.',
    duration: '4 hours',
    highlights: ['Luxury yachts', 'Waterfront mansions', 'Port Everglades views'],
    image: 'https://vjiybpiuquttbaimywbt.supabase.co/storage/v1/object/public/pontoon/15.png'
  }
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Edward B.',
    rating: 5,
    text: 'Felt more like cruising with an old friend than a tour guide — truly the best day on the water.',
    date: '2 weeks ago'
  },
  {
    id: '2',
    name: 'Jenna M.',
    rating: 5,
    text: 'The boat is top-of-the-line and the experience is next level — don’t waste your time anywhere else.',
    date: '1 month ago'
  },
  {
    id: '3',
    name: 'Kalin M.',
    rating: 5,
    text: 'What are you waiting for? This was the perfect mix of fun, history, and sandbar adventure.',
    date: '3 weeks ago'
  },
  {
    id: '4',
    name: 'Amy W.',
    rating: 5,
    text: 'If you’re gonna Tiki, you gotta go with Taco! The vibe, the knowledge, and the flexibility were unmatched.',
    date: '1 month ago'
  },
  {
    id: '5',
    name: 'Ashley M.',
    rating: 5,
    text: 'Best way to see Fort Lauderdale — clean boat, great music, and a captain who makes everyone feel at home.',
    date: 'Yesterday'
  }
];

export const faqs: FAQItem[] = [
  {
    question: 'What should I bring?',
    answer: 'Bring sunscreen, towels, food, and beverages (cooler and ice provided). We recommend polarized sunglasses, swimwear, and a waterproof phone case. Life jackets are included for all passengers.'
  },
  {
    question: 'What is your cancellation policy?',
    answer: 'Free cancellation up to 48 hours before your scheduled departure. Cancellations within 48 hours receive a 50% refund. Weather-related cancellations receive a full refund or free rescheduling.'
  },
  {
    question: 'Is fuel included in the price?',
    answer: 'Fuel is not included in the base rental price. You will fuel the boat before returning, similar to a car rental. Alternatively, we offer a fuel package option for $100 that covers typical usage.'
  },
  {
    question: 'Can we bring alcohol?',
    answer: 'Yes! You are welcome to bring beer, wine, and cocktails. We provide a large cooler with ice. Please drink responsibly. If you have a captain with you, they will ensure everyone stays safe on the water.'
  },
  {
    question: 'How early should we arrive?',
    answer: 'Please arrive 15 minutes before your scheduled departure time. This allows time for orientation, safety briefing, and departure. Late arrivals may result in reduced rental time.'
  },
  {
    question: 'What happens if the weather is bad?',
    answer: 'Safety is our priority. If weather conditions are unsafe, we will contact you to reschedule or provide a full refund. We monitor forecasts closely and make decisions based on Coast Guard recommendations.'
  },
  {
    question: 'Are pets allowed?',
    answer: 'Well-behaved dogs are welcome! Please bring a leash and clean up after your pet. There is a $25 pet cleaning fee. Let us know in advance so we can prepare the boat accordingly.'
  }
];
