import { useRef } from 'react'
import { motion, useTransform, useMotionTemplate } from 'framer-motion'
import useMousePosition from '../../hooks/useMousePosition'

/**
 * Aurora Background Component
 * Creates an organic, morphing gradient effect with mouse-reactive glow
 * Uses CSS animations for base aurora + Framer Motion for mouse interaction
 */
export default function AuroraBackground({ className = '' }) {
  const containerRef = useRef(null)

  // Get smoothed mouse position with slower spring for organic feel
  const { smoothX, smoothY, isEnabled } = useMousePosition({
    springConfig: { damping: 40, stiffness: 100, mass: 1.5 }
  })

  // Transform mouse position to percentage values for gradient positioning
  // Clamp between 30-70% to keep effect centered
  const gradientX = useTransform(
    smoothX,
    [0, typeof window !== 'undefined' ? window.innerWidth : 1920],
    [30, 70]
  )
  const gradientY = useTransform(
    smoothY,
    [0, typeof window !== 'undefined' ? window.innerHeight : 1080],
    [20, 80]
  )

  // Create mouse-reactive radial gradient
  const mouseGradient = useMotionTemplate`
    radial-gradient(
      600px circle at ${gradientX}% ${gradientY}%,
      rgba(20, 138, 58, 0.12),
      rgba(13, 115, 119, 0.08) 40%,
      transparent 70%
    )
  `

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* Base gradient layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-sand via-mist/30 to-sand" />

      {/* Aurora blob 1 - Large, slow moving, top-right */}
      <div
        className="aurora-blob aurora-blob-1"
        style={{
          '--aurora-color': 'rgba(20, 138, 58, 0.08)',
          '--aurora-size': '60%',
        }}
      />

      {/* Aurora blob 2 - Medium, different timing, bottom-left */}
      <div
        className="aurora-blob aurora-blob-2"
        style={{
          '--aurora-color': 'rgba(13, 115, 119, 0.06)',
          '--aurora-size': '50%',
        }}
      />

      {/* Aurora blob 3 - Smaller accent, mid-area */}
      <div
        className="aurora-blob aurora-blob-3"
        style={{
          '--aurora-color': 'rgba(47, 122, 229, 0.04)',
          '--aurora-size': '40%',
        }}
      />

      {/* Mouse-reactive glow layer - only when mouse tracking is enabled */}
      {isEnabled && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ background: mouseGradient }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      )}

      {/* Subtle noise texture overlay for organic feel */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}
