import { Button } from './ui/button'
import { AnimatedGridPattern } from './ui/animated-grid-pattern'

export default function Timeline() {
  const items = [
    { date: '2025 Q3–Q4', title: 'Prototype & first decentralized pilot', text: 'EcoForm sampling begins' },
    { date: '2025 Q4–2026 Q1', title: '+5 pilots & benchmarking', text: 'Performance iterations' },
    { date: '2026 H1', title: 'First B2B/B2G sales', text: 'Industrial MoUs signed' },
    { date: '2026 H2', title: 'State-level rollout', text: 'Licensing readiness' },
  ]
  return (
    <section className="py-20 bg-bg1 relative overflow-hidden" id="timeline">
      {/* Animated grid pattern background */}
      <div className="absolute inset-0 -z-0 pointer-events-none">
        <AnimatedGridPattern
          className="[mask-image:radial-gradient(1200px_circle_at_center,white,transparent)]"
          color="#7ADAA5"
          maxOpacity={0.12}
          numSquares={25}
          duration={3}
          width={55}
          height={55}
        />
      </div>
      <div className="mx-auto max-w-[1200px] px-4 relative z-10">
        <h2 data-split className="section-title text-center font-display text-3xl font-semibold mb-3">Market & GTM Timeline</h2>
        <p className="text-center text-ink-light max-w-2xl mx-auto mb-8" data-reveal>
          Milestones that reduce uncertainty and de-risk scale-up.
        </p>

        {/* Simple arrow-controlled list */}
        <div className="relative mx-auto max-w-xl">
          <div className="relative rounded-2xl border border-white/30 bg-white/40 backdrop-blur p-4 overflow-hidden">
            {items.map((it, idx) => (
              <div key={idx} className="timeline-item bg-white/70 backdrop-blur border border-white/40 rounded-xl p-5 mb-4 last:mb-0">
                <div className="text-primary2 font-semibold text-sm mb-1">{it.date}</div>
                <h4 className="font-semibold mb-1">{it.title}</h4>
                <p className="text-ink-light m-0">{it.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}



