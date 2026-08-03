import { Anchor, MapPin, Phone, Mail, Clock, Facebook, Instagram, MessageSquare, Music } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const scrollToSectionWithOffset = (selector: string, offset = 80) => {
    const element = document.querySelector(selector);
    if (!element) return;
    const top = element.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      if (isHomePage) {
        scrollToSectionWithOffset(href);
      } else {
        window.location.href = `/${href}`;
      }
    }
  };

  return (
    <footer className="bg-ocean text-white">
      <div className="max-w-7xl mx-auto px-4 py-10 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-8 sm:mb-10 md:mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <Anchor className="w-7 h-7 sm:w-8 sm:h-8 text-coral" />
              <span className="text-xl sm:text-2xl font-bold">Tiki Taco</span>
            </div>
            <p className="text-white/80 mb-4 sm:mb-6 text-sm sm:text-base">
              Experience the ultimate Fort Lauderdale boating adventure with our premium pontoon rentals from The Hilton Marina.
            </p>
            <div className="flex gap-3 sm:gap-4">
              <a
                href="https://www.facebook.com/share/19xpKXTBBG/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-10 sm:h-10 bg-white/10 hover:bg-coral rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 min-h-[44px] min-w-[44px]"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/tikitacocruises?igsh=MWFjNXNtYXM4MHRmNg%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-10 sm:h-10 bg-white/10 hover:bg-coral rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 min-h-[44px] min-w-[44px]"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/19547644344"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-10 sm:h-10 bg-white/10 hover:bg-coral rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 min-h-[44px] min-w-[44px]"
                aria-label="WhatsApp"
              >
                <MessageSquare className="w-5 h-5" />
              </a>
              <a
                href="https://www.tiktok.com/@tikitacocruises"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-10 sm:h-10 bg-white/10 hover:bg-coral rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 min-h-[44px] min-w-[44px]"
                aria-label="TikTok"
              >
                <Music className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <p className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Quick Links</p>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link
                  to="/cruise-destinations/"
                  className="text-teal hover:text-coral transition-colors text-sm sm:text-base block py-1 min-h-[44px] flex items-center"
                >
                  Popular Cruises
                </Link>
              </li>
              <li>
                <Link
                  to="/gallery/"
                  className="text-teal hover:text-coral transition-colors text-sm sm:text-base block py-1 min-h-[44px] flex items-center"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  to="/faq/"
                  onClick={() => {
                    if (location.pathname === '/faq/') {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  className="text-teal hover:text-coral transition-colors text-sm sm:text-base block py-1 min-h-[44px] flex items-center"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/contact-us/"
                  className="text-teal hover:text-coral transition-colors text-sm sm:text-base block py-1 min-h-[44px] flex items-center"
                >
                  Contact
                </Link>
              </li>
              {[
                { href: '#features', label: 'Amenities' },
                { href: '#testimonials', label: 'Reviews' }
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-teal hover:text-coral transition-colors text-sm sm:text-base block py-1 min-h-[44px] flex items-center"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Contact Info</p>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-coral flex-shrink-0 mt-1" />
                <span className="text-white/80 text-sm sm:text-base">
                  The Hilton Marina<br />
                  1881 SE 17th St<br />
                  Fort Lauderdale, FL 33316
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-coral flex-shrink-0" />
                <a href="tel:+19547644344" suppressHydrationWarning className="text-teal hover:text-coral transition-colors text-sm sm:text-base min-h-[44px] flex items-center">
                  <span className="cr-number" suppressHydrationWarning>(954) 764-4344</span>
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-coral flex-shrink-0" />
                <a href="mailto:Tikitacocruises@gmail.com" className="text-teal hover:text-coral transition-colors text-xs sm:text-sm break-all min-h-[44px] flex items-center">
                  Tikitacocruises@gmail.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Business Hours</p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-coral flex-shrink-0 mt-1" />
                <div className="text-white/80 text-sm sm:text-base">
                  <p className="font-semibold">Monday - Sunday</p>
                  <p>8:00 AM - 8:00 PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-6 sm:pt-8 pb-24 md:pb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-4 text-xs sm:text-sm text-center md:text-left">
            <div className="md:flex-1 order-3 md:order-1">
              <p className="text-white/60">
                {currentYear} Tiki Taco. All rights reserved.
              </p>
            </div>
            <p id="footer-bottom" className="text-white/40 text-center order-2">
              Website powered by{' '}
              <a
                href="https://ai-genda.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal hover:text-coral transition-colors font-medium"
              >
                ai-genda.com
              </a>
            </p>
            <div className="md:flex-1 flex flex-wrap justify-center md:justify-end gap-x-5 gap-y-2 sm:gap-x-6 text-white/60 order-1 md:order-3">
              <Link to="/privacy-policy/" className="text-teal hover:text-coral transition-colors whitespace-nowrap">Privacy Policy</Link>
              <Link to="/terms-of-service/" className="text-teal hover:text-coral transition-colors whitespace-nowrap">Terms of Service</Link>
              <Link to="/cancellation-policy/" className="text-teal hover:text-coral transition-colors whitespace-nowrap">Cancellation Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
