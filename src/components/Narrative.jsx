export default function Narrative() {
  return (
    <section className="py-20 bg-bg2" id="narrative">
      <div className="mx-auto max-w-[1200px] px-4 grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">What We Do</h3>
            <p className="text-ink-light">We transform any organic waste into high-value PHA bioplastics using our proprietary AI-governed bioprocessing platform. Our decentralized approach eliminates raw material costs while ensuring consistent quality.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Why It Matters</h3>
            <p className="text-ink-light">Current bioplastic production relies on expensive virgin feedstocks and centralized facilities. We unlock infinite, free feedstock while reducing environmental impact through distributed processing.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Why Now</h3>
            <p className="text-ink-light">Regulatory pressure on single-use plastics, AI breakthroughs in bioprocessing, and growing demand for sustainable materials create a perfect convergence for our technology.</p>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col gap-4 items-center">
            <div className="flex items-center gap-3 px-6 py-3 bg-primary1/30 border-2 border-primary1 rounded-full min-w-[200px]"><span className="text-2xl">🔬</span><span>Technology</span></div>
            <div className="flex items-center gap-3 px-6 py-3 bg-primary1/30 border-2 border-primary1 rounded-full min-w-[200px]"><span className="text-2xl">🌿</span><span>Sustainability</span></div>
            <div className="flex items-center gap-3 px-6 py-3 bg-primary1/30 border-2 border-primary1 rounded-full min-w-[200px]"><span className="text-2xl">📈</span><span>Scalability</span></div>
          </div>
        </div>
      </div>
    </section>
  )
}



