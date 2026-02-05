import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import useMagnetic from '../../hooks/useMagnetic'

/**
 * MagneticLink Component
 * Interactive link with magnetic hover effect and animated underline
 * Used in footer and navigation for premium feel
 */
export default function MagneticLink({
  children,
  href,
  icon: Icon,
  showArrow = false,
  className = '',
  external = false,
  magneticStrength = 0.2,
  ...props
}) {
  const [isHovered, setIsHovered] = useState(false)
  const { ref, style, handlers } = useMagnetic({ strength: magneticStrength })

  const linkProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {}

  return (
    <motion.a
      ref={ref}
      href={href}
      style={style}
      {...handlers}
      onMouseEnter={(e) => {
        setIsHovered(true)
        handlers.onMouseEnter?.(e)
      }}
      onMouseLeave={(e) => {
        setIsHovered(false)
        handlers.onMouseLeave?.(e)
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

      {/* Text with underline */}
      <span className="relative">
        {children}

        {/* Animated underline */}
        <motion.span
          className="absolute -bottom-0.5 left-0 h-px bg-current"
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
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  )
}
