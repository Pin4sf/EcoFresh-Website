import { motion, AnimatePresence } from 'framer-motion'

// Page-specific transition messages
const pageMessages = {
  '/': 'Welcome to EcoFresh',
  '/problem': 'The Problem We Solve',
  '/impact': 'The Impact We Create',
  '/credibility': 'You Can Trust EcoFresh',
  '/team': 'Meet the Builders',
  '/investors': 'For Our Investors',
}

/**
 * PageTransitionOverlay Component
 * Quick branded transition shown during page navigation
 * Shows EcoFresh logo with page-specific message (~600ms)
 */
export default function PageTransitionOverlay({ isNavigating, targetPath }) {
  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReducedMotion) return null

  // Get message for target page
  const message = pageMessages[targetPath] || 'EcoFresh'

  return (
    <AnimatePresence>
      {isNavigating && (
        <motion.div
          className="fixed inset-0 z-[9998] flex items-center justify-center bg-sand pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          {/* Logo container */}
          <motion.div
            className="relative text-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.05, opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: [0.25, 0.1, 0.25, 1]
            }}
          >
            {/* Brand name */}
            <h1 className="text-4xl md:text-5xl font-display font-semibold tracking-tight">
              <span className="text-ink">Eco</span>
              <span className="text-eco">Fresh</span>
            </h1>

            {/* Animated underline */}
            <motion.div
              className="mt-2 h-0.5 bg-eco mx-auto rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '60%' }}
              exit={{ width: '100%', opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            />

            {/* Page-specific message */}
            <motion.p
              className="mt-4 text-sm md:text-base text-ink-muted tracking-wide"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.1, duration: 0.2 }}
            >
              {message}
            </motion.p>
          </motion.div>

          {/* Subtle background pulse */}
          <motion.div
            className="absolute inset-0 bg-eco/[0.02]"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
