import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLoading } from '../../context/LoadingContext'

/**
 * LoadingScreen Component
 * Full branded loading experience with 3 phases:
 * 1. Logo reveal (0-800ms) - Scale in with blur-to-clear
 * 2. Progress bar (800-2200ms) - Animated 0-100%
 * 3. Exit (2200-2800ms) - Slide up and reveal content
 */
export default function LoadingScreen() {
  const { isLoading, isFirstVisit, setLoadingComplete } = useLoading()
  const [phase, setPhase] = useState('logo') // 'logo' | 'progress' | 'exit'
  const [progress, setProgress] = useState(0)

  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    // Skip entirely if not first visit or reduced motion preferred
    if (!isFirstVisit || prefersReducedMotion) {
      setLoadingComplete()
      return
    }

    // Phase 1: Logo reveal (800ms)
    const logoTimer = setTimeout(() => {
      setPhase('progress')
    }, 800)

    // Phase 2: Progress animation (800-2200ms = 1400ms duration)
    const progressTimer = setTimeout(() => {
      setPhase('exit')
    }, 2200)

    // Phase 3: Exit animation complete (2800ms)
    const exitTimer = setTimeout(() => {
      setLoadingComplete()
    }, 2800)

    return () => {
      clearTimeout(logoTimer)
      clearTimeout(progressTimer)
      clearTimeout(exitTimer)
    }
  }, [isFirstVisit, prefersReducedMotion, setLoadingComplete])

  // Animate progress bar
  useEffect(() => {
    if (phase !== 'progress') return

    const duration = 1400 // ms
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const newProgress = Math.min((elapsed / duration) * 100, 100)
      setProgress(newProgress)

      if (elapsed < duration) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [phase])

  // Don't render if not loading or not first visit
  if (!isLoading || !isFirstVisit) return null

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-sand"
          initial={{ opacity: 1 }}
          exit={{
            y: '-100%',
            transition: {
              duration: 0.6,
              ease: [0.7, 0, 0.3, 1]
            }
          }}
        >
          {/* Logo */}
          <motion.div
            className="relative"
            initial={{ scale: 0.8, filter: 'blur(10px)', opacity: 0 }}
            animate={{
              scale: 1,
              filter: 'blur(0px)',
              opacity: 1
            }}
            transition={{
              duration: 0.8,
              ease: [0.25, 0.1, 0.25, 1]
            }}
          >
            {/* Brand name */}
            <h1 className="text-5xl md:text-7xl font-display font-semibold tracking-tight">
              <span className="text-ink">Eco</span>
              <span className="text-eco">Fresh</span>
            </h1>

            {/* Tagline */}
            <motion.p
              className="mt-4 text-center text-sm text-ink-muted tracking-wide"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              Sustainable Innovation
            </motion.p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            className="absolute bottom-20 left-1/2 -translate-x-1/2 w-48"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'progress' || phase === 'exit' ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Track */}
            <div className="h-0.5 bg-ink/10 rounded-full overflow-hidden">
              {/* Fill */}
              <motion.div
                className="h-full bg-eco rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            {/* Percentage */}
            <motion.p
              className="mt-3 text-center text-xs text-ink-muted tabular-nums"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {Math.round(progress)}%
            </motion.p>
          </motion.div>

          {/* Decorative aurora blob */}
          <div
            className="absolute top-1/4 right-1/4 w-64 h-64 bg-eco/5 rounded-full blur-[80px] pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-sky/5 rounded-full blur-[60px] pointer-events-none"
            aria-hidden="true"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
