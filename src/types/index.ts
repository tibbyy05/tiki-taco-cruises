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
