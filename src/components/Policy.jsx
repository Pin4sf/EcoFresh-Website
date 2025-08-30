import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button } from './ui/button'
import { AnimatedGridPattern } from './ui/animated-grid-pattern'

gsap.registerPlugin(ScrollTrigger)

// Professional compliance icons
const EPAIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
)

const EUIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const CertificateIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5l-5-5 4-4-4-4 5-5v18zM6 6h12v12H6z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 2v4l-2-1-2 1V2h4z" />
  </svg>
)

const RecycleIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
)

export default function Policy() {
  const cardsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate compliance cards
      gsap.fromTo('.compliance-card', 
        { 
          opacity: 0, 
          y: 30,
          scale: 0.9
        }, 
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }, cardsRef)

    return () => ctx.revert()
  }, [])

  const complianceStandards = [
    {
      IconComponent: EPAIcon,
      title: 'EPA CERTIFIED',
      description: 'Our technology meets EPA standards for environmental protection and waste management.',
      color: 'from-blue-500/20 to-blue-600/30'
    },
    {
      IconComponent: EUIcon,
      title: 'EU BIODEGRADABLE',
      description: 'Compliant with European Union biodegradability standards and regulations.',
      color: 'from-green-500/20 to-green-600/30'
    },
    {
      IconComponent: CertificateIcon,
      title: 'ASTM D6400',
      description: 'Meets ASTM International standards for compostable plastic materials.',
      color: 'from-purple-500/20 to-purple-600/30'
    },
    {
      IconComponent: RecycleIcon,
      title: 'EN 13432',
      description: 'European standard for packaging recoverable through composting and biodegradation.',
      color: 'from-primary2/20 to-secondary2/30'
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-bg2 to-bg1 relative overflow-hidden" id="government">
      {/* Animated grid pattern background */}
      <div className="absolute inset-0 -z-0 pointer-events-none">
        <AnimatedGridPattern
          className="[mask-image:radial-gradient(1200px_circle_at_center,white,transparent)]"
          color="#7ADAA5"
          maxOpacity={0.10}
          numSquares={20}
          duration={3}
          width={60}
          height={60}
        />
      </div>
      <div className="mx-auto max-w-[1200px] px-4 relative z-10">
        <div className="bg-gradient-to-br from-primary2/20 to-secondary2/20 rounded-3xl p-8 lg:p-12 border border-primary1/20 shadow-xl">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Section: Main Policy Statement */}
            <div className="text-center lg:text-left">
              <h2 className="font-display text-3xl lg:text-4xl xl:text-5xl font-semibold mb-6 text-ink leading-tight">
                Government & Policy Alignment
              </h2>
              <p className="text-ink-light text-lg mb-8 leading-relaxed">
                Our technology directly addresses regulatory mandates for plastic waste reduction and circular economy initiatives. We work closely with environmental agencies to ensure compliance and maximize policy incentives.
              </p>
              <Button variant="cta" size="lg" className="text-lg px-8 py-4">
                View Compliance Framework →
              </Button>
            </div>

            {/* Right Section: Compliance Grid */}
            <div ref={cardsRef} className="grid grid-cols-2 gap-4">
              {complianceStandards.map((standard, index) => (
                <div 
                  key={index} 
                  className="compliance-card group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-sm hover:shadow-lg hover:bg-white/90 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
                >
                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary1/5 via-transparent to-primary2/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="text-center relative z-10">
                    {/* Professional icon with themed background */}
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${standard.color} text-primary2 mb-3 group-hover:scale-110 transition-transform duration-300`}>
                      <standard.IconComponent />
                    </div>
                    <h3 className="font-semibold text-ink text-sm mb-2 tracking-wide group-hover:text-primary2 transition-colors duration-300">
                      {standard.title}
                    </h3>
                    <p className="text-ink-light text-xs leading-relaxed group-hover:text-ink transition-colors duration-300">
                      {standard.description}
                    </p>
                  </div>
                  
                  {/* Status indicator */}
                  <div className="absolute top-3 right-3 w-2 h-2 bg-primary2/30 rounded-full group-hover:bg-primary2 group-hover:scale-125 transition-all duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}



