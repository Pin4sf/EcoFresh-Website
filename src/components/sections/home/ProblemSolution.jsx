import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { siteCopy } from '../../../content/siteCopy'
import { scrollReveal, staggerContainer, staggerItem } from '../../../lib/motion'

export default function ProblemSolution() {
  const solutionRef = useRef(null)

  // Parallax scroll effect for video
  const { scrollYProgress } = useScroll({
    target: solutionRef,
    offset: ['start end', 'end start'],
  })

  // Video moves slower than scroll (parallax)
  const videoY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  return (
    <section ref={solutionRef} id="problem-solution" className="min-h-screen flex flex-col justify-center py-24 md:py-32 bg-gradient-to-b from-sand via-sand to-mist/30 relative overflow-hidden">
      {/* Decorative parallax vector */}
      <motion.img
        src="/assets/brand/credibility/thrash_vector.png"
        alt=""
        aria-hidden="true"
        className="absolute top-20 left-10 w-24 md:w-32 opacity-[0.04] pointer-events-none select-none rotate-12"
        data-parallax="0.1"
      />
      <div className="container-default relative z-10">
        {/* Problem Section */}
        <motion.div
          className="mb-20 md:mb-28"
          {...scrollReveal}
        >
          <span className="section-eyebrow">{siteCopy.problem.eyebrow}</span>
          <h2 className="heading-section mt-4 max-w-3xl">{siteCopy.problem.title}</h2>
          <p className="body-large mt-6 max-w-2xl">
            India's waste ecosystem is optimized to move waste — not process it.
          </p>

          <motion.div
            className="mt-12 grid gap-6 md:grid-cols-3"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
          >
            {siteCopy.problem.stats.map((item) => (
              <motion.div
                key={item.title}
                variants={staggerItem}
                className="p-6 rounded-2xl border border-ink/10 bg-sand"
              >
                <p className="stat-number mb-3">{item.title}</p>
                <p className="text-ink-muted text-sm leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="section-divider" />

        {/* Solution Section */}
        <motion.div
          className="grid gap-12 lg:gap-16 md:grid-cols-2 items-center"
          {...scrollReveal}
        >
          <div>
            <span className="section-eyebrow">{siteCopy.solution.eyebrow}</span>
            <h2 className="heading-section mt-4">{siteCopy.solution.title}</h2>
            <p className="body-regular mt-6">{siteCopy.solution.description}</p>

            <ul className="mt-8 space-y-4">
              {siteCopy.solution.bullets.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex gap-3 text-ink-muted"
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-eco/10 flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-eco" />
                  </span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* EcoConverter Video with Parallax */}
            <div className="rounded-3xl border border-ink/10 bg-black overflow-hidden aspect-[4/3] relative">
              <motion.div
                className="absolute inset-0 w-full h-[120%] -top-[10%]"
                style={{ y: videoY }}
              >
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src="/assets/videos/VID_20260205124755.webm" type="video/webm" />
                </video>
              </motion.div>

              {/* Subtle gradient overlay at bottom for text legibility */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />

              {/* Label overlay */}
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white/90 font-display font-semibold text-lg">EcoConverter</p>
                <p className="text-white/60 text-sm">Mixed waste → Standardized bioplastics</p>
              </div>
            </div>

            {/* Process steps below */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              <ProcessStep number="01" title="Input" description="Mixed waste" icon="→" />
              <ProcessStep number="02" title="Convert" description="Eco Converter" icon="⚡" />
              <ProcessStep number="03" title="Output" description="3 Value Streams" icon="✓" />
            </div>

            {/* Decorative glow */}
            <div className="absolute -z-10 inset-4 top-0 bg-eco/10 rounded-3xl blur-2xl" aria-hidden="true" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function ProcessStep({ number, title, description, icon }) {
  return (
    <motion.div
      className="text-center p-4 rounded-xl bg-mist/50 border border-ink/5 cursor-pointer"
      whileHover={{ y: -4, borderColor: 'rgba(20, 138, 58, 0.3)' }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <span className="text-lg">{icon}</span>
      <p className="text-xs font-mono text-eco/60 mt-2">{number}</p>
      <p className="font-display font-semibold text-ink text-sm mt-1">{title}</p>
      <p className="text-xs text-ink-muted mt-1">{description}</p>
    </motion.div>
  )
}
