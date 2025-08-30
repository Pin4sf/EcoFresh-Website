import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AnimatedGridPattern } from './ui/animated-grid-pattern'

gsap.registerPlugin(ScrollTrigger)

export default function Flywheel() {
  const sectionRef = useRef(null)
  const flywheelRef = useRef(null)
  const cardsRef = useRef(null)
  const stepsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the title and description
      gsap.fromTo('[data-split]', 
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
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Animate the flywheel image with rotation
      gsap.fromTo(flywheelRef.current, 
        { 
          opacity: 0, 
          scale: 0.8,
          rotation: -15
        }, 
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: flywheelRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Animate the info cards
      gsap.fromTo('.info-card', 
        { 
          opacity: 0, 
          x: 50,
          scale: 0.9
        }, 
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Animate the flywheel steps
      gsap.fromTo('.flywheel-step', 
        { 
          opacity: 0, 
          y: 20,
          scale: 0.9
        }, 
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: stepsRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      )



    }, sectionRef)

    return () => ctx.revert()
  }, [])
  return (
    <section ref={sectionRef} className="py-20 bg-bg2 relative overflow-hidden" id="flywheel">
      {/* Animated grid pattern background */}
      <div className="absolute inset-0 -z-0 pointer-events-none">
        <div className="absolute inset-0 -z-10" />
        <AnimatedGridPattern
          className="[mask-image:radial-gradient(1100px_circle_at_center,white,transparent)]"
          color="#7ADAA5"
          maxOpacity={0.15}
          numSquares={35}
          duration={3}
          width={45}
          height={45}
        />
      </div>
      <div className="mx-auto max-w-[1200px] px-4">
        <h2 data-split className="section-title text-center font-display text-3xl font-semibold mb-3">Business Model & Flywheel</h2>
        <p className="text-center text-ink-light max-w-2xl mx-auto mb-12" data-reveal>
          A simple, repeatable loop that compounds value at every turn — fewer
          choices, clearer actions and stronger momentum.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Visual Flywheel with Process Flow */}
          <div className="flex justify-center" data-reveal>
            <div ref={flywheelRef} className="relative">
              {/* Background process flow image */}
              <img 
                src="/assets/flywheel.png" 
                alt="EcoFresh Process Flow Diagram" 
                className="w-full max-w-md opacity-80 drop-shadow-lg"
              />
              
              {/* Central flywheel overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 200 200" width="160" height="160" className="drop-shadow-sm">
                  {/* Outer progress ring animated via GSAP (see animations.js) */}
                  <circle cx="100" cy="100" r="75" fill="none" stroke="currentColor" className="text-primary2/70" strokeWidth="2" />
                  {/* Dashed inner accent ring for modern look */}
                  <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" className="text-primary1/60" strokeWidth="1.5" strokeDasharray="4 6" />
                  {/* Direction cue with original rotation */}
                  <path d="M 144 75 L 157 70 L 150 82 Z" fill="currentColor" className="text-primary2 animate-spin [animation-duration:8s] [transform-origin:100px_100px]" />
                  <text x="100" y="100" textAnchor="middle" dominantBaseline="middle" className="font-display text-[14px] font-semibold fill-current">EcoFresh</text>
                </svg>
              </div>
            </div>
          </div>

          {/* Explanatory bullets — progressive disclosure and visual hierarchy */}
          <div ref={cardsRef} className="grid grid-cols-1 gap-6" data-reveal>
            <div className="info-card bg-white/60 backdrop-blur border border-white/30 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:bg-white/80 transition-all duration-300 hover:-translate-y-1">
              <h4 className="font-semibold mb-2">Distribution Channels</h4>
              <ul className="grid grid-cols-1 gap-2 text-ink-light">
                <li>Municipal waste partnerships</li>
                <li>Industrial waste streams</li>
                <li>Agricultural residue networks</li>
                <li>Food processing facilities</li>
              </ul>
            </div>

            <div className="info-card bg-white/60 backdrop-blur border border-white/30 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:bg-white/80 transition-all duration-300 hover:-translate-y-1">
              <h4 className="font-semibold mb-2">Competitive Edge</h4>
              <ul className="grid grid-cols-1 gap-2 text-ink-light">
                <li>Zero raw material cost</li>
                <li>Decentralized scalability</li>
                <li>AI-driven optimization</li>
                <li>Circular economy model</li>
              </ul>
            </div>

            {/* The four steps — law of proximity & serial position effect */}
            <div ref={stepsRef} className="grid grid-cols-2 gap-3">
              {[
                { k: 'collect', t: 'Organic waste intake' },
                { k: 'convert', t: 'Bioprocess into PHA' },
                { k: 'form', t: 'EcoForm pellets & sheets' },
                { k: 'demand', t: 'Sell to B2B/B2G/B2C' },
              ].map((s) => (
                <div key={s.k} className="flywheel-step bg-white/60 backdrop-blur border border-white/30 rounded-xl p-4 shadow-sm hover:shadow-lg hover:bg-white/80 transition-all duration-300 hover:-translate-y-1" aria-label={s.t}>
                  <div className="text-sm font-semibold text-primary2 mb-1">{s.t}</div>
                  <p className="m-0 text-xs text-ink-light">Low friction hand-offs reduce drop-offs.</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


