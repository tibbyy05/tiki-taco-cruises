import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import Routes from '../components/Routes';
import Gallery from '../components/Gallery';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import SquareBooking from '../components/SquareBooking';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Routes />
      <Gallery />
      <Features />
      <Testimonials />
      <SquareBooking />
      <Footer />
    </div>
  );
}

