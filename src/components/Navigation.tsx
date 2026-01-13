import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: isHomePage ? '#home' : '/#home', label: 'Home', isHash: true },
    { href: '/destinations', label: 'Destinations', isHash: false },
    { href: '/gallery', label: 'Gallery', isHash: false },
    { href: isHomePage ? '#features' : '/#features', label: 'Amenities', isHash: true },
    { href: '/faq', label: 'FAQ', isHash: false }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isHash: boolean) => {
    if (isHash && isHomePage) {
      e.preventDefault();
      setIsMobileMenuOpen(false);
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth' });
    } else if (isHash && !isHomePage) {
      e.preventDefault();
      setIsMobileMenuOpen(false);
      window.location.href = href;
    } else if (!isHash) {
      // For non-hash links like /gallery, use Link navigation
      setIsMobileMenuOpen(false);
      // Let the default link behavior handle it
    } else {
      setIsMobileMenuOpen(false);
    }
  };

  const handleBookingClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (isHomePage) {
      const element = document.getElementById('booking');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // Navigate to home page and scroll to booking
      navigate('/');
      // Wait for navigation and element to be available
      const scrollToBooking = () => {
        const element = document.getElementById('booking');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          // Retry if element not found yet
          setTimeout(scrollToBooking, 50);
        }
      };
      setTimeout(scrollToBooking, 200);
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (isHomePage) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  };

  const navBackground = !isHomePage || isScrolled
    ? 'bg-ocean shadow-lg py-2'
    : 'bg-black/20 backdrop-blur-sm py-3';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBackground}`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <a
            href="#home"
            onClick={handleLogoClick}
            className="flex items-center"
          >
            <img
              src="/Logo_Blue_Transparent.png"
              alt="Tiki Taco"
              className="h-[3.5rem] sm:h-[4rem] md:h-[4.5rem] w-auto object-contain"
            />
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              link.isHash ? (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.isHash)}
                  className="font-medium transition-colors duration-300 hover:text-coral text-white"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-medium transition-colors duration-300 hover:text-coral text-white"
                >
                  {link.label}
                </Link>
              )
            ))}
            <button
              onClick={handleBookingClick}
              className="bg-coral hover:bg-coral/90 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 hover:scale-105 min-h-[44px] flex items-center"
            >
              Book Now
            </button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden min-h-[44px] min-w-[44px] flex items-center justify-center text-white"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'
        }`}>
          <div className="py-4 bg-white rounded-xl shadow-lg">
            {navLinks.map((link) => (
              link.isHash ? (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.isHash)}
                  className="block px-6 py-4 text-ocean hover:bg-sand/30 transition-colors min-h-[44px] flex items-center font-medium"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-6 py-4 text-ocean hover:bg-sand/30 transition-colors min-h-[44px] flex items-center font-medium"
                >
                  {link.label}
                </Link>
              )
            ))}
            <button
              onClick={handleBookingClick}
              className="block mx-6 mt-2 text-center bg-coral hover:bg-coral/90 text-white px-6 py-4 rounded-full font-semibold min-h-[44px] flex items-center justify-center w-full"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
