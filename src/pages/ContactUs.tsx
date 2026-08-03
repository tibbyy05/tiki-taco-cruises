import { Phone, Mail, MapPin, Clock, Facebook, Instagram, MessageSquare, Music } from 'lucide-react';
import SEO from '../components/SEO';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const MAP_EMBED_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3582.892963639084!2d-80.12278532393849!3d26.102412477139588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80ab96de1f60856b%3A0xf7b83ebff1272e6!2sTiki%20Taco%20Cruises!5e0!3m2!1sen!2sus!4v1781679173728!5m2!1sen!2sus';

const socials = [
  {
    href: 'https://www.facebook.com/share/19xpKXTBBG/?mibextid=wwXIfr',
    label: 'Facebook',
    Icon: Facebook,
  },
  {
    href: 'https://www.instagram.com/tikitacocruises?igsh=MWFjNXNtYXM4MHRmNg%3D%3D&utm_source=qr',
    label: 'Instagram',
    Icon: Instagram,
  },
  {
    href: 'https://www.tiktok.com/@tikitacocruises',
    label: 'TikTok',
    Icon: Music,
  },
  {
    href: 'https://wa.me/19547644344',
    label: 'WhatsApp',
    Icon: MessageSquare,
  },
];

export default function ContactUs() {
  return (
    <>
      <SEO
        title="Contact Tiki Taco Cruises | Fort Lauderdale Pontoon Charters"
        description="Get in touch with Tiki Taco Cruises in Fort Lauderdale. Call, email, or message us about private tiki boat cruises, charters, and booking availability."
      />
      <div className="min-h-screen">
        <Navigation />

        <section className="pt-36 sm:pt-40 md:pt-44 lg:pt-40 pb-10 sm:pb-12 md:pb-16 px-4 bg-sand">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ocean mb-4 sm:mb-6">
              Contact Us
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
              Have questions about our tiki boat cruises, private charters, or booking availability? Contact Tiki Taco Cruises and our team will help you plan your Fort Lauderdale cruise experience.
            </p>
          </div>
        </section>

        <section className="px-4 py-12 sm:py-16 md:py-20 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              <div className="bg-sand rounded-2xl p-6 sm:p-8 shadow-lg">
                <h2 className="text-xl sm:text-2xl font-bold text-ocean mb-6">Tiki Taco Cruises</h2>

                <ul className="space-y-4 mb-6">
                  <li className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-coral flex-shrink-0 mt-1" />
                    <a
                      href="tel:+19547644344" suppressHydrationWarning
                      className="text-gray-700 hover:text-coral transition-colors text-base sm:text-lg"
                    >
                      <span className="cr-number" suppressHydrationWarning>(954) 764-4344</span>
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-coral flex-shrink-0 mt-1" />
                    <a
                      href="mailto:Tikitacocruises@gmail.com"
                      className="text-gray-700 hover:text-coral transition-colors text-base sm:text-lg break-all"
                    >
                      Tikitacocruises@gmail.com
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-coral flex-shrink-0 mt-1" />
                    <a
                      href="https://www.google.com/maps?cid=1115630382324282086"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-coral transition-colors text-base sm:text-lg"
                    >
                      1881 SE 17th St<br />
                      Fort Lauderdale, FL 33316
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-coral flex-shrink-0 mt-1" />
                    <div className="text-gray-700 text-base sm:text-lg">
                      <p className="font-semibold">Monday &ndash; Sunday</p>
                      <p>8:00 AM &ndash; 8:00 PM</p>
                    </div>
                  </li>
                </ul>

                <div className="mb-6">
                  <p className="text-sm font-semibold text-ocean mb-3 uppercase tracking-wide">Follow us</p>
                  <div className="flex gap-3">
                    {socials.map(({ href, label, Icon }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="w-11 h-11 bg-ocean/10 hover:bg-coral hover:text-white text-ocean rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </div>

                <a
                  href="/#booking"
                  data-gtm-id="booking-calendar"
                  className="inline-flex items-center justify-center bg-coral hover:bg-coral/90 text-white px-6 py-3 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl min-h-[44px] w-full sm:w-auto"
                >
                  Booking Calendar
                </a>
              </div>

              <div className="w-full">
                <div className="rounded-2xl overflow-hidden shadow-lg h-[300px] sm:h-[400px] lg:h-[500px]">
                  <iframe
                    title="Tiki Taco Cruises location in Fort Lauderdale"
                    src={MAP_EMBED_SRC}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
