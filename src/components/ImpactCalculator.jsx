import { useEffect, useMemo, useState, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { VantaFog } from './ui/vanta-fog'
import { Button } from './ui/button'

gsap.registerPlugin(ScrollTrigger)

function formatNumber(n) {
  return new Intl.NumberFormat().format(n)
}

// Enhanced calculation logic with realistic environmental impact data
function calculateEnvironmentalImpact(wasteKg) {
  // More realistic conversion rates based on research
  const plasticBagsAvoided = Math.round(wasteKg * 3.2) // 1kg organic waste = ~3.2 plastic bag equivalents
  const co2Reduced = (wasteKg * 2.3).toFixed(1) // kg CO2 reduced (landfill methane + plastic production avoided)
  const treesEquivalent = (wasteKg * 0.0045).toFixed(2) // Trees saved equivalent (carbon sequestration)
  const carsOffRoad = (wasteKg * 0.0085).toFixed(1) // Days of car emissions equivalent
  const waterSaved = Math.round(wasteKg * 15.6) // Liters of water saved (plastic production)
  const energySaved = Math.round(wasteKg * 8.2) // kWh energy saved
  const landSaved = (wasteKg * 0.12).toFixed(2) // m² of landfill space saved
  const bioplasticProduced = (wasteKg * 0.15).toFixed(1) // kg of EcoForm® bioplastic produced

  return {
    plasticBagsAvoided,
    co2Reduced,
    treesEquivalent,
    carsOffRoad,
    waterSaved,
    energySaved,
    landSaved,
    bioplasticProduced,
    wasteKg
  }
}

export default function ImpactCalculator() {
  const [waste, setWaste] = useState(1000)
  const [showModal, setShowModal] = useState(false)
  const [isCalculating, setIsCalculating] = useState(false)
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const calculatorRef = useRef(null)
  const modalRef = useRef(null)
  const resultsRef = useRef(null)
  
  const outputs = useMemo(() => calculateEnvironmentalImpact(waste), [waste])

  const handleCalculate = () => {
    setIsCalculating(true)
    
    // Simulate calculation time for better UX
    setTimeout(() => {
      setIsCalculating(false)
      setShowModal(true)
      
      // Animate modal appearance
      if (modalRef.current) {
        gsap.fromTo(modalRef.current, 
          { 
            opacity: 0,
            scale: 0.9
          }, 
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: 'power2.out'
          }
        )
        
        // Animate results cards with delay
        setTimeout(() => {
          gsap.fromTo('.result-card', 
            { 
              opacity: 0, 
              y: 30,
              scale: 0.8,
              rotation: -2
            }, 
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotation: 0,
              duration: 0.6,
              stagger: 0.1,
              ease: 'back.out(1.7)'
            }
          )
        }, 200)
      }
    }, 1200)
  }

  const closeModal = () => {
    gsap.to(modalRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        setShowModal(false)
      }
    })
  }

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && showModal) {
        closeModal()
      }
    }
    
    if (showModal) {
      document.addEventListener('keydown', handleEscape)
      return () => {
        document.removeEventListener('keydown', handleEscape)
      }
    }
  }, [showModal])

  useEffect(() => {
    const slider = document.getElementById('wasteSliderReact')
    if (!slider) return
    slider.value = String(waste)
  }, [waste])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate header
      gsap.fromTo('.impact-title', 
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

      gsap.fromTo('.impact-description', 
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

      // Animate calculator container
      gsap.fromTo(calculatorRef.current, 
        { 
          opacity: 0, 
          y: 50,
          scale: 0.9
        }, 
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: calculatorRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Animate result cards
      gsap.fromTo('.result-card', 
        { 
          opacity: 0, 
          y: 30,
          scale: 0.9,
          rotation: -1
        }, 
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: resultsRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 bg-bg2 relative overflow-hidden" id="impact-calculator">
      {/* Vanta.js Fog Background */}
      <VantaFog 
        highlightColor="#67C090"
        midtoneColor="#86c8b8"
        lowlightColor="#124170"
        backgroundColor="#f7f2ec"
        blurFactor={0.50}
        speed={1.50}
        zoom={0.70}
      />
      {/* Content overlay to ensure readability */}
      <div className="absolute inset-0 bg-bg2/80 -z-5" />
      <div className="mx-auto max-w-[1200px] px-4 relative z-20">
        <div ref={headerRef}>
          <h2 className="impact-title section-title text-center font-space-grotesk text-4xl font-bold mb-4 text-ink">Calculate Your Impact</h2>
          <p className="impact-description text-center text-ink-light text-lg mb-10 max-w-2xl mx-auto font-light">Discover how much environmental impact you can make by processing organic waste with EcoForm® technology.</p>
        </div>
        {/* Calculator Input Section */}
        <div ref={calculatorRef} className="max-w-2xl mx-auto bg-white/90 backdrop-blur-md border border-white/40 rounded-2xl p-8 shadow-xl">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-space-grotesk font-bold text-ink mb-2">EcoForm® Impact Calculator</h3>
            <p className="text-ink-light text-sm">See how much environmental impact you can make with EcoForm® technology</p>
          </div>
          
          <div className="mb-6">
            <label htmlFor="wasteSliderReact" className="block text-lg font-space-grotesk font-semibold mb-3 text-ink">
              Monthly Organic Waste Processing
            </label>
            <div className="flex flex-col gap-4">
              <div className="relative">
                <input 
                  id="wasteSliderReact" 
                  type="range" 
                  min="100" 
                  max="10000" 
                  step="100" 
                  value={waste}
                  onChange={(e) => setWaste(Number(e.target.value))} 
                  className="w-full h-3 bg-gradient-to-r from-primary1/30 to-primary2/30 rounded-lg accent-primary2 cursor-pointer"
                />
                <div className="flex justify-between text-xs text-ink-light mt-1">
                  <span>100kg</span>
                  <span>10,000kg</span>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-4">
                <div className="flex items-center gap-2">
                  <input 
                    type="number" 
                    min="100" 
                    max="10000" 
                    step="100"
                    value={waste} 
                    onChange={(e) => setWaste(Number(e.target.value || 100))} 
                    className="w-28 px-3 py-2 rounded-lg border-2 border-primary1/30 text-center font-bold text-lg focus:border-primary2 focus:outline-none"
                  />
                  <span className="text-ink-light font-medium">kg/month</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mb-6">
            <Button 
              variant="cta" 
              size="lg"
              onClick={handleCalculate}
              disabled={isCalculating}
              className="px-8 py-4 text-lg font-bold min-w-[200px]"
            >
              {isCalculating ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Calculating...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  Calculate Impact
                </div>
              )}
            </Button>
          </div>
          
          <p className="text-xs text-ink-light italic text-center font-light">
            Calculations based on current EcoForm® technology research and environmental impact studies
          </p>
        </div>

        {/* Results Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={closeModal}
              onTouchMove={(e) => e.preventDefault()}
            ></div>
            
            {/* Modal Content */}
            <div 
              ref={modalRef}
              className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30"
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white/90 backdrop-blur-xl border-b border-white/30 px-8 py-6 flex items-center justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 bg-primary1/10 border border-primary1/20 rounded-full px-4 py-2 mb-2">
                    <div className="w-2 h-2 bg-primary1 rounded-full animate-pulse"></div>
                    <span className="text-primary1 font-semibold text-sm">🌍 Your Environmental Impact</span>
                  </div>
                  <h3 className="text-2xl font-space-grotesk font-bold text-ink">Amazing Results!</h3>
                  <p className="text-ink-light text-sm">Processing <strong>{formatNumber(waste)}kg</strong> of organic waste monthly</p>
                </div>
                <button 
                  onClick={closeModal}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 group"
                  aria-label="Close modal"
                >
                  <svg className="w-6 h-6 text-gray-600 group-hover:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Modal Body */}
              <div className="p-8">
                {/* Primary Impact Cards */}
                <div ref={resultsRef} className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  <div className="result-card text-center bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-xl p-4 shadow-lg">
                    <div className="text-3xl mb-2">🌱</div>
                    <span className="block font-space-grotesk text-xl font-bold mb-1 text-green-700">{formatNumber(outputs.plasticBagsAvoided)}</span>
                    <span className="text-green-600 text-sm font-space-grotesk font-medium">Plastic Bags Avoided</span>
                  </div>
                  
                  <div className="result-card text-center bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-xl p-4 shadow-lg">
                    <div className="text-3xl mb-2">💨</div>
                    <span className="block font-space-grotesk text-xl font-bold mb-1 text-blue-700">{outputs.co2Reduced}kg</span>
                    <span className="text-blue-600 text-sm font-space-grotesk font-medium">CO₂ Emissions Reduced</span>
                  </div>
                  
                  <div className="result-card text-center bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-300 rounded-xl p-4 shadow-lg">
                    <div className="text-3xl mb-2">🌳</div>
                    <span className="block font-space-grotesk text-xl font-bold mb-1 text-emerald-700">{outputs.treesEquivalent}</span>
                    <span className="text-emerald-600 text-sm font-space-grotesk font-medium">Trees Worth of CO₂ Absorbed</span>
                  </div>
                  
                  <div className="result-card text-center bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-300 rounded-xl p-4 shadow-lg">
                    <div className="text-3xl mb-2">🚗</div>
                    <span className="block font-space-grotesk text-xl font-bold mb-1 text-purple-700">{outputs.carsOffRoad}</span>
                    <span className="text-purple-600 text-sm font-space-grotesk font-medium">Days of Car Emissions</span>
                  </div>
                  
                  <div className="result-card text-center bg-gradient-to-br from-cyan-50 to-cyan-100 border-2 border-cyan-300 rounded-xl p-4 shadow-lg">
                    <div className="text-3xl mb-2">💧</div>
                    <span className="block font-space-grotesk text-xl font-bold mb-1 text-cyan-700">{formatNumber(outputs.waterSaved)}L</span>
                    <span className="text-cyan-600 text-sm font-space-grotesk font-medium">Water Saved</span>
                  </div>
                  
                  <div className="result-card text-center bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-300 rounded-xl p-4 shadow-lg">
                    <div className="text-3xl mb-2">⚡</div>
                    <span className="block font-space-grotesk text-xl font-bold mb-1 text-amber-700">{formatNumber(outputs.energySaved)}</span>
                    <span className="text-amber-600 text-sm font-space-grotesk font-medium">kWh Energy Saved</span>
                  </div>
                </div>
                
                {/* Highlight Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="result-card text-center bg-gradient-to-r from-primary1/20 to-primary2/20 border-2 border-primary1/30 rounded-xl p-6">
                    <div className="text-4xl mb-3">♻️</div>
                    <h5 className="font-space-grotesk font-bold text-lg text-ink mb-2">EcoForm® Production</h5>
                    <p className="text-ink text-sm font-space-grotesk font-medium">
                      <strong className="text-primary1 text-2xl">{outputs.bioplasticProduced}kg</strong><br/>
                      <span className="text-xs">sustainable bioplastic produced</span>
                    </p>
                  </div>
                  
                  <div className="result-card text-center bg-gradient-to-r from-secondary1/20 to-secondary2/20 border-2 border-secondary1/30 rounded-xl p-6">
                    <div className="text-4xl mb-3">🏞️</div>
                    <h5 className="font-space-grotesk font-bold text-lg text-ink mb-2">Land Impact</h5>
                    <p className="text-ink text-sm font-space-grotesk font-medium">
                      <strong className="text-secondary2 text-2xl">{outputs.landSaved}m²</strong><br/>
                      <span className="text-xs">landfill space saved</span>
                    </p>
                  </div>
                  
                  {/* Summary Message */}
                  <div className="result-card text-center bg-gradient-to-r from-primary1/10 via-primary2/10 to-secondary2/10 border-2 border-primary1/20 rounded-xl p-6">
                    <div className="text-4xl mb-3">🎉</div>
                    <h5 className="font-space-grotesk font-bold text-lg text-ink mb-2">Amazing Impact!</h5>
                    <p className="text-ink text-sm font-space-grotesk mb-3">
                      Making a <strong className="text-primary1">significant positive impact</strong> on our planet!
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      <span className="inline-block bg-primary1/20 text-primary1 px-3 py-1 rounded-full text-xs font-medium">Carbon Negative</span>
                      <span className="inline-block bg-green-500/20 text-green-700 px-3 py-1 rounded-full text-xs font-medium">Waste Reduction</span>
                      <span className="inline-block bg-blue-500/20 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">Resource Conservation</span>
                    </div>
                  </div>
                </div>
                
                {/* Modal Footer */}
                <div className="text-center pt-6 border-t border-gray-200">
                  <Button 
                    variant="cta" 
                    onClick={closeModal}
                    className="px-8 py-3 text-lg font-bold"
                  >
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      Awesome! Let's Make an Impact
                    </div>
                  </Button>
                  <p className="text-xs text-ink-light mt-3">Press <kbd className="bg-gray-100 px-2 py-1 rounded text-xs">Esc</kbd> to close</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}


