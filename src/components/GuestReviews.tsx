import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { testimonials } from '../data/mockData';
import ScrollReveal from './ScrollReveal';

export default function GuestReviews() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const current = testimonials[index];

  return (
    <section id="testimonials" className="py-12 sm:py-16 md:py-20 px-4 bg-sand">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ocean mb-3 sm:mb-4">
              What Guests Say About Our Tiki Cruises
            </h2>
            <p className="text-base sm:text-lg text-gray-700">
              Real experiences from real people
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h3 className="text-xl sm:text-2xl font-bold text-ocean mb-6 text-center">
            Recent Tiki Taco Reviews
          </h3>

          <div className="bg-white rounded-2xl shadow-lg border border-ocean/10 p-6 sm:p-8 text-center">
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-coral fill-coral" />
              ))}
            </div>
            <p className="text-gray-700 text-base sm:text-lg italic mb-4">
              &ldquo;{current.text}&rdquo;
            </p>
            <p className="text-ocean font-semibold">{current.name}</p>
            <p className="text-gray-700 text-sm">{current.date}</p>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-3 rounded-full transition-all duration-300 min-h-[12px] min-w-[12px] ${
                  i === index ? 'bg-coral w-8' : 'bg-ocean/20 w-3'
                }`}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>

          <div className="mt-6 text-center">
            <div className="inline-block bg-ocean text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full">
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap justify-center">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-coral text-coral" />
                <span className="font-bold text-lg sm:text-xl">4.9</span>
                <span className="text-white/80 text-sm sm:text-base">based on 200+ reviews</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
