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

