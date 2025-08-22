export default function Flywheel() {
  return (
    <section data-reveal className="py-20 bg-bg2" id="flywheel">
      <div className="mx-auto max-w-[1200px] px-4">
        <h2 className="section-title text-center font-display text-3xl font-semibold mb-10">Business Model & Flywheel</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex justify-center" data-reveal>
            <svg viewBox="0 0 300 300" width="300" height="300" className="max-w-xs">
              <circle cx="150" cy="150" r="100" fill="none" stroke="currentColor" className="text-primary2" strokeWidth="2" />
              <path d="M 200 100 L 220 90 L 210 110 Z" fill="currentColor" className="text-primary2 animate-spin [animation-duration:6s] [transform-origin:150px_150px]" />
              <text x="150" y="150" textAnchor="middle" dominantBaseline="middle" className="font-display text-[18px] font-semibold fill-current">EcoFresh</text>
            </svg>
          </div>
          <div className="grid grid-cols-1 gap-6" data-reveal>
            <div>
              <h4 className="font-semibold mb-2">Distribution Channels</h4>
              <ul className="list-disc list-inside text-ink-light">
                <li>Municipal waste partnerships</li>
                <li>Industrial waste streams</li>
                <li>Agricultural residue networks</li>
                <li>Food processing facilities</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Competitive Edge</h4>
              <ul className="list-disc list-inside text-ink-light">
                <li>Zero raw material cost</li>
                <li>Decentralized scalability</li>
                <li>AI-driven optimization</li>
                <li>Circular economy model</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


