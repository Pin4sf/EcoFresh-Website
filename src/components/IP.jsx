import { Particles } from './ui/particles'

export default function IP() {
  const claims = [
    'Proprietary waste-agnostic detoxification process',
    'AI-governed real-time process optimization',
    'In-situ CO₂ capture and utilization system',
    'Zero-waste circular biorefinery design',
  ]
  return (
    <section data-reveal className="py-20 bg-bg2 relative overflow-hidden" id="ip">
      {/* Particles background */}
      <div className="absolute inset-0 -z-0 pointer-events-none">
        <Particles
          quantity={150}
          staticity={70}
          ease={65}
          size={0.6}
          color="#26667F"
          vx={0.2}
          vy={0.25}
        />
      </div>
      
      <div className="mx-auto max-w-[1200px] px-4 relative z-10">
        <div className="relative bg-bg1/90 backdrop-blur-md border-2 border-primary1 rounded-2xl p-8">
          <div className="absolute -top-3 left-6 bg-accent text-ink rounded-full px-4 py-1 font-semibold">Patent Filed</div>
          <h2 className="font-space-grotesk text-3xl font-bold mb-6">IP & Competitive Advantage</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <ul className="list-disc list-inside text-ink-light space-y-3">
              {claims.map((c) => (
                <li key={c} className="flex items-start">
                  <span className="text-primary2 font-bold mr-3 text-lg flex-shrink-0">✓</span>
                  <span className="text-ink-light leading-relaxed">{c}</span>
                </li>
              ))}
            </ul>
            <div className="text-center">
              <div className="relative inline-block">
                {/* Certification Badge */}
                <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-primary1 to-primary2 rounded-full flex items-center justify-center shadow-2xl">
                  <div className="text-6xl">🏆</div>
                </div>
                {/* Patent Status */}
                <div className="absolute -top-2 -right-2 bg-accent text-ink rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg">
                  P
                </div>
                <h3 className="text-xl font-space-grotesk font-bold text-ink mb-2">Patent Filed</h3>
                <p className="text-ink-light text-sm font-light">US Patent Application<br/>Pending Approval</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


