import { useEffect, useMemo, useState } from 'react'
import { VantaFog } from './ui/vanta-fog'

function formatNumber(n) {
  return new Intl.NumberFormat().format(n)
}

export default function ImpactCalculator() {
  const [waste, setWaste] = useState(1000)
  
  const outputs = useMemo(() => {
    const bags = waste * 4
    const co2 = waste * 0.01
    const cars = waste * 0.0002
    return { bags, co2, cars }
  }, [waste])

  useEffect(() => {
    const slider = document.getElementById('wasteSliderReact')
    if (!slider) return
    slider.value = String(waste)
  }, [waste])

  return (
    <section data-reveal className="py-20 bg-bg2 relative overflow-hidden" id="impact-calculator">
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
        <h2 className="section-title text-center font-space-grotesk text-4xl font-bold mb-4 text-ink">Calculate Your Impact</h2>
        <p className="text-center text-ink-light text-lg mb-10 max-w-2xl mx-auto font-light">Discover how much environmental impact you can make by processing organic waste with EcoForm® technology.</p>
        <div className="max-w-xl mx-auto bg-white/80 backdrop-blur-md border border-white/40 rounded-2xl p-6 shadow-xl">
                      <label htmlFor="wasteSliderReact" className="block text-sm font-space-grotesk font-medium mb-2 text-ink">Monthly Organic Waste (kg)</label>
          <div className="flex flex-col md:flex-row gap-3 items-center mb-4">
            <input id="wasteSliderReact" type="range" min="0" max="5000" step="50" defaultValue={waste} onChange={(e) => setWaste(Number(e.target.value))} className="w-full h-2 bg-primary1 rounded-lg accent-primary2" />
            <input type="number" min="0" max="5000" value={waste} onChange={(e) => setWaste(Number(e.target.value || 0))} className="w-24 rounded-md border px-2 py-1 text-sm" />
          </div>
          <p className="text-xs text-ink-light italic mb-6 text-center font-light">Estimate based on current process parameters; real values depend on feedstock and configuration.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="text-center bg-white/90 backdrop-blur-md border-2 border-primary1/30 rounded-xl p-4 shadow-lg">
              <span className="block font-space-grotesk text-2xl font-bold mb-1 text-primary1">{formatNumber(outputs.bags)}</span>
              <span className="text-ink text-sm font-space-grotesk font-medium">Plastic Bags Avoided</span>
            </div>
            <div className="text-center bg-white/90 backdrop-blur-md border-2 border-primary2/30 rounded-xl p-4 shadow-lg">
              <span className="block font-space-grotesk text-2xl font-bold mb-1 text-primary2">{outputs.co2.toFixed(1)}kg</span>
              <span className="text-ink text-sm font-space-grotesk font-medium">CO₂ Emissions Saved</span>
            </div>
            <div className="md:col-span-2 text-center bg-gradient-to-r from-primary1/20 to-primary2/20 border-2 border-primary1/30 rounded-xl p-4">
              <p className="text-ink text-sm font-space-grotesk font-medium">Equivalent to taking approximately <strong className="text-primary1">{outputs.cars.toFixed(1)}</strong> cars off the road for a day</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


