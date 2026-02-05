import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLoading } from '../../context/LoadingContext'

/**
 * LoadingScreen Component - Award-Winning 4-Phase Experience
 *
 * Phase 1 (0-700ms):   Letter-by-letter "EcoFresh" reveal
 * Phase 2 (700-1400ms): Tagline blur-reveal with delay
 * Phase 3 (1400-2200ms): Circular progress ring animation
 * Phase 4 (2200-2800ms): Split-screen exit (dramatic reveal)
 */

// Letter animation variants
const letterVariants = {
  initial: {
    y: 50,
    opacity: 0,
    rotateX: -60,
  },
  animate: (i) => ({
    y: 0,
    opacity: 1,
    rotateX: 0,
    transition: {
      delay: i * 0.06,
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
}

// Tagline blur reveal
const taglineVariants = {
  initial: {
    opacity: 0,
    filter: 'blur(10px)',
    y: 10,
  },
  animate: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: {
      delay: 0.5,
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

// Split panel variants for dramatic exit
const splitPanelVariants = {
  top: {
    initial: { y: 0 },
    exit: {
      y: '-100%',
      transition: {
        duration: 0.6,
        ease: [0.7, 0, 0.3, 1],
      },
    },
  },
  bottom: {
    initial: { y: 0 },
    exit: {
      y: '100%',
      transition: {
        duration: 0.6,
        ease: [0.7, 0, 0.3, 1],
        delay: 0.05, // Slight offset for visual interest
      },
    },
  },
}

// Progress ring component
function CircularProgress({ progress }) {
  const circumference = 2 * Math.PI * 42 // radius = 42
  const strokeDashoffset = circumference - (circumference * progress) / 100

  return (
    <div className="relative w-24 h-24">
      {/* Background circle */}
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-ink/10"
        />
        {/* Progress circle */}
        <motion.circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-eco"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset,
          }}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.1, ease: 'linear' }}
        />
      </svg>

      {/* Percentage text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-medium text-ink tabular-nums">
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  )
}

export default function LoadingScreen() {
  const { isLoading, isFirstVisit, setLoadingComplete } = useLoading()
  const [phase, setPhase] = useState('letters') // 'letters' | 'tagline' | 'progress' | 'exit'
  const [progress, setProgress] = useState(0)
  const [isExiting, setIsExiting] = useState(false)

  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Split "EcoFresh" into individual letters
  const brandLetters = useMemo(() => {
    return [
      { char: 'E', color: 'text-ink' },
      { char: 'c', color: 'text-ink' },
      { char: 'o', color: 'text-ink' },
      { char: 'F', color: 'text-eco' },
      { char: 'r', color: 'text-eco' },
      { char: 'e', color: 'text-eco' },
      { char: 's', color: 'text-eco' },
      { char: 'h', color: 'text-eco' },
    ]
  }, [])

  useEffect(() => {
    // Skip entirely if not first visit or reduced motion preferred
    if (!isFirstVisit || prefersReducedMotion) {
      setLoadingComplete()
      return
    }

    // Phase 1: Letters animation (700ms)
    const taglineTimer = setTimeout(() => {
      setPhase('tagline')
    }, 700)

    // Phase 2: Show progress after tagline (1400ms total)
    const progressTimer = setTimeout(() => {
      setPhase('progress')
    }, 1400)

    // Phase 3: Start exit animation (2200ms total)
    const exitTimer = setTimeout(() => {
      setPhase('exit')
      setIsExiting(true)
    }, 2400)

    // Phase 4: Complete loading (2800ms total)
    const completeTimer = setTimeout(() => {
      setLoadingComplete()
    }, 3000)

    return () => {
      clearTimeout(taglineTimer)
      clearTimeout(progressTimer)
      clearTimeout(exitTimer)
      clearTimeout(completeTimer)
    }
  }, [isFirstVisit, prefersReducedMotion, setLoadingComplete])

  // Animate progress ring
  useEffect(() => {
    if (phase !== 'progress' && phase !== 'exit') return

    const duration = 1000 // ms
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
    <AnimatePresence mode="wait">
      {isLoading && (
        <div className="fixed inset-0 z-[9999] overflow-hidden">
          {/* Top split panel */}
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-sand z-10"
            variants={splitPanelVariants.top}
            initial="initial"
            animate={isExiting ? 'exit' : 'initial'}
          >
            {/* Decorative aurora blob - top */}
            <div
              className="absolute bottom-0 right-1/4 w-80 h-80 bg-eco/[0.06] rounded-full blur-[100px] pointer-events-none"
              aria-hidden="true"
            />
          </motion.div>

          {/* Bottom split panel */}
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-sand z-10"
            variants={splitPanelVariants.bottom}
            initial="initial"
            animate={isExiting ? 'exit' : 'initial'}
          >
            {/* Decorative aurora blob - bottom */}
            <div
              className="absolute top-0 left-1/4 w-64 h-64 bg-sky/[0.05] rounded-full blur-[80px] pointer-events-none"
              aria-hidden="true"
            />
          </motion.div>

          {/* Content layer - centered */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center z-20"
            initial={{ opacity: 1 }}
            animate={{ opacity: isExiting ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Brand name - letter by letter */}
            <div
              className="flex items-center justify-center overflow-hidden"
              style={{ perspective: '1000px' }}
            >
              {brandLetters.map((letter, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterVariants}
                  initial="initial"
                  animate="animate"
                  className={`text-5xl md:text-7xl font-display font-semibold tracking-tight inline-block ${letter.color}`}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {letter.char}
                </motion.span>
              ))}
            </div>

            {/* Tagline */}
            <motion.p
              variants={taglineVariants}
              initial="initial"
              animate={phase !== 'letters' ? 'animate' : 'initial'}
              className="mt-4 text-sm text-ink-muted tracking-widest uppercase"
            >
              Sustainable Innovation
            </motion.p>

            {/* Circular progress - appears in phase 3 */}
            <motion.div
              className="mt-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: phase === 'progress' || phase === 'exit' ? 1 : 0,
                scale: phase === 'progress' || phase === 'exit' ? 1 : 0.8,
              }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <CircularProgress progress={progress} />
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
