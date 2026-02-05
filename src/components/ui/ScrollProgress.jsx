import { motion, useScroll, useSpring } from 'framer-motion'

/**
 * ScrollProgress Component
 * Displays a thin progress bar at the top of the viewport
 * indicating how far the user has scrolled through the page
 */
export default function ScrollProgress() {
  // Get scroll progress (0 to 1)
  const { scrollYProgress } = useScroll()

  // Apply spring physics for smooth animation
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-eco z-[60] origin-left"
      style={{ scaleX }}
      aria-hidden="true"
    />
  )
}
