import { motion } from 'framer-motion'
import { siteCopy } from '../../../content/siteCopy'
import { scrollReveal } from '../../../lib/motion'

export default function FinalCTA() {
  return (
    <section id="cta" className="py-24 md:py-32 bg-ink relative overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 footer-grid opacity-50" aria-hidden="true" />

      {/* Gradient accent */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-eco/10 rounded-full blur-[120px]"
        aria-hidden="true"
      />

      <div className="container-default relative z-10">
        <motion.div
          {...scrollReveal}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="inline-block px-4 py-2 text-xs font-semibold text-eco uppercase tracking-widest bg-eco/10 rounded-full mb-6">
            {siteCopy.cta.eyebrow}
          </span>

          <h2 className="heading-section text-white">
            {siteCopy.cta.title}
          </h2>

          <p className="body-large text-white/60 mt-6">
            {siteCopy.cta.subtitle}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <a
              className="btn-primary text-base px-8 py-4"
              href={siteCopy.links.partnerEmail}
              data-cursor="Email"
            >
              {siteCopy.cta.primary}
            </a>
            <a
              className="inline-flex items-center justify-center px-8 py-4 rounded-full text-sm font-semibold text-white border border-white/20 transition-all duration-300 hover:bg-white/10 hover:border-white/30 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-eco/30"
              href={siteCopy.links.phone}
              data-cursor="Call"
            >
              {siteCopy.cta.secondary}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
