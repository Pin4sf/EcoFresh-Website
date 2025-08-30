import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button } from './ui/button'
import { AnimatedGridPattern } from './ui/animated-grid-pattern'

gsap.registerPlugin(ScrollTrigger)

// Professional icon components
const ShoppingBagIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z" />
  </svg>
)

const FactoryIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 2v6l3 2v12H4V10l5-8z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8l8 4v10H12V8z" />
    <circle cx="7" cy="16" r="1" />
    <circle cx="16" cy="16" r="1" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 2l1-1 1 1M16 6l1-1 1 1" />
  </svg>
)

const GovernmentIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3l9 4.5v1.5H3V7.5L12 3z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 9v12h2V9M9 9v12h2V9M13 9v12h2V9M17 9v12h2V9" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21h18" />
    <circle cx="12" cy="6" r="1" />
  </svg>
)

const streams = [
  { key: 'b2c', IconComponent: ShoppingBagIcon, title: 'B2C', target: 'Eco-conscious consumers, housing societies', model: 'Direct sales + subscriptions', edge: 'Zero input cost' },
  { key: 'b2b', IconComponent: FactoryIcon, title: 'B2B', target: 'Plastic manufacturers, FMCG brands', model: 'Bulk EcoForm sales + customization', edge: 'Policy-aligned' },
  { key: 'b2g', IconComponent: GovernmentIcon, title: 'B2G', target: 'Municipalities, smart cities', model: 'Installation contracts + O&M', edge: 'Modular scale' },
]

export default function RevenueStreams() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const cardsRef = useRef(null)
  const buttonsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate header elements
      gsap.fromTo('.revenue-title', 
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

      gsap.fromTo('.revenue-description', 
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

      // Animate revenue stream cards
      gsap.fromTo('.revenue-card', 
        { 
          opacity: 0, 
          y: 50,
          scale: 0.9,
          rotation: -2
        }, 
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Animate CTA buttons
      gsap.fromTo('.revenue-button', 
        { 
          opacity: 0, 
          y: 30,
          scale: 0.95
        }, 
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: buttonsRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 bg-bg1 relative overflow-hidden" id="revenue-streams">
      {/* Animated grid pattern background */}
      <div className="absolute inset-0 -z-0 pointer-events-none">
        <AnimatedGridPattern
          className="[mask-image:radial-gradient(1200px_circle_at_center,white,transparent)]"
          color="#7ADAA5"
          maxOpacity={0.12}
          numSquares={30}
          duration={3}
          width={50}
          height={50}
        />
      </div>
      <div className="mx-auto max-w-[1200px] px-4 relative z-10">
        <div ref={headerRef}>
          <h2 className="revenue-title section-title text-center font-display text-3xl font-semibold mb-3">Revenue Streams</h2>
          <p className="revenue-description text-center text-ink-light max-w-2xl mx-auto mb-10">
            Clear paths to value across audiences — fewer choices, stronger intent.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {streams.map((s) => (
            <article
              key={s.key}
              className="revenue-card group relative bg-white/60 backdrop-blur border border-white/30 rounded-2xl p-7 text-left shadow-sm hover:shadow-xl hover:bg-white/80 transition-all duration-500 hover:-translate-y-2 will-change-transform overflow-hidden"
            >
              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary1/10 via-transparent to-secondary2/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-primary1/20 to-secondary2/20 text-primary2 group-hover:from-primary1/30 group-hover:to-secondary2/30 transition-all duration-500 group-hover:scale-110">
                      <s.IconComponent />
                    </div>
                    <span className="group-hover:text-primary2 transition-colors duration-300">{s.title}</span>
                  </h3>
                  <span className="inline-block text-[11px] font-semibold px-3 py-1.5 rounded-full bg-accent/90 text-ink group-hover:bg-primary2 group-hover:text-white transition-all duration-300 group-hover:scale-105">{s.edge}</span>
                </div>
                <p className="text-ink-light mb-3 text-sm leading-relaxed group-hover:text-ink transition-colors duration-300">{s.target}</p>
                <p className="text-primary2 font-semibold mb-0 group-hover:text-primary1 transition-colors duration-300">{s.model}</p>
              </div>
              
              {/* Decorative corner elements */}
              <div className="absolute top-3 right-3 w-2 h-2 bg-primary2/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-3 left-3 w-1.5 h-1.5 bg-secondary2/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </article>
          ))}
        </div>

        <div ref={buttonsRef} className="flex flex-wrap items-center justify-center gap-3">
          <Button variant="cta" asChild className="revenue-button">
            <a href="#">Download One-Pager</a>
          </Button>
          <Button variant="cta" asChild className="revenue-button">
            <a href="#pilots">Open Pilot Program</a>
          </Button>
          <Button variant="cta" asChild className="revenue-button">
            <a href="mailto:investors@ecofresh.com">Book Investor Call</a>
          </Button>
        </div>
      </div>
    </section>
  )
}


