import { useState, useEffect, useRef } from 'react'

/**
 * useScrollDirection Hook
 * Tracks scroll direction and position for smart navigation behavior
 * Returns scroll direction ('up' | 'down'), scroll position, and whether at top
 */
export default function useScrollDirection(options = {}) {
  const {
    threshold = 10, // Minimum scroll distance before direction change registers
    initialDirection = 'up',
  } = options

  const [scrollDirection, setScrollDirection] = useState(initialDirection)
  const [scrollY, setScrollY] = useState(0)
  const [isAtTop, setIsAtTop] = useState(true)

  const lastScrollY = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) {
      // Always show nav for reduced motion users
      setScrollDirection('up')
      return
    }

    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY

      // Update scroll position
      setScrollY(currentScrollY)

      // Check if at top
      setIsAtTop(currentScrollY < 50)

      // Determine direction with threshold
      const difference = currentScrollY - lastScrollY.current

      if (Math.abs(difference) >= threshold) {
        const newDirection = difference > 0 ? 'down' : 'up'
        setScrollDirection(newDirection)
        lastScrollY.current = currentScrollY
      }

      ticking.current = false
    }

    const onScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(updateScrollDirection)
        ticking.current = true
      }
    }

    // Initialize
    lastScrollY.current = window.scrollY
    setScrollY(window.scrollY)
    setIsAtTop(window.scrollY < 50)

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [threshold])

  return {
    scrollDirection,
    scrollY,
    isAtTop,
    isScrollingDown: scrollDirection === 'down',
    isScrollingUp: scrollDirection === 'up',
  }
}
