function Progress({ value }) {
  const circumference = 2 * Math.PI * 45
  const offset = circumference - (value / 100) * circumference
  return (
    <div className="relative w-28 h-28">
      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
        <circle cx="50" cy="50" r="45" className="stroke-primary1" strokeWidth="8" fill="none" />
        <circle cx="50" cy="50" r="45" className="stroke-primary2" strokeWidth="8" fill="none" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-semibold">{value}%</span>
    </div>
  )
}

export default function Roadmap() {
  const items = [
    { pct: 85, title: 'AI Process Control', text: 'Real-time optimization algorithms' },
    { pct: 70, title: 'Quality Prediction', text: 'ML-driven property forecasting' },
    { pct: 60, title: 'Fleet Management', text: 'Decentralized unit coordination' },
    { pct: 40, title: 'Market Analytics', text: 'Supply-demand optimization' },
  ]
  return (
    <section className="py-20 bg-bg1" id="roadmap">
      <div className="mx-auto max-w-[1200px] px-4">
        <h2 className="section-title text-center font-display text-3xl font-semibold mb-10">Software Platform Roadmap</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {items.map((it, idx) => (
            <div key={idx} className="text-center p-4">
              <Progress value={it.pct} />
              <h4 className="font-semibold mt-3 mb-1">{it.title}</h4>
              <p className="text-ink-light text-sm">{it.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}



