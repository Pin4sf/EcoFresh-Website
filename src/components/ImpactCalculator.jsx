import { useEffect, useMemo, useState } from 'react'
import { Button } from './ui/button'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from './ui/dialog'

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
    <section data-reveal className="py-20 bg-bg2" id="impact-calculator">
      <div className="mx-auto max-w-[1200px] px-4">
        <h2 className="section-title text-center font-display text-3xl font-semibold mb-10">Calculate Your Impact</h2>
        <div className="max-w-2xl mx-auto bg-white/60 backdrop-blur border border-white/30 rounded-2xl p-8 shadow-xl">
          <label htmlFor="wasteSliderReact" className="block text-sm font-medium mb-2">Monthly Organic Waste (kg)</label>
          <div className="flex flex-col md:flex-row gap-3 items-center mb-6">
            <input id="wasteSliderReact" type="range" min="0" max="5000" step="50" defaultValue={waste} onChange={(e) => setWaste(Number(e.target.value))} className="w-full h-2 bg-primary1 rounded-lg accent-primary2" />
            <input type="number" min="0" max="5000" value={waste} onChange={(e) => setWaste(Number(e.target.value || 0))} className="w-32 rounded-md border px-3 py-2" />
          </div>
          <p className="text-sm text-ink-light italic mb-8">Estimate based on current process parameters; real values depend on feedstock and configuration.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="text-center bg-bg1 border-2 border-primary1 rounded-xl p-6">
              <span className="block font-display text-3xl font-bold mb-1">{formatNumber(outputs.bags)}</span>
              <span className="text-ink-light font-medium">Plastic Bags Avoided</span>
            </div>
            <div className="text-center bg-bg1 border-2 border-primary2 rounded-xl p-6">
              <span className="block font-display text-3xl font-bold mb-1">{outputs.co2.toFixed(1)}kg</span>
              <span className="text-ink-light font-medium">CO₂ Emissions Saved</span>
            </div>
            <div className="md:col-span-2 text-center italic text-ink-light bg-primary1/30 border border-primary1 rounded-xl p-4">Equivalent to taking approximately <strong>{outputs.cars.toFixed(1)}</strong> cars off the road for a day</div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild>
              <a href="#">Request EcoForm Sample</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="#pilots">Open Pilot Program</a>
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="secondary">📊 Methodology</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Impact Calculation Methodology</DialogTitle>
                  <DialogClose className="text-2xl leading-none">×</DialogClose>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Assumptions & Factors</h4>
                    <ul className="list-disc list-inside text-ink-light">
                      <li><strong>Plastic Bags Avoided:</strong> 4 bags per kg of organic waste processed</li>
                      <li><strong>CO₂ Savings:</strong> 0.01 kg CO₂ saved per kg of waste processed</li>
                      <li><strong>Car Equivalence:</strong> 0.0002 cars off road per kg processed per day</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Calculation Notes</h4>
                    <p className="text-ink-light">These estimates are based on laboratory data and pilot studies. Actual values may vary depending on waste composition, local factors, and system configuration. Results are calculated using conservative estimates to ensure realistic projections.</p>
                    <p className="text-ink-light"><strong>Data Sources:</strong> Internal lab studies, peer-reviewed research on PHA production, EPA emission factors.</p>
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <Button variant="outline">Download CSV</Button>
                    <DialogClose asChild>
                      <Button>Close</Button>
                    </DialogClose>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  )
}


