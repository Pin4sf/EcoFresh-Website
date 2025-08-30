import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Particles } from './ui/particles'

gsap.registerPlugin(ScrollTrigger)

// Image placeholder for patent certificate
const PatentImagePlaceholder = () => (
  <img 
    src="/path/to/your/patent-image.png" 
    alt="Patent Certificate" 
    className="w-20 h-20 object-contain"
  />
)

export default function IP() {
  const badgeRef = useRef(null)
  const claimsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate claims list
      gsap.fromTo('.ip-claim', 
        { 
          opacity: 0, 
          x: -30 
        }, 
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: claimsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Animate patent badge
      gsap.fromTo(badgeRef.current, 
        { 
          opacity: 0, 
          scale: 0.8,
          rotation: -10
        }, 
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.8,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: badgeRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }, badgeRef)

    return () => ctx.revert()
  }, [])
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
            <div ref={claimsRef}>
              <ul className="list-disc list-inside text-ink-light space-y-3">
                {claims.map((c, index) => (
                  <li key={c} className="ip-claim flex items-start">
                    <span className="text-primary2 font-bold mr-3 text-lg flex-shrink-0">✓</span>
                    <span className="text-ink-light leading-relaxed">{c}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-center">
              <div ref={badgeRef} className="inline-block group">
                {/* Professional Certificate Badge */}
                <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-primary1 to-primary2 rounded-2xl flex items-center justify-center shadow-2xl border-4 border-white/20 group-hover:shadow-3xl group-hover:scale-105 transition-all duration-300 relative overflow-hidden">
                  {/* Subtle shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-50"></div>
                  <div className="relative z-10">
                    <PatentImagePlaceholder />
                  </div>
                </div>
                <h3 className="text-xl font-space-grotesk font-bold text-ink mb-2 group-hover:text-primary2 transition-colors duration-300">Patent Filed</h3>
                <p className="text-ink-light text-sm font-light">US Patent Application<br/>Pending Approval</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


