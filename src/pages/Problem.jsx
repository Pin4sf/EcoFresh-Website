import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Truck, Factory, Cog, BarChart3 } from 'lucide-react'
import { siteCopy } from '../content/siteCopy'
import { scrollReveal, staggerContainer, staggerItem } from '../lib/motion'
import { Icon } from '../components/ui/Icon'
import TextReveal from '../components/ui/TextReveal'

const wasteBreakdown = [
  { category: 'Organic Waste', percentage: 55, color: 'bg-eco' },
  { category: 'Plastic & Packaging', percentage: 15, color: 'bg-amber-500' },
  { category: 'Paper & Cardboard', percentage: 10, color: 'bg-blue-500' },
  { category: 'Inert & Others', percentage: 20, color: 'bg-gray-400' },
]

const challengeIcons = [Truck, Factory, Cog, BarChart3]

const challenges = siteCopy.problemPage.challenges.map((challenge, index) => ({
  ...challenge,
  icon: challengeIcons[index],
}))

export default function Problem() {
  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-sand via-mist/30 to-white relative overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[100px] pointer-events-none" />

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
              className="section-eyebrow text-red-600"
            >
              {siteCopy.problemPage.hero.eyebrow}
            </motion.span>
            <h1 className="heading-display mt-4">
              <TextReveal delay={0.2}>
                {siteCopy.problemPage.hero.lead}
              </TextReveal>
              <span className="text-red-600 inline-block">
                <TextReveal delay={0.4}>
                  {siteCopy.problemPage.hero.accent}
                </TextReveal>
              </span>
              <TextReveal delay={0.5}>
                {siteCopy.problemPage.hero.tail}
              </TextReveal>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="body-large mt-8 max-w-2xl"
            >
              {siteCopy.problemPage.hero.description}
            </motion.p>

            {/* Emotional impact stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-12 grid gap-6 sm:grid-cols-3"
            >
              {siteCopy.problemPage.stats.map((stat) => (
                <div key={stat.value} className="p-5 rounded-2xl bg-red-50 border border-red-100">
                  <p className="text-3xl font-display font-bold text-red-600">{stat.value}</p>
                  <p className="text-sm text-red-800/70 mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Waste Composition */}
      <section className="py-20 bg-white">
        <div className="container-default">
          <motion.div {...scrollReveal} className="grid gap-16 lg:grid-cols-2 items-center">
            <div>
              <span className="section-eyebrow">Waste Composition</span>
              <h2 className="heading-section mt-4">What's in Indian Municipal Waste?</h2>
              <p className="body-regular mt-6">
                Unlike developed nations with mature waste segregation, Indian municipal solid waste
                arrives mixed and contaminated. Understanding this composition is key to designing
                effective processing systems.
              </p>

              <div className="mt-8 space-y-4">
                {wasteBreakdown.map((item) => (
                  <div key={item.category}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium text-ink">{item.category}</span>
                      <span className="text-ink-muted">{item.percentage}%</span>
                    </div>
                    <div className="h-3 bg-mist rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full ${item.color} rounded-full`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid gap-4 sm:grid-cols-2"
            >
              {siteCopy.problem.stats.map((stat) => (
                <motion.div
                  key={stat.title}
                  variants={staggerItem}
                  className="p-6 rounded-2xl bg-sand border border-ink/5"
                >
                  <p className="stat-number text-3xl">{stat.title}</p>
                  <p className="text-sm text-ink-muted mt-2">{stat.text}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Core Challenges */}
      <section className="py-20 bg-mist">
        <div className="container-default">
          <motion.div {...scrollReveal} className="text-center max-w-3xl mx-auto mb-16">
            <span className="section-eyebrow">Core Challenges</span>
            <h2 className="heading-section mt-4">Why Current Solutions Fail</h2>
            <p className="body-regular mt-4">
              The Indian waste management ecosystem wasn't designed for processing. It was designed for disposal.
            </p>
          </motion.div>

          <motion.div
            className="grid gap-6 md:grid-cols-2"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {challenges.map((challenge) => (
              <motion.div
                key={challenge.title}
                variants={staggerItem}
                className="p-8 rounded-3xl bg-white border border-ink/5 hover:border-eco/20 transition-colors"
              >
                <Icon
                  icon={challenge.icon}
                  size="lg"
                  container="circle"
                  containerBg="sand"
                  variant="primary"
                />
                <h3 className="heading-card mt-4">{challenge.title}</h3>
                <p className="text-ink-muted mt-3">{challenge.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-ink text-white">
        <div className="container-default text-center">
          <motion.div {...scrollReveal}>
            <h2 className="heading-section text-white">{siteCopy.problemPage.ctaTitle}</h2>
            <p className="body-large text-white/60 mt-4 max-w-2xl mx-auto">
              {siteCopy.problemPage.ctaDescription}
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link to="/impact" className="btn-primary">
                Explore the Build Path
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
