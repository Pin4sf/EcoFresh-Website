import { useRef, useMemo } from 'react'
import { useScroll, useTransform, motion } from 'framer-motion'
import { AlertTriangle, Sparkles, TrendingUp } from 'lucide-react'
import { staggerContainer, staggerItem } from '../../../lib/motion'

/**
 * ValueProposition - Sticky Scroll Storytelling Section
 *
 * 3-panel immersive experience:
 * 1. The Crisis - Visualizing the waste problem
 * 2. The Innovation - EcoConverter solution
 * 3. The Impact - Measurable outcomes
 *
 * Uses scroll-locked panels that transition smoothly
 */

// Panel content data
const panels = [
  {
    id: 'crisis',
    eyebrow: 'The Crisis',
    title: 'India generates 62M+ tons of waste annually',
    description: 'Only 20% gets processed. The rest ends up in landfills, oceans, and air we breathe.',
    icon: AlertTriangle,
    iconColor: 'text-red-500',
    stats: [
      { value: '62M+', label: 'Tons/year' },
      { value: '80%', label: 'Unprocessed' },
      { value: '3,000+', label: 'Dumpsites' },
    ],
    bgGradient: 'from-red-500/5 via-orange-500/5 to-transparent',
  },
  {
    id: 'innovation',
    eyebrow: 'Our Innovation',
    title: 'EcoConverter transforms waste into value',
    description: 'Segregation-agnostic, decentralized systems that process mixed waste into standardized bioplastics.',
    icon: Sparkles,
    iconColor: 'text-eco',
    stats: [
      { value: '3', label: 'Value Streams' },
      { value: '0', label: 'Landfill Output' },
      { value: '24/7', label: 'Operation' },
    ],
    bgGradient: 'from-eco/5 via-eco/10 to-transparent',
  },
  {
    id: 'impact',
    eyebrow: 'The Impact',
    title: 'Creating measurable environmental change',
    description: 'Every unit deployed diverts waste, reduces emissions, and creates circular economy products.',
    icon: TrendingUp,
    iconColor: 'text-sky',
    stats: [
      { value: '500+', label: 'Tons Diverted' },
      { value: '40%', label: 'Cost Savings' },
      { value: '3x', label: 'Revenue Streams' },
    ],
    bgGradient: 'from-sky/5 via-eco/5 to-transparent',
  },
]

// Individual stat component with animation
function AnimatedStat({ value, label, delay = 0 }) {
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="stat-number">{value}</div>
      <div className="text-xs uppercase tracking-widest text-ink-muted mt-1">{label}</div>
    </motion.div>
  )
}

// Progress indicator dot component
function ProgressDot({ scrollProgress, index, panelCount }) {
  const segmentStart = index / panelCount
  const segmentEnd = (index + 1) / panelCount

  const dotScale = useTransform(
    scrollProgress,
    [segmentStart, segmentStart + 0.1, segmentEnd - 0.1, segmentEnd],
    [0.6, 1.2, 1.2, 0.6]
  )

  const dotOpacity = useTransform(
    scrollProgress,
    [segmentStart, segmentStart + 0.1, segmentEnd - 0.1, segmentEnd],
    [0.3, 1, 1, 0.3]
  )

  return (
    <motion.div
      className="w-2 h-2 rounded-full bg-eco"
      style={{
        scale: dotScale,
        opacity: dotOpacity,
      }}
    />
  )
}

// Progress indicator dots
function ProgressDots({ scrollProgress, panelCount }) {
  return (
    <div className="fixed left-8 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col gap-4">
      {Array.from({ length: panelCount }).map((_, i) => (
        <ProgressDot
          key={i}
          scrollProgress={scrollProgress}
          index={i}
          panelCount={panelCount}
        />
      ))}
    </div>
  )
}

// Individual panel component with proper hook usage
function StickyPanel({ panel, index, panelCount, scrollProgress }) {
  // Calculate panel visibility ranges
  const panelDuration = 1 / panelCount
  const panelStart = index * panelDuration
  const panelEnd = (index + 1) * panelDuration

  // All useTransform hooks called at top level
  const opacity = useTransform(
    scrollProgress,
    [
      panelStart,
      panelStart + panelDuration * 0.15,
      panelEnd - panelDuration * 0.15,
      panelEnd,
    ],
    [0, 1, 1, 0]
  )

  const y = useTransform(
    scrollProgress,
    [panelStart, panelStart + panelDuration * 0.3, panelEnd - panelDuration * 0.3, panelEnd],
    ['40px', '0px', '0px', '-40px']
  )

  const scale = useTransform(
    scrollProgress,
    [panelStart, panelStart + panelDuration * 0.3, panelEnd - panelDuration * 0.3, panelEnd],
    [0.96, 1, 1, 0.96]
  )

  const blur = useTransform(
    scrollProgress,
    [panelStart, panelStart + panelDuration * 0.2, panelEnd - panelDuration * 0.2, panelEnd],
    ['blur(8px)', 'blur(0px)', 'blur(0px)', 'blur(8px)']
  )

  // Check for reduced motion
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const Icon = panel.icon

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      style={
        prefersReducedMotion
          ? { opacity }
          : {
              opacity,
              y,
              scale,
              filter: blur,
            }
      }
    >
      {/* Background gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-b ${panel.bgGradient}`}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="container-default relative z-10 max-w-4xl text-center px-4">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: false, amount: 0.5 }}
        >
          {/* Icon */}
          <motion.div
            variants={staggerItem}
            className="mb-6 flex justify-center"
          >
            <div className={`p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-ink/5 ${panel.iconColor}`}>
              <Icon className="w-8 h-8" strokeWidth={1.5} />
            </div>
          </motion.div>

          {/* Eyebrow */}
          <motion.p
            variants={staggerItem}
            className="section-eyebrow mb-4"
          >
            {panel.eyebrow}
          </motion.p>

          {/* Title */}
          <motion.h2
            variants={staggerItem}
            className="heading-section text-ink mb-6"
          >
            {panel.title}
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={staggerItem}
            className="body-large max-w-2xl mx-auto mb-12"
          >
            {panel.description}
          </motion.p>

          {/* Stats grid */}
          <motion.div
            variants={staggerItem}
            className="flex justify-center gap-12 md:gap-16"
          >
            {panel.stats.map((stat, statIndex) => (
              <AnimatedStat
                key={stat.label}
                value={stat.value}
                label={stat.label}
                delay={statIndex * 0.1}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function ValueProposition() {
  const containerRef = useRef(null)
  const panelCount = panels.length

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Memoize panel data to prevent unnecessary re-renders
  const memoizedPanels = useMemo(() => panels, [])

  // Bottom fade opacity
  const bottomFadeOpacity = useTransform(scrollYProgress, [0.9, 1], [0, 1])

  return (
    <section
      ref={containerRef}
      className="relative bg-sand"
      style={{ height: `${panelCount * 100}vh` }}
    >
      {/* Progress dots */}
      <ProgressDots scrollProgress={scrollYProgress} panelCount={panelCount} />

      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {memoizedPanels.map((panel, index) => (
          <StickyPanel
            key={panel.id}
            panel={panel}
            index={index}
            panelCount={panelCount}
            scrollProgress={scrollYProgress}
          />
        ))}
      </div>

      {/* Section transition hint at bottom */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-sand to-transparent pointer-events-none"
        style={{ opacity: bottomFadeOpacity }}
      />
    </section>
  )
}
