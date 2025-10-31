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

function MetricCard({ value, unit, label, description, aria, badgeText = "Global Impact" }) {
  const ref = useRef(null)
  useCountUp(ref, value)
  return (
    <div data-reveal className="group relative bg-white/90 backdrop-blur-xl border border-white/40 rounded-3xl p-8 text-center shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 overflow-hidden h-full min-h-[400px] flex flex-col" aria-label={aria}>
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/60 to-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Subtle border glow */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary2/20 via-secondary2/20 to-primary1/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between">
        {/* Top section - Number, Unit, Label */}
        <div className="flex-shrink-0">
          {/* Number and Unit */}
          <div className="mb-6">
            <div ref={ref} className="font-display text-6xl font-bold bg-gradient-to-r from-primary1 to-secondary2 bg-clip-text text-transparent mb-2">0</div>
            <div className="text-primary2 font-bold text-xl tracking-wide">{unit}</div>
          </div>
          
          {/* Label */}
          <div className="text-ink font-bold text-xl mb-4 leading-tight">{label}</div>
        </div>
        
        {/* Middle section - Description (flexible) */}
        <div className="flex-grow flex items-center justify-center py-4">
          <div className="text-ink-light text-sm leading-relaxed text-center">{description}</div>
        </div>
        
        {/* Bottom section - Badge (always at bottom) */}
        <div className="flex-shrink-0 mt-6">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary1 to-secondary2 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            {badgeText}
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-primary2/20 to-secondary2/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute bottom-4 left-4 w-6 h-6 bg-gradient-to-tr from-primary1/20 to-secondary2/20 rounded-full opacity-0 group-hover:opacity-500"></div>
    </div>
  )
}

export default function Metrics() {
  const metricsRef = useRef(null)
  const headerRef = useRef(null)
  const cardsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate header elements
      gsap.fromTo('.metrics-badge', 
        { 
          opacity: 0, 
          scale: 0.8,
          y: 20
        }, 
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      gsap.fromTo('.metrics-title', 
        { 
          opacity: 0, 
          y: 30
        }, 
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      gsap.fromTo('.metrics-description', 
        { 
          opacity: 0, 
          y: 20
        }, 
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Animate metric cards
      gsap.fromTo('.metric-card', 
        { 
          opacity: 0, 
          y: 50,
          scale: 0.9
        }, 
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )

    }, metricsRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={metricsRef} className="snap-section py-20 relative overflow-hidden" id="metrics">
      {/* Static gradient background instead of video */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#0c2b3b] via-[#124170] to-[#26667F]" />
        <div className="absolute inset-0 bg-ink/60" />
      </div>
      
      {/* Subtle background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-1/4 w-32 h-32 bg-primary2 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-1/4 w-40 h-40 bg-secondary2 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto max-w-[1200px] px-4 relative z-10">
        <div ref={headerRef} className="text-center mb-16">
          <div className="metrics-badge inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 mb-6">
            <div className="w-2 h-2 bg-primary2 rounded-full animate-pulse"></div>
            <span className="text-white/90 text-sm font-medium tracking-wide">GLOBAL METRICS</span>
          </div>
          <h2 className="metrics-title font-display text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
            The Scale of the Opportunity
          </h2>
          <p className="metrics-description text-white/80 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
            Our technology addresses massive global challenges while creating unprecedented market opportunities
          </p>
        </div>
        
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
          <div className="metric-card h-full">
            <MetricCard 
              value={300} 
              unit="M+ Tons" 
              label="Annual Plastic Generation" 
              description="Global plastic production continues to rise, demanding sustainable alternatives"
              aria="Global plastic output continues to rise—demanding circular alternatives" 
            />
          </div>
          <div className="metric-card h-full">
            <MetricCard 
              value={150} 
              unit="K+ Tons" 
              label="Daily Solid Waste in India" 
              description="Municipal waste streams ripe for decentralized valorization and processing solutions"
              aria="Daily municipal solids in India—ripe for decentralized valorization" 
              badgeText="National Impact"
            />
          </div>
          <div className="metric-card h-full">
            <MetricCard 
              value={90} 
              unit="%" 
              label="Organic Waste Underutilized" 
              description="Most organic fractions still landfilled or unmanaged globally"
              aria="Most organic fractions still landfilled or unmanaged" 
              badgeText="National Impact"
            />
          </div>
          <div className="metric-card h-full">
            <MetricCard 
              value={49} 
              unit="B$" 
              label="Bioplastics Opportunity" 
              description="Projected bioplastics market where PHA can lead innovation"
              aria="Projected bioplastics market—where PHA can lead" 
            />
          </div>
        </div>
      </div>
    </section>
  )
}


