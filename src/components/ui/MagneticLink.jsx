import { useState, useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import useMagnetic from '../../hooks/useMagnetic'

/**
 * MagneticLink Component
 * Interactive link with magnetic hover effect, animated underline,
 * and optional character shuffle animation (bartoszkolenda-inspired)
 */
export default function MagneticLink({
  children,
  href,
  icon: Icon,
  showArrow = false,
  className = '',
  external = false,
  magneticStrength = 0.2,
  charShuffle = false, // Enable character shuffle animation
  ...props
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [shuffledText, setShuffledText] = useState(null)
  const { ref, style, handlers } = useMagnetic({ strength: magneticStrength })

  const linkProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {}

  // Character shuffle effect
  const originalText = typeof children === 'string' ? children : ''
  const shuffleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  const startShuffle = useCallback(() => {
    if (!charShuffle || !originalText) return

    let iteration = 0
    const maxIterations = 3

    const interval = setInterval(() => {
      setShuffledText(
        originalText
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' '
            if (index < iteration) return originalText[index]
            return shuffleChars[Math.floor(Math.random() * shuffleChars.length)]
          })
          .join('')
      )

      iteration += 1 / 2

      if (iteration >= originalText.length) {
        clearInterval(interval)
        setShuffledText(null)
      }
    }, 30)

    return () => clearInterval(interval)
  }, [charShuffle, originalText])

  return (
    <motion.a
      ref={ref}
      href={href}
      style={style}
      {...handlers}
      onMouseEnter={(e) => {
        setIsHovered(true)
        handlers.onMouseEnter?.(e)
        startShuffle()
      }}
      onMouseLeave={(e) => {
        setIsHovered(false)
        handlers.onMouseLeave?.(e)
        setShuffledText(null)
      }}
      className={`relative inline-flex items-center gap-2 group transition-colors duration-200 ${className}`}
      {...linkProps}
      {...props}
    >
      {/* Optional icon */}
      {Icon && (
        <motion.span
          animate={{ rotate: isHovered ? 12 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <Icon className="w-4 h-4 text-eco" />
        </motion.span>
      )}

      {/* Text with underline and optional shuffle */}
      <span className="relative">
        {charShuffle && shuffledText ? (
          <span className="font-mono">{shuffledText}</span>
        ) : (
          children
        )}

        {/* Animated underline */}
        <motion.span
          className="absolute -bottom-0.5 left-0 h-px bg-eco"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ transformOrigin: 'left', width: '100%' }}
        />
      </span>

      {/* Optional arrow */}
      {showArrow && (
        <motion.span
          animate={{
            x: isHovered ? 4 : 0,
            y: isHovered ? -2 : 0,
            opacity: isHovered ? 1 : 0.5,
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          <ArrowUpRight className="w-3 h-3" />
        </motion.span>
      )}
    </motion.a>
  )
}

/**
 * CharacterRevealText - Text that reveals character by character on hover
 */
export function CharacterRevealText({ children, className = '' }) {
  const [isHovered, setIsHovered] = useState(false)
  const text = typeof children === 'string' ? children : ''
  const characters = useMemo(() => text.split(''), [text])

  return (
    <span
      className={`inline-block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          initial={false}
          animate={{
            y: isHovered ? [-2, 0] : 0,
            color: isHovered ? 'var(--color-eco)' : 'inherit',
          }}
          transition={{
            delay: isHovered ? index * 0.02 : 0,
            duration: 0.2,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  )
}

/**
 * MagneticButton - Button variant with magnetic effect
 */
export function MagneticButton({
  children,
  onClick,
  variant = 'primary', // 'primary' | 'outline' | 'ghost'
  className = '',
  magneticStrength = 0.15,
  ...props
}) {
  const { ref, style, handlers } = useMagnetic({ strength: magneticStrength })

  const variantClasses = {
    primary: 'btn-primary',
    outline: 'btn-outline',
    ghost: 'text-ink hover:text-eco',
  }

  return (
    <motion.button
      ref={ref}
      style={style}
      {...handlers}
      onClick={onClick}
      className={`${variantClasses[variant]} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  )
}
