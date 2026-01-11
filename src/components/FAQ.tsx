import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faqs } from '../data/mockData';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-12 sm:py-16 md:py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ocean mb-3 sm:mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-ocean/70 px-4">
            Everything you need to know before booking
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border-2 border-ocean/10 rounded-xl overflow-hidden hover:border-coral/30 transition-colors duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between text-left hover:bg-sand/20 transition-colors duration-300 min-h-[44px]"
              >
                <span className="font-semibold text-ocean text-base sm:text-lg pr-4 sm:pr-8">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 sm:w-6 sm:h-6 text-coral flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-4 sm:px-6 pb-4 sm:pb-5 text-ocean/70 leading-relaxed text-sm sm:text-base">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 sm:mt-10 md:mt-12 bg-coral/10 border-2 border-coral rounded-2xl p-6 sm:p-8 text-center">
          <h3 className="text-xl sm:text-2xl font-bold text-ocean mb-3">Still have questions?</h3>
          <p className="text-ocean/70 mb-5 sm:mb-6 text-sm sm:text-base px-4">
            Our team is here to help! Contact us anytime for personalized assistance.
          </p>
          <a
            href="#booking"
            className="inline-block bg-coral hover:bg-coral/90 text-white px-6 sm:px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 text-base sm:text-base min-h-[44px] flex items-center justify-center mx-auto"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}
