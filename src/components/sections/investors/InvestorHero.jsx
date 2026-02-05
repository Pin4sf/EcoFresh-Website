import { motion } from 'framer-motion'
import { siteCopy } from '../../../content/siteCopy'
import TextReveal from '../../ui/TextReveal'

export default function InvestorHero() {
  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-sand via-violet-50/30 to-white relative overflow-hidden" id="investor-hero">
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-violet-500/5 rounded-full blur-[100px] pointer-events-none" />

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
            className="section-eyebrow text-violet-600"
          >
            {siteCopy.investors.hero.eyebrow}
          </motion.span>
          <h1 className="heading-display mt-4">
            <TextReveal delay={0.2}>
              {siteCopy.investors.hero.title}
            </TextReveal>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="body-large mt-8 max-w-3xl"
          >
            {siteCopy.investors.hero.subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex flex-wrap gap-3 mt-10"
          >
            <a className="btn-primary" href={siteCopy.links.deck} target="_blank" rel="noopener noreferrer" data-cursor="Open">
              Open Investor Deck
            </a>
            <a className="btn-outline" href={siteCopy.links.investorEmail} data-cursor="Email">
              Contact EcoFresh
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
