import { Button } from './ui/button'

export default function Hero() {
  return (
    <>
      <section data-reveal className="relative min-h-dvh flex items-center justify-center px-4 pt-28 pb-8 overflow-hidden bg-gradient-to-br from-bg1 via-seafoam/20 to-lilac/20" id="hero">
        <div className="absolute inset-0 -z-10">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster="/assets/hero-poster.svg"
          >
            <source src="public\assets\Organic_Material_to_PHA_Pellets (online-video-cutter.com).mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl text-center">
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight text-white">
            AI-driven EcoForm® for a 
            <span className="block text-primary2">plastic-free tomorrow</span>
          </h1>
          
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <Button size="lg" asChild className="text-lg px-8 py-4">
              <a href="#technology">Explore Technology</a>
            </Button>
            <Button variant="outline" size="lg" asChild className="text-lg px-8 py-4">
              <a href="#investors">View Investor Deck</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Value Proposition Section - inspired by ZeroCircle's "A Sea of Possibilities" */}
      <section className="py-20 bg-gradient-to-r from-primary2 to-secondary2 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-16 h-16 bg-white rounded-full"></div>
          <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-white rounded-full"></div>
        </div>
        
        <div className="mx-auto max-w-[1200px] px-4 text-center relative z-10">
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-8">
            A world of possibilities for 
            <span className="block">diverse applications</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20">
              <div className="text-4xl mb-4">🏭</div>
              <h3 className="text-xl font-semibold mb-3">Decentralized Processing</h3>
              <p className="text-white/80">Modular units that transform waste into bioplastics at the source, eliminating transportation costs.</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold mb-3">AI-Governed Quality</h3>
              <p className="text-white/80">Real-time optimization ensures consistent EcoForm® quality across all production units.</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-3">Zero Raw Material Cost</h3>
              <p className="text-white/80">Waste becomes feedstock - no virgin materials needed, dramatically reducing production costs.</p>
            </div>
          </div>
          
          <div className="mt-12">
            <p className="text-white/90 font-medium text-lg">
              Policy-aligned • AI-governed • Zero raw material cost
            </p>
          </div>
        </div>
      </section>
    </>
  )
}


