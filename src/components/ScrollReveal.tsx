import { ReactNode, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

type RevealDirection = 'up' | 'left' | 'right' | 'fade';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: RevealDirection;
  delay?: number;
  className?: string;
  /**
   * Fraction of the element that must be visible to trigger the reveal.
   * Use 'some' for sections taller than the viewport (e.g. the mobile
   * gallery, ~4x screen height) — a fractional threshold can never be met
   * there and the content stays invisible.
   */
  amount?: number | 'some' | 'all';
}

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  className,
  amount = 0.2
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount });

  const initialOffset = () => {
    switch (direction) {
      case 'left':
        return { x: -30, y: 0 };
      case 'right':
        return { x: 30, y: 0 };
      case 'fade':
        return { x: 0, y: 0 };
      case 'up':
      default:
        return { x: 0, y: 30 };
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...initialOffset() }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : undefined}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  );
}
