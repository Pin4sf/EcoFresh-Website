import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Globe, Droplets, Sprout, Zap, FlaskConical, Leaf, Boxes, Recycle } from 'lucide-react'
import { scrollReveal, staggerContainer, staggerItem } from '../lib/motion'
import { Icon } from '../components/ui/Icon'
import TextReveal from '../components/ui/TextReveal'
import { siteCopy } from '../content/siteCopy'

const roadmapIcons = [Globe, Droplets, Sprout, Zap]

const roadmap = siteCopy.impactPage.roadmap.map((stage, index) => ({
  ...stage,
  icon: roadmapIcons[index],
}))

const ladderIcons = [FlaskConical, Leaf, Boxes, Recycle]

function StatCard({ value, label, description }) {
  return (
    <div className="text-center p-6 rounded-2xl bg-white border border-ink/5">
      <p className="text-2xl md:text-3xl font-display font-bold whitespace-nowrap bg-gradient-to-br from-eco via-eco to-ink/80 bg-clip-text text-transparent">
        {value}
      </p>
      <p className="text-xs font-semibold text-eco uppercase tracking-wider mt-2">{label}</p>
      <p className="text-sm text-ink-muted mt-3 leading-relaxed">{description}</p>
    </div>
  )
}

export default function Impact() {
  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-sand via-sky/5 to-white relative overflow-hidden">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-sky/8 rounded-full blur-[100px] pointer-events-none" />

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
              className="section-eyebrow text-sky"
            >
              {siteCopy.impactPage.hero.eyebrow}
            </motion.span>
            <h1 className="heading-display mt-4">
              <TextReveal delay={0.2}>
                {siteCopy.impactPage.hero.lead}
              </TextReveal>
              <span className="text-sky inline-block">
                <TextReveal delay={0.25}>
                  {siteCopy.impactPage.hero.accent}
                </TextReveal>
              </span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="body-large mt-8 max-w-2xl"
            >
              {siteCopy.impactPage.hero.description}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Market Statistics */}
      <section className="py-20 bg-white">
        <div className="container-default">
          <motion.div {...scrollReveal} className="text-center max-w-3xl mx-auto mb-16">
            <span className="section-eyebrow">Current Evidence</span>
            <h2 className="heading-section mt-4">{siteCopy.impactPage.stageTitle}</h2>
            <p className="body-regular mt-4">
              {siteCopy.impactPage.stageDescription}
            </p>
          </motion.div>

          <motion.div
            className="grid gap-8 md:grid-cols-3"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {siteCopy.impactPage.stageStats.map((stat) => (
              <motion.div key={stat.label} variants={staggerItem}>
                <StatCard {...stat} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* System Output */}
      <section className="py-20 bg-mist">
        <div className="container-default">
          <motion.div {...scrollReveal} className="text-center max-w-3xl mx-auto mb-16">
            <span className="section-eyebrow">Designed Architecture</span>
            <h2 className="heading-section mt-4">{siteCopy.impactPage.systemTitle}</h2>
            <p className="body-regular mt-4">
              {siteCopy.impactPage.systemDescription}
            </p>
          </motion.div>

          <motion.div
            className="grid gap-8 md:grid-cols-3"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {siteCopy.impactPage.systemStats.map((stat) => (
              <motion.div key={stat.label} variants={staggerItem}>
                <StatCard {...stat} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Environmental Impact */}
      <section className="py-20 bg-white">
        <div className="container-default">
          <motion.div {...scrollReveal} className="text-center max-w-3xl mx-auto mb-16">
            <span className="section-eyebrow">{siteCopy.impactPage.roadmapEyebrow}</span>
            <h2 className="heading-section mt-4">{siteCopy.impactPage.roadmapTitle}</h2>
            <p className="body-regular mt-4">
              {siteCopy.impactPage.roadmapDescription}
            </p>
          </motion.div>

          <motion.div
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {roadmap.map((item) => (
              <motion.div
                key={item.title}
                variants={staggerItem}
                className="p-6 rounded-2xl bg-sand border border-ink/5 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-eco/10 flex items-center justify-center mx-auto">
                  <item.icon className="w-6 h-6 text-eco" />
                </div>
                <h3 className="font-semibold text-ink mt-4">{item.title}</h3>
                <p className="text-xl font-display font-bold text-eco mt-2">{item.stat}</p>
                <p className="text-xs text-ink-muted mt-3">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Conversion Visualization */}
      <section className="py-20 bg-ink text-white">
        <div className="container-default">
          <motion.div {...scrollReveal} className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 text-xs font-semibold text-eco uppercase tracking-widest bg-eco/10 rounded-full">
                {siteCopy.impactPage.ladderEyebrow}
              </span>
              <h2 className="heading-section text-white mt-6">
                {siteCopy.impactPage.ladderTitle}
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
              {siteCopy.impactPage.ladder.map((item, index) => (
                <div
                  key={item.output}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center"
                >
                  <Icon
                    icon={ladderIcons[index]}
                    size="lg"
                    container="circle"
                    containerBg="glass"
                    variant="inverse"
                    containerClassName="mx-auto"
                  />
                  <p className="font-semibold text-white mt-3">{item.output}</p>
                  <p className="text-xl font-display text-eco mt-1">{item.amount}</p>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <Link to="/credibility" className="btn-primary">
                Review the Record
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
