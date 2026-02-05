import { Users, Ruler, Check } from 'lucide-react';
import { boats } from '../data/mockData';

export default function Fleet() {
  const handleBookNow = () => {
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    window.location.href = '/#booking';
  };

  return (
    <section id="fleet" className="py-12 sm:py-16 md:py-20 px-4 bg-sand">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ocean mb-3 sm:mb-4">
            Our Premium Fleet
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-2xl mx-auto px-4">
            Choose from our selection of well-maintained, fully-equipped pontoon boats perfect for any occasion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {boats.map((boat) => (
            <div
              key={boat.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={boat.image}
                  alt={boat.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ocean/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="p-5 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-bold text-ocean mb-3 sm:mb-4">{boat.name}</h3>

                <div className="flex items-center gap-4 sm:gap-6 mb-4 text-gray-700 text-sm sm:text-base">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="font-medium">Up to {boat.capacity}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Ruler className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="font-medium">{boat.length}ft</span>
                  </div>
                </div>

                <div className="mb-5 sm:mb-6">
                  <h4 className="font-semibold text-ocean mb-2 text-sm sm:text-base">Amenities:</h4>
                  <div className="space-y-1.5 sm:space-y-2">
                    {boat.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-2 text-gray-700">
                        <Check className="w-4 h-4 text-teal flex-shrink-0" />
                        <span className="text-xs sm:text-sm">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-ocean/10 pt-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700 text-sm sm:text-base">Hourly Rate</span>
                    <span className="text-xl sm:text-2xl font-bold text-ocean price-text">${boat.hourlyRate}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 text-sm sm:text-base">Daily Rate</span>
                    <span className="text-lg sm:text-xl font-bold text-coral price-text">${boat.dailyRate}</span>
                  </div>
                </div>

                <button
                  onClick={handleBookNow}
                  className="w-full bg-coral hover:bg-coral/90 text-white py-3 sm:py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg text-base sm:text-base min-h-[44px] flex items-center justify-center"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-10 md:mt-12 px-4">
          <p className="text-gray-700 text-sm sm:text-base md:text-lg">
            All boats include life jackets, safety equipment, and a full orientation. Departing from The Hilton Marina in Fort Lauderdale.
            <span className="block mt-2 font-semibold text-ocean text-sm sm:text-base md:text-lg price-text">Captain services available for +$50/hour</span>
          </p>
        </div>
      </div>
    </section>
  );
}
