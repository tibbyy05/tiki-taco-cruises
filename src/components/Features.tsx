import { FaBluetooth, FaSnowflake, FaUmbrellaBeach, FaSwimmer, FaGasPump, FaLifeRing } from 'react-icons/fa';
import { Shield } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const features = [
  {
    icon: FaBluetooth,
    title: 'Bluetooth Sound System',
    description: 'Connect your music and set the vibe for your tiki cruise experience.',
  },
  {
    icon: FaSnowflake,
    title: 'Cooler & Ice Provided',
    description: 'Bring your favorite drinks and keep everything chilled throughout your cruise.',
  },
  {
    icon: FaUmbrellaBeach,
    title: 'Bimini Top Shade',
    description: 'Stay cool and comfortable with shaded coverage during your daytime cruise.',
  },
  {
    icon: FaSwimmer,
    title: 'Dual Swimming Ladders',
    description: 'Easily hop in and out of the water with two oversized ladders, one at the bow and one at the stern, making swim stops at sandbars simple, comfortable, and group-friendly.',
  },
  {
    icon: FaGasPump,
    title: 'Fuel Included',
    description: 'No hidden fees, fuel is included in every private cruise booking.',
  },
  {
    icon: FaLifeRing,
    title: 'Life Jackets Included',
    description: 'Safety-first experience with life jackets available for all guests.',
  },
  {
    icon: Shield,
    iconType: 'lucide' as const,
    title: 'Licensed & Insured',
    description: 'Operated by licensed captains for a safe and professional boating experience.',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-12 sm:py-16 md:py-20 px-4 bg-sand">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ocean mb-3 sm:mb-4">
              Premium Amenities on Your Private Cruise
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-2xl mx-auto px-4">
              Every boat comes fully equipped for the perfect day on the water
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <ScrollReveal key={index} delay={index * 0.1} className="h-full">
                <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group h-full">
                  {'iconType' in feature ? (
                    <Icon size={48} className="mb-5 sm:mb-6 text-teal" />
                  ) : (
                    <Icon size={48} color="#0891B2" className="mb-5 sm:mb-6" />
                  )}
                  <h3 className="text-lg sm:text-xl font-bold text-ocean mb-2 sm:mb-3">{feature.title}</h3>
                  <p className="text-gray-700 text-sm sm:text-base">{feature.description}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
