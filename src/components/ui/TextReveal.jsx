import { motion } from 'framer-motion'

/**
 * TextReveal Component
 * Animates text word-by-word with a 3D rotation effect on scroll
 * Supports both word and character modes
 */

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.1,
    },
  },
}

const wordVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    rotateX: -80,
    filter: 'blur(4px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

const charVariants = {
  hidden: {
    opacity: 0,
    y: 10,
    filter: 'blur(2px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

export default function TextReveal({
  children,
  mode = 'word', // 'word' | 'char'
  className = '',
  as: Tag = 'span',
  once = true,
  margin = '-100px',
  delay = 0,
}) {
  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // If reduced motion, just render the text normally
  if (prefersReducedMotion) {
    return <Tag className={className}>{children}</Tag>
  }

  // Ensure children is a string
  const text = typeof children === 'string' ? children : String(children)

  if (mode === 'char') {
    // Character-by-character animation
    const chars = text.split('')

    return (
      <motion.span
        className={`inline-block ${className}`}
        style={{ perspective: '1000px' }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin }}
        transition={{ delayChildren: delay }}
      >
        {chars.map((char, i) => (
          <motion.span
            key={i}
            variants={charVariants}
            className="inline-block"
            style={{
              transformStyle: 'preserve-3d',
              whiteSpace: char === ' ' ? 'pre' : 'normal',
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.span>
    )
  }

  // Word-by-word animation (default)
  const words = text.split(' ')

  return (
    <motion.span
      className={`inline-block ${className}`}
      style={{ perspective: '1000px' }}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
      transition={{ delayChildren: delay }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={wordVariants}
          className="inline-block mr-[0.25em]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  )
}

/**
 * TextRevealHeading - Convenience wrapper for headings
 * Applies the reveal animation with appropriate heading styles
 */
export function TextRevealHeading({
  children,
  level = 1,
  className = '',
  mode = 'word',
  highlightWords = [], // Words to highlight with eco color
  ...props
}) {
  const Tag = `h${level}`
  const text = typeof children === 'string' ? children : String(children)
  const words = text.split(' ')

  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReducedMotion) {
    return (
      <Tag className={className}>
        {words.map((word, i) => (
          <span
            key={i}
            className={highlightWords.includes(word.toLowerCase()) ? 'text-eco' : ''}
          >
            {word}{i < words.length - 1 ? ' ' : ''}
          </span>
        ))}
      </Tag>
    )
  }

  return (
    <motion.div
      className={className}
      style={{ perspective: '1000px' }}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      {...props}
    >
      <Tag>
        {words.map((word, i) => (
          <motion.span
            key={i}
            variants={wordVariants}
            className={`inline-block mr-[0.25em] ${
              highlightWords.includes(word.toLowerCase()) ? 'text-eco' : ''
            }`}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {word}
          </motion.span>
        ))}
      </Tag>
    </motion.div>
  )
}
