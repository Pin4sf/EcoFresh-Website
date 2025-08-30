import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { VantaTopology } from './ui/vanta-topology'

gsap.registerPlugin(ScrollTrigger)

// Professional icon components
const TechnologyIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
)

const SustainabilityIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
  </svg>
)

const ScalabilityIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
)

export default function Narrative() {
  const contentRef = useRef(null)
  const pillarsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate content sections
      gsap.fromTo('.narrative-section', 
        { 
          opacity: 0, 
          y: 50 
        }, 
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Animate pillar badges
      gsap.fromTo('.pillar-badge', 
        { 
          opacity: 0, 
          scale: 0.8,
          x: 50
        }, 
        {
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: pillarsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }, contentRef)

    return () => ctx.revert()
  }, [])

  const pillars = [
    { key: 'technology', icon: TechnologyIcon, label: 'Technology', color: 'from-primary1/20 to-primary2/20', textColor: 'text-primary2' },
    { key: 'sustainability', icon: SustainabilityIcon, label: 'Sustainability', color: 'from-primary2/20 to-secondary2/20', textColor: 'text-primary2' },
    { key: 'scalability', icon: ScalabilityIcon, label: 'Scalability', color: 'from-secondary2/20 to-primary1/20', textColor: 'text-secondary2' }
  ]
  return (
    <section className="py-20 bg-bg2 relative overflow-hidden" id="narrative">
      {/* Vanta.js Topology animated background */}
      <VantaTopology 
        color="#67C090"
        backgroundColor="#DDF4E7"
        mouseControls={true}
        touchControls={true}
        gyroControls={false}
        minHeight={200.00}
        minWidth={200.00}
        scale={1.00}
        scaleMobile={1.00}
        className="opacity-80"
      />
      
      <div className="mx-auto max-w-[1200px] px-4 grid md:grid-cols-2 gap-10 items-center relative z-10">
        <div ref={contentRef} className="space-y-6">
          <div className="narrative-section">
            <h3 className="text-xl font-semibold mb-2" data-split>What We Do</h3>
            <p className="text-ink-light">We transform any organic waste into high-value PHA bioplastics using our proprietary AI-governed bioprocessing platform. Our decentralized approach eliminates raw material costs while ensuring consistent quality.</p>
          </div>
          <div className="narrative-section">
            <h3 className="text-xl font-semibold mb-2" data-split>Why It Matters</h3>
            <p className="text-ink-light">Current bioplastic production relies on expensive virgin feedstocks and centralized facilities. We unlock infinite, free feedstock while reducing environmental impact through distributed processing.</p>
          </div>
          <div className="narrative-section">
            <h3 className="text-xl font-semibold mb-2" data-split>Why Now</h3>
            <p className="text-ink-light">Regulatory pressure on single-use plastics, AI breakthroughs in bioprocessing, and growing demand for sustainable materials create a perfect convergence for our technology.</p>
          </div>
        </div>
        <div ref={pillarsRef} className="flex justify-center">
          <div className="flex flex-col gap-4 items-center">
            {pillars.map((pillar) => (
              <div 
                key={pillar.key}
                className="pillar-badge group flex items-center gap-4 px-6 py-4 bg-white/60 backdrop-blur border border-white/40 rounded-full min-w-[220px] shadow-sm hover:shadow-lg hover:bg-white/80 transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`p-2 rounded-xl bg-gradient-to-br ${pillar.color} ${pillar.textColor} group-hover:scale-110 transition-all duration-300 group-hover:from-primary1/30 group-hover:to-primary2/30`}>
                  <pillar.icon />
                </div>
                <span className="font-medium group-hover:text-primary2 transition-colors duration-300">{pillar.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}



