import { Button } from './ui/button'
import { WaveAnimation } from './ui/wave-animation'
import { AnimatedGradientText } from './ui/animated-gradient-text'
import { EcoFormSimpleBorder } from './ui/ecoform-simple-border'

export default function Hero() {
  return (
    <>
      <section data-reveal className="snap-section relative min-h-dvh flex items-center justify-center px-4 pt-28 pb-8 overflow-hidden bg-gradient-to-br from-bg1 via-primary1/20 to-primary2/20" id="hero">
        <div className="absolute inset-0 -z-10">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster="/assets/hero-poster.svg"
          >
            <source src="https://res.cloudinary.com/dbwmxxxr2/video/upload/v1755868036/Organic_Material_to_PHA_Pellets_online-video-cutter.com_wb13vg.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-ink/50"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl text-center">
          <h1 className="font-sans text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight text-white">
            AI-driven <EcoFormSimpleBorder gradientColors={["from-primary1", "via-primary2", "to-ink"]}>EcoForm®</EcoFormSimpleBorder> for 
            <span className="block">
              <span className="text-6xl md:text-8xl lg:text-9xl text-white">
                plastic-free tomorrow
              </span>
            </span>
          </h1>
          
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <Button size="lg" asChild className="text-lg px-8 py-4 bg-primary1 hover:bg-primary2 text-ink border-0">
              <a href="#technology">Explore Technology</a>
            </Button>
            <Button variant="outline" size="lg" asChild className="text-lg px-8 py-4 border-primary1 text-primary1 hover:bg-primary1 hover:text-ink">
              <a href="#investors">View Investor Deck</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Value Proposition Section - inspired by ZeroCircle's "A Sea of Possibilities" */}
      <section className="snap-section py-20 bg-gradient-to-br from-primary1 via-primary2 to-ink text-white relative overflow-hidden">
        {/* Wave Animation Background */}
        <div className="absolute inset-0 opacity-25">
          <WaveAnimation 
            width={2800}
            height={1100}
            waveSpeed={1.5}
            waveIntensity={30} 
            particleColor="#F5EEDD"
            pointSize={2.5}
            gridDistance={4}
            className="w-full h-full"
          />
        </div>
        
        {/* Subtle overlay for better contrast */}
        <div className="absolute inset-0 bg-ink/20"></div>
        
        {/* Radial gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-ink/30"></div>
        
        {/* Floating Background Circles/Bubbles */}
        <div className="absolute inset-0 opacity-20">
          {/* Large floating circles */}
          <div className="absolute top-20 left-16 w-24 h-24 bg-bg1/25 rounded-full animate-float-slow"></div>
          <div className="absolute bottom-20 right-20 w-20 h-20 bg-bg1/20 rounded-full animate-float-medium"></div>
          <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-bg1/30 rounded-full animate-float-fast"></div>
          
          {/* Medium floating circles */}
          <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-bg1/25 rounded-full animate-float-medium-delayed"></div>
          <div className="absolute bottom-1/3 left-1/3 w-14 h-14 bg-bg1/20 rounded-full animate-float-slow-delayed"></div>
          <div className="absolute top-2/3 right-1/4 w-10 h-10 bg-bg1/35 rounded-full animate-float-fast-delayed"></div>
          
          {/* Small floating circles */}
          <div className="absolute top-16 right-16 w-8 h-8 bg-bg1/30 rounded-full animate-float-slow"></div>
          <div className="absolute bottom-32 left-1/2 w-6 h-6 bg-bg1/25 rounded-full animate-float-medium"></div>
          <div className="absolute top-1/2 left-20 w-5 h-5 bg-bg1/35 rounded-full animate-float-fast"></div>
        </div>
        
        <div className="mx-auto max-w-[1200px] px-4 text-center relative z-10">
          <h2 className="font-sans text-4xl md:text-6xl font-bold mb-8 drop-shadow-lg">
            A world of possibilities for 
            <span className="block">
              <AnimatedGradientText gradientColors={["from-bg1", "via-primary1", "to-primary2"]} className="text-5xl md:text-7xl">
                diverse applications
              </AnimatedGradientText>
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="group bg-bg1/15 backdrop-blur-md rounded-2xl p-8 border border-bg1/30 transition-all duration-500 hover:bg-bg1/25 hover:scale-105 hover:shadow-2xl hover:shadow-bg1/20 cursor-pointer">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-primary1/40 to-primary2/40 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary1 transition-colors duration-300">Decentralized Processing</h3>
              <p className="text-white/85 group-hover:text-white/95 transition-colors duration-300">Modular units that transform waste into bioplastics at the source, eliminating transportation costs.</p>
            </div>
            
            <div className="group bg-bg1/15 backdrop-blur-md rounded-2xl p-8 border border-bg1/30 transition-all duration-500 hover:bg-bg1/25 hover:scale-105 hover:shadow-2xl hover:shadow-bg1/20 cursor-pointer">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-secondary1/40 to-secondary2/40 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-secondary1 transition-colors duration-300">AI-Governed Quality</h3>
              <p className="text-white/85 group-hover:text-white/95 transition-colors duration-300">Real-time optimization ensures consistent EcoForm® quality across all production units.</p>
            </div>
            
            <div className="group bg-bg1/15 backdrop-blur-md rounded-2xl p-8 border border-bg1/30 transition-all duration-500 hover:bg-bg1/25 hover:scale-105 hover:shadow-2xl hover:shadow-bg1/20 cursor-pointer">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-accent/40 to-accent/50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors duration-300">Zero Raw Material Cost</h3>
              <p className="text-white/85 group-hover:text-white/95 transition-colors duration-300">Waste becomes feedstock - no virgin materials needed, dramatically reducing production costs.</p>
            </div>
          </div>
          
          <div className="mt-12">
            <p className="text-white/90 font-bold text-lg">
              Policy-aligned • AI-governed • Zero raw material cost
            </p>
          </div>
        </div>
      </section>
    </>
  )
}


