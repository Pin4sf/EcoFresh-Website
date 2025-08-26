import { Button } from './ui/button'

const streams = [
  { key: 'b2c', title: 'B2C', target: 'Eco-conscious consumers, housing societies', model: 'Direct sales + subscriptions', edge: 'Zero input cost' },
  { key: 'b2b', title: 'B2B', target: 'Plastic manufacturers, FMCG brands', model: 'Bulk EcoForm sales + customization', edge: 'Policy-aligned' },
  { key: 'b2g', title: 'B2G', target: 'Municipalities, smart cities', model: 'Installation contracts + O&M', edge: 'Modular scale' },
]

export default function RevenueStreams() {
  return (
    <section className="py-20 bg-bg1" id="revenue-streams">
      <div className="mx-auto max-w-[1200px] px-4">
        <h2 className="section-title text-center font-display text-3xl font-semibold mb-10">Revenue Streams</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {streams.map((s) => (
            <div key={s.key} data-reveal className="card-tilt bg-white/60 backdrop-blur border border-white/30 rounded-2xl p-8 text-center shadow transition will-change-transform">
              <h3 className="text-xl font-bold mb-2">{s.title}</h3>
              <p className="text-ink-light mb-2">{s.target}</p>
              <p className="text-primary2 font-semibold mb-4">{s.model}</p>
              <div className="inline-block bg-accent text-ink text-xs font-semibold px-3 py-1 rounded-full">{s.edge}</div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild>
            <a href="#">Download One-Pager</a>
          </Button>
          <Button variant="outline" asChild>
            <a href="#pilots">Open Pilot Program</a>
          </Button>
          <Button variant="secondary" asChild>
            <a href="mailto:investors@ecofresh.com">Book Investor Call</a>
          </Button>
        </div>
      </div>
    </section>
  )
}


