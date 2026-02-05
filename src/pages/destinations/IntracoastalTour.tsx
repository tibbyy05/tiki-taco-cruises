import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import SquareBooking from '../../components/SquareBooking';
import { Clock, Users, Check, ArrowRight, ChevronRight } from 'lucide-react';

export default function IntracoastalTour() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const relatedRoutes = [
    {
      name: 'Las Olas & Intracoastal Cruise',
      url: '/routes/las-olas-cruise',
      duration: '3 Hours',
      price: '$1,200',
      image: '/Night_Intracoastal2.jpg'
    },
    {
      name: 'Fort Lauderdale Sandbar Party',
      url: '/routes/sandbar-party',
      duration: '4 Hours',
      price: '$1,500',
      image: '/Sandbar.png'
    }
  ];

  const testimonials = [
    {
      text: "The extended Intracoastal tour was perfect for our group! We had plenty of time to see luxury yachts, stunning waterfront mansions, and Port Everglades. The captain was great at pointing out landmarks and sharing local knowledge.",
      name: "Michael Johnson",
      rating: 5
    },
    {
      text: "Absolutely loved the 4-hour tour. The extra time allowed us to really take in all the sights, anchor at scenic spots, and relax. Fort Lauderdale's waterways are beautiful, and this tour showcases the best of them.",
      name: "Emily Davis",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-[70vh] sm:min-h-[80vh] w-full overflow-hidden flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://vjiybpiuquttbaimywbt.supabase.co/storage/v1/object/public/pontoon/15.png"
            alt="Intracoastal Waterway Tour"
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
        </div>

        <div className="relative w-full flex items-center justify-center px-4 sm:px-6 pt-32 sm:pt-36 md:pt-28 pb-12 md:pb-0">
          <div className="text-center text-white max-w-4xl mx-auto w-full">
            <div className="inline-flex items-center gap-2 bg-coral/90 backdrop-blur-sm px-4 py-2 rounded-full mb-4 text-sm sm:text-base">
              <Clock className="w-4 h-4" />
              <span>4 Hours</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 tracking-tight leading-tight">
              Intracoastal Waterway Tour
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-8">
            <div className="text-4xl sm:text-5xl font-bold text-coral price-text">$1,500</div>
              <div className="flex items-center gap-2 text-lg sm:text-xl">
                <Users className="w-5 h-5" />
                <span>Up to 18 Guests</span>
              </div>
            </div>
            <a
              href="/#booking"
              className="bg-coral hover:bg-coral/90 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl min-h-[44px]"
            >
              Book This Experience
            </a>
          </div>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="bg-sand/30 py-3 px-4">
        <div className="max-w-7xl mx-auto text-sm text-ocean/70">
          <div className="flex items-center gap-2">
            <a href="/" className="hover:text-coral transition-colors">Home</a>
            <ChevronRight className="w-4 h-4" />
            <a href="/#routes" className="hover:text-coral transition-colors">Routes</a>
            <ChevronRight className="w-4 h-4" />
            <span className="text-ocean">Intracoastal Waterway Tour</span>
          </div>
        </div>
      </div>

      {/* Quick Summary */}
      <section className="py-6 sm:py-8 px-4 bg-white border-b border-ocean/10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-sand/40 rounded-xl p-4">
            <div className="text-sm text-ocean/70">Duration</div>
            <div className="text-xl font-bold text-ocean">4 Hours</div>
          </div>
          <div className="bg-sand/40 rounded-xl p-4">
            <div className="text-sm text-ocean/70">Guests</div>
            <div className="text-xl font-bold text-ocean">Up to 18</div>
          </div>
          <div className="bg-sand/40 rounded-xl p-4">
            <div className="text-sm text-ocean/70">Price</div>
            <div className="text-xl font-bold text-coral price-text">$1,500</div>
          </div>
        </div>
        <div className="max-w-5xl mx-auto mt-4 flex flex-wrap justify-center gap-3 text-sm text-ocean/70">
          <span className="bg-white rounded-full px-4 py-1">USCG Captain</span>
          <span className="bg-white rounded-full px-4 py-1">Fuel Included</span>
          <span className="bg-white rounded-full px-4 py-1">Cooler & Ice</span>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ocean mb-6 sm:mb-8 text-center">
            Explore Fort Lauderdale's Most Scenic Waterways
          </h2>
          <div className="prose prose-lg max-w-none text-ocean/80 space-y-4 text-base sm:text-lg leading-relaxed">
            <p>
              Embark on an extended 4-hour journey through the beautiful Fort Lauderdale Intracoastal Waterway. This comprehensive tour takes you past luxury yachts, stunning waterfront mansions, and the scenic Port Everglades inlet.
            </p>
            <p>
              Experience the full beauty of Fort Lauderdale's interconnected waterways with extra time to take in the sights, swim, and relax. Your captain will share local knowledge about the area's history and point out celebrity homes and notable landmarks.
            </p>
            <p>
              This extended tour is perfect for those who want more time on the water, combining sightseeing with relaxation and the opportunity to anchor at scenic spots along the way.
            </p>
          </div>

          {/* Highlights */}
          <div className="mt-10 sm:mt-12 bg-ocean/5 rounded-2xl p-6 sm:p-8">
            <h3 className="text-2xl font-bold text-ocean mb-6">Highlights</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {['Luxury yachts', 'Waterfront mansions', 'Port Everglades views'].map((highlight, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-coral flex-shrink-0 mt-1" />
                  <span className="text-ocean/80 text-base">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Badge */}
          <div className="mt-8 text-center">
            <div className="inline-block bg-coral/10 border-2 border-coral rounded-xl px-6 py-4">
              <div className="text-2xl sm:text-3xl font-bold text-coral mb-2 price-text">$1,500</div>
              <div className="text-ocean/70 text-sm sm:text-base">4 Hours | Up to 18 Guests</div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-12 sm:py-16 md:py-20 px-4 bg-gradient-to-b from-white to-sand/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-ocean mb-8 sm:mb-12 text-center">
            Everything You Need for the Perfect Day
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {[
              'Professional USCG Licensed Captain',
              'All Fuel & Marina Fees',
              'Premium Bluetooth Sound System',
              'Large Cooler Stocked with Ice',
              'Bimini Top Shade Protection',
              'Safety Equipment & Life Jackets',
              'Floating Water Mat',
              'Cup Holders & Seating for 18',
              'USB Charging Ports',
              'Departure from The Hilton Marina'
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm">
                <Check className="w-5 h-5 text-coral flex-shrink-0 mt-0.5" />
                <span className="text-ocean/80 text-base">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Itinerary */}
      <section className="py-12 sm:py-16 md:py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-ocean mb-8 sm:mb-12 text-center">
            Your 4-Hour Journey
          </h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-coral rounded-full flex items-center justify-center text-white font-bold text-lg">1</div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-ocean mb-2">Hour 1: Departure & Cruise to Destination</h3>
                <p className="text-ocean/70 leading-relaxed">Depart from The Hilton Marina and begin your extended journey along the Intracoastal Waterway. Your captain will start sharing local knowledge about Fort Lauderdale's waterways and notable landmarks.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-coral rounded-full flex items-center justify-center text-white font-bold text-lg">2-3</div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-ocean mb-2">Hours 2-3: Main Experience & Scenic Stops</h3>
                <p className="text-ocean/70 leading-relaxed">Explore the full beauty of Fort Lauderdale's Intracoastal Waterway. See luxury yachts, stunning waterfront mansions, and Port Everglades. Your captain will point out celebrity homes and share historical insights. Take time to anchor at scenic spots, swim, and relax while taking in the breathtaking views.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-coral rounded-full flex items-center justify-center text-white font-bold text-lg">4</div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-ocean mb-2">Hour 4: Return Journey</h3>
                <p className="text-ocean/70 leading-relaxed">Enjoy a relaxing cruise back to The Hilton Marina, taking in any final sights and enjoying the beautiful Fort Lauderdale waterways on your return journey.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 sm:py-16 md:py-20 px-4 bg-gradient-to-b from-sand/20 to-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-ocean mb-8 sm:mb-12 text-center">
            What Our Guests Say
          </h2>
          <div className="space-y-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-coral text-xl">★</span>
                  ))}
                </div>
                <p className="text-ocean/80 text-lg mb-4 italic">"{testimonial.text}"</p>
                <p className="font-bold text-ocean">— {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SquareBooking />

      {/* Related Routes */}
      <section className="py-12 sm:py-16 md:py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-ocean mb-8 sm:mb-12 text-center">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {relatedRoutes.map((route, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                onClick={() => navigate(route.url)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={route.image}
                    alt={route.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-coral font-semibold">{route.duration}</span>
                    <span className="text-2xl font-bold text-ocean">{route.price}</span>
                  </div>
                  <h3 className="text-xl font-bold text-ocean mb-4">{route.name}</h3>
                  <button
                    onClick={() => navigate(route.url)}
                    className="w-full bg-ocean hover:bg-ocean/90 text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 min-h-[44px]"
                  >
                    View Details <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky Book Now Button (Mobile) */}
      {isScrolled && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl z-40 md:hidden p-4 border-t border-ocean/10">
          <a
            href="/#booking"
            className="w-full bg-coral hover:bg-coral/90 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 min-h-[44px] flex items-center justify-center"
          >
            Book Now - $1,500
          </a>
        </div>
      )}

      <Footer />
    </div>
  );
}

