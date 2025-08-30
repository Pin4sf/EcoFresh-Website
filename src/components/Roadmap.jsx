import { Particles } from './ui/particles'

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
    { pct: 40, title: 'Market Analytics & Fulfillment', text: 'Supply-demand optimization' },
  ]
  return (
    <section className="py-20 bg-bg1 relative overflow-hidden" id="roadmap">
      {/* Particles background */}
      <div className="absolute inset-0 -z-0 pointer-events-none">
        <Particles
          quantity={150}
          staticity={70}
          ease={70}
          size={0.7}
          color="#26667F"
          vx={0.25}
          vy={0.15}
        />
      </div>
      
      <div className="mx-auto max-w-[1200px] px-4 relative z-10">
        <h2 className="section-title text-center font-space-grotesk text-4xl font-bold mb-4 text-ink">Software Platform Roadmap</h2>
        <p className="text-center text-ink-light text-lg mb-12 max-w-2xl mx-auto font-light">Our AI-driven platform evolution roadmap, designed to revolutionize bioplastic production through intelligent automation and predictive analytics.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((it, idx) => (
            <div key={idx} className="group text-center p-6 bg-white/90 backdrop-blur-md border-2 border-primary1/20 rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-primary1/50 hover:bg-white/95">
              <div className="flex justify-center mb-4">
                <Progress value={it.pct} />
              </div>
              <h4 className="font-space-grotesk font-bold mt-4 mb-2 text-lg text-ink group-hover:text-primary1 transition-colors duration-300">{it.title}</h4>
              <p className="text-ink-light text-sm leading-relaxed font-light">{it.text}</p>
              <div className="mt-4 pt-3 border-t border-primary1/20">
                <span className="text-xs font-space-grotesk font-medium text-primary2 bg-primary1/10 px-3 py-1 rounded-full">Phase {idx + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}



