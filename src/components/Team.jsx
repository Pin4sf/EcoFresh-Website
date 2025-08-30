import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Particles } from './ui/particles'

gsap.registerPlugin(ScrollTrigger)

const team = [
  { name: 'Ark Patil', role: 'CEO & Founder', bullets: ['Operations & Executions', 'Smart manufacturings', 'Strategic planning'] },
  { name: 'Shivansh Fulper', role: 'CTO & Co-Founder', bullets: ['AI/ML systems architect', 'Smart manufacturing systems', 'Business analytics'] },
  { name: 'Ansh Bathija', role: 'CDO & Co-Founder', bullets: ['Industrial prototyping', 'Design strategy', 'Hardware systems'] },
  { name: 'Mayur Kumar', role: 'CPO & Co-Founder', bullets: ['Product Design', '3D Modeling', 'System architecture'] },
]

export default function Team() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const cardsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate header
      gsap.fromTo('.team-title', 
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

      // Animate team cards
      gsap.fromTo('.team-card', 
        { 
          opacity: 0, 
          y: 60,
          scale: 0.9,
          rotation: -2
        }, 
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: 0,
          duration: 0.7,
          stagger: 0.2,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Animate avatars
      gsap.fromTo('.team-avatar', 
        { 
          opacity: 0, 
          scale: 0.5,
          rotation: -90
        }, 
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'elastic.out(1, 0.8)',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 bg-bg1 relative overflow-hidden" id="team">
      {/* Particles background */}
      <div className="absolute inset-0 -z-0 pointer-events-none">
        <Particles
          quantity={150}
          staticity={75}
          ease={65}
          size={0.6}
          color="#26667F"
          vx={0.15}
          vy={0.2}
        />
      </div>
      
      <div className="mx-auto max-w-[1200px] px-4 relative z-10">
        <div ref={headerRef}>
          <h2 className="team-title section-title text-center font-space-grotesk text-3xl font-bold mb-10">Leadership Team</h2>
        </div>
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {team.map((t) => (
            <div key={t.name} className="team-card text-center bg-bg2/90 backdrop-blur-md border-2 border-primary1 rounded-2xl p-6 transition hover:-translate-y-2 hover:shadow-xl">
              <div className="team-avatar w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-primary1 to-secondary1 border-4 border-bg1 mb-4" />
              <h4 className="font-space-grotesk font-bold mb-1">{t.name}</h4>
              <p className="text-primary2 font-space-grotesk font-medium text-sm mb-3">{t.role}</p>
              <ul className="text-ink-light text-sm space-y-1 text-left mx-auto max-w-[220px] font-light">
                {t.bullets.map((b) => (
                  <li key={b}>• {b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}



