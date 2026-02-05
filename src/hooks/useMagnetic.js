import { useRef, useState, useCallback } from 'react'
import { useMotionValue, useSpring } from 'framer-motion'

/**
 * useMagnetic Hook
 * Creates a magnetic hover effect where elements are attracted to the cursor
 * Used for buttons, links, and interactive elements
 */
export default function useMagnetic(options = {}) {
  const {
    strength = 0.3, // How strongly the element follows the cursor (0-1)
    springConfig = { damping: 15, stiffness: 150, mass: 0.5 },
    enabled = true,
  } = options

  const ref = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  // Motion values for position offset
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Apply spring physics for smooth movement
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const handleMouseMove = useCallback(
    (e) => {
      if (!ref.current || !enabled || prefersReducedMotion) return

      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      // Calculate offset from center
      const offsetX = (e.clientX - centerX) * strength
      const offsetY = (e.clientY - centerY) * strength

      x.set(offsetX)
      y.set(offsetY)
    },
    [enabled, prefersReducedMotion, strength, x, y]
  )

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    // Reset position
    x.set(0)
    y.set(0)
  }, [x, y])

  return {
    ref,
    isHovered,
    style: {
      x: springX,
      y: springY,
    },
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    },
  }
}
