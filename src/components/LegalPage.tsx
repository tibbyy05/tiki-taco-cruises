import { ReactNode } from 'react';
import SEO from './SEO';
import Navigation from './Navigation';
import Footer from './Footer';

/**
 * Shared shell for the footer legal pages (privacy, terms, cancellation).
 * Keeps them visually consistent and saves each page repeating the nav/hero
 * scaffolding. Body copy is plain prose styled here rather than per-page.
 */
interface LegalPageProps {
  title: string;
  metaTitle: string;
  metaDescription: string;
  lastUpdated: string;
  children: ReactNode;
}

export default function LegalPage({ title, metaTitle, metaDescription, lastUpdated, children }: LegalPageProps) {
  return (
    <>
      <Navigation />
      <SEO title={metaTitle} description={metaDescription} />

      <div className="min-h-screen bg-sand">
        <section className="bg-ocean text-white pt-32 pb-12 sm:pt-36 sm:pb-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">{title}</h1>
            <p className="text-white/70 text-sm sm:text-base">Last updated: {lastUpdated}</p>
          </div>
        </section>

        <section className="px-4 py-12 sm:py-16">
          <div
            className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-ocean/10 p-6 sm:p-10
              [&_h2]:text-xl [&_h2]:sm:text-2xl [&_h2]:font-bold [&_h2]:text-ocean [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:first:mt-0
              [&_p]:text-gray-700 [&_p]:leading-relaxed [&_p]:mb-4
              [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:space-y-2
              [&_li]:text-gray-700 [&_li]:leading-relaxed
              [&_a]:text-coral [&_a]:underline [&_a]:underline-offset-2
              [&_strong]:text-ocean"
          >
            {children}
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
