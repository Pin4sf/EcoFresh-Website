import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * StickyScrollSection Component
 * Creates a storytelling section where content stays pinned
 * and panels transition as the user scrolls
 */
export default function StickyScrollSection({
  children,
  className = '',
  panelCount = 3,
  bgColor = 'bg-sand',
}) {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Calculate container height based on panel count
  const containerHeight = `${panelCount * 100}vh`

  return (
    <section
      ref={containerRef}
      className={`relative ${className}`}
      style={{ height: containerHeight }}
    >
      <div className={`sticky top-0 h-screen overflow-hidden ${bgColor}`}>
        {children}
      </div>
    </section>
  )
}

/**
 * StickyPanel - Individual panel that fades in/out based on scroll
 */
export function StickyPanel({
  children,
  index = 0,
  totalPanels = 3,
  scrollProgress, // MotionValue from parent
  className = '',
}) {
  // Calculate when this panel should be visible
  const panelDuration = 1 / totalPanels
  const panelStart = index * panelDuration
  const panelMid = panelStart + panelDuration / 2
  const panelEnd = (index + 1) * panelDuration

  // Create smooth opacity transitions
  // Panel fades in, stays visible, then fades out
  const opacity = useTransform(
    scrollProgress,
    [
      panelStart,
      panelStart + panelDuration * 0.2, // Fade in
      panelEnd - panelDuration * 0.2,   // Start fade out
      panelEnd,
    ],
    [0, 1, 1, 0]
  )

  // Y position: slide up as it enters, slide up as it exits
  const y = useTransform(
    scrollProgress,
    [panelStart, panelMid, panelEnd],
    ['30px', '0px', '-30px']
  )

  // Scale: subtle scale effect
  const scale = useTransform(
    scrollProgress,
    [panelStart, panelMid, panelEnd],
    [0.95, 1, 0.95]
  )

  // Filter blur for depth
  const blur = useTransform(
    scrollProgress,
    [panelStart, panelStart + panelDuration * 0.2, panelEnd - panelDuration * 0.2, panelEnd],
    ['blur(4px)', 'blur(0px)', 'blur(0px)', 'blur(4px)']
  )

  // Check for reduced motion
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReducedMotion) {
    // For reduced motion, just use opacity
    return (
      <motion.div
        className={`absolute inset-0 flex items-center justify-center ${className}`}
        style={{ opacity }}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      className={`absolute inset-0 flex items-center justify-center ${className}`}
      style={{
        opacity,
        y,
        scale,
        filter: blur,
      }}
    >
      {children}
    </motion.div>
  )
}

/**
 * StickyScrollProgress - Visual progress indicator
 */
export function StickyScrollProgress({
  scrollProgress,
  panelCount = 3,
  labels = [],
  className = '',
}) {
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {Array.from({ length: panelCount }).map((_, i) => {
        const segmentStart = i / panelCount
        const segmentEnd = (i + 1) / panelCount

        const dotScale = useTransform(
          scrollProgress,
          [segmentStart, segmentStart + 0.1, segmentEnd - 0.1, segmentEnd],
          [0.5, 1, 1, 0.5]
        )

        const dotOpacity = useTransform(
          scrollProgress,
          [segmentStart, segmentStart + 0.1, segmentEnd - 0.1, segmentEnd],
          [0.3, 1, 1, 0.3]
        )

        return (
          <div key={i} className="flex items-center gap-3">
            <motion.div
              className="w-2 h-2 rounded-full bg-eco"
              style={{
                scale: dotScale,
                opacity: dotOpacity,
              }}
            />
            {labels[i] && (
              <motion.span
                className="text-xs text-ink-muted"
                style={{ opacity: dotOpacity }}
              >
                {labels[i]}
              </motion.span>
            )}
          </div>
        )
      })}
    </div>
  )
}

/**
 * Hook to get scroll progress for sticky section
 */
export function useStickyScroll(containerRef) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return { scrollYProgress }
}
