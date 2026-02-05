import { motion } from 'framer-motion'

/**
 * PageTransition Component
 * Wraps page content with clip-path reveal animations for smooth route transitions
 * Uses Framer Motion's AnimatePresence (applied in Layout)
 *
 * Enhanced with award-winning "wipe reveal" effect
 */

const pageVariants = {
  initial: {
    opacity: 0,
    clipPath: 'inset(0 0 100% 0)', // Hidden from bottom
  },
  animate: {
    opacity: 1,
    clipPath: 'inset(0 0 0% 0)', // Revealed fully
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
      clipPath: {
        duration: 0.6,
        ease: [0.7, 0, 0.3, 1] // Snappy reveal
      }
    },
  },
  exit: {
    opacity: 0,
    clipPath: 'inset(100% 0 0 0)', // Exit upward
    transition: {
      duration: 0.35,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

// Reduced motion variant - simple fade
const reducedMotionVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.1 } },
}

export default function PageTransition({ children }) {
  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <motion.div
      variants={prefersReducedMotion ? reducedMotionVariants : pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ willChange: 'clip-path, opacity' }}
    >
      {children}
    </motion.div>
  )
}
