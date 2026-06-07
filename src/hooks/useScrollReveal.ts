import { useRef } from 'react';
import { useInView } from 'framer-motion';

export const scrollRevealVariants = {
  hidden: {
    opacity: 0,
    y: 32,
    filter: 'blur(4px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
};

export const staggerItemVariants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export function useScrollReveal(options?: { once?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    once: options?.once ?? true,
  });

  return { ref, inView, variants: scrollRevealVariants };
}
