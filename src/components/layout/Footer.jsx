import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Mail, Phone, ExternalLink } from 'lucide-react'
import { siteCopy } from '../../content/siteCopy'
import { staggerContainer, staggerItem, logoReveal } from '../../lib/motion'

export default function Footer() {
  return (
    <footer className="bg-ink text-sand relative overflow-hidden footer-glow-border">
      {/* === BACKGROUND LAYERS === */}

      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink to-ink" />

      {/* Grid pattern - reduced opacity */}
      <div className="absolute inset-0 footer-grid opacity-15" aria-hidden="true" />

      {/* Blur blob - eco green (top right) */}
      <div
        data-parallax="0.05"
        className="absolute -top-32 -right-32 w-[400px] h-[400px] md:w-[600px] md:h-[600px]
          bg-eco/8 rounded-full blur-[120px] pointer-events-none will-change-transform"
        aria-hidden="true"
      />

      {/* Blur blob - sky blue (bottom left) */}
      <div
        data-parallax="0.1"
        className="absolute -bottom-20 -left-32 w-[300px] h-[300px] md:w-[450px] md:h-[450px]
          bg-sky/6 rounded-full blur-[100px] pointer-events-none will-change-transform"
        aria-hidden="true"
      />

      {/* Secondary eco blob for depth */}
      <div
        data-parallax="0.15"
        className="absolute top-1/2 left-1/4 w-[200px] h-[200px]
          bg-eco/4 rounded-full blur-[80px] pointer-events-none will-change-transform"
        aria-hidden="true"
      />

      {/* Central spotlight */}
      <div className="absolute inset-0 spotlight-eco pointer-events-none" aria-hidden="true" />

      {/* Top edge glow line */}
      <div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r
          from-transparent via-eco/40 to-transparent"
        aria-hidden="true"
      />

      {/* === CONTENT LAYER === */}
      <div className="relative z-10 py-20">
        {/* Large logotype - full width */}
        <motion.div
          {...logoReveal}
          className="text-[15vw] md:text-[12vw] leading-none font-display font-semibold text-sand/90 tracking-tighter text-center w-full select-none"
        >
          EcoFresh
        </motion.div>

        {/* Rest of content in container */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
          className="container-default mt-8"
        >
        {/* Description */}
        <motion.p variants={staggerItem} className="mt-6 max-w-2xl text-sand/70">
          Decentralized, segregation-agnostic waste-to-value systems for Indian
          cities and institutions.
        </motion.p>

        {/* Trust chips */}
        <motion.div variants={staggerItem} className="mt-8 flex flex-wrap gap-3">
          {siteCopy.trustBar.items.map((item) => (
            <span
              key={item}
              className="chip bg-white/5 backdrop-blur-sm text-sand/80 border-sand/15
                hover:bg-white/10 hover:border-sand/25 transition-all duration-300"
            >
              {item}
            </span>
          ))}
        </motion.div>

        {/* Contact & Links Grid */}
        <motion.div
          variants={staggerItem}
          className="mt-12 grid gap-8 md:grid-cols-3"
        >
          {/* Contact Column */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-sand/50 mb-4">
              Contact
            </p>
            <div className="space-y-3">
              <motion.a
                href={siteCopy.links.partnerEmail}
                className="flex items-center gap-2 text-sand/80 hover:text-white transition-all duration-300 group"
                whileHover={{ x: 4 }}
                data-cursor="Email"
              >
                <Mail className="w-4 h-4 text-eco" />
                <span>ecofreshgreensync@gmail.com</span>
              </motion.a>
              <motion.a
                href={siteCopy.links.phone}
                className="flex items-center gap-2 text-sand/80 hover:text-white transition-all duration-300 group"
                whileHover={{ x: 4 }}
                data-cursor="Call"
              >
                <Phone className="w-4 h-4 text-eco" />
                <span>+91 96654 37830</span>
              </motion.a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-sand/50 mb-4">
              Quick Links
            </p>
            <div className="flex flex-col gap-2">
              <motion.div whileHover={{ x: 4 }}>
                <Link
                  to="/problem"
                  className="flex items-center gap-2 text-sand/80 hover:text-white transition-colors"
                >
                  Problem
                  <ArrowUpRight className="w-3 h-3 opacity-50" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ x: 4 }}>
                <Link
                  to="/impact"
                  className="flex items-center gap-2 text-sand/80 hover:text-white transition-colors"
                >
                  Impact
                  <ArrowUpRight className="w-3 h-3 opacity-50" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ x: 4 }}>
                <Link
                  to="/credibility"
                  className="flex items-center gap-2 text-sand/80 hover:text-white transition-colors"
                >
                  Credibility
                  <ArrowUpRight className="w-3 h-3 opacity-50" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ x: 4 }}>
                <Link
                  to="/team"
                  className="flex items-center gap-2 text-sand/80 hover:text-white transition-colors"
                >
                  Team
                  <ArrowUpRight className="w-3 h-3 opacity-50" />
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Resources Column */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-sand/50 mb-4">
              Resources
            </p>
            <div className="flex flex-col gap-2">
              <motion.a
                href={siteCopy.links.deck}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sand/80 hover:text-white transition-colors"
                whileHover={{ x: 4 }}
                data-cursor="Open"
              >
                Investor Deck
                <ExternalLink className="w-3 h-3 opacity-50" />
              </motion.a>
              <motion.div whileHover={{ x: 4 }}>
                <Link
                  to="/investors"
                  className="flex items-center gap-2 text-sand/80 hover:text-white transition-colors"
                >
                  Investors
                  <ArrowUpRight className="w-3 h-3 opacity-50" />
                </Link>
              </motion.div>
              <motion.a
                href="#hero"
                className="flex items-center gap-2 text-sand/80 hover:text-white transition-colors"
                whileHover={{ x: 4 }}
              >
                Back to top
                <ArrowUpRight className="w-3 h-3 opacity-50 rotate-[-45deg]" />
              </motion.a>
            </div>
          </div>
        </motion.div>
        </motion.div>
      </div>

      {/* === BOTTOM BAR === */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="relative z-10 border-t border-sand/10 py-4"
      >
        <div className="container-default flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-sand/50">
          <span>© {new Date().getFullYear()} EcoFresh. All rights reserved.</span>
          <span>Designed for impact, engineered for scale.</span>
        </div>
      </motion.div>
    </footer>
  )
}
