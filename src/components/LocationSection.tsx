export default function LocationSection() {
  const mapsUrl =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3582.892963639084!2d-80.12278532393849!3d26.102412477139588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80ab96de1f60856b%3A0xf7b83ebff1272e6!2sTiki%20Taco%20Cruises!5e0!3m2!1sen!2sus!4v1781679173728!5m2!1sen!2sus';
  const gbpUrl = 'https://www.google.com/maps?cid=1115630382324282086';

  return (
    <section className="bg-sand px-4 py-12 sm:py-16 md:py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ocean mb-3 sm:mb-4">
            Visit us in Fort Lauderdale
          </h2>
          <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto">
            Conveniently located at the Hilton Marina, your starting point for exploring Fort Lauderdale by boat.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg">
            <h3 className="text-xl sm:text-2xl font-bold text-ocean mb-4">Tiki Taco Cruises</h3>
            <a
              href={gbpUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-coral text-base sm:text-lg mb-4 block transition-colors"
            >
              <span className="block mb-1">1881 SE 17th St</span>
              <span className="block">Fort Lauderdale, FL 33316</span>
            </a>
            <p className="mb-4">
              <a
                href="tel:+19547644344"
                className="text-coral hover:text-coral/80 font-semibold text-base sm:text-lg transition-colors"
              >
                (954) 764-4344
              </a>
            </p>
            <p className="text-gray-700 text-base sm:text-lg mb-6">
              Hours: Daily 8:00 AM – 8:00 PM
            </p>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=1881%20SE%2017th%20St%2C%20Fort%20Lauderdale%2C%20FL%2033316"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-coral hover:bg-coral/90 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
            >
              Get Directions
            </a>
          </div>

          <div className="w-full">
            <div className="rounded-2xl overflow-hidden shadow-lg h-[250px] sm:h-[300px] lg:h-[350px]">
              <iframe
                title="Tiki Taco Cruises location in Fort Lauderdale"
                src={mapsUrl}
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
  );
}
