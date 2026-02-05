import { MapPin, CheckCircle, Users } from 'lucide-react';
import { routes } from '../data/mockData';
import ScrollReveal from './ScrollReveal';

export default function Routes() {
  const bookingUrl = '/#booking';

  const handleRouteClick = () => {
    if (window.location.pathname === '/') {
      const modalOpener = (window as { openBookingModal?: () => void }).openBookingModal;
      const bookingSection = document.getElementById('booking');
      bookingSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (modalOpener) {
        modalOpener();
      } else {
        window.location.hash = '';
        window.location.hash = 'booking';
      }
      return;
    }
    sessionStorage.setItem('open-booking-modal', 'true');
    window.location.href = bookingUrl;
  };

  return (
    <section id="routes" className="py-12 sm:py-16 md:py-20 px-4 bg-sand">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ocean mb-3 sm:mb-4">
              Popular Destinations
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-2xl mx-auto px-4">
              Explore Fort Lauderdale's most stunning waterways and iconic locations
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {routes.map((route, index) => (
            <ScrollReveal key={route.id} delay={index * 0.1} className="h-full">
              <div
                onClick={() => handleRouteClick(route.name)}
                className="glass-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group border border-ocean/10 cursor-pointer h-full"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={route.image}
                    alt={route.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
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
                      {route.highlights.map((highlight, highlightIndex) => (
                        <div key={highlightIndex} className="flex items-center gap-2 text-gray-700">
                          <CheckCircle className="w-4 h-4 text-teal flex-shrink-0" />
                          <span className="text-xs sm:text-sm">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <a
                    href={bookingUrl}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.location.pathname === '/') {
                        e.preventDefault();
                        const modalOpener = (window as { openBookingModal?: () => void }).openBookingModal;
                        const bookingSection = document.getElementById('booking');
                        bookingSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        if (modalOpener) {
                          modalOpener();
                        } else {
                          window.location.hash = '';
                          window.location.hash = 'booking';
                        }
                      } else {
                        sessionStorage.setItem('open-booking-modal', 'true');
                      }
                    }}
                    className="w-full bg-coral hover:bg-coral/90 text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg text-base min-h-[44px] flex items-center justify-center magnetic-btn"
                    data-magnetic
                  >
                    View Details & Book
                  </a>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
