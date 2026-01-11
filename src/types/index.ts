export interface Boat {
  id: string;
  name: string;
  capacity: number;
  length: number;
  hourlyRate: number;
  dailyRate: number;
  amenities: string[];
  image: string;
}

export interface Route {
  id: string;
  name: string;
  description: string;
  duration: string;
  highlights: string[];
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
  image?: string;
}

export interface BookingData {
  date: string;
  time: string;
  boatType: string;
  guests: number;
  route?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
