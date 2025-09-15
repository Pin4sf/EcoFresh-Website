import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Particles } from './ui/particles'

gsap.registerPlugin(ScrollTrigger)


export default function Roadmap() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const cardsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate header
      gsap.fromTo('.roadmap-title', 
        { 
          opacity: 0, 
          y: 30,
          scale: 0.95
        }, 
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      gsap.fromTo('.roadmap-description', 
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
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Animate roadmap cards
      gsap.fromTo('.roadmap-card', 
        { 
          opacity: 0, 
          y: 60,
          scale: 0.8,
          rotation: -3
        }, 
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )


    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const items = [
    { title: 'AI Process Control', text: 'Real-time optimization algorithms' },
    { title: 'Quality Prediction', text: 'ML-driven property forecasting' },
    { title: 'Fleet Management', text: 'Decentralized unit coordination' },
    { title: 'Market Analytics & Fulfillment', text: 'Supply-demand optimization' },
  ]
  return (
    <section ref={sectionRef} className="py-20 bg-bg1 relative overflow-hidden" id="roadmap">
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
        <div ref={headerRef}>
          <h2 className="roadmap-title section-title text-center font-space-grotesk text-4xl font-bold mb-4 text-ink">Software Platform Roadmap</h2>
          <p className="roadmap-description text-center text-ink-light text-lg mb-12 max-w-2xl mx-auto font-light">Our AI-driven platform evolution roadmap, designed to revolutionize bioplastic production through intelligent automation and predictive analytics.</p>
        </div>
        
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((it, idx) => (
            <div key={idx} className="roadmap-card group text-center p-8 bg-white/90 backdrop-blur-md border-2 border-primary1/20 rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-primary1/50 hover:bg-white/95 flex flex-col h-full">
              <h4 className="font-space-grotesk font-bold mb-4 text-xl text-ink group-hover:text-primary1 transition-colors duration-300">{it.title}</h4>
              <p className="text-ink-light text-base leading-relaxed font-light flex-grow">{it.text}</p>
              <div className="mt-6 pt-4 border-t border-primary1/20">
                <span className="text-sm font-space-grotesk font-medium text-primary2 bg-primary1/10 px-4 py-2 rounded-full">Phase {idx + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}



