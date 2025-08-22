export default function IP() {
  const claims = [
    'Proprietary waste-agnostic detoxification process',
    'AI-governed real-time process optimization',
    'In-situ CO₂ capture and utilization system',
    'Zero-waste circular biorefinery design',
  ]
  return (
    <section data-reveal className="py-20 bg-bg2" id="ip">
      <div className="mx-auto max-w-[1200px] px-4">
        <div className="relative bg-bg1 border-2 border-primary1 rounded-2xl p-8">
          <div className="absolute -top-3 left-6 bg-accent text-ink rounded-full px-4 py-1 font-semibold">Patent Filed</div>
          <h2 className="font-display text-3xl font-semibold mb-6">IP & Competitive Advantage</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <ul className="list-disc list-inside text-ink-light space-y-2">
              {claims.map((c) => (
                <li key={c}><span className="text-primary2 font-bold mr-1">✓</span>{c}</li>
              ))}
            </ul>
            <div>
              <svg viewBox="0 0 200 150" className="w-full h-auto">
                <defs>
                  <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--tw-color-primary2)" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="var(--tw-color-secondary2)" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
                <circle cx="170" cy="30" r="8" fill="url(#chartGradient)" />
                <circle cx="50" cy="80" r="4" fill="#6d767a" opacity="0.6" />
                <circle cx="80" cy="90" r="4" fill="#6d767a" opacity="0.6" />
                <circle cx="120" cy="70" r="4" fill="#6d767a" opacity="0.6" />
                <text x="170" y="20" textAnchor="middle" className="fill-current">EcoFresh</text>
                <text x="10" y="140" className="fill-current">Cost Efficiency →</text>
                <text x="10" y="20" className="fill-current" transform="rotate(-90, 10, 20)">← Quality</text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


