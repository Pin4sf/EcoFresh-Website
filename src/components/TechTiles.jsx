import { RaycastAnimatedBackground } from './ui/raycast-animated-blue-background'

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
    <section className="snap-section py-16 sm:py-20 relative overflow-hidden flex flex-col" id="technology">
      {/* Mobile Black Background */}
      <div className="absolute inset-0 -z-20 bg-ink sm:hidden"></div>
      
      {/* Shader Background - Hidden on mobile */}
      <div className="hidden sm:block">
        <RaycastAnimatedBackground className="absolute inset-0 -z-10" />
      </div>
      
      {/* Content Overlay */}
      <div className="mx-auto max-w-[1200px] px-4 relative z-10 flex-1 flex flex-col">
        <h2 className="section-title text-center font-display text-2xl sm:text-3xl font-semibold mb-4 text-white">The Tech Moat — 5 Innovations</h2>
        <p className="text-center text-white/90 text-base sm:text-lg mb-8 sm:mb-12 max-w-3xl mx-auto">
          Our proprietary technology stack creates multiple competitive moats through integrated AI, biotechnology, and circular design.
        </p>
        
        {/* Responsive Grid with Better Mobile Sizing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 auto-rows-fr flex-1">
          {tiles.map((t, i) => {
            // Improved responsive layout configuration with better mobile handling
            const layouts = {
              // Mobile: Single column, taller height for better mobile experience
              mobile: 'col-span-1 min-h-[240px] sm:min-h-[200px]',
              // Tablet: 2 columns, balanced sizing
              tablet: 'sm:col-span-1 sm:min-h-[220px]',
              // Desktop: 3 columns, balanced sizing
              desktop: 'lg:col-span-1 lg:min-h-[240px]',
              // Large screens: 5 columns, compact but readable
              xl: 'xl:col-span-1 xl:min-h-[260px]'
            }
            
            const layoutClass = `${layouts.mobile} ${layouts.tablet} ${layouts.desktop} ${layouts.xl}`
            
            return (
              <div key={i} data-reveal className={`group relative ${layoutClass} transition-all duration-500`}>
                {/* Card Background with Glass Effect */}
                <div className="absolute inset-0 rounded-2xl bg-bg1/10 backdrop-blur-md border border-bg1/20 shadow-lg" />
                
                {/* Hover Effects */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ring-2 ring-primary1/60 ring-offset-2 ring-offset-transparent" />
                
                {/* Content */}
                <div className="relative h-full rounded-2xl p-4 sm:p-5 lg:p-6 flex flex-col justify-between">
                  <div className="text-left">
                    <h4 className="text-lg sm:text-xl lg:text-xl xl:text-xl font-semibold mb-3 text-white tracking-tight leading-tight">{t.title}</h4>
                    <p className="text-white/90 text-sm sm:text-sm lg:text-base leading-relaxed">{t.description}</p>
                  </div>
                  
                  {/* Bottom indicator */}
                  <div className="mt-4 pt-3 border-t border-white/20">
                    <div className="inline-block bg-primary1/20 text-primary1 text-xs font-semibold px-3 py-1 rounded-full border border-primary1/30">
                      Innovation {i + 1}
                    </div>
                  </div>
                </div>
                
                {/* Enhanced Hover Shadow */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl transition duration-300 group-hover:shadow-[0_0_30px_0_rgba(122,226,207,0.25),0_0_60px_10px_rgba(7,122,125,0.25)]" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}


