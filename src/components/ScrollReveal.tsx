import { ReactNode, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

type RevealDirection = 'up' | 'left' | 'right' | 'fade';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: RevealDirection;
  delay?: number;
  className?: string;
}

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  className
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

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
