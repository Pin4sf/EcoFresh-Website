import { motion } from 'framer-motion'
import { siteCopy } from '../../../content/siteCopy'
import { staggerContainer, staggerItem } from '../../../lib/motion'
import AuroraBackground from '../../ui/AuroraBackground'
import TextReveal from '../../ui/TextReveal'

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center relative overflow-hidden">
      {/* Aurora background with mouse-reactive glow */}
      <AuroraBackground />

      {/* Parallax decorative vector */}
      <motion.img
        src="/assets/brand/credibility/thrash_vector.png"
        alt=""
        aria-hidden="true"
        className="absolute bottom-10 right-10 w-32 md:w-48 lg:w-64 opacity-[0.06] pointer-events-none select-none"
        data-parallax="0.15"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.06, scale: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
      />

      <div className="container-default relative z-10 py-24 md:py-32">
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

          {/* CTAs */}
          <motion.div
            variants={staggerItem}
            className="mt-10 md:mt-12 flex flex-wrap gap-4 justify-center"
          >
            <a
              className="btn-primary text-base px-8 py-4"
              href={siteCopy.links.partnerEmail}
              data-cursor="Email"
            >
              {siteCopy.hero.ctaPrimary}
            </a>
            <a
              className="btn-glass"
              href={siteCopy.links.deck}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="View"
            >
              {siteCopy.hero.ctaSecondary}
            </a>
          </motion.div>

          {/* Trust chips - minimal */}
          <motion.div
            variants={staggerItem}
            className="mt-14 md:mt-16 flex flex-wrap gap-3 justify-center"
          >
            {siteCopy.trustBar.items.map((item) => (
              <span key={item} className="chip-minimal">
                {item}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator - animated mouse */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-6 h-10 rounded-full border-2 border-ink/20 flex items-start justify-center p-1.5"
          >
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4], y: [0, 12, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-1.5 h-1.5 rounded-full bg-eco"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
