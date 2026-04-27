import { Link } from 'react-router-dom';
import { Check, ArrowRight, Mail } from 'lucide-react';
import SEO from '../../components/SEO';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

export default function FortLauderdaleSunsetCruise() {
  return (
    <>
      <SEO
        title="Sunset Cruise Coming Soon | Tiki Taco Cruises Fort Lauderdale"
        description="A 2-hour Fort Lauderdale sunset cruise is coming soon to Tiki Taco. Sign up to be notified, or book a longer private cruise today."
        noindex={true}
      />
      <div className="min-h-screen">
        <Navigation />

        {/* Hero */}
        <section className="relative min-h-[60vh] sm:min-h-[70vh] w-full overflow-hidden flex items-center">
          <div className="absolute inset-0">
            <img
              src="/fort-lauderdale-hero.jpg"
              alt="Fort Lauderdale sunset over the waterway"
              className="w-full h-full object-cover object-center"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
          </div>
          <div className="relative w-full flex items-center justify-center px-4 sm:px-6 pt-32 sm:pt-36 md:pt-28 pb-12 md:pb-16">
            <div className="text-center text-white max-w-3xl mx-auto">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
                Fort Lauderdale Sunset Cruise — Launching Soon
              </h1>
              <p className="text-lg sm:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                We're working on a brand-new 2-hour sunset cruise experience. In the meantime, explore our other Fort Lauderdale tiki cruise options below.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/cruise-destinations"
                  className="bg-coral hover:bg-coral/90 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 inline-flex items-center justify-center gap-2 min-h-[44px]"
                >
                  Explore Our Cruises <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="mailto:Tikitacocruises@gmail.com?subject=Sunset%20Cruise%20Notification"
                  className="border-2 border-white text-white hover:bg-white hover:text-ocean px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 inline-flex items-center justify-center gap-2 min-h-[44px]"
                >
                  <Mail className="w-5 h-5" /> Email Us to Be Notified
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* What to Expect Preview */}
        <section className="py-12 sm:py-16 md:py-20 px-4 bg-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-ocean mb-4">
              What to Expect
            </h2>
            <p className="text-ocean/70 text-lg mb-10">
              Here's a preview of what this cruise will offer when it launches.
            </p>
            <div className="space-y-4 max-w-lg mx-auto text-left">
              {[
                '2-hour morning or sunset cruise options',
                'Perfect for smaller groups & tighter schedules',
                'Scenic Intracoastal views with relaxed atmosphere',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 bg-sand/30 p-4 rounded-xl">
                  <Check className="w-5 h-5 text-coral flex-shrink-0 mt-0.5" />
                  <span className="text-ocean/80 text-base">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
