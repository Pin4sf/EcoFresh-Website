import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { siteCopy } from '../content/siteCopy'
import { scrollReveal, staggerContainer, staggerItem } from '../lib/motion'
import TextReveal from '../components/ui/TextReveal'

const founderDetails = [
  {
    name: 'Ark Patil',
    tagline: 'The Visionary',
    role: 'CEO · Biosensing & Performance',
    image: '/assets/Team/Ark.jpeg',
    linkedin: 'https://www.linkedin.com/in/ark-patil-a280a4218/',
    bio: 'Leads strategy and institutional partnerships. Responsible for building relationships with government bodies, investors, and deployment partners.',
    expertise: ['Strategic Planning', 'Institutional Partnerships', 'Business Development'],
  },
  {
    name: 'Shivansh Fulper',
    tagline: 'The Architect',
    role: 'CTO · AI & Systems',
    image: '/assets/Team/Shivansh.png',
    linkedin: 'https://www.linkedin.com/in/shivanshfulper/',
    bio: 'Designs and develops the core conversion systems and EcoSync platform. Responsible for technology architecture and process engineering.',
    expertise: ['Systems Engineering', 'AI & ML', 'Process Design'],
  },
  {
    name: 'Ansh Bathija',
    tagline: 'The Operator',
    role: 'COO · Manufacturing & Ops',
    image: '/assets/Team/ANsh.jpeg',
    linkedin: 'https://www.linkedin.com/in/ansh-bathija-45b36121b/',
    bio: 'Manages operations and deployment logistics. Ensures smooth execution of pilot programs and scaling operations.',
    expertise: ['Operations', 'Supply Chain', 'Project Management'],
  },
  {
    name: 'Mayur Kumar',
    tagline: 'The Builder',
    role: 'CPO · Product & Hardware',
    image: '/assets/Team/Mayur.png',
    linkedin: 'https://www.linkedin.com/in/mayur-kumar-4751a2272/',
    bio: 'Leads product design and hardware development. Translates system requirements into manufacturable, deployable units.',
    expertise: ['Product Design', 'Hardware Engineering', 'Manufacturing'],
  },
]

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

export default function Team() {
  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-sand via-amber-50/30 to-white relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container-default relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="section-eyebrow text-amber-600"
            >
              {siteCopy.team.eyebrow}
            </motion.span>
            <h1 className="heading-display mt-4">
              <TextReveal delay={0.2}>
                {siteCopy.team.title}
              </TextReveal>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="body-large mt-8 max-w-3xl mx-auto"
            >
              {siteCopy.team.subtitle}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Team Grid - Compact View */}
      <section className="py-20 bg-white">
        <div className="container-default">
          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
          >
            {founderDetails.map((member) => (
              <motion.div
                key={member.name}
                variants={staggerItem}
                className="group text-center p-6 rounded-2xl border border-ink/10 bg-sand transition-all duration-300 hover:border-eco/20 hover:shadow-lg hover:shadow-eco/5"
              >
                <div className="relative inline-block">
                  <img
                    src={member.image}
                    alt={member.name}
                    width={120}
                    height={120}
                    className="h-30 w-30 rounded-full object-cover mx-auto border-4 border-white shadow-lg"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 rounded-full border-2 border-eco/0 group-hover:border-eco/30 transition-all duration-300" />
                </div>
                <h3 className="mt-5 font-semibold text-ink">{member.name}</h3>
                <p className="text-sm font-medium text-eco mt-1">{member.tagline}</p>
                <p className="text-xs text-ink-muted mt-1">{member.role}</p>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-eco mt-4 hover:underline"
                  data-cursor="Connect"
                >
                  <LinkedInIcon />
                  Connect
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Detailed Founder Cards */}
      <section className="py-20 bg-mist">
        <div className="container-default">
          <motion.div {...scrollReveal} className="text-center max-w-3xl mx-auto mb-16">
            <span className="section-eyebrow">Meet the Founders</span>
            <h2 className="heading-section mt-4">Expertise & Background</h2>
            <p className="body-regular mt-4">
              Each founder brings unique skills and experience to solve India's waste challenge.
            </p>
          </motion.div>

          <div className="space-y-8">
            {founderDetails.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-3xl border border-ink/5 p-8 md:p-10"
              >
                <div className="grid gap-8 md:grid-cols-[200px_1fr] items-start">
                  <div className="text-center md:text-left">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-40 h-40 rounded-2xl object-cover mx-auto md:mx-0 shadow-lg"
                    />
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-4 text-sm text-eco hover:underline"
                      data-cursor="Connect"
                    >
                      <LinkedInIcon />
                      LinkedIn Profile
                    </a>
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-2xl font-display font-semibold text-ink">
                        {member.name}
                      </h3>
                      <span className="px-3 py-1 rounded-full bg-eco/10 text-eco text-sm font-medium">
                        {member.tagline}
                      </span>
                    </div>
                    <p className="text-ink-muted mt-1">{member.role}</p>

                    <p className="mt-6 text-ink-muted leading-relaxed">{member.bio}</p>

                    <div className="mt-6">
                      <p className="text-xs font-semibold text-ink uppercase tracking-wider mb-3">
                        Areas of Expertise
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {member.expertise.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1.5 rounded-full bg-sand text-xs font-medium text-ink-muted"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Connect with Team */}
      <section className="py-12 bg-white border-t border-ink/5">
        <div className="container-default">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-display font-semibold text-ink">
                Connect with Our Team
              </h3>
              <p className="text-ink-muted mt-1">
                Follow our founders on LinkedIn for updates on EcoFresh's journey.
              </p>
            </div>
            <div className="flex gap-3">
              {founderDetails.map((member) => (
                <a
                  key={member.name}
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                  title={member.name}
                  data-cursor="Connect"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md transition-transform group-hover:scale-110"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-ink text-white">
        <div className="container-default text-center">
          <motion.div {...scrollReveal}>
            <h2 className="heading-section text-white">Ready to Partner?</h2>
            <p className="body-large text-white/60 mt-4 max-w-2xl mx-auto">
              Join us in building India's waste-to-value infrastructure.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a href={siteCopy.links.partnerEmail} className="btn-primary" data-cursor="Email">
                Start a Partnership
              </a>
              <a href={siteCopy.links.deck} target="_blank" rel="noopener noreferrer" className="btn-glass" data-cursor="Open">
                View Investor Deck
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
