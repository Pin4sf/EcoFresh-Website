import { WaveAnimation } from './ui/wave-animation'

export default function TechTiles() {
  const tiles = [
    { 
      title: 'Waste-Agnostic Detox', 
      description: 'Single module handles diverse waste streams without feedstock-specific processing lines'
    },
    { 
      title: 'Real-Time Additive Dosing', 
      description: 'AI-driven precision injection of additives for optimal bioplastic properties'
    },
    { 
      title: 'AI-Governed Process', 
      description: 'Machine learning models dynamically adjust fermentation parameters in real-time'
    },
    { 
      title: 'In-Situ SuCO₂', 
      description: 'Captures fermentation CO₂ and reuses it for polymer extraction, creating closed loops'
    },
    { 
      title: 'Zero-Waste Valorization', 
      description: 'Residual bio-slurry becomes nutrient-rich fertilizer, completing the circular economy'
    },
  ]
  return (
    <section className="section-full min-h-screen py-10 sm:py-12 relative overflow-hidden flex flex-col" id="technology">
      {/* Gradient Background Layer (darker) */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-br from-[#124170] via-[#0f2f3a] to-[#26667F]"></div>
      
      {/* Wave Animation Background - Hidden on mobile for performance */}
      <div className="hidden sm:block absolute inset-0 -z-10 opacity-40">
        <WaveAnimation 
          width={2400}
          height={950}
          waveSpeed={1.5}
          waveIntensity={30}
          particleColor="#DDF4E7"
          pointSize={2.5}
          gridDistance={4}
          className="w-full h-full"
        />
      </div>

      {/* Subtle dark overlay for readability */}
      <div className="absolute inset-0 z-0 bg-black/25"></div>

      {/* Floating Bubbles */}
      <div className="absolute inset-0 z-0 opacity-25 pointer-events-none">
        {/* Large bubbles */}
        <div className="absolute top-16 left-10 w-24 h-24 bg-white/10 rounded-full blur-md animate-float-slow"></div>
        <div className="absolute bottom-16 right-14 w-20 h-20 bg-white/10 rounded-full blur-md animate-float-medium"></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-white/10 rounded-full blur-md animate-float-fast"></div>
        {/* Medium bubbles */}
        <div className="absolute top-1/4 left-1/3 w-12 h-12 bg-white/10 rounded-full blur-sm animate-float-medium-delayed"></div>
        <div className="absolute bottom-1/3 left-1/4 w-14 h-14 bg-white/10 rounded-full blur-sm animate-float-slow-delayed"></div>
        <div className="absolute top-2/3 right-1/5 w-10 h-10 bg-white/10 rounded-full blur-sm animate-float-fast-delayed"></div>
        {/* Small bubbles */}
        <div className="absolute top-10 right-12 w-8 h-8 bg-white/10 rounded-full blur-[1px] animate-float-slow"></div>
        <div className="absolute bottom-24 left-1/2 w-6 h-6 bg-white/10 rounded-full blur-[1px] animate-float-medium"></div>
        <div className="absolute top-1/2 left-16 w-5 h-5 bg-white/10 rounded-full blur-[1px] animate-float-fast"></div>
      </div>
      
      {/* Content Overlay */}
      <div className="mx-auto max-w-[1200px] px-4 relative z-10 flex-1 flex flex-col text-white">
        <h2 className="section-title text-center font-sans text-2xl sm:text-3xl font-semibold mb-3 text-white">The Tech Moat — 5 Innovations</h2>
        <p className="text-center text-white/90 text-base sm:text-lg mb-6 sm:mb-8 max-w-3xl mx-auto">
          Our proprietary technology stack creates multiple competitive moats through integrated AI, biotechnology, and circular design.
        </p>
        
        {/* Central Bento Grid Layout - Featured Center Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5 auto-rows-fr flex-1 max-w-5xl mx-auto">
          {tiles.map((t, i) => {
            // Central bento grid layout with featured center card
            const bentoLayouts = {
              // Mobile: Single column, compact height
              mobile: 'col-span-1 min-h-[140px]',
              // Small screens: 2 columns, balanced
              sm: 'sm:col-span-1 sm:min-h-[130px]',
              // Large screens: create central bento pattern
              lg: i === 0 ? 'lg:col-span-1 lg:row-span-1 lg:min-h-[140px]' : 
                   i === 1 ? 'lg:col-span-1 lg:row-span-1 lg:min-h-[140px]' :
                   i === 2 ? 'lg:col-span-1 lg:row-span-2 lg:min-h-[280px]' :
                   i === 3 ? 'lg:col-span-1 lg:row-span-1 lg:min-h-[140px]' :
                   'lg:col-span-1 lg:row-span-1 lg:min-h-[140px]',
              // Extra large: maintain central bento pattern
              xl: i === 0 ? 'xl:col-span-1 xl:row-span-1 xl:min-h-[150px]' : 
                   i === 1 ? 'xl:col-span-1 xl:row-span-1 xl:min-h-[150px]' :
                   i === 2 ? 'xl:col-span-1 xl:row-span-2 xl:min-h-[300px]' :
                   i === 3 ? 'xl:col-span-1 xl:row-span-1 xl:min-h-[150px]' :
                   'xl:col-span-1 xl:row-span-1 xl:min-h-[150px]'
            }
            
            const layoutClass = `${bentoLayouts.mobile} ${bentoLayouts.sm} ${bentoLayouts.md} ${bentoLayouts.lg} ${bentoLayouts.xl}`
            
            return (
              <div key={i} data-reveal className={`group relative ${layoutClass} transition-all duration-700 ease-out transform hover:scale-[1.02] hover:-translate-y-1`}>
                {/* Card Background with Glass Effect */}
                <div className="absolute inset-0 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl transition-all duration-500 group-hover:bg-white/20 group-hover:border-white/40 group-hover:shadow-2xl" />
                
                {/* Hover Effects */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none ring-2 ring-white/60 ring-offset-4 ring-offset-transparent scale-95 group-hover:scale-100" />
                
                {/* Content */}
                <div className="relative h-full rounded-3xl p-3 sm:p-4 lg:p-5 flex flex-col justify-between">
                  <div className="text-left">
                    <h4 className="text-lg sm:text-xl lg:text-2xl xl:text-2xl font-extrabold mb-2 text-white tracking-tight leading-tight group-hover:text-white transition-colors duration-500">{t.title}</h4>
                    <p className="text-white/90 text-sm sm:text-base lg:text-base font-medium leading-relaxed group-hover:text-white transition-colors duration-500">{t.description}</p>
                  </div>
                  
                  {/* Bottom indicator with enhanced styling */}
                  <div className="mt-2 pt-2 border-t border-white/20 group-hover:border-white/40 transition-colors duration-500">
                    <div className="inline-block bg-white/20 text-white text-sm font-semibold px-3 py-1.5 rounded-full border border-white/30 group-hover:bg-white/30 group-hover:border-white/50 transition-all duration-500 group-hover:scale-105">
                      Innovation {i + 1}
                    </div>
                  </div>
                </div>
                
                {/* Enhanced Hover Shadow with color transition */}
                <div className="pointer-events-none absolute inset-0 rounded-3xl transition-all duration-700 group-hover:shadow-[0_0_40px_0_rgba(255,255,255,0.3),0_0_80px_20px_rgba(255,255,255,0.15)]" />
                
                {/* Subtle background glow on hover */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-white/5 via-transparent to-white/5" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}


