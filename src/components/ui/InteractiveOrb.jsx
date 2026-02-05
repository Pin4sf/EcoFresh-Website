import { useRef, useMemo } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import useMousePosition from '../../hooks/useMousePosition'

/**
 * InteractiveOrb Component
 *
 * A mouse-reactive focal element for the Hero section.
 * - Large gradient sphere representing sustainability/transformation
 * - Responds to mouse position with subtle parallax movement
 * - Morphing glow that intensifies on cursor proximity
 * - Designed to sit behind centered hero content
 */

export default function InteractiveOrb({ className = '' }) {
  const orbRef = useRef(null)
  const { smoothX, smoothY, normalizedX, normalizedY, isEnabled } = useMousePosition()

  // Check for reduced motion
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Spring configuration for smooth movement
  const springConfig = { damping: 30, stiffness: 150, mass: 1 }

  // Transform mouse position to orb movement (subtle parallax)
  const orbX = useSpring(
    useTransform(smoothX, (x) => (x - (typeof window !== 'undefined' ? window.innerWidth / 2 : 0)) * 0.02),
    springConfig
  )
  const orbY = useSpring(
    useTransform(smoothY, (y) => (y - (typeof window !== 'undefined' ? window.innerHeight / 2 : 0)) * 0.02),
    springConfig
  )

  // Calculate glow intensity based on cursor proximity to center
  const glowIntensity = useTransform(
    [normalizedX, normalizedY],
    ([x, y]) => {
      // Calculate distance from center (0.5, 0.5)
      const dx = (x - 0.5) * 2
      const dy = (y - 0.5) * 2
      const distance = Math.sqrt(dx * dx + dy * dy)
      // Closer to center = higher intensity
      return Math.max(0.3, 1 - distance * 0.5)
    }
  )

  // Spring for glow
  const smoothGlow = useSpring(glowIntensity, { damping: 25, stiffness: 100 })

  // Generate orb gradient colors
  const orbColors = useMemo(() => ({
    primary: 'rgba(20, 138, 58, 0.15)',     // eco green
    secondary: 'rgba(47, 122, 229, 0.08)',   // sky blue
    tertiary: 'rgba(14, 28, 23, 0.03)',      // ink (subtle)
  }), [])

  if (prefersReducedMotion) {
    // Static version for reduced motion
    return (
      <div
        className={`absolute inset-0 flex items-center justify-center pointer-events-none ${className}`}
        aria-hidden="true"
      >
        <div
          className="w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full"
          style={{
            background: `
              radial-gradient(ellipse at 30% 30%, ${orbColors.primary} 0%, transparent 60%),
              radial-gradient(ellipse at 70% 70%, ${orbColors.secondary} 0%, transparent 50%),
              radial-gradient(ellipse at 50% 50%, ${orbColors.tertiary} 0%, transparent 70%)
            `,
            filter: 'blur(60px)',
          }}
        />
      </div>
    )
  }

  return (
    <div
      ref={orbRef}
      className={`absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* Main orb */}
      <motion.div
        className="relative w-[500px] h-[500px] md:w-[700px] md:h-[700px] lg:w-[800px] lg:h-[800px]"
        style={{
          x: orbX,
          y: orbY,
        }}
      >
        {/* Primary orb layer - eco green */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(ellipse at 40% 40%, ${orbColors.primary} 0%, transparent 65%)`,
            filter: 'blur(60px)',
            scale: useTransform(smoothGlow, [0.3, 1], [0.95, 1.05]),
          }}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            rotate: {
              duration: 60,
              repeat: Infinity,
              ease: 'linear',
            },
          }}
        />

        {/* Secondary orb layer - sky blue (offset) */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(ellipse at 60% 60%, ${orbColors.secondary} 0%, transparent 55%)`,
            filter: 'blur(50px)',
            x: useTransform(orbX, (x) => x * -0.5),
            y: useTransform(orbY, (y) => y * -0.5),
          }}
          animate={{
            rotate: [0, -360],
          }}
          transition={{
            rotate: {
              duration: 80,
              repeat: Infinity,
              ease: 'linear',
            },
          }}
        />

        {/* Tertiary glow layer - responds to proximity */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(ellipse at 50% 50%, rgba(20, 138, 58, 0.12) 0%, transparent 50%)`,
            filter: 'blur(40px)',
            opacity: smoothGlow,
            scale: useTransform(smoothGlow, [0.3, 1], [0.8, 1.15]),
          }}
        />

        {/* Inner highlight - creates depth */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-1/3 h-1/3 rounded-full"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.08) 0%, transparent 70%)',
            filter: 'blur(30px)',
            x: useTransform(orbX, (x) => x * 0.3),
            y: useTransform(orbY, (y) => y * 0.3),
          }}
        />
      </motion.div>

      {/* Ambient floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-eco/20"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </div>
  )
}
