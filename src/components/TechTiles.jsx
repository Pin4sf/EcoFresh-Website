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
    <section className="py-20 bg-bg1" id="technology">
      <div className="mx-auto max-w-[1200px] px-4">
        <h2 className="section-title text-center font-display text-3xl font-semibold mb-4">The Tech Moat — 5 Innovations</h2>
        <p className="text-center text-ink-light text-lg mb-12 max-w-3xl mx-auto">
          Our proprietary technology stack creates multiple competitive moats through integrated AI, biotechnology, and circular design.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 auto-rows-[minmax(180px,auto)]">
          {tiles.map((t, i) => {
            // Responsive layout configuration
            const layouts = {
              // Mobile: Single column stack
              mobile: 'col-span-1 min-h-[180px]',
              // Tablet: 2 columns, center card spans both but smaller
              tablet: i === 1 ? 'sm:col-span-2 sm:row-span-2 sm:min-h-[320px]' : 'sm:col-span-1 sm:min-h-[180px]',
              // Desktop: 3 columns, center card is prominent but not overwhelming
              desktop: i === 1 ? 'lg:col-span-2 lg:row-span-2 lg:min-h-[380px]' : 'lg:col-span-1 lg:min-h-[200px]',
              // Large screens: 4 columns, better distribution
              xl: i === 1 ? 'xl:col-span-2 xl:row-span-2 xl:min-h-[380px]' : 'xl:col-span-1 xl:min-h-[200px]'
            }
            
            const layoutClass = `${layouts.mobile} ${layouts.tablet} ${layouts.desktop} ${layouts.xl}`
            
            // Placeholder background images for each card
            const bgImages = [
              'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
              'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop',
              'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop',
              'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop',
              'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'
            ]
            
            return (
              <div key={i} data-reveal className={`group relative ${layoutClass} transition-all duration-500`}>
                {/* Background Image */}
                <div 
                  className="absolute inset-0 rounded-3xl bg-cover bg-center opacity-20"
                  style={{ backgroundImage: `url(${bgImages[i]})` }}
                />
                {/* Overlay */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm" />
                <div className="absolute inset-0 rounded-3xl border border-black/10 shadow-sm" />
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ring-2 ring-primary2/60 ring-offset-2 ring-offset-bg1" />
                <div className="relative h-full rounded-3xl p-3 sm:p-4 lg:p-6 flex flex-col justify-end">
                  <div className="text-left">
                    <h4 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-semibold mb-1 sm:mb-2 lg:mb-3 text-ink tracking-tight leading-tight">{t.title}</h4>
                    <p className="text-ink-light/90 text-xs sm:text-sm lg:text-base leading-relaxed">{t.description}</p>
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-0 rounded-3xl transition duration-300 group-hover:shadow-[0_0_30px_0_rgba(56,189,248,0.25),0_0_60px_10px_rgba(168,85,247,0.25)]" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}


