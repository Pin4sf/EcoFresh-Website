import { useState, useEffect, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [hoverText, setHoverText] = useState('')

  // Raw mouse position
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth spring animation for cursor ring
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  // Slower spring for trailing dot
  const trailConfig = { damping: 30, stiffness: 200, mass: 0.8 }
  const trailX = useSpring(mouseX, trailConfig)
  const trailY = useSpring(mouseY, trailConfig)

  // Check if element is interactive
  const getInteractiveElement = useCallback((element) => {
    if (!element) return null
    return element.closest('a, button, [data-cursor], [role="button"], input, textarea, select')
  }, [])

  useEffect(() => {
    // Check if device has fine pointer (mouse)
    const hasMouse = window.matchMedia('(pointer: fine)').matches
    if (!hasMouse) return

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    setIsVisible(true)

    let currentHoverTarget = null

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)

      // Check hover state on every move for reliability
      const interactiveElement = getInteractiveElement(e.target)

      if (interactiveElement && interactiveElement !== currentHoverTarget) {
        currentHoverTarget = interactiveElement
        setIsHovering(true)
        setHoverText(interactiveElement.dataset?.cursor || '')
      } else if (!interactiveElement && currentHoverTarget) {
        currentHoverTarget = null
        setIsHovering(false)
        setHoverText('')
      }
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    const handleMouseLeave = () => {
      setIsVisible(false)
      setIsHovering(false)
      setHoverText('')
      currentHoverTarget = null
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.documentElement.addEventListener('mouseleave', handleMouseLeave)
    document.documentElement.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave)
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [mouseX, mouseY, getInteractiveElement])

  if (!isVisible) return null

  return (
    <>
      {/* Main cursor ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white flex items-center justify-center"
          animate={{
            width: isHovering ? 80 : isClicking ? 20 : 40,
            height: isHovering ? 80 : isClicking ? 20 : 40,
            opacity: isClicking ? 0.7 : 1,
          }}
          transition={{
            type: 'spring',
            damping: 20,
            stiffness: 300,
            mass: 0.8
          }}
        >
          {hoverText && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              className="text-[10px] font-medium text-white uppercase tracking-wider whitespace-nowrap"
            >
              {hoverText}
            </motion.span>
          )}
        </motion.div>
      </motion.div>

      {/* Trailing dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: trailX,
          y: trailY,
        }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2 rounded-full bg-eco"
          animate={{
            width: isHovering ? 8 : isClicking ? 10 : 6,
            height: isHovering ? 8 : isClicking ? 10 : 6,
            opacity: isHovering ? 0.5 : 1,
          }}
          transition={{ type: 'spring', damping: 25, stiffness: 400 }}
        />
      </motion.div>

      {/* Global style to hide default cursor */}
      <style>{`
        @media (pointer: fine) {
          *, *::before, *::after {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  )
}
