import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const cruisesSubmenu = [
  { to: '/cruise-destinations', label: 'All Cruise Destinations', highlight: true },
  { to: '/new-river-cruise', label: 'New River Historic Cruise' },
  { to: '/north-bound-scenic-cruise', label: 'Northbound Sandbar & Scenic Cruise' },
  { to: '/las-olas-boat-tour', label: 'Las Olas & Intracoastal Party Cruise' },
  { to: '/intracoastal-waterway-corporate-cruise', label: 'Corporate & Private Event Cruise' },
  { to: '/fort-lauderdale-sunset-cruise', label: '2-Hour Morning & Sunset Cruises' },
];

export default function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileCruisesOpen, setIsMobileCruisesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) setIsMobileCruisesOpen(false);
  }, [isMobileMenuOpen]);

  const navLinks = [
    { href: isHomePage ? '#home' : '/#home', label: 'Home', isHash: true },
    { href: '/cruise-destinations', label: 'Cruises', isHash: false },
    { href: '/gallery', label: 'Gallery', isHash: false },
    { href: '/blog', label: 'Blog', isHash: false },
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
      const hash = href.split('#')[1];
      navigate('/');
      const scrollToHash = () => {
        const element = hash ? document.getElementById(hash) : null;
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          setTimeout(scrollToHash, 50);
        }
      };
      setTimeout(scrollToHash, 200);
    } else if (!isHash) {
      // For non-hash links like /gallery, use Link navigation
      setIsMobileMenuOpen(false);
      // Let the default link behavior handle it
    } else {
      setIsMobileMenuOpen(false);
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

  const handleBookingClick = () => {
    setIsMobileMenuOpen(false);
    if (isHomePage) {
      const bookingSection = document.getElementById('booking');
      bookingSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.dispatchEvent(new CustomEvent('open-booking-modal'));
      const modalOpener = (window as { openBookingModal?: () => void }).openBookingModal;
      modalOpener?.();
      if (!bookingSection && window.location.hash !== '#booking') {
        window.location.hash = 'booking';
      }
      return;
    }
    sessionStorage.setItem('open-booking-modal', 'true');
    window.location.href = '/#booking';
  };

  const navBackground = !isHomePage || isScrolled
    ? 'bg-white/95 shadow-md py-[0.45rem]'
    : 'bg-transparent py-[0.6rem]';
  const navTextColor = !isHomePage || isScrolled ? 'text-ocean' : 'text-white';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBackground}`}
    >
      <div className="w-full px-3 lg:px-6">
        <div className="flex items-center justify-between gap-4">
          <a
            href="#home"
            onClick={handleLogoClick}
            className="flex items-center flex-shrink-0 lg:ml-12"
          >
            <div className="h-[4rem] sm:h-[4.56rem] md:h-[5.14rem] flex items-center overflow-visible">
              <img
                src="/tiki-taco-logo.png"
                alt="Tiki Taco"
                className="h-full w-auto object-contain scale-[1.05] origin-left"
              />
            </div>
          </a>

          <div className="hidden lg:flex flex-1 justify-center items-center gap-8 text-[1.155rem]">
            {navLinks.map((link) => {
              if (link.label === 'Cruises') {
                return (
                  <div key={link.href} className="relative group">
                    <Link
                      to="/cruise-destinations"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`font-medium transition-colors duration-300 hover:text-coral inline-flex items-center gap-1 ${navTextColor}`}
                      aria-haspopup="true"
                    >
                      {link.label}
                      <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
                    </Link>
                    <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 absolute left-1/2 -translate-x-1/2 top-full pt-3 transition-opacity duration-200 z-50">
                      <div className="bg-white rounded-xl shadow-2xl py-2 min-w-[300px] border border-ocean/5" role="menu">
                        {cruisesSubmenu.map((item) => (
                          <Link
                            key={item.to}
                            to={item.to}
                            role="menuitem"
                            className={`block px-4 py-2.5 text-base hover:bg-sand/30 hover:text-coral transition-colors ${item.highlight ? 'font-semibold text-ocean border-b border-ocean/10 mb-1 pb-3' : 'text-ocean/80'}`}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }
              return link.isHash ? (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.isHash)}
                  className={`font-medium transition-colors duration-300 hover:text-coral ${navTextColor}`}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`font-medium transition-colors duration-300 hover:text-coral ${navTextColor}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-5 flex-shrink-0 text-[1.155rem]">
            <a
              href="tel:+19547644344"
              className={`hidden xl:flex items-center gap-2 font-semibold transition-colors duration-300 hover:text-coral ${navTextColor}`}
            >
              (954) 764-4344
            </a>
            <button
              onClick={handleBookingClick}
              className="bg-coral hover:bg-coral/90 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 hover:scale-105 min-h-[44px] flex items-center magnetic-btn"
              data-magnetic
              data-gtm-id="book-now"
            >
              Book Now
            </button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden min-h-[44px] min-w-[44px] flex items-center justify-center ${navTextColor}`}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 h-[100svh] z-40 bg-white overflow-y-auto">
          <div className="pt-20 pb-4 text-[1.155rem]">
            {navLinks.map((link) => {
              if (link.label === 'Cruises') {
                return (
                  <div key={link.href}>
                    <button
                      onClick={() => setIsMobileCruisesOpen(!isMobileCruisesOpen)}
                      className="w-full px-6 py-2.5 text-ocean hover:bg-sand/30 transition-colors min-h-[44px] flex items-center justify-between font-medium"
                      aria-expanded={isMobileCruisesOpen}
                    >
                      <span>{link.label}</span>
                      <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isMobileCruisesOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isMobileCruisesOpen && (
                      <div className="bg-sand/10">
                        {cruisesSubmenu.map((item) => (
                          <Link
                            key={item.to}
                            to={item.to}
                            onClick={() => { setIsMobileMenuOpen(false); setIsMobileCruisesOpen(false); }}
                            className={`block pl-10 pr-6 py-2.5 hover:bg-sand/30 transition-colors min-h-[44px] flex items-center text-base ${item.highlight ? 'font-semibold text-ocean' : 'text-ocean/75'}`}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              return link.isHash ? (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.isHash)}
                  className="block px-6 py-2.5 text-ocean hover:bg-sand/30 transition-colors min-h-[44px] flex items-center font-medium"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-6 py-2.5 text-ocean hover:bg-sand/30 transition-colors min-h-[44px] flex items-center font-medium"
                >
                  {link.label}
                </Link>
              );
            })}
            <button
              onClick={handleBookingClick}
              className="block mx-6 mt-2 mb-4 text-center bg-coral hover:bg-coral/90 text-white px-6 py-3 rounded-full font-semibold min-h-[44px] flex items-center justify-center"
              data-gtm-id="book-now"
            >
              Book Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
