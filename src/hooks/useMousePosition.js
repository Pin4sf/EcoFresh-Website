import { useEffect, useState } from 'react'
import { useMotionValue, useSpring } from 'framer-motion'

/**
 * Reusable mouse position tracking hook with Framer Motion integration
 * Provides both raw and smoothed (spring-animated) mouse coordinates
 * Respects reduced motion and touch device preferences
 */
export default function useMousePosition(options = {}) {
  const {
    springConfig = { damping: 30, stiffness: 150, mass: 1 },
    enabled = true,
    respectReducedMotion = true
  } = options

  const [isEnabled, setIsEnabled] = useState(false)

  // Raw mouse position values
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smoothed values with spring physics
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  // Normalized values (0-1 range based on viewport)
  const normalizedX = useMotionValue(0.5)
  const normalizedY = useMotionValue(0.5)

  useEffect(() => {
    if (!enabled) {
      setIsEnabled(false)
      return
    }

    // Check for reduced motion preference
    const prefersReduced = respectReducedMotion &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Check for fine pointer (mouse vs touch)
    const hasMouse = window.matchMedia('(pointer: fine)').matches

    if (prefersReduced || !hasMouse) {
      setIsEnabled(false)
      // Set to center for fallback
      normalizedX.set(0.5)
      normalizedY.set(0.5)
      return
    }

    setIsEnabled(true)

    const handleMouseMove = (e) => {
      // Update raw position
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)

      // Update normalized position (0-1 range)
      normalizedX.set(e.clientX / window.innerWidth)
      normalizedY.set(e.clientY / window.innerHeight)
    }

    // Initialize to center of viewport
    mouseX.set(window.innerWidth / 2)
    mouseY.set(window.innerHeight / 2)

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [enabled, respectReducedMotion, mouseX, mouseY, normalizedX, normalizedY])

  return {
    // Raw values (instant updates)
    mouseX,
    mouseY,
    // Smoothed values (spring animated)
    smoothX,
    smoothY,
    // Normalized values (0-1 range)
    normalizedX,
    normalizedY,
    // State
    isEnabled
  }
}
