import SEO from '../components/SEO';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import Routes from '../components/Routes';
import Gallery from '../components/Gallery';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import SquareBooking from '../components/SquareBooking';
import Footer from '../components/Footer';
import ScrollReveal from '../components/ScrollReveal';
import LocationSection from '../components/LocationSection';
import RecentReviews from '../components/RecentReviews';

export default function Home() {
  return (
    <div className="min-h-screen">
      <SEO
        title="Fort Lauderdale Pontoon Boat Rental & Tiki Cruises | Tiki Taco Cruises"
        description="Private pontoon boat rentals and tiki cruises in Fort Lauderdale. Cruise the Intracoastal, visit sandbars, and enjoy premium amenities with a USCG-licensed captain."
      />
      <Navigation />
      <Hero />
      <Routes />
      <ScrollReveal>
        <Gallery />
      </ScrollReveal>
      <Features />
      <Testimonials />
      <ScrollReveal>
        <RecentReviews />
      </ScrollReveal>
      <ScrollReveal>
        <SquareBooking />
      </ScrollReveal>
      <LocationSection />
      <Footer />
    </div>
  );
}

