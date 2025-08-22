export default function Timeline() {
  const items = [
    { date: '2025 Q3–Q4', title: 'Prototype & first decentralized pilot', text: 'EcoForm sampling begins' },
    { date: '2025 Q4–2026 Q1', title: '+5 pilots & benchmarking', text: 'Performance iterations' },
    { date: '2026 H1', title: 'First B2B/B2G sales', text: 'Industrial MoUs signed' },
    { date: '2026 H2', title: 'State-level rollout', text: 'Licensing readiness' },
  ]
  return (
    <section className="py-20 bg-bg1" id="timeline">
      <div className="mx-auto max-w-[1200px] px-4">
        <h2 className="section-title text-center font-display text-3xl font-semibold mb-10">Market & GTM Timeline</h2>
        <div className="overflow-x-auto">
          <div className="flex gap-4 w-max">
            {items.map((it, idx) => (
              <div key={idx} className="min-w-72 bg-bg2 border-2 border-primary1 rounded-xl p-6">
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



