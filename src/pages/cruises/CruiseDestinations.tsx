import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, MapPin, Users, Clock, Compass, Phone } from 'lucide-react';
import SEO from '../../components/SEO';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import SquareBooking from '../../components/SquareBooking';

interface CruiseCard {
  title: string;
  path: string;
  subtext: string;
  bullets: string[];
  duration: string;
  capacity: string;
  price: string;
}

const FOUR_HOUR_PRICING = {
  duration: '4 Hours',
  capacity: 'Up to 18 Guests',
  price: '$285/hour for up to 12 guests · +$60 per extra guest',
};

const featuredCruises: CruiseCard[] = [
  {
    title: 'Las Olas & Intracoastal Party Cruise',
    path: '/las-olas-boat-tour/',
    subtext: 'Luxury views with a social, high-energy vibe',
    bullets: ['Las Olas Boulevard views', 'Waterfront mansions & yachts', 'Perfect for parties & groups'],
    ...FOUR_HOUR_PRICING,
  },
  {
    title: 'Northbound Sandbar & Scenic Cruise',
    path: '/north-bound-scenic-cruise/',
    subtext: 'Swim, float, and relax at a Fort Lauderdale sandbar',
    bullets: ['Popular Fort Lauderdale sandbar stop', 'Swimming, floating & relaxing', 'Scenic Intracoastal views'],
    ...FOUR_HOUR_PRICING,
  },
  {
    title: 'Corporate & Private Event Cruise',
    path: '/intracoastal-waterway-corporate-cruise/',
    subtext: 'A unique setting for team outings and client events',
    bullets: ['Private, customizable experience', 'Great for team building or hosting', 'Relaxed, upscale environment'],
    ...FOUR_HOUR_PRICING,
  },
];

const allCruises: CruiseCard[] = [
  {
    title: 'New River Historic Cruise',
    path: '/new-river-cruise/',
    subtext: 'Cruise through the heart of Fort Lauderdale along the New River, passing historic landmarks, downtown views, and waterfront homes. This route is ideal for those looking for a more relaxed, scenic experience with a touch of local history.',
    bullets: ['Historic downtown Fort Lauderdale views', 'Waterfront homes & hidden canals', 'Calm, scenic cruising route', 'Great for sightseeing & photos'],
    ...FOUR_HOUR_PRICING,
  },
  {
    title: 'Northbound Sandbar & Scenic Cruise',
    path: '/north-bound-scenic-cruise/',
    subtext: "Head north along the Intracoastal for a mix of sightseeing and fun. This cruise often includes a stop at one of Fort Lauderdale's popular sandbars, making it perfect for swimming, relaxing, and socializing.",
    bullets: ['Popular Fort Lauderdale sandbar stop', 'Swimming, floating & relaxing', 'Scenic Intracoastal views', 'Social, laid-back atmosphere'],
    ...FOUR_HOUR_PRICING,
  },
  {
    title: 'Las Olas & Intracoastal Party Cruise',
    path: '/las-olas-boat-tour/',
    subtext: 'Take in iconic Las Olas views while enjoying a lively, social cruise experience. This route is popular for celebrations, group outings, and anyone looking to combine sightseeing with a party atmosphere.',
    bullets: ['Las Olas Boulevard views', 'Luxury yachts & waterfront estates', 'Perfect for groups & celebrations', 'Music, drinks & social vibe'],
    ...FOUR_HOUR_PRICING,
  },
  {
    title: 'Corporate & Private Event Cruise',
    path: '/intracoastal-waterway-corporate-cruise/',
    subtext: 'Host your next event on the water with a fully customizable cruise. Ideal for corporate outings, client entertainment, or private group gatherings.',
    bullets: ['Private, customizable experience', 'Great for team outings & events', 'Comfortable, upscale setting', 'Easy group planning'],
    ...FOUR_HOUR_PRICING,
  },
];

const whyChoose = [
  {
    icon: Compass,
    title: 'Routes Built for Every Vibe',
    text: 'From laid-back scenic cruises to high-energy party pontoons, each route is designed with a specific experience in mind.',
  },
  {
    icon: MapPin,
    title: 'Local Captains, Local Knowledge',
    text: 'Cruise with experienced captains who know the waterways, the best views, and the hidden spots worth seeing.',
  },
  {
    icon: Clock,
    title: 'Flexible Cruise Options',
    text: 'Choose from 2-hour quick trips or longer private cruises depending on your schedule and group size.',
  },
  {
    icon: Users,
    title: 'Easy Group Experiences',
    text: 'Perfect for everything from casual outings to celebrations, with options that make planning simple.',
  },
];

function CruiseCardComponent({ cruise }: { cruise: CruiseCard }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-full">
      <div className="p-6 sm:p-8 flex flex-col flex-1">
        <h3 className="text-xl sm:text-2xl font-bold text-ocean mb-2">{cruise.title}</h3>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-ocean/70 mb-2">
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-coral" />{cruise.duration}
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-coral" />{cruise.capacity}
          </span>
        </div>
        <p className="text-sm font-semibold text-ocean mb-3">{cruise.price}</p>
        <p className="text-ocean/70 mb-4 text-sm sm:text-base">{cruise.subtext}</p>
        <ul className="space-y-2 mb-6 flex-1">
          {cruise.bullets.map((bullet, i) => (
            <li key={i} className="flex items-start gap-2 text-ocean/80 text-sm sm:text-base">
              <Check className="w-4 h-4 text-coral flex-shrink-0 mt-1" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
        <Link
          to={cruise.path}
          className="w-full bg-coral hover:bg-coral/90 text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 min-h-[44px]"
          data-gtm-id="learn-more"
        >
          Learn More <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}

export default function CruiseDestinations() {
  return (
    <>
      <Navigation />

      <SEO
        title="Charter Cruise Destinations | Ft Lauderdale Tiki Boat"
        description="Explore Fort Lauderdale charter cruise destinations and offerings on a tiki boat, from scenic river tours to sandbar parties, corporate events, and sunset cruises."
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TouristAttraction",
            "name": "Fort Lauderdale Charter Cruise Destinations",
            "description": "Premium charter cruise destinations throughout Fort Lauderdale's waterways",
            "url": "https://tikitacocruises.com/cruise-destinations/",
            "provider": {
              "@type": "LocalBusiness",
              "name": "Tiki Taco",
              "telephone": "+1-954-764-4344",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "1881 SE 17th St",
                "addressLocality": "Fort Lauderdale",
                "addressRegion": "FL",
                "postalCode": "33316",
              },
            },
          })}
        </script>
      </Helmet>

      <div className="min-h-screen">
        {/* Hero */}
        <section className="relative min-h-[50vh] sm:min-h-[60vh] w-full overflow-hidden flex items-center">
          <div className="absolute inset-0">
            <img
              src="/Night_Intracoastal2.jpg"
              alt="Fort Lauderdale waterway at night"
              className="w-full h-full object-cover object-center"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
          </div>
          <div className="relative w-full flex items-center justify-center px-4 sm:px-6 pt-36 sm:pt-40 md:pt-44 lg:pt-36 pb-12 md:pb-16">
            <div className="text-center text-white max-w-4xl mx-auto">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tight leading-tight">
                Charter Cruise Destinations in Fort Lauderdale
              </h1>
              <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto">
                Explore Fort Lauderdale cruise destinations by tiki boat, from scenic waterways and sandbars to party cruises, private events, and sunset experiences.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Cruises */}
        <section className="py-12 sm:py-16 md:py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10 sm:mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ocean mb-4">
                Featured Charter Cruise Experiences
              </h2>
              <p className="text-ocean/70 text-lg max-w-3xl mx-auto">
                Our most popular Fort Lauderdale boat tours, designed for sightseeing, celebrating, and getting out on the water.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {featuredCruises.map((cruise, i) => (
                <CruiseCardComponent key={i} cruise={cruise} />
              ))}
            </div>
          </div>
        </section>

        {/* 2-Hour Morning & Sunset */}
        <section className="py-12 sm:py-16 md:py-20 px-4 bg-gradient-to-b from-sand/30 to-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="order-1 md:order-1">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5] md:aspect-auto md:h-full md:max-h-[560px]">
                  <img
                    src="/Sunset.jpeg"
                    alt="Fort Lauderdale Intracoastal Waterway and skyline at sunset"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="order-2 md:order-2">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ocean mb-3">
                  2-Hour Morning & Sunset Cruises
                </h2>
                <h3 className="text-xl sm:text-2xl text-ocean/80 mb-5 font-medium">
                  Short, scenic, and easy to fit into your day
                </h3>
                <p className="text-ocean/70 text-lg mb-6">
                  Enjoy a 2-hour cruise along the Intracoastal to either start your morning on the water or catch a Fort Lauderdale sunset.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    'Morning Cruise: 8:00 AM – 10:00 AM',
                    'Sunset Cruise: 6:00 PM – 8:00 PM',
                    '$60 per person (6-person minimum)',
                    'Great for smaller groups or tighter schedules',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-coral flex-shrink-0 mt-1" />
                      <span className="text-ocean/80 text-base">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/fort-lauderdale-sunset-cruise/"
                  className="bg-coral hover:bg-coral/90 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 inline-flex items-center gap-2 min-h-[44px]"
                  data-gtm-id="learn-more"
                >
                  Learn More <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section divider */}
        <div className="px-4 bg-white">
          <div className="flex items-center justify-center gap-4 max-w-md mx-auto py-2 sm:py-4">
            <div className="h-px flex-1 bg-ocean/15" />
            <div className="w-2 h-2 rounded-full bg-coral" />
            <div className="h-px flex-1 bg-ocean/15" />
          </div>
        </div>

        {/* All Cruise Destinations */}
        <section className="pt-6 sm:pt-8 md:pt-10 pb-12 sm:pb-16 md:pb-20 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10 sm:mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ocean mb-4">
                All Charter Cruise Destinations
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {allCruises.map((cruise, i) => (
                <CruiseCardComponent key={i} cruise={cruise} />
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose */}
        <section className="py-12 sm:py-16 md:py-20 px-4 bg-ocean text-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-10 sm:mb-14">
              Why Choose These Cruise Destinations?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyChoose.map((item, i) => (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 bg-white/15 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-white/80 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Book CTA */}
        <section className="py-12 sm:py-16 md:py-20 px-4 bg-gradient-to-b from-sand/30 to-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ocean mb-4">
              Ready to Explore Fort Lauderdale by Water?
            </h2>
            <p className="text-ocean/70 text-lg mb-8">
              If you're planning a relaxing cruise, a sandbar day, or a full-on celebration, there's a Fort Lauderdale cruise destination for you.
            </p>
            <a
              href="tel:+19547644344" suppressHydrationWarning
              className="calltrk-noswap bg-coral hover:bg-coral/90 text-white px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 inline-flex items-center gap-2 min-h-[44px] shadow-lg"
              data-gtm-id="call-to-book"
            >
              <Phone className="w-5 h-5" /> Call to Book — (954) 764-4344
            </a>
          </div>
        </section>

        <SquareBooking />

        {/* SEO Content */}
        <section className="py-12 sm:py-16 px-4 bg-sand/20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-ocean mb-6">
              Fort Lauderdale Pontoon Rental Destinations
            </h2>
            <div className="space-y-4 text-ocean/70 text-base leading-relaxed">
              <p>
                Tiki Taco offers the most comprehensive selection of pontoon rental destinations in Fort Lauderdale.
                Whether you're looking to cruise the famous Intracoastal Waterway, relax at pristine sandbars, or
                enjoy stunning sunset views along the coast, we have the perfect destination for your group.
              </p>
              <p>
                All our destinations depart from The Hilton Marina (1881 SE 17th St, Fort Lauderdale) and include
                a professional USCG Licensed Captain, premium amenities, fuel, and all safety equipment. With flexible
                2, 3, and 4-hour options, you can customize your Fort Lauderdale pontoon experience to match your
                preferences and budget.
              </p>
              <p>
                From the luxury estates of Las Olas to the crystal-clear waters of Fort Lauderdale's famous sandbar,
                each destination offers unique sights and unforgettable experiences. Our captains are local experts
                who know the best routes, hidden spots, and perfect timing for photos and wildlife sightings.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Placeholder */}
        <section className="py-12 sm:py-16 px-4 bg-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-ocean mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-ocean/70 text-lg mb-8">
              Find answers to common questions about our Fort Lauderdale tiki cruises.
            </p>
            <Link
              to="/faq/"
              className="bg-ocean hover:bg-ocean/90 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 inline-flex items-center gap-2 min-h-[44px]"
            >
              View All FAQs <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
