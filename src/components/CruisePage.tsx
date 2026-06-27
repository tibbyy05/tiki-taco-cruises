/**
 * Reusable cruise page template. All cruise detail pages use this component.
 *
 * Usage:
 *   <CruisePage
 *     seo={{ title: "...", description: "..." }}
 *     hero={{ title: "...", subtitle: "...", backgroundImage: "/img.jpg" }}
 *     pricing={{ duration: "4 Hours", price: "$1,140", basePassengers: "Up to 12 Passengers", startTimes: ["10:00 AM", "2:00 PM"] }}
 *     whatToExpect={{ heading: "What to Expect", bullets: ["..."] }}
 *     sections={[{ heading: "...", subtext: "..." }]}
 *     gallery={{ heading: "Gallery", images: [{ src: "...", alt: "..." }] }}
 *     faqs={[{ question: "...", answer: "..." }]}
 *     relatedRoutes={[{ name: "...", path: "/...", description: "..." }]}
 *   />
 */
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Clock, Users, Check, ArrowRight, ChevronRight, ChevronDown } from 'lucide-react';
import SEO from './SEO';
import Navigation from './Navigation';
import Footer from './Footer';
import SquareBooking from './SquareBooking';

export interface CruisePageSEO {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  jsonLd?: Record<string, unknown>;
}

export interface CruisePageHero {
  title: string;
  subtitle: string;
  backgroundImage: string;
}

export interface CruisePagePricing {
  duration: string;
  price: string;
  basePassengers: string;
  additionalGuestPrice?: string;
  hourlyRate?: string;
  startTimes: string[];
}

export interface CruisePageSection {
  heading: string;
  subtext: string;
}

export interface CruisePageGallery {
  heading: string;
  images: Array<{ src: string; alt: string }>;
}

export interface CruisePageRelatedRoute {
  name: string;
  path: string;
  description: string;
  image?: string;
}

export interface CruisePageFAQ {
  question: string;
  answer: string;
}

export interface CruisePageTestimonial {
  text: string;
  name: string;
  rating: number;
}

export interface CruisePageItineraryStep {
  label: string;
  heading: string;
  description: string;
}

export interface CruisePageProps {
  seo: CruisePageSEO;
  hero: CruisePageHero;
  pricing: CruisePagePricing;
  highlights?: string[];
  includedItems?: string[];
  itinerary?: { heading: string; steps: CruisePageItineraryStep[] };
  whatToExpect?: { heading: string; bullets: string[] };
  sections?: CruisePageSection[];
  testimonials?: CruisePageTestimonial[];
  gallery?: CruisePageGallery;
  faqs?: CruisePageFAQ[];
  faqHeading?: string;
  relatedRoutes?: CruisePageRelatedRoute[];
}

export default function CruisePage({
  seo,
  hero,
  pricing,
  highlights,
  includedItems,
  itinerary,
  whatToExpect,
  sections,
  testimonials,
  gallery,
  faqs,
  faqHeading = 'Frequently Asked Questions',
  relatedRoutes,
}: CruisePageProps) {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      <SEO {...seo} />
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] sm:min-h-[80vh] w-full overflow-hidden flex items-center">
        <div className="absolute inset-0">
          <img
            src={hero.backgroundImage}
            alt={hero.title}
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>
        <div className="relative w-full flex items-center justify-center px-4 sm:px-6 pt-32 sm:pt-36 md:pt-28 pb-12 md:pb-0">
          <div className="text-center text-white max-w-4xl mx-auto w-full">
            <div className="inline-flex items-center gap-2 bg-coral/90 backdrop-blur-sm px-4 py-2 rounded-full mb-4 text-sm sm:text-base">
              <Clock className="w-4 h-4" />
              <span>{pricing.duration}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 tracking-tight leading-tight">
              {hero.title}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-8">
              <div className="text-4xl sm:text-5xl font-bold text-coral price-text">{pricing.price}</div>
              <div className="flex items-center gap-2 text-lg sm:text-xl">
                <Users className="w-5 h-5" />
                <span>{pricing.basePassengers}</span>
              </div>
            </div>
            <a
              href="/#booking"
              className="bg-coral hover:bg-coral/90 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl min-h-[44px]"
              data-gtm-id="book-now"
            >
              Book Now
            </a>
          </div>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="bg-sand/30 py-3 px-4">
        <div className="max-w-7xl mx-auto text-sm text-ocean/70">
          <div className="flex items-center gap-2">
            <Link to="/" className="hover:text-coral transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/cruise-destinations" className="hover:text-coral transition-colors">Cruises</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-ocean">{hero.title}</span>
          </div>
        </div>
      </div>

      {/* Quick Summary */}
      <section className="py-6 sm:py-8 px-4 bg-white border-b border-ocean/10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-sand/40 rounded-xl p-4">
            <div className="text-sm text-ocean/70">Duration</div>
            <div className="text-xl font-bold text-ocean">{pricing.duration}</div>
          </div>
          <div className="bg-sand/40 rounded-xl p-4">
            <div className="text-sm text-ocean/70">Guests</div>
            <div className="text-xl font-bold text-ocean">{pricing.basePassengers}</div>
          </div>
          <div className="bg-sand/40 rounded-xl p-4">
            <div className="text-sm text-ocean/70">Price</div>
            <div className="text-xl font-bold text-coral price-text">{pricing.price}</div>
          </div>
        </div>
        {(pricing.additionalGuestPrice || pricing.hourlyRate || pricing.startTimes.length > 0) && (
          <div className="max-w-5xl mx-auto mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-sm text-ocean/70">
            {pricing.additionalGuestPrice && (
              <div className="bg-sand/40 rounded-xl p-3">
                <span className="font-semibold text-ocean">{pricing.additionalGuestPrice}</span> per additional guest
              </div>
            )}
            {pricing.hourlyRate && (
              <div className="bg-sand/40 rounded-xl p-3">
                <span className="font-semibold text-ocean">{pricing.hourlyRate}</span> per hour
              </div>
            )}
            {pricing.startTimes.length > 0 && (
              <div className="bg-sand/40 rounded-xl p-3">
                Start times: <span className="font-semibold text-ocean">{pricing.startTimes.join(' or ')}</span>
              </div>
            )}
          </div>
        )}
        <div className="max-w-5xl mx-auto mt-4 flex flex-wrap justify-center gap-3 text-sm text-ocean/70">
          <span className="bg-white rounded-full px-4 py-1">USCG Captain</span>
          <span className="bg-white rounded-full px-4 py-1">Fuel Included</span>
          <span className="bg-white rounded-full px-4 py-1">Cooler & Ice</span>
        </div>
      </section>

      {/* Overview / Sections */}
      {sections && sections.length > 0 && (
        <section className="py-12 sm:py-16 md:py-20 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            {sections.map((section, index) => (
              <div key={index} className={index > 0 ? 'mt-12' : ''}>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ocean mb-6 sm:mb-8 text-center">
                  {section.heading}
                </h2>
                <div className="prose prose-lg max-w-none text-ocean/80 space-y-4 text-base sm:text-lg leading-relaxed">
                  {section.subtext.split('\n\n').map((paragraph, pi) => (
                    <p key={pi}>{paragraph}</p>
                  ))}
                </div>
              </div>
            ))}

            {/* Highlights */}
            {highlights && highlights.length > 0 && (
              <div className="mt-10 sm:mt-12 bg-ocean/5 rounded-2xl p-6 sm:p-8">
                <h3 className="text-2xl font-bold text-ocean mb-6">Highlights</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-coral flex-shrink-0 mt-1" />
                      <span className="text-ocean/80 text-base">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pricing Badge */}
            <div className="mt-8 text-center">
              <div className="inline-block bg-coral/10 border-2 border-coral rounded-xl px-6 py-4">
                <div className="text-2xl sm:text-3xl font-bold text-coral mb-2 price-text">{pricing.price}</div>
                <div className="text-ocean/70 text-sm sm:text-base">
                  {pricing.duration} | {pricing.basePassengers}
                  {pricing.additionalGuestPrice && ` | +${pricing.additionalGuestPrice} per extra guest`}
                </div>
                {pricing.hourlyRate && (
                  <div className="text-ocean/60 text-sm mt-1">{pricing.hourlyRate}/hr</div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* What to Expect */}
      {whatToExpect && whatToExpect.bullets.length > 0 && (
        <section className="py-12 sm:py-16 md:py-20 px-4 bg-gradient-to-b from-white to-sand/20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-ocean mb-8 sm:mb-12 text-center">
              {whatToExpect.heading}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {whatToExpect.bullets.map((item, index) => (
                <div key={index} className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm">
                  <Check className="w-5 h-5 text-coral flex-shrink-0 mt-0.5" />
                  <span className="text-ocean/80 text-base">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Itinerary */}
      {itinerary && itinerary.steps.length > 0 && (
        <section className="py-12 sm:py-16 md:py-20 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-ocean mb-8 sm:mb-12 text-center">
              {itinerary.heading}
            </h2>
            <div className="space-y-6">
              {itinerary.steps.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-coral rounded-full flex items-center justify-center text-white font-bold text-lg">{step.label}</div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-ocean mb-2">{step.heading}</h3>
                    <p className="text-ocean/70 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials && testimonials.length > 0 && (
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
                      <span key={i} className="text-coral text-xl">&#9733;</span>
                    ))}
                  </div>
                  <p className="text-ocean/80 text-lg mb-4 italic">&ldquo;{testimonial.text}&rdquo;</p>
                  <p className="font-bold text-ocean">&mdash; {testimonial.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      {gallery && gallery.images.length > 0 && (
        <section className="py-12 sm:py-16 md:py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-ocean mb-8 sm:mb-12 text-center">
              {gallery.heading}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {gallery.images.map((img, index) => (
                <div key={index} className="rounded-xl overflow-hidden shadow-md">
                  <img src={img.src} alt={img.alt} className="w-full h-56 object-cover" loading="lazy" decoding="async" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <SquareBooking />

      {/* FAQ */}
      {faqs && faqs.length > 0 && (
        <section className="py-12 sm:py-16 md:py-20 px-4 bg-sand">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-ocean mb-8 sm:mb-12 text-center">
              {faqHeading}
            </h2>
            <div className="space-y-3 sm:space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white border-2 border-ocean/10 rounded-xl overflow-hidden hover:border-coral/30 transition-colors duration-300">
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                    className="w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between text-left hover:bg-sand/20 transition-colors duration-300 min-h-[44px]"
                  >
                    <span className="font-semibold text-ocean text-base sm:text-lg pr-4 sm:pr-8">{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 sm:w-6 sm:h-6 text-coral flex-shrink-0 transition-transform duration-300 ${openFaqIndex === index ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openFaqIndex === index ? 'max-h-96' : 'max-h-0'}`}>
                    <div className="px-4 sm:px-6 pb-4 sm:pb-5 text-gray-700 leading-relaxed text-sm sm:text-base">{faq.answer}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Routes */}
      {relatedRoutes && relatedRoutes.length > 0 && (
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
                  onClick={() => navigate(route.path)}
                >
                  {route.image && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={route.image}
                        alt={route.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-ocean mb-2">{route.name}</h3>
                    <p className="text-ocean/70 text-sm mb-4">{route.description}</p>
                    <button
                      onClick={(e) => { e.stopPropagation(); navigate(route.path); }}
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
      )}

      {/* Sticky Book Now Button (Mobile) */}
      {isScrolled && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl z-40 md:hidden p-4 border-t border-ocean/10">
          <a
            href="/#booking"
            className="w-full bg-coral hover:bg-coral/90 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 min-h-[44px] flex items-center justify-center"
            data-gtm-id="book-now"
          >
            Book Now
          </a>
        </div>
      )}

      <Footer />
    </div>
  );
}
