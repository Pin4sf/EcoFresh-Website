import { Button } from './ui/button'
import { FlickeringGrid } from './ui/flickering-grid-hero'

const streams = [
  { key: 'b2c', icon: '🛍️', title: 'B2C', target: 'Eco-conscious consumers, housing societies', model: 'Direct sales + subscriptions', edge: 'Zero input cost' },
  { key: 'b2b', icon: '🏭', title: 'B2B', target: 'Plastic manufacturers, FMCG brands', model: 'Bulk EcoForm sales + customization', edge: 'Policy-aligned' },
  { key: 'b2g', icon: '🏛️', title: 'B2G', target: 'Municipalities, smart cities', model: 'Installation contracts + O&M', edge: 'Modular scale' },
]

export default function RevenueStreams() {
  return (
    <section className="py-20 bg-bg1 relative overflow-hidden" id="revenue-streams">
      {/* Flickering grid background */}
      <div className="absolute inset-0 -z-0 pointer-events-none">
        <FlickeringGrid
          className="[mask-image:radial-gradient(1200px_circle_at_center,white,transparent)]"
          color="7ADAA5"
          maxOpacity={0.15}
          flickerChance={0.1}
          squareSize={3}
          gridGap={6}
        />
      </div>
      <div className="mx-auto max-w-[1200px] px-4 relative z-10">
        <h2 data-split className="section-title text-center font-display text-3xl font-semibold mb-3">Revenue Streams</h2>
        <p className="text-center text-ink-light max-w-2xl mx-auto mb-10" data-reveal>
          Clear paths to value across audiences — fewer choices, stronger intent.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {streams.map((s) => (
            <article
              key={s.key}
              data-reveal
              className="card-tilt relative bg-white/60 backdrop-blur border border-white/30 rounded-2xl p-7 text-left shadow-sm hover:shadow transition will-change-transform"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold flex items-center gap-2"><span aria-hidden>{s.icon}</span>{s.title}</h3>
                <span className="inline-block text-[11px] font-semibold px-2 py-1 rounded-full bg-accent/90 text-ink">{s.edge}</span>
              </div>
              <p className="text-ink-light mb-2 text-sm">{s.target}</p>
              <p className="text-primary2 font-semibold mb-0">{s.model}</p>
            </article>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3" data-reveal>
          <Button variant="cta" asChild>
            <a href="#">Download One-Pager</a>
          </Button>
          <Button variant="cta" asChild>
            <a href="#pilots">Open Pilot Program</a>
          </Button>
          <Button variant="cta" asChild>
            <a href="mailto:investors@ecofresh.com">Book Investor Call</a>
          </Button>
        </div>
      </div>
    </section>
  )
}


