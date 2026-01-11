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
  },
  {
    id: '4',
    name: 'Fort Lauderdale Beach & Coast',
    description: 'Experience Fort Lauderdale\'s stunning beach coastline with views of the famous beach and A1A. Perfect for sunset cruises.',
    duration: '3 hours',
    highlights: ['Beach views', 'Coastal cruising', 'Sunset atmosphere'],
    image: 'https://vjiybpiuquttbaimywbt.supabase.co/storage/v1/object/public/pontoon/16.png'
  }
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Martinez',
    rating: 5,
    text: 'Absolutely incredible experience! The boat was pristine, and the captain knew all the best spots around Fort Lauderdale. We cruised along the Intracoastal Waterway, anchored at the Fort Lauderdale sandbar, and enjoyed stunning views of the downtown skyline. Best day of our Fort Lauderdale vacation!',
    date: '2 weeks ago'
  },
  {
    id: '2',
    name: 'James Wilson',
    rating: 5,
    text: 'Perfect for our group of 10! Departing from The Hilton Marina was so convenient and easy to find. We cruised past Las Olas Boulevard and along the New River - the views were spectacular! The booking process was seamless, and the boat exceeded our expectations. Highly recommend for anyone wanting to experience Fort Lauderdale\'s beautiful waterways.',
    date: '1 month ago'
  },
  {
    id: '3',
    name: 'Emily Chen',
    rating: 5,
    text: 'We celebrated my birthday on the pontoon and it was magical! Sunset cruise along the Fort Lauderdale Intracoastal Waterway with views of the downtown Fort Lauderdale skyline and Fort Lauderdale Beach was absolutely breathtaking. The staff was professional and accommodating. Will definitely book again from The Hilton Marina!',
    date: '3 weeks ago'
  },
  {
    id: '4',
    name: 'Michael Rodriguez',
    rating: 5,
    text: 'As a Fort Lauderdale local, I have tried several boat rentals and this is by far the best. The location at The Hilton Marina is perfect - easy access to the Intracoastal Waterway and all the best spots. Great value, beautiful boats, and excellent customer service. Cruising past Las Olas and along the New River never gets old!',
    date: '1 week ago'
  },
  {
    id: '5',
    name: 'Jessica Thompson',
    rating: 5,
    text: 'Incredible day exploring Fort Lauderdale\'s waterways! We started from The Hilton Marina and spent the day cruising the Intracoastal, passing by Fort Lauderdale Beach and the downtown skyline. The pontoon was spacious and comfortable. We brought our own food and drinks, and the cooler kept everything ice cold. The swimming ladder made it easy to get in and out of the water. Five stars!',
    date: '2 months ago'
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
