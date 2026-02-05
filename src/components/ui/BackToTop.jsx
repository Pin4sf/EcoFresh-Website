import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import useMagnetic from '../../hooks/useMagnetic'

/**
 * BackToTop Component
 * Floating button that appears after scrolling and smoothly scrolls to top
 * Features magnetic hover effect and pulsing animation
 */
export default function BackToTop({
  threshold = 500, // Scroll distance before showing
  className = '',
}) {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const { ref, style, handlers } = useMagnetic({ strength: 0.3 })

  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > threshold)
    }

    // Initial check
    toggleVisibility()

    window.addEventListener('scroll', toggleVisibility, { passive: true })
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [threshold])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          ref={ref}
          style={style}
          {...handlers}
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-eco text-white
            flex items-center justify-center shadow-lg shadow-eco/30
            focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-eco/40
            ${className}`}
          aria-label="Scroll back to top"
          data-cursor="Top"
        >
          {/* Arrow icon with bounce animation on hover */}
          <motion.div
            animate={
              isHovered && !prefersReducedMotion
                ? {
                    y: [0, -3, 0],
                    transition: {
                      duration: 0.6,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    },
                  }
                : { y: 0 }
            }
          >
            <ArrowUp className="w-5 h-5" />
          </motion.div>

          {/* Ripple effect on hover */}
          <motion.span
            className="absolute inset-0 rounded-full border-2 border-eco"
            animate={
              isHovered
                ? {
                    scale: [1, 1.5],
                    opacity: [0.5, 0],
                  }
                : { scale: 1, opacity: 0 }
            }
            transition={{
              duration: 0.8,
              repeat: isHovered ? Infinity : 0,
              ease: 'easeOut',
            }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
