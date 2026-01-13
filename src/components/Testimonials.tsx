import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonials } from '../data/mockData';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-12 sm:py-16 md:py-20 px-4 bg-sand">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ocean mb-3 sm:mb-4">
            What Our Guests Say
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 px-4">
            Real experiences from real people
          </p>
        </div>

        <div className="relative px-8 sm:px-12 md:px-0">
          <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 md:p-12 relative overflow-hidden">
            <Quote className="absolute top-3 left-3 sm:top-4 sm:left-4 w-12 h-12 sm:w-16 sm:h-16 text-coral/10" />

            <div className="relative z-10">
              <div className="flex justify-center mb-5 sm:mb-6">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 sm:w-6 sm:h-6 text-coral fill-coral" />
                ))}
              </div>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 text-center mb-6 sm:mb-8 leading-relaxed italic px-2">
                "{currentTestimonial.text}"
              </p>

              <div className="text-center">
                <p className="font-bold text-ocean text-base sm:text-lg">{currentTestimonial.name}</p>
                <p className="text-gray-700 text-sm sm:text-base">{currentTestimonial.date}</p>
              </div>
            </div>
          </div>

          <button
            onClick={prevTestimonial}
            className="absolute left-0 sm:-left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-coral text-ocean hover:text-white rounded-full p-2 sm:p-3 shadow-lg transition-all duration-300 hover:scale-110 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 sm:-right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-coral text-ocean hover:text-white rounded-full p-2 sm:p-3 shadow-lg transition-all duration-300 hover:scale-110 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <div className="flex justify-center gap-2 mt-6 sm:mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-3 rounded-full transition-all duration-300 min-h-[12px] min-w-[12px] ${
                  index === currentIndex ? 'bg-coral w-8' : 'bg-ocean/20 w-3'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="mt-8 sm:mt-10 md:mt-12 text-center">
          <div className="inline-block bg-ocean text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full">
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap justify-center">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-coral text-coral" />
              <span className="font-bold text-lg sm:text-xl">4.9</span>
              <span className="text-white/80 text-sm sm:text-base">based on 200+ reviews</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
