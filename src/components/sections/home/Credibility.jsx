import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Award, Trophy, Rocket } from 'lucide-react'
import { siteCopy } from '../../../content/siteCopy'
import { scrollReveal, staggerContainer, staggerItem } from '../../../lib/motion'
import useCountUp from '../../../hooks/useCountUp'

const tabs = [
  { id: 'recognitions', label: 'Recognitions' },
  { id: 'endorsements', label: 'Expert Opinions' },
]

// Achievement stats from SMARK deck
const achievements = [
  {
    icon: Trophy,
    value: 16,
    suffix: 'th',
    label: 'Global Rank',
    description: 'Hult Prize among 2,500+ teams from 6 countries',
    highlight: 'Hult Prize × IIT Bombay',
  },
  {
    icon: Award,
    value: 10,
    suffix: '%',
    prefix: 'Top ',
    label: 'Academic Incubations',
    description: '90% of innovations never reach national academic incubation',
    highlight: 'IITDM Jabalpur × IIC',
  },
  {
    icon: Rocket,
    value: 0.3,
    suffix: '%',
    label: 'DPIIT Recognized',
    description: 'Among ~2 lakh recognized out of 6+ crore MSMEs',
    highlight: 'Startup India',
    decimal: true,
  },
]

function AchievementCard({ achievement, index }) {
  const { ref, value } = useCountUp(
    achievement.decimal ? achievement.value * 10 : achievement.value,
    1500
  )
  const Icon = achievement.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="group relative bg-white rounded-2xl border border-ink/10 p-6 overflow-hidden transition-all duration-300 hover:border-eco/30 hover:shadow-lg hover:shadow-eco/5"
      whileHover={{ y: -4 }}
    >
      {/* Background glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-eco/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10">
        {/* Icon */}
        <div className="w-10 h-10 rounded-xl bg-eco/10 flex items-center justify-center mb-4 group-hover:bg-eco/20 transition-colors">
          <Icon className="w-5 h-5 text-eco" />
        </div>

        {/* Stat */}
        <p ref={ref} className="text-2xl md:text-3xl font-display font-bold text-ink whitespace-nowrap">
          {achievement.prefix || ''}
          {achievement.decimal ? (value / 10).toFixed(1) : value}
          {achievement.suffix}
        </p>

        <p className="text-xs font-semibold text-eco uppercase tracking-wider mt-2">
          {achievement.label}
        </p>

        <p className="text-sm text-ink-muted mt-2 leading-relaxed">
          {achievement.description}
        </p>

        {/* Highlight tag */}
        <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mist text-xs font-medium text-ink-muted">
          <span className="w-1.5 h-1.5 rounded-full bg-eco" />
          {achievement.highlight}
        </div>
      </div>
    </motion.div>
  )
}

// Recognition and partner logos
const nationalLogos = [
  { name: 'DPIIT', src: '/assets/brand/credibility/DPIIT-Small.png' },
  { name: 'Government of India', src: '/assets/brand/credibility/GOI-logo.png' },
  { name: 'IIC', src: '/assets/brand/credibility/IIC-logo.png' },
  { name: 'IITDM Jabalpur', src: '/assets/brand/credibility/IIITDMJ-logo.png' },
  { name: 'MSME', src: '/assets/brand/credibility/MSME.png' },
  { name: 'Startup India', src: '/assets/brand/credibility/Group 10.png' },
]

const internationalLogos = [
  { name: 'Hult Prize', src: '/assets/brand/credibility/hult-prize-high.png' },
  { name: 'IIT Bombay', src: '/assets/brand/credibility/IITB.png' },
  { name: 'India AI Global Summit', src: '/assets/brand/credibility/AI-impact-summit.png' },
  { name: 'Startup School', src: '/assets/brand/credibility/Group 7.png' },
  { name: 'Build3', src: '/assets/brand/credibility/build3.png' },
  { name: 'Cohort', src: '/assets/brand/credibility/Group 8.png' },
]

// Trust marquee items
const trustItems = [
  ...siteCopy.credibility.logos,
  'DPIIT Recognized',
  'MoE-IIC Incubated',
  'Patent Filed',
  'IITDM Jabalpur',
]

export default function Credibility() {
  const [activeTab, setActiveTab] = useState('recognitions')

  return (
    <section id="credibility" className="min-h-screen flex flex-col justify-center bg-gradient-to-b from-sand via-sand to-mist/30 relative overflow-hidden">
      {/* Decorative parallax elements */}
      <motion.img
        src="/assets/brand/credibility/thrash_vector.png"
        alt=""
        aria-hidden="true"
        className="absolute bottom-20 right-10 w-28 md:w-40 opacity-[0.04] pointer-events-none select-none -rotate-12"
        data-parallax="0.12"
      />
      <div
        className="absolute top-1/4 left-0 w-[250px] h-[250px] bg-eco/5 rounded-full blur-[80px] pointer-events-none"
        aria-hidden="true"
        data-parallax="0.06"
      />

      {/* Trust Marquee */}
      <div className="py-6 border-y border-ink/5 overflow-hidden bg-mist/30">
        <div className="marquee">
          <div className="marquee-track">
            {/* Duplicate for seamless loop */}
            {[...trustItems, ...trustItems].map((item, i) => (
              <span key={`${item}-${i}`} className="marquee-item">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Achievement Stats - Key Differentiators */}
      <div className="py-16 md:py-20 bg-gradient-to-b from-mist/30 to-sand">
        <div className="container-default">
          <motion.div {...scrollReveal} className="text-center max-w-2xl mx-auto mb-12">
            <span className="section-eyebrow">Key Achievements</span>
            <h3 className="heading-subsection mt-4">Positioned in the Top Tier</h3>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {achievements.map((achievement, i) => (
              <AchievementCard key={achievement.label} achievement={achievement} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-24 md:py-32 -mt-12">
        <div className="container-default">
          <motion.div {...scrollReveal} className="text-center max-w-3xl mx-auto mb-12">
            <span className="section-eyebrow">{siteCopy.credibility.eyebrow}</span>
            <h2 className="heading-section mt-4">{siteCopy.credibility.title}</h2>
            <p className="body-regular mt-4">
              Recognitions, certifications, and endorsements supported by official documentation.
            </p>
          </motion.div>

          {/* Tab Navigation */}
          <div className="flex justify-center gap-2 mb-12">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-eco text-white'
                    : 'bg-mist text-ink-muted hover:bg-mist/80'
                }`}
                data-cursor="Switch"
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'recognitions' && (
              <motion.div
                key="recognitions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Logo Grids */}
                <div className="mb-12">
                  <p className="text-sm font-semibold text-eco mb-6 uppercase tracking-wider text-center">
                    National Recognition
                  </p>
                  <motion.div
                    className="flex flex-wrap justify-center items-center gap-6 md:gap-10"
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                  >
                    {nationalLogos.map((logo) => (
                      <motion.div
                        key={logo.name}
                        variants={staggerItem}
                        className="flex items-center justify-center p-4 rounded-2xl bg-sand border border-ink/5 hover:border-eco/20 transition-colors"
                      >
                        <img
                          src={logo.src}
                          alt={logo.name}
                          className="h-12 md:h-14 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                          loading="lazy"
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                <div className="mb-12">
                  <p className="text-sm font-semibold text-eco mb-6 uppercase tracking-wider text-center">
                    International Merit & Programs
                  </p>
                  <motion.div
                    className="flex flex-wrap justify-center items-center gap-6 md:gap-10"
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                  >
                    {internationalLogos.map((logo) => (
                      <motion.div
                        key={logo.name}
                        variants={staggerItem}
                        className="flex items-center justify-center p-4 rounded-2xl bg-sand border border-ink/5 hover:border-eco/20 transition-colors"
                      >
                        <img
                          src={logo.src}
                          alt={logo.name}
                          className="h-12 md:h-14 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                          loading="lazy"
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                {/* Recognition Details */}
                <div className="grid gap-8 md:grid-cols-2">
                  <div className="rounded-3xl border border-ink/10 bg-sand p-6 md:p-8">
                    <p className="text-sm font-semibold text-eco mb-6 uppercase tracking-wider">National Recognition Details</p>
                    <ul className="space-y-4">
                      {siteCopy.credibility.national.map((item) => (
                        <li key={item} className="flex gap-3 text-sm text-ink-muted">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-eco/10 flex items-center justify-center mt-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-eco" />
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-3xl border border-ink/10 bg-sand p-6 md:p-8">
                    <p className="text-sm font-semibold text-eco mb-6 uppercase tracking-wider">International Merit Details</p>
                    <ul className="space-y-4">
                      {siteCopy.credibility.international.map((item) => (
                        <li key={item} className="flex gap-3 text-sm text-ink-muted">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-eco/10 flex items-center justify-center mt-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-eco" />
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'endorsements' && (
              <motion.div
                key="endorsements"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                {/* Decorative SMARK illustration */}
                <img
                  src="/assets/misc/SMARK (1)/A4 - 31.png"
                  alt=""
                  className="absolute -bottom-20 -right-20 w-80 opacity-[0.06] pointer-events-none select-none hidden lg:block"
                  aria-hidden="true"
                />

                <div className="text-center max-w-3xl mx-auto mb-12 relative z-10">
                  <h3 className="heading-subsection">{siteCopy.endorsements.title}</h3>
                  <p className="body-regular mt-4 text-ink-muted">
                    Guidance and perspective from leading experts in technology, sustainability, and innovation.
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 relative z-10">
                  {siteCopy.endorsements.quotes.map((quote, i) => (
                    <motion.div
                      key={quote.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="group relative bg-white rounded-3xl border-2 border-dashed border-eco/30 p-6 md:p-8 hover:border-eco/50 hover:shadow-lg transition-all duration-300"
                      whileHover={{ y: -4 }}
                    >
                      {/* Quote icon */}
                      <div className="absolute -top-3 left-6 w-8 h-8 rounded-full bg-eco flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                      </div>

                      {/* Quote text */}
                      <p className="text-ink italic leading-relaxed text-lg mt-4">
                        &ldquo;{quote.quote}&rdquo;
                      </p>

                      {/* Author */}
                      <div className="mt-6 pt-4 border-t border-ink/10 flex items-center gap-4">
                        {/* Avatar placeholder with initials */}
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-eco/20 to-eco/10 flex items-center justify-center border-2 border-eco/30">
                          <span className="text-eco font-semibold text-sm">
                            {quote.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-ink">{quote.name}</p>
                          <p className="text-xs text-ink-muted mt-0.5 leading-relaxed">{quote.title}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Footer note */}
                <p className="text-center text-xs text-ink-muted mt-8 italic">
                  Reflections shared during direct academic and institutional interactions
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
