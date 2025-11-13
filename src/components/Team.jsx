import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Particles } from './ui/particles'

gsap.registerPlugin(ScrollTrigger)

// LinkedIn Icon Component
const LinkedInIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
  </svg>
)

const team = [
  { name: 'Ark Patil', role: 'Founder & CEO', linkedin: 'https://www.linkedin.com/in/ark-patil-a280a4218/', image: '/assets/ark.jpg', bullets: ['Leads strategic direction, partnerships, and commercialization'] },
  { name: 'Shivansh Fulper', role: 'Co-Founder & CTO', linkedin: 'https://www.linkedin.com/in/shivanshfulper/', image: '/assets/shivansh.jpg', bullets: ['AI engineer leading hybrid control, system architecture, and MLOps'] },
  { name: 'Ansh Bathija', role: 'Co-Founder & COO', linkedin: 'https://www.linkedin.com/in/ansh-bathija-45b36121b/', image: '/assets/ansh.jpg', bullets: ['Drives industrial design, data infrastructure, and operational scaling'] },
  { name: 'Mayur Kumar', role: 'Co-Founder & CPO', linkedin: 'https://www.linkedin.com/in/mayur-kumar-4751a2272/', image: '/assets/mayur.jpg', bullets: ['Product lead owning materials innovation and field validation'] },
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
              {t.image ? (
                <img 
                  src={t.image} 
                  alt={`${t.name} - ${t.role}`}
                  className="team-avatar w-28 h-28 mx-auto rounded-full border-4 border-bg1 mb-4 object-cover"
                />
              ) : (
                <div className="team-avatar w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-primary1 to-secondary1 border-4 border-bg1 mb-4" />
              )}
              <div className="flex items-center justify-center gap-2 mb-1">
                <h4 className="font-space-grotesk font-bold">{t.name}</h4>
                <a 
                  href={t.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary2 hover:text-primary1 transition-colors duration-200 hover:scale-110 transform"
                  aria-label={`${t.name}'s LinkedIn profile`}
                >
                  <LinkedInIcon />
                </a>
              </div>
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



