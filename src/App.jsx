import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Metrics from './components/Metrics'
import ImpactCalculator from './components/ImpactCalculator'
import VideoSection from './components/VideoSection'
import Footer from './components/Footer'
import TechTiles from './components/TechTiles'
import Flywheel from './components/Flywheel'
import RevenueStreams from './components/RevenueStreams'
import Timeline from './components/Timeline'
import Narrative from './components/Narrative'
import Policy from './components/Policy'
import Roadmap from './components/Roadmap'
import IP from './components/IP'
import Team from './components/Team'
import InvestorCallout from './components/InvestorCallout'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

function App() {
  useEffect(() => {
    // Check if device supports smooth scrolling for better performance
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    const isLowPerformance = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4

    // Initialize ScrollSmoother for fluid scrolling experience
    let smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: isMobile ? 0.5 : isLowPerformance ? 0.8 : 1.2, // Adaptive smoothness based on device
      effects: true, // Enable data-speed and data-lag effects
      smoothTouch: isMobile ? 0.1 : false, // Light touch smoothing for mobile only
      normalizeScroll: true, // Prevent scrolling issues on different devices
      ignoreMobileResize: true, // Better mobile experience
      speed: 1, // Scroll speed multiplier
      lag: 0.1, // Lag amount for smoother feel
    })

    // Refresh ScrollTrigger when ScrollSmoother is ready
    ScrollTrigger.refresh()

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
          <RevenueStreams />
        </div>
        {/* <Timeline /> */}
        <div data-speed="1.02">
          <Narrative />
        </div>
        <Policy />
        <div data-speed="0.97">
          <Roadmap />
        </div>
        <IP />
        <div data-speed="1.03">
          <Team />
        </div>
        <InvestorCallout />
        <ImpactCalculator />
        <div data-speed="0.99">
          <VideoSection />
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
