import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button } from './ui/button'
import { AnimatedGridPattern } from './ui/animated-grid-pattern'

gsap.registerPlugin(ScrollTrigger)

export default function Timeline() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const timelineRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate header
      gsap.fromTo('.timeline-title', 
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
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      gsap.fromTo('.timeline-description', 
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

      // Animate timeline container
      gsap.fromTo(timelineRef.current, 
        { 
          opacity: 0, 
          scale: 0.95,
          y: 30
        }, 
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Animate timeline items
      gsap.fromTo('.timeline-item', 
        { 
          opacity: 0, 
          x: -30,
          scale: 0.95
        }, 
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [])
  const items = [
    { date: '2025 Q3–Q4', title: 'Prototype & first decentralized pilot', text: 'EcoForm sampling begins' },
    { date: '2025 Q4–2026 Q1', title: '+5 pilots & benchmarking', text: 'Performance iterations' },
    { date: '2026 H1', title: 'First B2B/B2G sales', text: 'Industrial MoUs signed' },
    { date: '2026 H2', title: 'State-level rollout', text: 'Licensing readiness' },
  ]
  return (
    <section ref={sectionRef} className="py-20 bg-bg1 relative overflow-hidden" id="timeline">
      {/* Animated grid pattern background */}
      <div className="absolute inset-0 -z-0 pointer-events-none">
        <AnimatedGridPattern
          className="[mask-image:radial-gradient(1200px_circle_at_center,white,transparent)]"
          color="#7ADAA5"
          maxOpacity={0.12}
          numSquares={25}
          duration={3}
          width={55}
          height={55}
        />
      </div>
      <div className="mx-auto max-w-[1200px] px-4 relative z-10">
        <div ref={headerRef}>
          <h2 className="timeline-title section-title text-center font-display text-3xl font-semibold mb-3">Market & GTM Timeline</h2>
          <p className="timeline-description text-center text-ink-light max-w-2xl mx-auto mb-8">
            Milestones that reduce uncertainty and de-risk scale-up.
          </p>
        </div>

        {/* Interactive timeline list */}
        <div className="relative mx-auto max-w-xl">
          <div ref={timelineRef} className="relative rounded-2xl border border-white/30 bg-white/40 backdrop-blur p-4 overflow-hidden">
            {items.map((it, idx) => (
              <div 
                key={idx} 
                className="group timeline-item bg-white/70 backdrop-blur border border-white/40 rounded-xl p-5 mb-4 last:mb-0 cursor-pointer transition-all duration-300 hover:bg-white/90 hover:border-primary2/30 hover:shadow-lg hover:-translate-y-1 relative overflow-hidden"
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary1/5 via-transparent to-secondary2/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Progress indicator */}
                <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-primary1 to-secondary2 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></div>
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-primary2 font-semibold text-sm group-hover:text-primary1 transition-colors duration-300">{it.date}</div>
                    {/* Status indicator */}
                    <div className="w-2 h-2 rounded-full bg-primary2/30 group-hover:bg-primary2 group-hover:scale-125 transition-all duration-300"></div>
                  </div>
                  <h4 className="font-semibold mb-2 group-hover:text-primary2 transition-colors duration-300">{it.title}</h4>
                  <p className="text-ink-light m-0 group-hover:text-ink transition-colors duration-300">{it.text}</p>
                </div>
                
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}



