import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import SEO from '../components/SEO';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const faqSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://tikitacocruises.com/#business",
      "name": "Tiki Taco Cruises",
      "alternateName": "Tiki Taco",
      "description": "Tiki Taco Cruises offers private tiki boat cruises, pontoon rentals, scenic boat tours, party cruises, sunset cruises, and corporate cruise experiences in Fort Lauderdale.",
      "url": "https://tikitacocruises.com/",
      "logo": "https://tikitacocruises.com/tiki-taco-logo.png",
      "image": [
        "https://tikitacocruises.com/Night_Intracoastal2.jpg"
      ],
      "telephone": "+1-954-764-4344",
      "email": "tikitacocruises@gmail.com",
      "priceRange": "$60-$1140",
      "hasMap": "https://www.google.com/maps?cid=1115630382324282086",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "1881 SE 17th St",
        "addressLocality": "Fort Lauderdale",
        "addressRegion": "FL",
        "postalCode": "33316",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 26.0998,
        "longitude": -80.1186
      },
      "areaServed": [
        {
          "@type": "City",
          "name": "Fort Lauderdale"
        },
        {
          "@type": "AdministrativeArea",
          "name": "Broward County"
        }
      ],
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
          ],
          "opens": "08:00",
          "closes": "20:00"
        }
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-954-764-4344",
        "email": "tikitacocruises@gmail.com",
        "contactType": "customer service",
        "areaServed": "US",
        "availableLanguage": "English"
      },
      "sameAs": [
        "https://www.instagram.com/tikitacocruises"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://tikitacocruises.com/#website",
      "url": "https://tikitacocruises.com/",
      "name": "Tiki Taco Cruises",
      "publisher": {
        "@id": "https://tikitacocruises.com/#business"
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://tikitacocruises.com/faq/#webpage",
      "url": "https://tikitacocruises.com/faq/",
      "name": "Fort Lauderdale Tiki Cruise FAQs",
      "headline": "Fort Lauderdale Tiki Cruise FAQs",
      "description": "Frequently asked questions about Tiki Taco Cruises, including cruise duration, pricing, start times, departure location, weather policy, pets, alcohol, and what to bring.",
      "isPartOf": {
        "@id": "https://tikitacocruises.com/#website"
      },
      "about": {
        "@id": "https://tikitacocruises.com/#business"
      },
      "publisher": {
        "@id": "https://tikitacocruises.com/#business"
      },
      "mainEntity": [
        {
          "@type": "Question",
          "@id": "https://tikitacocruises.com/faq/#question-how-long-are-the-cruises",
          "name": "How long are the cruises?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We offer both 2-hour and 4-hour cruise options. Choose a quick morning or sunset cruise, or book a longer private experience."
          }
        },
        {
          "@type": "Question",
          "@id": "https://tikitacocruises.com/faq/#question-what-does-a-4-hour-cruise-cost",
          "name": "What does a 4-hour cruise cost?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "4-hour cruises are $285 per hour for up to 12 passengers. Additional guests are $60 per person."
          }
        },
        {
          "@type": "Question",
          "@id": "https://tikitacocruises.com/faq/#question-what-does-a-2-hour-cruise-cost",
          "name": "What does a 2-hour cruise cost?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "2-hour morning and sunset cruises are $60 per person with a 6-person minimum."
          }
        },
        {
          "@type": "Question",
          "@id": "https://tikitacocruises.com/faq/#question-what-are-the-start-times",
          "name": "What are the start times?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "4-hour cruises start at 10:00 AM or 2:00 PM. 2-hour cruises run from 8:00\u201310:00 AM and 6:00\u20138:00 PM."
          }
        },
        {
          "@type": "Question",
          "@id": "https://tikitacocruises.com/faq/#question-what-should-we-bring",
          "name": "What should we bring?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Bring drinks, snacks, sunscreen, towels, and anything you'd like for your time on the water."
          }
        },
        {
          "@type": "Question",
          "@id": "https://tikitacocruises.com/faq/#question-can-we-bring-alcohol",
          "name": "Can we bring alcohol?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, you're welcome to bring your own drinks."
          }
        },
        {
          "@type": "Question",
          "@id": "https://tikitacocruises.com/faq/#question-is-this-a-private-cruise",
          "name": "Is this a private cruise?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, all cruises are private for your group."
          }
        },
        {
          "@type": "Question",
          "@id": "https://tikitacocruises.com/faq/#question-where-do-we-depart-from",
          "name": "Where do we depart from?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "All cruises depart from the Hilton Marina in Fort Lauderdale."
          }
        },
        {
          "@type": "Question",
          "@id": "https://tikitacocruises.com/faq/#question-what-happens-if-the-weather-is-bad",
          "name": "What happens if the weather is bad?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "If weather conditions are unsafe, you'll be able to reschedule your cruise."
          }
        },
        {
          "@type": "Question",
          "@id": "https://tikitacocruises.com/faq/#question-are-pets-allowed",
          "name": "Are pets allowed?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Well-behaved dogs are welcome. Please bring a leash and clean up after your pet. There is a $25 pet cleaning fee. Let us know in advance so we can prepare the boat accordingly."
          }
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://tikitacocruises.com/faq/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://tikitacocruises.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "FAQ",
          "item": "https://tikitacocruises.com/faq/"
        }
      ]
    }
  ]
};

const faqs = [
  {
    question: 'How long are the cruises?',
    answer: 'We offer both 2-hour and 4-hour cruise options. Choose a quick morning or sunset cruise, or book a longer private experience.',
  },
  {
    question: 'What does a 4-hour cruise cost?',
    answer: '4-hour cruises are $285 per hour for up to 12 passengers. Additional guests are $60 per person.',
  },
  {
    question: 'What does a 2-hour cruise cost?',
    answer: '2-hour morning and sunset cruises are $60 per person with a 6-person minimum.',
  },
  {
    question: 'What are the start times?',
    answer: '4-hour cruises start at 10:00 AM or 2:00 PM. 2-hour cruises run from 8:00–10:00 AM and 6:00–8:00 PM.',
  },
  {
    question: 'What should we bring?',
    answer: 'Bring drinks, snacks, sunscreen, towels, and anything you\'d like for your time on the water.',
  },
  {
    question: 'Can we bring alcohol?',
    answer: 'Yes, you\'re welcome to bring your own drinks.',
  },
  {
    question: 'Is this a private cruise?',
    answer: 'Yes, all cruises are private for your group.',
  },
  {
    question: 'Where do we depart from?',
    answer: 'All cruises depart from the Hilton Marina in Fort Lauderdale.',
  },
  {
    question: 'What happens if the weather is bad?',
    answer: 'If weather conditions are unsafe, you\'ll be able to reschedule your cruise.',
  },
  {
    question: 'Are pets allowed?',
    answer: 'Well-behaved dogs are welcome! Please bring a leash and clean up after your pet. There is a $25 pet cleaning fee. Let us know in advance so we can prepare the boat accordingly.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      <SEO
        title="Tiki Boat FAQs | Fort Lauderdale Cruise Questions"
        description="Find answers about Fort Lauderdale tiki boat pontoon cruises, including pricing, what to bring, policies, and booking details for your trip on the water!"
        jsonLd={faqSchema}
      />
      <div className="min-h-screen">
        <Navigation />
        <section className="pt-36 sm:pt-40 md:pt-44 lg:pt-40 pb-12 sm:pb-16 md:pb-20 px-4 bg-sand">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10 sm:mb-12 md:mb-16">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ocean mb-3 sm:mb-4">
                Fort Lauderdale Tiki Cruise FAQs
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 px-4">
                Everything you need to know before booking your private cruise with Tiki Taco Pontoon Rental
              </p>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-ocean mb-6 sm:mb-8 text-center">
              Frequently Asked Questions
            </h2>

            <div className="space-y-3 sm:space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white border-2 border-ocean/10 rounded-xl overflow-hidden hover:border-coral/30 transition-colors duration-300"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
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
                    <div className="px-4 sm:px-6 pb-4 sm:pb-5 text-gray-700 leading-relaxed text-sm sm:text-base">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 sm:mt-10 md:mt-12 bg-coral/10 border-2 border-coral rounded-2xl p-6 sm:p-8 text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-ocean mb-3">Still Have Questions?</h2>
              <p className="text-gray-700 mb-5 sm:mb-6 text-sm sm:text-base px-4">
                Reach out and our team will help you plan the perfect Fort Lauderdale cruise.
              </p>
              <a
                href="mailto:Tikitacocruises@gmail.com"
                className="inline-block bg-coral hover:bg-coral/90 text-white px-6 sm:px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 text-base min-h-[44px]"
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
