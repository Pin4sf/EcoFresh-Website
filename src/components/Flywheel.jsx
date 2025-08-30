import { AnimatedGridPattern } from './ui/animated-grid-pattern'

export default function Flywheel() {
  return (
    <section className="py-20 bg-bg2 relative overflow-hidden" id="flywheel">
      {/* Animated grid pattern background */}
      <div className="absolute inset-0 -z-0 pointer-events-none">
        <div className="absolute inset-0 -z-10" />
        <AnimatedGridPattern
          className="[mask-image:radial-gradient(1100px_circle_at_center,white,transparent)]"
          color="#7ADAA5"
          maxOpacity={0.15}
          numSquares={35}
          duration={3}
          width={45}
          height={45}
        />
      </div>
      <div className="mx-auto max-w-[1200px] px-4">
        <h2 data-split className="section-title text-center font-display text-3xl font-semibold mb-3">Business Model & Flywheel</h2>
        <p className="text-center text-ink-light max-w-2xl mx-auto mb-12" data-reveal>
          A simple, repeatable loop that compounds value at every turn — fewer
          choices, clearer actions and stronger momentum.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Visual Flywheel */}
          <div className="flex justify-center" data-reveal>
            <svg viewBox="0 0 320 320" width="320" height="320" className="max-w-xs drop-shadow-sm">
              {/* Outer progress ring animated via GSAP (see animations.js) */}
              <circle cx="160" cy="160" r="120" fill="none" stroke="currentColor" className="text-primary2/70" strokeWidth="3" />
              {/* Dashed inner accent ring for modern look */}
              <circle cx="160" cy="160" r="96" fill="none" stroke="currentColor" className="text-primary1/60" strokeWidth="2" strokeDasharray="6 8" />
              {/* Direction cue */}
              <path d="M 230 120 L 252 112 L 240 132 Z" fill="currentColor" className="text-primary2 animate-spin [animation-duration:8s] [transform-origin:160px_160px]" />
              <text x="160" y="160" textAnchor="middle" dominantBaseline="middle" className="font-display text-[18px] font-semibold fill-current">EcoFresh</text>
            </svg>
          </div>

          {/* Explanatory bullets — progressive disclosure and visual hierarchy */}
          <div className="grid grid-cols-1 gap-6" data-reveal>
            <div className="bg-white/60 backdrop-blur border border-white/30 rounded-2xl p-6 shadow-sm">
              <h4 className="font-semibold mb-2">Distribution Channels</h4>
              <ul className="grid grid-cols-1 gap-2 text-ink-light">
                <li className="flex items-center gap-2"><span>🏙️</span><span>Municipal waste partnerships</span></li>
                <li className="flex items-center gap-2"><span>🏭</span><span>Industrial waste streams</span></li>
                <li className="flex items-center gap-2"><span>🌾</span><span>Agricultural residue networks</span></li>
                <li className="flex items-center gap-2"><span>🥗</span><span>Food processing facilities</span></li>
              </ul>
            </div>

            <div className="bg-white/60 backdrop-blur border border-white/30 rounded-2xl p-6 shadow-sm">
              <h4 className="font-semibold mb-2">Competitive Edge</h4>
              <ul className="grid grid-cols-1 gap-2 text-ink-light">
                <li>Zero raw material cost</li>
                <li>Decentralized scalability</li>
                <li>AI-driven optimization</li>
                <li>Circular economy model</li>
              </ul>
            </div>

            {/* The four steps — law of proximity & serial position effect */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { k: 'collect', t: 'Organic waste intake' },
                { k: 'convert', t: 'Bioprocess into PHA' },
                { k: 'form', t: 'EcoForm pellets & sheets' },
                { k: 'demand', t: 'Sell to B2B/B2G/B2C' },
              ].map((s) => (
                <div key={s.k} className="bg-white/60 backdrop-blur border border-white/30 rounded-xl p-4 shadow-sm hover:shadow transition card-tilt" aria-label={s.t}>
                  <div className="text-sm font-semibold text-primary2 mb-1">{s.t}</div>
                  <p className="m-0 text-xs text-ink-light">Low friction hand-offs reduce drop-offs.</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


