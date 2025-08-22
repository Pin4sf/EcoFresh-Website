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

function App() {
  return (
    <div>
      <Navbar />

      <main>
        {/* Hero */}
        <Hero />
        <Metrics />
        <TechTiles />
        <Flywheel />
        <RevenueStreams />
        <Timeline />
        <Narrative />
        <Policy />
        <Roadmap />
        <IP />
        <Team />
        <InvestorCallout />
        <ImpactCalculator />
        <VideoSection />
      </main>
      
      {/* Floating Investor CTA Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <a 
          href="mailto:investors@ecofresh.com?subject=Investor%20Intro%20Call&body=Hi%20EcoFresh%20Team%2C%0D%0A%0D%0AI%27d%20like%20to%20book%20a%2030-min%20intro%20call.%20Here%20are%20some%20time%20windows%3A%0D%0A-%20%0D%0A-%20%0D%0A%0D%0ARegards%2C%0D%0A"
          className="bg-primary2 hover:bg-primary1 text-ink font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-center gap-2"
        >
          <span className="text-lg">📞</span>
          <span className="hidden sm:inline">Book Investor Call</span>
          <span className="sm:hidden">Call</span>
        </a>
      </div>
      
      <Footer />
    </div>
  )
}

export default App
