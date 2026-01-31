import { MapPin, CheckCircle, Users } from 'lucide-react';
import { routes } from '../data/mockData';

export default function Routes() {
  const bookingUrl = '/#booking';

  const handleRouteClick = () => {
    window.location.href = bookingUrl;
  };

  return (
    <section id="routes" className="py-12 sm:py-16 md:py-20 px-4 bg-sand">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ocean mb-3 sm:mb-4">
            Popular Destinations
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-2xl mx-auto px-4">
            Explore Fort Lauderdale's most stunning waterways and iconic locations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {routes.map((route) => (
            <div
              key={route.id}
              onClick={() => handleRouteClick(route.name)}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group border border-ocean/10 cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={route.image}
                  alt={route.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              <div className="p-5 sm:p-6">
                <div className="flex items-start gap-3 mb-4">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-teal flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-ocean mb-2">{route.name}</h3>
                    <p className="text-gray-700 text-sm sm:text-base mb-3">{route.description}</p>
                    <div className="flex items-center gap-2 text-gray-700 text-sm">
                      <Users className="w-4 h-4 text-teal" />
                      <span>Up to 18 guests</span>
                    </div>
                  </div>
                </div>

                <div className="mb-5 sm:mb-6">
                  <h4 className="font-semibold text-ocean mb-3 text-sm sm:text-base">Highlights:</h4>
                  <div className="space-y-1.5 sm:space-y-2">
                    {route.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center gap-2 text-gray-700">
                        <CheckCircle className="w-4 h-4 text-teal flex-shrink-0" />
                        <span className="text-xs sm:text-sm">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href={bookingUrl}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full bg-coral hover:bg-coral/90 text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg text-base min-h-[44px] flex items-center justify-center"
                >
                  View Details & Book
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
