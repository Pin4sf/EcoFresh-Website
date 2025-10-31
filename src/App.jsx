import { Suspense, lazy, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Metrics from './components/Metrics'
import Footer from './components/Footer'
import TechTiles from './components/TechTiles'
import Flywheel from './components/Flywheel'
import Narrative from './components/Narrative'
import Policy from './components/Policy'
import Roadmap from './components/Roadmap'
import InvestorCallout from './components/InvestorCallout'

// Lazy-loaded sections
const ImpactCalculator = lazy(() => import('./components/ImpactCalculator'))
const VideoSection = lazy(() => import('./components/VideoSection'))
const RevenueStreams = lazy(() => import('./components/RevenueStreams'))
const Timeline = lazy(() => import('./components/Timeline'))
const IP = lazy(() => import('./components/IP'))
const Team = lazy(() => import('./components/Team'))

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

function App() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    const isLowPerformance = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4
    const isDesktop = !isMobile && (typeof window !== 'undefined' ? window.innerWidth >= 1024 : true)

    let smoother = null
    if (!prefersReducedMotion && isDesktop && !isLowPerformance) {
      smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 0.9,
        effects: true,
        smoothTouch: false,
        normalizeScroll: true,
        ignoreMobileResize: true,
        speed: 1,
        lag: 0.08,
      })
      ScrollTrigger.refresh()
    }

    return () => {
      smoother?.kill()
    }
  }, [])

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
      <Navbar />

      <main>
        {/* Hero */}
        <Hero />
        <div data-speed="0.95">
          <Metrics />
        </div>
        <div data-speed="1.05">
          <TechTiles />
        </div>
        <Flywheel />
        <div data-speed="0.98">
          <Suspense fallback={null}>
            <RevenueStreams />
          </Suspense>
        </div>
        {/* <Timeline /> */}
        <div data-speed="1.02">
          <Narrative />
        </div>
        <Policy />
        <div data-speed="0.97">
          <Roadmap />
        </div>
        <Suspense fallback={null}>
          <IP />
        </Suspense>
        <div data-speed="1.03">
          <Suspense fallback={null}>
            <Team />
          </Suspense>
        </div>
        <InvestorCallout />
        <Suspense fallback={null}>
          <ImpactCalculator />
        </Suspense>
        <div data-speed="0.99">
          <Suspense fallback={null}>
            <VideoSection />
          </Suspense>
        </div>
      </main>
      
      {/* Floating Investor CTA Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <a 
          href="tel:+919665437830"
          className="bg-primary2 hover:bg-primary1 text-ink font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-center gap-2"
        >
          <span className="text-lg">📞</span>
          <span className="hidden sm:inline">Book Investor Call</span>
          <span className="sm:hidden">Call</span>
        </a>
      </div>
      
      <Footer />
      </div>
    </div>
  )
}

export default App
