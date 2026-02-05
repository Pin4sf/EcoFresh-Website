import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Globe, Droplets, Sprout, Zap, FlaskConical, Leaf, Boxes, Recycle } from 'lucide-react'
import { scrollReveal, staggerContainer, staggerItem } from '../lib/motion'
import { Icon } from '../components/ui/Icon'
import TextReveal from '../components/ui/TextReveal'

const marketStats = [
  { value: '62M+', label: 'Tonnes', description: 'Municipal waste generated annually in India' },
  { value: '55%', label: 'Organic', description: 'Food-contaminated fractions requiring on-site processing' },
  { value: '₹4.5L Cr', label: 'Market', description: 'Projected Indian waste-management market by 2030' },
]

const systemOutputs = [
  { value: '90K', label: 'kg/month', description: 'Waste processed per month (3-TPD system)' },
  { value: '45T', label: 'Bioplastic', description: 'Tonnes of standardized bioplastic monthly' },
  { value: '20T', label: 'Bio-fertilizer', description: 'Tonnes of organic bio-fertilizer monthly' },
]

const environmentalImpact = [
  {
    icon: Globe,
    title: 'Carbon Reduction',
    stat: '~12 tonnes',
    description: 'CO₂ equivalent prevented per 3-TPD unit monthly through diversion from landfills',
  },
  {
    icon: Droplets,
    title: 'Water Saved',
    stat: '~50,000 L',
    description: 'Water conserved monthly by reducing plastic production from virgin resources',
  },
  {
    icon: Sprout,
    title: 'Land Preserved',
    stat: '~1,000 m²',
    description: 'Landfill space saved annually per deployed unit',
  },
  {
    icon: Zap,
    title: 'Energy Efficient',
    stat: 'Low-energy',
    description: 'Controlled conversion process designed for minimal energy consumption',
  },
]

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
              Market Opportunity
            </motion.span>
            <h1 className="heading-display mt-4">
              <TextReveal delay={0.2}>
                A
              </TextReveal>
              <span className="text-sky inline-block">
                <TextReveal delay={0.25}>
                  ₹4.5 Lakh Crore
                </TextReveal>
              </span>
              <TextReveal delay={0.4}>
                Market Waiting for the Right Solution
              </TextReveal>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="body-large mt-8 max-w-2xl"
            >
              India's waste management sector is at an inflection point. The combination of
              regulatory pressure, ESG mandates, and genuine environmental concern is creating
              unprecedented demand for effective solutions.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Market Statistics */}
      <section className="py-20 bg-white">
        <div className="container-default">
          <motion.div {...scrollReveal} className="text-center max-w-3xl mx-auto mb-16">
            <span className="section-eyebrow">The Numbers</span>
            <h2 className="heading-section mt-4">Scale of the Opportunity</h2>
            <p className="body-regular mt-4">
              India generates more municipal solid waste than any country except China.
              Yet, less than 30% is processed effectively.
            </p>
          </motion.div>

          <motion.div
            className="grid gap-8 md:grid-cols-3"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {marketStats.map((stat, i) => (
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
            <span className="section-eyebrow">System Performance</span>
            <h2 className="heading-section mt-4">What One EcoFresh Unit Delivers</h2>
            <p className="body-regular mt-4">
              A single 3-TPD Eco Converter transforms municipal waste into valuable outputs.
            </p>
          </motion.div>

          <motion.div
            className="grid gap-8 md:grid-cols-3"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {systemOutputs.map((stat) => (
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
            <span className="section-eyebrow">Environmental Impact</span>
            <h2 className="heading-section mt-4">Real Environmental Benefits</h2>
            <p className="body-regular mt-4">
              Every EcoFresh deployment creates measurable environmental value.
            </p>
          </motion.div>

          <motion.div
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {environmentalImpact.map((item) => (
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
                Material Flow
              </span>
              <h2 className="heading-section text-white mt-6">
                1 kg Mixed Waste → Multiple Value Streams
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
              {[
                { output: 'Bioplastic', amount: '450-500g', icon: FlaskConical },
                { output: 'Bio-fertilizer', amount: '180-220g', icon: Leaf },
                { output: 'Eco-composite', amount: '250-300g', icon: Boxes },
                { output: 'Total Recovery', amount: '~95%', icon: Recycle },
              ].map((item) => (
                <div
                  key={item.output}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center"
                >
                  <Icon
                    icon={item.icon}
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
                See Our Credibility
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
