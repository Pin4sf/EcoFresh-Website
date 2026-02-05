import { motion } from 'framer-motion'
import { siteCopy } from '../../../content/siteCopy'
import { scrollReveal, staggerContainer, staggerItem } from '../../../lib/motion'

export default function TeamSection() {
  return (
    <section id="team" className="min-h-screen flex flex-col justify-center py-24 md:py-32 bg-gradient-to-b from-mist/30 via-sand to-sand relative overflow-hidden">
      {/* Decorative blur blob */}
      <div
        className="absolute bottom-1/4 right-0 w-[300px] h-[300px] bg-sky/5 rounded-full blur-[100px] pointer-events-none"
        aria-hidden="true"
        data-parallax="0.1"
      />
      <div className="container-default relative z-10">
        <motion.div {...scrollReveal} className="text-center max-w-3xl mx-auto mb-16">
          <span className="section-eyebrow">{siteCopy.team.eyebrow}</span>
          <h2 className="heading-section mt-4">{siteCopy.team.title}</h2>
          <p className="body-regular mt-4">{siteCopy.team.subtitle}</p>
        </motion.div>

        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
        >
          {siteCopy.team.members.map((member) => (
            <motion.div
              key={member.name}
              variants={staggerItem}
              className="group text-center p-6 rounded-3xl border border-ink/10 bg-white transition-all duration-300 hover:border-eco/20 hover:shadow-lg hover:shadow-eco/5"
            >
              <div className="relative inline-block">
                <img
                  src={member.image}
                  alt={member.name}
                  width={112}
                  height={112}
                  className="h-28 w-28 rounded-full object-cover mx-auto border-4 border-white shadow-lg"
                  loading="lazy"
                />
                <div className="absolute inset-0 rounded-full border-2 border-eco/0 group-hover:border-eco/30 transition-all duration-300" />
              </div>
              <h3 className="mt-5 font-semibold text-ink">{member.name}</h3>
              {member.tagline && (
                <p className="text-sm font-medium text-eco mt-1">{member.tagline}</p>
              )}
              <p className="text-xs text-ink-muted mt-1">{member.role}</p>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-eco mt-4 hover:underline"
                data-cursor="Connect"
              >
                <LinkedInIcon />
                LinkedIn
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}
