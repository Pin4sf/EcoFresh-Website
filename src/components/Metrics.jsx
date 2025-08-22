import { useEffect, useRef } from 'react'

function useCountUp(ref, target, duration = 1200, suffix = '') {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let startTs = 0
    const start = 0
    function step(ts) {
      if (!startTs) startTs = ts
      const p = Math.min(1, (ts - startTs) / duration)
      const value = Math.floor(start + (target - start) * p)
      el.textContent = `${value}${suffix}`
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [ref, target, duration, suffix])
}

function MetricCard({ value, unit, label, description, aria }) {
  const ref = useRef(null)
  useCountUp(ref, value)
  return (
    <div data-reveal className="bg-white/80 backdrop-blur border border-white/30 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1" aria-label={aria}>
      <div ref={ref} className="font-display text-5xl font-bold text-ink mb-2">0</div>
      <div className="text-primary2 font-semibold text-lg mb-3">{unit}</div>
      <div className="text-ink font-semibold mb-2 text-lg">{label}</div>
      <div className="text-ink-light text-sm mb-4">{description}</div>
      <div className="inline-block bg-accent text-ink text-xs font-semibold px-3 py-1 rounded-full">Global Impact</div>
    </div>
  )
}

export default function Metrics() {
  return (
    <section className="py-20 bg-gradient-to-br from-seafoam/30 to-lilac/30 relative overflow-hidden" id="metrics">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-1/4 w-32 h-32 bg-primary2 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-1/4 w-40 h-40 bg-secondary2 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto max-w-[1200px] px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-semibold mb-4">The Scale of the Opportunity</h2>
          <p className="text-ink-light text-lg max-w-3xl mx-auto">
            Our technology addresses massive global challenges while creating unprecedented market opportunities
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <MetricCard 
            value={300} 
            unit="M+ Tons" 
            label="Annual Plastic Generation" 
            description="Global plastic production continues to rise, demanding sustainable alternatives"
            aria="Global plastic output continues to rise—demanding circular alternatives" 
          />
          <MetricCard 
            value={150} 
            unit="K+ Tons" 
            label="Daily Solid Waste in India" 
            description="Municipal waste streams ripe for decentralized valorization"
            aria="Daily municipal solids in India—ripe for decentralized valorization" 
          />
          <MetricCard 
            value={90} 
            unit="%" 
            label="Organic Waste Underutilized" 
            description="Most organic fractions still landfilled or unmanaged globally"
            aria="Most organic fractions still landfilled or unmanaged" 
          />
          <MetricCard 
            value={49} 
            unit="B$" 
            label="Bioplastics Opportunity" 
            description="Projected bioplastics market where PHA can lead innovation"
            aria="Projected bioplastics market—where PHA can lead" 
          />
        </div>
      </div>
    </section>
  )
}


