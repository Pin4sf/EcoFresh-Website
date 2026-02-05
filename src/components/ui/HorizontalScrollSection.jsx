import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * HorizontalScrollSection Component
 * Creates a section that scrolls horizontally while pinned to the viewport
 * The container stays fixed while content moves left as user scrolls
 */
export default function HorizontalScrollSection({
  children,
  className = '',
  containerClassName = '',
  panelCount = 4, // Number of panels to determine scroll length
  bgColor = 'bg-sand',
}) {
  const containerRef = useRef(null)

  // Track scroll progress within this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Transform vertical scroll to horizontal movement
  // Calculate how much to move based on panel count
  const xRange = `${-(panelCount - 1) * 100}%`
  const x = useTransform(scrollYProgress, [0, 1], ['0%', xRange])

  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Calculate the height of the scroll container
  // Each panel needs a viewport height of scroll
  const containerHeight = `${panelCount * 100}vh`

  return (
    <section
      ref={containerRef}
      className={`relative ${className}`}
      style={{ height: containerHeight }}
    >
      {/* Sticky container that stays in view */}
      <div
        className={`sticky top-0 h-screen overflow-hidden ${bgColor} ${containerClassName}`}
      >
        {/* Horizontal scrolling track */}
        <motion.div
          className="flex h-full"
          style={prefersReducedMotion ? {} : { x }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  )
}

/**
 * HorizontalPanel - Individual panel for HorizontalScrollSection
 * Each panel takes full viewport width
 */
export function HorizontalPanel({
  children,
  className = '',
  index = 0,
}) {
  return (
    <div
      className={`flex-shrink-0 w-screen h-full flex items-center justify-center ${className}`}
      data-panel-index={index}
    >
      {children}
    </div>
  )
}

/**
 * HorizontalScrollIndicator - Progress indicator for horizontal sections
 */
export function HorizontalScrollIndicator({
  scrollProgress, // MotionValue from useScroll
  panelCount = 4,
  className = '',
}) {
  return (
    <div className={`flex gap-2 items-center ${className}`}>
      {Array.from({ length: panelCount }).map((_, i) => {
        const segmentStart = i / panelCount
        const segmentEnd = (i + 1) / panelCount

        return (
          <motion.div
            key={i}
            className="w-8 h-1 rounded-full bg-ink/20 overflow-hidden"
          >
            <motion.div
              className="h-full bg-eco rounded-full origin-left"
              style={{
                scaleX: useTransform(
                  scrollProgress,
                  [segmentStart, segmentEnd],
                  [0, 1]
                ),
              }}
            />
          </motion.div>
        )
      })}
    </div>
  )
}
