import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page Not Found | Tiki Taco Cruises</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="min-h-screen">
        <Navigation />
        <section className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 bg-sand">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-ocean mb-4">
              404
            </h1>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-ocean mb-4">
              Page Not Found
            </h2>
            <p className="text-base sm:text-lg text-gray-700 mb-8 sm:mb-10 px-4">
              Looks like this page drifted out to sea. Let's get you back on course.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="bg-coral hover:bg-coral/90 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 min-h-[44px] flex items-center justify-center"
              >
                Back to Home
              </Link>
              <Link
                to="/destinations"
                className="bg-ocean hover:bg-ocean/90 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 min-h-[44px] flex items-center justify-center"
              >
                View Cruises
              </Link>
              <a
                href="mailto:Tikitacocruises@gmail.com"
                className="border-2 border-ocean text-ocean hover:bg-ocean hover:text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 min-h-[44px] flex items-center justify-center"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}
