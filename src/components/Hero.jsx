import { Button } from './ui/button'
import NeonRaymarcher from './ui/neon-raymarcher'
import { AnimatedGradientText } from './ui/animated-gradient-text'
import { EcoFormSimpleBorder } from './ui/ecoform-simple-border'
import { VantaCells } from './ui/vanta-cells'
import { AnimatedGridPattern } from './ui/animated-grid-pattern'

export default function Hero() {
  return (
    <div className="relative">
      {/* Section 1: Headline and CTAs */}
      <section data-reveal className="snap-section relative flex items-center justify-center px-4 pt-28 pb-8 overflow-hidden" id="hero">
        {/* Vanta.js Cells animated background for section 1 */}
        <div className="absolute inset-0 z-0 h-full">
          <VantaCells 
            color1="#67C090"
            color2="#124170"
            size={1.00}
            mouseControls={true}
            touchControls={true}
            gyroControls={false}
            minHeight={200.00}
            minWidth={200.00}
            scale={1.00}
            className="opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink/20 pointer-events-none"></div>
        </div>
        <div className="relative z-10 max-w-5xl text-center">
                      <h1 className="font-space-grotesk text-5xl md:text-7xl lg:text-8xl font-bold mb-12 md:mb-16 leading-tight text-white mix-blend-difference relative z-20">
              Envisioning the Future for 
              <span className="block text-6xl md:text-8xl lg:text-9xl text-white mix-blend-difference">
                a <AnimatedGradientText className="mix-blend-difference">plastic-free</AnimatedGradientText> tomorrow
              </span>
            </h1>
          
          <div className="flex flex-wrap items-center justify-center gap-5 md:gap-6 mb-4 md:mb-8">
            <Button variant="cta" size="lg" asChild className="text-lg px-8 py-4">
              <a href="#technology">Explore Technology</a>
            </Button>
            <Button variant="cta" size="lg" asChild className="text-lg px-8 py-4">
              <a href="#investors">View Investor Deck</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Section 2: Heading aligned with canvas, cards row below */}
      <section className="snap-section py-20 text-white relative overflow-hidden">
        {/* Animated grid pattern background for section 2 */}
        <div className="absolute inset-0 -z-0">
          {/* Vanta Cells inspired base color for this section */}
          <div className="absolute inset-0 -z-10 bg-[#124170]/80" />
          <AnimatedGridPattern
            className="[mask-image:radial-gradient(900px_circle_at_center,white,transparent)]"
            color="#7ADAA5"
            maxOpacity={0.15}
            numSquares={40}
            duration={3}
            width={50}
            height={50}
          />
        </div>
        
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            {/* Left column: title aligned with canvas */}
            <div className="lg:pr-12 xl:pr-20 self-start">
              <h2 className="font-space-grotesk text-4xl md:text-6xl font-bold mb-6 text-left text-white">
                A world of possibilities for 
                <span className="block">
                  <AnimatedGradientText className="text-5xl md:text-7xl">
                    diverse applications with EcoForm®
                  </AnimatedGradientText>
                </span>
              </h2>
            </div>

            {/* Right column: neon-raymarcher canvas */}
            <div className="self-start flex flex-col items-center lg:items-end lg:pl-12 xl:pl-20">
              <div className="w-full lg:w-[480px] xl:w-[560px] h-[50vh] min-h-[360px] rounded-2xl overflow-hidden border border-white/20 bg-black/20 backdrop-blur-md">
                <NeonRaymarcher className="w-full h-full" />
              </div>
            </div>

            {/* Cards row spanning full width below heading + canvas */}
            <div className="lg:col-span-2 mt-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="group bg-white/10 backdrop-blur-md text-white rounded-2xl p-8 border border-white/20 transition-all duration-500 hover:bg-white/20 hover:scale-[1.02] hover:shadow-2xl cursor-pointer">
                  <div className="w-16 h-16 mb-6 bg-gradient-to-br from-primary1/60 to-primary2/60 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-space-grotesk font-bold mb-3 group-hover:text-primary1 transition-colors duration-300">Decentralized Processing</h3>
                  <p className="text-white/90 group-hover:text-white transition-colors duration-300 font-light">Modular units that transform waste into bioplastics at the source, eliminating transportation costs.</p>
                </div>
                <div className="group bg-white/10 backdrop-blur-md text-white rounded-2xl p-8 border border-white/20 transition-all duration-500 hover:bg-white/20 hover:scale-[1.02] hover:shadow-2xl cursor-pointer">
                  <div className="w-16 h-16 mb-6 bg-gradient-to-br from-secondary1/60 to-secondary2/60 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-space-grotesk font-bold mb-3 group-hover:text-secondary1 transition-colors duration-300">AI-Governed Quality</h3>
                  <p className="text-white/90 group-hover:text-white transition-colors duration-300 font-light">Real-time optimization ensures consistent EcoForm® quality across all production units.</p>
                </div>
                <div className="group bg-white/10 backdrop-blur-md text-white rounded-2xl p-8 border border-white/20 transition-all duration-500 hover:bg-white/20 hover:scale-[1.02] hover:shadow-2xl cursor-pointer">
                  <div className="w-16 h-16 mb-6 bg-gradient-to-br from-accent/60 to-accent/70 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-space-grotesk font-bold mb-3 group-hover:text-accent transition-colors duration-300">Zero Raw Material Cost</h3>
                  <p className="text-white/90 group-hover:text-white transition-colors duration-300 font-light">Waste becomes feedstock - no virgin materials needed, dramatically reducing production costs.</p>
                </div>
              </div>
              <p className="mt-8 text-white font-space-grotesk font-medium text-lg text-center">
                Policy-aligned • AI-governed • Zero raw material cost
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}


