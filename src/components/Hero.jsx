import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button } from './ui/button'
import AnimatedBubbleParticles from './ui/animated-bubble-particles'
import { AnimatedGradientText } from './ui/animated-gradient-text'
import { EcoFormSimpleBorder } from './ui/ecoform-simple-border'
import { VantaCells } from './ui/vanta-cells'
import { AnimatedGridPattern } from './ui/animated-grid-pattern'

gsap.registerPlugin(ScrollTrigger)

// Mobile detection hook
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      const userAgent = navigator.userAgent
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      const isSmallScreen = window.innerWidth <= 768
      setIsMobile(mobileRegex.test(userAgent) || (isTouchDevice && isSmallScreen))
    }
    
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  return isMobile
}

// Mobile-optimized canvas component
const MobileCanvas = () => {
  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* Gradient background with EcoFresh brand colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary1/80 via-primary2/60 to-secondary2/80"></div>
      
      {/* Animated overlay patterns */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent animate-pulse"></div>
      
      {/* EcoForm product image placeholder */}
      <div className="absolute inset-0 flex items-center justify-center p-8">
        <div className="text-center text-white/90">
          <div className="w-24 h-24 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.781 0-2.674-2.153-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold mb-2">EcoForm® Bioplastic</h3>
          <p className="text-sm opacity-80">Sustainable. Biodegradable. Innovative.</p>
        </div>
      </div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-white/20 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
        <div className="absolute bottom-1/3 right-1/3 w-1.5 h-1.5 bg-white/35 rounded-full animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3.5s' }}></div>
      </div>
    </div>
  )
}

export default function Hero() {
  const heroRef = useRef(null)
  const secondSectionRef = useRef(null)
  const cardsRef = useRef(null)
  const isMobile = useIsMobile()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Section Animations
      const tl = gsap.timeline()
      
      // Animate hero title
      tl.fromTo('.hero-title', 
        { 
          opacity: 0, 
          y: 50,
          scale: 0.95
        }, 
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: 'power2.out'
        }
      )
      
      // Animate buttons with stagger
      tl.fromTo('.hero-button', 
        { 
          opacity: 0, 
          y: 30 
        }, 
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out'
        }, '-=0.6'
      )

      // Second Section Animations
      gsap.fromTo('.section-title', 
        { 
          opacity: 0, 
          y: 40 
        }, 
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: secondSectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Animate canvas container
      gsap.fromTo('.canvas-container', 
        { 
          opacity: 0, 
          scale: 0.9,
          rotation: -5
        }, 
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: secondSectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Animate feature cards
      gsap.fromTo('.feature-card', 
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
          stagger: 0.2,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Animate tagline
      gsap.fromTo('.hero-tagline', 
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
            trigger: '.hero-tagline',
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      )

    }, heroRef)

    return () => ctx.revert()
  }, [])
  return (
    <div ref={heroRef} className="relative">
      {/* Section 1: Headline and CTAs */}
      <section data-reveal className="snap-section relative flex items-center justify-center px-4 pt-28 pb-8 overflow-hidden" id="hero">
        {/* Background - Mobile optimized */}
        <div className="absolute inset-0 z-0 h-full">
          {isMobile ? (
            // Simple gradient background for mobile
            <div className="absolute inset-0 bg-gradient-to-br from-primary1/90 via-primary2/80 to-secondary2/90">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink/20 pointer-events-none"></div>
              {/* Simple animated background pattern for mobile */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
                <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-primary2 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 right-1/2 w-40 h-40 bg-secondary2 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }}></div>
              </div>
            </div>
          ) : (
            // Full VantaCells for desktop
            <>
              <VantaCells 
                color1="#67C090"
                color2="#124170"
                size={1.00}
                mouseControls={true}
                touchControls={true}
                gyroControls={false}
                minHeight={200.00}
                minWidth={200.00}
                scale={1.00}
                className="opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink/20 pointer-events-none"></div>
            </>
          )}
        </div>
        <div className="relative z-10 max-w-5xl text-center">
          <h1 className="hero-title font-space-grotesk text-5xl md:text-7xl lg:text-8xl font-bold mb-12 md:mb-16 leading-tight text-white mix-blend-difference relative z-20">
            Envisioning the Future for 
            <span className="block text-6xl md:text-8xl lg:text-9xl text-white mix-blend-difference">
              a <AnimatedGradientText className="mix-blend-difference">plastic-free</AnimatedGradientText> tomorrow
            </span>
          </h1>
          
          <div className="flex flex-wrap items-center justify-center gap-5 md:gap-6 mb-4 md:mb-8">
            <Button variant="cta" size="lg" asChild className="hero-button text-lg px-8 py-4">
              <a href="https://dune-mile-55e.notion.site/EcoFresh-268b7cf6c65f80b99f8efc738ef4fa8d" target="_blank" rel="noopener noreferrer">Explore Technology</a>
            </Button>
            <Button variant="cta" size="lg" asChild className="hero-button text-lg px-8 py-4">
              <a href="https://docs.google.com/presentation/d/1ilMP4fLYCqhdDt54FxNFvYMEMkbNhaM8/edit?usp=sharing&ouid=115342461485325584335&rtpof=true&sd=true" target="_blank" rel="noopener noreferrer">View Investor Deck</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Section 2: Heading aligned with canvas, cards row below */}
      <section ref={secondSectionRef} className="snap-section py-20 text-white relative overflow-hidden">
        {/* Animated grid pattern background for section 2 */}
        <div className="absolute inset-0 -z-0">
          {/* Vanta Cells inspired base color for this section */}
          <div className="absolute inset-0 -z-10 bg-[#124170]/80" />
          <AnimatedGridPattern
            className="[mask-image:radial-gradient(900px_circle_at_center,white,transparent)]"
            color="#7ADAA5"
            maxOpacity={0.15}
            numSquares={40}
            duration={3}
            width={50}
            height={50}
          />
        </div>
        
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            {/* Left column: title aligned with canvas */}
            <div className="lg:pr-12 xl:pr-20 self-start">
              <h2 className="section-title font-space-grotesk text-4xl md:text-6xl font-bold mb-6 text-left text-white">
                A world of possibilities for 
                <span className="block">
                  <AnimatedGradientText className="text-5xl md:text-7xl">
                    diverse applications with EcoForm®
                  </AnimatedGradientText>
                </span>
              </h2>
            </div>

            {/* Right column: canvas (mobile-optimized) */}
            <div className="self-start flex flex-col items-center lg:items-end lg:pl-12 xl:pl-20">
              <div className="canvas-container w-full lg:w-[480px] xl:w-[560px] h-[50vh] min-h-[360px] rounded-2xl overflow-hidden border border-white/20 bg-black/20 backdrop-blur-md">
                {isMobile ? (
                  <MobileCanvas />
                ) : (
                  <AnimatedBubbleParticles
                    className="w-full h-full"
                    backgroundColor="#0E2F45"
                    particleColor="#DDF4E7"
                    particleSize={22}
                    spawnInterval={220}
                    height="100%"
                    width="100%"
                  />
                )}
              </div>
            </div>

            {/* Cards row spanning full width below heading + canvas */}
            <div className="lg:col-span-2 mt-10">
              <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="feature-card group bg-white/10 backdrop-blur-md text-white rounded-2xl p-8 border border-white/20 transition-all duration-500 hover:bg-white/20 hover:scale-[1.02] hover:shadow-2xl cursor-pointer">
                  <div className="w-16 h-16 mb-6 bg-gradient-to-br from-primary1/60 to-primary2/60 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-space-grotesk font-bold mb-3 group-hover:text-primary1 transition-colors duration-300">Decentralized Processing</h3>
                  <p className="text-white/90 group-hover:text-white transition-colors duration-300 font-light">Modular units that transform waste into bioplastics at the source, eliminating transportation costs.</p>
                </div>
                <div className="feature-card group bg-white/10 backdrop-blur-md text-white rounded-2xl p-8 border border-white/20 transition-all duration-500 hover:bg-white/20 hover:scale-[1.02] hover:shadow-2xl cursor-pointer">
                  <div className="w-16 h-16 mb-6 bg-gradient-to-br from-secondary1/60 to-secondary2/60 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-space-grotesk font-bold mb-3 group-hover:text-secondary1 transition-colors duration-300">AI-Governed Quality</h3>
                  <p className="text-white/90 group-hover:text-white transition-colors duration-300 font-light">Real-time optimization ensures consistent EcoForm® quality across all production units.</p>
                </div>
                <div className="feature-card group bg-white/10 backdrop-blur-md text-white rounded-2xl p-8 border border-white/20 transition-all duration-500 hover:bg-white/20 hover:scale-[1.02] hover:shadow-2xl cursor-pointer">
                  <div className="w-16 h-16 mb-6 bg-gradient-to-br from-accent/60 to-accent/70 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-space-grotesk font-bold mb-3 group-hover:text-accent transition-colors duration-300">Zero Raw Material Cost</h3>
                  <p className="text-white/90 group-hover:text-white transition-colors duration-300 font-light">Waste becomes feedstock - no virgin materials needed, dramatically reducing production costs.</p>
                </div>
              </div>
              <p className="hero-tagline mt-8 text-white font-space-grotesk font-medium text-lg text-center">
                Policy-aligned • AI-governed • Zero raw material cost
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}


