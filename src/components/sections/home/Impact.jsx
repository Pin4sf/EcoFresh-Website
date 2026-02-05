import { motion } from 'framer-motion'
import { siteCopy } from '../../../content/siteCopy'
import { scrollReveal, staggerContainer, staggerItem } from '../../../lib/motion'
import useCountUp from '../../../hooks/useCountUp'

// Big impact numbers combining market opportunity and system output
const impactStats = [
  { value: 62, suffix: 'M+', label: 'Tonnes', description: 'Municipal waste generated annually in India' },
  { value: 55, suffix: '%', label: 'Organic', description: 'Food-contaminated fractions requiring on-site processing' },
  { prefix: '₹', value: 4.5, suffix: 'L Cr', label: 'Market', description: 'Projected Indian waste-management market by 2030', decimal: true },
]

function CountUpStat({ value, prefix = '', suffix = '', decimal = false }) {
  const { ref, value: count } = useCountUp(decimal ? value * 10 : value, 1200)

  return (
    <span ref={ref} className="stat-number tabular-nums whitespace-nowrap">
      {prefix}{decimal ? (count / 10).toFixed(1) : count}{suffix}
    </span>
  )
}

export default function Impact() {
  return (
    <section id="impact" className="min-h-screen flex flex-col justify-center py-24 md:py-32 bg-gradient-to-b from-mist/30 via-mist/50 to-sand relative overflow-hidden">
      {/* Decorative blur blob */}
      <div
        className="absolute top-1/3 right-0 w-[300px] h-[300px] bg-eco/5 rounded-full blur-[100px] pointer-events-none"
        aria-hidden="true"
        data-parallax="0.08"
      />
      <div
        className="absolute bottom-1/4 left-0 w-[200px] h-[200px] bg-sky/5 rounded-full blur-[80px] pointer-events-none"
        aria-hidden="true"
        data-parallax="0.12"
      />

      <div className="container-default relative z-10">
        <motion.div {...scrollReveal} className="text-center max-w-3xl mx-auto mb-16">
          <span className="section-eyebrow">{siteCopy.market.eyebrow}</span>
          <h2 className="heading-section mt-4">The Scale of Opportunity</h2>
          <p className="body-regular mt-4">
            India's waste management sector presents a transformative opportunity for impact-driven solutions.
          </p>
        </motion.div>

        <motion.div
          className="grid gap-6 md:grid-cols-3"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
        >
          {impactStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={staggerItem}
              className="group text-center p-6 rounded-2xl bg-white border border-ink/5 transition-all duration-300 hover:border-eco/20 hover:shadow-lg hover:shadow-eco/5"
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <CountUpStat
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                decimal={stat.decimal}
              />
              <p className="text-xs font-semibold text-eco uppercase tracking-wider mt-2">{stat.label}</p>
              <p className="text-sm text-ink-muted mt-3 leading-relaxed">{stat.description}</p>

              {/* Animated underline */}
              <motion.div
                className="mt-4 h-0.5 bg-eco/20 mx-auto"
                initial={{ width: 0 }}
                whileInView={{ width: '40%' }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
