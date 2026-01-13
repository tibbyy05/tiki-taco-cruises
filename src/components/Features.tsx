import { FaBluetooth, FaSnowflake, FaUmbrellaBeach, FaSwimmer, FaGasPump, FaLifeRing } from 'react-icons/fa';
import { Shield } from 'lucide-react';

const features = [
  {
    icon: FaBluetooth,
    title: 'Bluetooth Sound System',
    description: 'Premium audio system to play your favorite tunes'
  },
  {
    icon: FaSnowflake,
    title: 'Cooler & Ice Provided',
    description: 'Large cooler with ice to keep drinks cold all day'
  },
  {
    icon: FaUmbrellaBeach,
    title: 'Bimini Top Shade',
    description: 'Full coverage shade to protect from the sun'
  },
  {
    icon: FaSwimmer,
    title: 'Swimming Ladder',
    description: 'Easy water access for swimming and snorkeling'
  },
  {
    icon: FaGasPump,
    title: 'Fuel Included',
    description: 'No extra fees—your trip comes with a full tank'
  },
  {
    icon: FaLifeRing,
    title: 'Life Jackets Included',
    description: 'Safety equipment for all passengers'
  }
];

export default function Features() {
  return (
    <section id="features" className="py-12 sm:py-16 md:py-20 px-4 bg-sand">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ocean mb-3 sm:mb-4">
            Premium Amenities
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-2xl mx-auto px-4">
            Every boat comes fully equipped for the perfect day on the water
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <Icon size={48} color="#0891B2" className="mb-5 sm:mb-6" />
                <h3 className="text-lg sm:text-xl font-bold text-ocean mb-2 sm:mb-3">{feature.title}</h3>
                <p className="text-gray-700 text-sm sm:text-base">{feature.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-10 sm:mt-12 md:mt-16 bg-ocean text-white rounded-2xl p-6 sm:p-8 md:p-12 text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Licensed & Insured</h3>
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-5 sm:mb-6 px-4">
              All our boats are fully licensed, insured, and maintained to the highest standards. Your safety and satisfaction are our top priorities.
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm sm:text-base md:text-lg">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>USCG Licensed</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Fully Insured</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>5-Star Rated</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
