import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { testimonials } from '../data/mockData';

export default function RecentReviews() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const current = testimonials[index];

  return (
    <section className="py-10 sm:py-12 md:py-14 px-4 bg-sand/60">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-ocean">
            Recent Reviews
          </h2>
          <p className="text-gray-700 text-sm sm:text-base">
            Real guests. Real experiences.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-ocean/10 p-6 sm:p-8 text-center">
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(current.rating)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-coral fill-coral" />
            ))}
          </div>
          <p className="text-gray-700 text-base sm:text-lg italic mb-4">
            “{current.text}”
          </p>
          <p className="text-ocean font-semibold">{current.name}</p>
          <p className="text-gray-700 text-sm">{current.date}</p>
        </div>
      </div>
    </section>
  );
}
