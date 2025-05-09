'use client';

import { motion } from 'framer-motion';

export const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export function FadeInWhenVisible({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        initial: { opacity: 0, y: 50 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SlideIn({ children, direction = "left", className }: { 
  children: React.ReactNode, 
  direction?: "left" | "right" | "up" | "down",
  className?: string 
}) {
  const directionOffset = {
    left: { x: -100, y: 0 },
    right: { x: 100, y: 0 },
    up: { x: 0, y: 100 },
    down: { x: 0, y: -100 }
  };

  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        initial: { opacity: 0, ...directionOffset[direction] },
        animate: { 
          opacity: 1, 
          x: 0, 
          y: 0, 
          transition: { 
            type: "spring",
            damping: 20,
            stiffness: 100
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScaleIn({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        initial: { opacity: 0, scale: 0.8 },
        animate: { 
          opacity: 1, 
          scale: 1,
          transition: { 
            type: "spring",
            damping: 20,
            stiffness: 100
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
} 