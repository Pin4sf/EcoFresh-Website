import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function useCountUp(ref, target, duration = 1.2, suffix = '') {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obj = { value: 0 }
    const tween = gsap.to(obj, {
      value: target,
      duration,
      ease: 'power1.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      onUpdate: () => {
        const value = Math.floor(obj.value)
        el.textContent = `${value}${suffix}`
      },
    })
    return () => tween.kill()
  }, [ref, target, duration, suffix])
}

function MetricCard({ value, unit, label, description, aria }) {
  const ref = useRef(null)
  useCountUp(ref, value)
  return (
    <div data-reveal className="group relative bg-white/90 backdrop-blur-xl border border-white/40 rounded-3xl p-8 text-center shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 overflow-hidden" aria-label={aria}>
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/60 to-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Subtle border glow */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary2/20 via-secondary2/20 to-primary1/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Number and Unit */}
        <div className="mb-6">
          <div ref={ref} className="font-display text-6xl font-bold bg-gradient-to-r from-primary1 to-secondary2 bg-clip-text text-transparent mb-2">0</div>
          <div className="text-primary2 font-bold text-xl tracking-wide">{unit}</div>
        </div>
        
        {/* Label */}
        <div className="text-ink font-bold text-xl mb-4 leading-tight">{label}</div>
        
        {/* Description */}
        <div className="text-ink-light text-sm leading-relaxed mb-6">{description}</div>
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary1 to-secondary2 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          Global Impact
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-primary2/20 to-secondary2/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute bottom-4 left-4 w-6 h-6 bg-gradient-to-tr from-primary1/20 to-secondary2/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  )
}

export default function Metrics() {
  return (
    <section className="snap-section py-20 relative overflow-hidden" id="metrics">
      {/* Background Video */}
      <div className="absolute inset-0 -z-10">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="https://res.cloudinary.com/dbhmxxxr2/video/upload/v1756527297/Plastic_Bag_s_Ominous_Grace_ezczoc.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-ink/60"></div>
      </div>
      
      {/* Subtle background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-1/4 w-32 h-32 bg-primary2 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-1/4 w-40 h-40 bg-secondary2 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto max-w-[1200px] px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 mb-6">
            <div className="w-2 h-2 bg-primary2 rounded-full animate-pulse"></div>
            <span className="text-white/90 text-sm font-medium tracking-wide">GLOBAL METRICS</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
            The Scale of the Opportunity
          </h2>
          <p className="text-white/80 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
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


