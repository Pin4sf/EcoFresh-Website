import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { siteCopy } from '../../../content/siteCopy'
import { staggerContainer, staggerItem } from '../../../lib/motion'
import AuroraBackground from '../../ui/AuroraBackground'
import InteractiveOrb from '../../ui/InteractiveOrb'
import TextReveal from '../../ui/TextReveal'

/**
 * Hero Section - Award-Winning Design
 *
 * Features:
 * - Interactive orb as ambient background centerpiece
 * - Centered layout with text on top
 * - Scroll-triggered parallax exit effect
 * - Reduced trust chips (Hick's Law: 2-3 max)
 * - Dual prominent CTAs
 */

export default function Hero() {
  const heroRef = useRef(null)

  // Scroll-triggered parallax exit effect
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  // Transform values for scroll exit
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100])

  // Check for reduced motion
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Select top trust items only (Hick's Law)
  const topTrustItems = siteCopy.trustBar.items.slice(0, 3)

  return (
    <section
      ref={heroRef}
      id="hero"
      className="min-h-screen flex items-center relative overflow-hidden"
    >
      {/* Aurora background - base layer */}
      <AuroraBackground />

      {/* Interactive Orb - middle layer, behind content */}
      <InteractiveOrb className="z-[1]" />

      {/* Parallax decorative vector */}
      <motion.img
        src="/assets/brand/credibility/thrash_vector.png"
        alt=""
        aria-hidden="true"
        className="absolute bottom-10 right-10 w-32 md:w-48 lg:w-64 opacity-[0.04] pointer-events-none select-none z-[2]"
        data-parallax="0.15"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.04, scale: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
      />

      {/* Main content - top layer with scroll effects */}
      <motion.div
        className="container-default relative z-10 py-24 md:py-32"
        style={
          prefersReducedMotion
            ? {}
            : {
                scale: heroScale,
                opacity: heroOpacity,
                y: heroY,
              }
        }
      >
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="max-w-4xl mx-auto text-center"
        >
          {/* Main headline - typography as hero with text reveal */}
          <motion.h1
            variants={staggerItem}
            className="heading-display text-ink"
          >
            <TextReveal delay={0.3}>
              Converting mixed waste into
            </TextReveal>{' '}
            <span className="text-eco">
              <TextReveal delay={0.5}>
                standardized bioplastics.
              </TextReveal>
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={staggerItem}
            className="mt-6 md:mt-8 body-large max-w-2xl mx-auto"
          >
            <TextReveal delay={0.7} mode="word">
              {siteCopy.hero.subhead}
            </TextReveal>
          </motion.p>

          {/* Dual CTAs - prominent, clear intent */}
          <motion.div
            variants={staggerItem}
            className="mt-10 md:mt-12 flex flex-wrap gap-4 justify-center"
          >
            <motion.a
              className="btn-primary text-base px-8 py-4"
              href={siteCopy.links.partnerEmail}
              data-cursor="Email"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {siteCopy.hero.ctaPrimary}
            </motion.a>
            <motion.a
              className="btn-glass"
              href={siteCopy.links.deck}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="View"
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.25)' }}
              whileTap={{ scale: 0.98 }}
            >
              {siteCopy.hero.ctaSecondary}
            </motion.a>
          </motion.div>

          {/* Trust chips - minimal, reduced count (Hick's Law) */}
          <motion.div
            variants={staggerItem}
            className="mt-14 md:mt-16 flex flex-wrap gap-3 justify-center"
          >
            {topTrustItems.map((item, index) => (
              <motion.span
                key={item}
                className="chip-minimal"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1, duration: 0.4 }}
              >
                {item}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator - animated mouse */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center"
        >
          <motion.p
            className="text-xs text-ink-muted/60 uppercase tracking-widest mb-3"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            Scroll
          </motion.p>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-6 h-10 rounded-full border-2 border-ink/20 flex items-start justify-center p-1.5"
          >
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4], y: [0, 12, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-1.5 h-1.5 rounded-full bg-eco"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
