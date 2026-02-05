import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { siteCopy } from '../content/siteCopy'
import { scrollReveal, staggerContainer, staggerItem } from '../lib/motion'
import TextReveal from '../components/ui/TextReveal'

const tabs = [
  { id: 'recognitions', label: 'Recognitions' },
  { id: 'endorsements', label: 'Expert Opinions' },
  { id: 'timeline', label: 'Timeline' },
]

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

const timeline = [
  {
    date: 'June 2025',
    title: 'MoE National Recognition',
    description: 'Ministry of Education recognizes EcoFresh for innovation in waste-to-value technology.',
  },
  {
    date: 'September 2025',
    title: 'MoE-IIC x IITDM Jabalpur Incubation',
    description: 'Formal incubation under Institution\'s Innovation Council at IITDM Jabalpur.',
  },
  {
    date: 'November 2025',
    title: 'DPIIT Startup Recognition',
    description: 'Department for Promotion of Industry and Internal Trade recognizes EcoFresh as a registered startup.',
  },
  {
    date: 'January 2026',
    title: 'Hult Prize International Merit',
    description: 'Recognition at the world\'s largest social entrepreneurship competition backed by the UN.',
  },
]

export default function Credibility() {
  const [activeTab, setActiveTab] = useState('recognitions')

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-sand via-mist/30 to-white relative overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-eco/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container-default relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl"
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="section-eyebrow"
            >
              Credibility
            </motion.span>
            <h1 className="heading-display mt-4">
              <TextReveal delay={0.2}>
                Backed by
              </TextReveal>
              <span className="text-eco inline-block">
                <TextReveal delay={0.35}>
                  National & International
                </TextReveal>
              </span>
              <TextReveal delay={0.5}>
                Recognition
              </TextReveal>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="body-large mt-8 max-w-2xl"
            >
              EcoFresh is recognized by leading government bodies, academic institutions,
              and international organizations. Our work is validated by experts and
              supported by formal documentation.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Trust Marquee */}
      <div className="py-6 border-y border-ink/5 overflow-hidden bg-mist/50">
        <div className="marquee">
          <div className="marquee-track">
            {[...siteCopy.credibility.logos, 'DPIIT Recognized', 'MoE-IIC Incubated', 'Patent Filed', 'IITDM Jabalpur'].map((item, i) => (
              <span key={`${item}-${i}`} className="marquee-item">{item}</span>
            ))}
            {[...siteCopy.credibility.logos, 'DPIIT Recognized', 'MoE-IIC Incubated', 'Patent Filed', 'IITDM Jabalpur'].map((item, i) => (
              <span key={`${item}-dup-${i}`} className="marquee-item">{item}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <section className="py-20 bg-white">
        <div className="container-default">
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
              >
                {tab.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'recognitions' && (
              <motion.div
                key="recognitions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* National Recognition */}
                <div className="mb-16">
                  <p className="text-sm font-semibold text-eco mb-8 uppercase tracking-wider text-center">
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
                        className="flex items-center justify-center p-6 rounded-2xl bg-sand border border-ink/5 hover:border-eco/20 transition-all duration-300 hover:shadow-lg"
                      >
                        <img
                          src={logo.src}
                          alt={logo.name}
                          className="h-16 md:h-20 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                          loading="lazy"
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                {/* International Recognition */}
                <div className="mb-16">
                  <p className="text-sm font-semibold text-eco mb-8 uppercase tracking-wider text-center">
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
                        className="flex items-center justify-center p-6 rounded-2xl bg-sand border border-ink/5 hover:border-eco/20 transition-all duration-300 hover:shadow-lg"
                      >
                        <img
                          src={logo.src}
                          alt={logo.name}
                          className="h-16 md:h-20 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                          loading="lazy"
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                {/* Detailed Recognition Lists */}
                <div className="grid gap-8 md:grid-cols-2 mt-12">
                  <div className="rounded-3xl border border-ink/10 bg-sand p-8">
                    <p className="text-sm font-semibold text-eco mb-6 uppercase tracking-wider">
                      National Recognition Details
                    </p>
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
                  <div className="rounded-3xl border border-ink/10 bg-sand p-8">
                    <p className="text-sm font-semibold text-eco mb-6 uppercase tracking-wider">
                      International Merit Details
                    </p>
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
                  className="absolute -bottom-20 -right-20 w-80 opacity-[0.07] pointer-events-none select-none hidden lg:block"
                  aria-hidden="true"
                />

                <div className="text-center max-w-3xl mx-auto mb-12 relative z-10">
                  <h2 className="heading-section">{siteCopy.endorsements.title}</h2>
                  <p className="body-regular mt-4">
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
                      className="dashed-card"
                    >
                      <p className="text-ink italic leading-relaxed text-lg">
                        &ldquo;{quote.quote}&rdquo;
                      </p>
                      <div className="mt-6 pt-4 border-t border-ink/10">
                        <p className="font-semibold text-ink">{quote.name}</p>
                        <p className="text-xs text-ink-muted mt-1">{quote.title}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'timeline' && (
              <motion.div
                key="timeline"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center max-w-3xl mx-auto mb-12">
                  <h2 className="heading-section">Our Journey</h2>
                  <p className="body-regular mt-4">
                    Key milestones in EcoFresh's growth and recognition.
                  </p>
                </div>

                <div className="max-w-3xl mx-auto">
                  {timeline.map((item, i) => (
                    <motion.div
                      key={item.date}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.15 }}
                      className="relative pl-8 pb-12 last:pb-0"
                    >
                      {/* Timeline line */}
                      {i < timeline.length - 1 && (
                        <div className="absolute left-[11px] top-6 bottom-0 w-0.5 bg-gradient-to-b from-eco to-eco/20" />
                      )}
                      {/* Timeline dot */}
                      <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-eco/10 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-eco" />
                      </div>

                      <div className="rounded-2xl bg-sand border border-ink/5 p-6">
                        <span className="text-xs font-semibold text-eco uppercase tracking-wider">
                          {item.date}
                        </span>
                        <h3 className="heading-card mt-2">{item.title}</h3>
                        <p className="text-sm text-ink-muted mt-2">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-ink text-white">
        <div className="container-default text-center">
          <motion.div {...scrollReveal}>
            <h2 className="heading-section text-white">Meet the Team Behind EcoFresh</h2>
            <p className="body-large text-white/60 mt-4 max-w-2xl mx-auto">
              Learn about the founders driving India's waste-to-value revolution.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link to="/team" className="btn-primary">
                Meet the Team
              </Link>
              <Link to="/" className="btn-glass">
                Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
