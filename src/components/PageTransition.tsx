import { ReactNode, useEffect } from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
  children: ReactNode;
}

// True once the app has rendered a page on the client. The very first render
// (including SSG prerendering) must NOT start at opacity:0 — that bakes an
// invisible page into the static HTML, so nothing paints until the full JS
// bundle loads. On slow connections that's seconds of white screen, and it
// made PageSpeed Insights fail outright (NO_FCP). Route changes after the
// first render still animate normally.
let hasRenderedOnce = false;

export default function PageTransition({ children }: PageTransitionProps) {
  const animateEntry = hasRenderedOnce;

  useEffect(() => {
    hasRenderedOnce = true;
  }, []);

  return (
    <motion.div
      initial={animateEntry ? { opacity: 0, y: 10 } : false}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } }}
      exit={{ opacity: 0, y: 10, transition: { duration: 0.2, ease: 'easeOut' } }}
    >
      {children}
    </motion.div>
  );
}
