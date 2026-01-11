import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import BookingCalendar from '../../components/BookingCalendar';
import { Clock, Users, Check, ArrowRight, ChevronRight } from 'lucide-react';

export default function SandbarParty() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToBooking = () => {
    const bookingSection = document.getElementById('booking');
    bookingSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const relatedRoutes = [
    {
      name: 'Las Olas & Intracoastal Cruise',
      url: '/routes/las-olas-cruise',
      duration: '3 Hours',
      price: '$1,200',
      image: '/Night_Intracoastal2.jpg'
    },
    {
      name: 'Intracoastal Waterway Tour',
      url: '/routes/intracoastal-tour',
      duration: '4 Hours',
      price: '$1,500',
      image: 'https://vjiybpiuquttbaimywbt.supabase.co/storage/v1/object/public/pontoon/15.png'
    }
  ];

  const testimonials = [
    {
      text: "The sandbar party was absolutely incredible! We anchored with other boats, swam in the crystal-clear water, and had the best time. Our tiki pontoon was the perfect floating party base. Unforgettable experience!",
      name: "Jessica Martinez",
      rating: 5
    },
    {
      text: "Perfect for our bachelorette party! The sandbar is such a unique Fort Lauderdale experience. The water was beautiful, the atmosphere was amazing, and everyone had a blast. Highly recommend!",
      name: "Sarah Thompson",
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
            src="/Sandbar.png"
            alt="Fort Lauderdale Sandbar Party"
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
              Fort Lauderdale Sandbar Party
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-8">
              <div className="text-4xl sm:text-5xl font-bold text-coral">$1,500</div>
              <div className="flex items-center gap-2 text-lg sm:text-xl">
                <Users className="w-5 h-5" />
                <span>Up to 18 Guests</span>
              </div>
            </div>
            <button
              onClick={scrollToBooking}
              className="bg-coral hover:bg-coral/90 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl min-h-[44px]"
            >
              Book This Experience
            </button>
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
            <span className="text-ocean">Fort Lauderdale Sandbar Party</span>
          </div>
        </div>
      </div>

      {/* Overview Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ocean mb-6 sm:mb-8 text-center">
            The Ultimate Floating Party Destination
          </h2>
          <div className="prose prose-lg max-w-none text-ocean/80 space-y-4 text-base sm:text-lg leading-relaxed">
            <p>
              Experience Fort Lauderdale's legendary sandbar – the ultimate floating party destination! This 4-hour adventure takes you to the iconic sandbar where you'll anchor alongside other boaters in crystal-clear turquoise waters.
            </p>
            <p>
              Jump in, swim, float, and socialize in this unique party atmosphere. Our tiki pontoon becomes your floating home base complete with music, shade, and all the amenities you need for an unforgettable day on the water.
            </p>
            <p>
              Perfect for bachelorette parties, birthdays, corporate events, or just a fun day with friends. The sandbar offers a one-of-a-kind experience you won't find anywhere else!
            </p>
          </div>

          {/* Highlights */}
          <div className="mt-10 sm:mt-12 bg-ocean/5 rounded-2xl p-6 sm:p-8">
            <h3 className="text-2xl font-bold text-ocean mb-6">Highlights</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {['Popular sandbar destination', 'Crystal clear waters', 'Ideal for photos'].map((highlight, index) => (
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
              <div className="text-2xl sm:text-3xl font-bold text-coral mb-2">$1,500</div>
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
            Your 4-Hour Adventure
          </h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-coral rounded-full flex items-center justify-center text-white font-bold text-lg">1</div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-ocean mb-2">Hour 1: Departure & Cruise to Sandbar</h3>
                <p className="text-ocean/70 leading-relaxed">Depart from The Hilton Marina and enjoy a scenic cruise to Fort Lauderdale's famous sandbar. Take in the beautiful views as you make your way to this unique floating destination.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-coral rounded-full flex items-center justify-center text-white font-bold text-lg">2-3</div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-ocean mb-2">Hours 2-3: Sandbar Experience</h3>
                <p className="text-ocean/70 leading-relaxed">Anchor at the sandbar and enjoy the ultimate floating party experience! Swim in the crystal-clear turquoise waters, float on the water mat, socialize with other boaters, and make unforgettable memories. Your tiki pontoon provides the perfect home base with music, shade, and all amenities.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-coral rounded-full flex items-center justify-center text-white font-bold text-lg">4</div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-ocean mb-2">Hour 4: Return Journey</h3>
                <p className="text-ocean/70 leading-relaxed">After an amazing time at the sandbar, enjoy a relaxing cruise back to The Hilton Marina, taking in the beautiful Fort Lauderdale scenery along the way.</p>
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

      {/* Booking Section */}
      <section id="booking" className="scroll-mt-20">
        <BookingCalendar
          routeName="Fort Lauderdale Sandbar Party"
          routeDuration="4 Hours"
          basePrice={1500}
        />
      </section>

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
          <button
            onClick={scrollToBooking}
            className="w-full bg-coral hover:bg-coral/90 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 min-h-[44px]"
          >
            Book Now - $1,500
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
}

