import { AnimatedGridPattern } from './ui/animated-grid-pattern'

export default function Footer() {
  return (
    <footer className="bg-ink text-bg1 relative overflow-hidden" id="footer">
      {/* Animated Grid Pattern Background */}
      <div className="absolute inset-0 -z-10">
        <AnimatedGridPattern
          className="[mask-image:radial-gradient(900px_circle_at_center,white,transparent)]"
          color="#7ADAA5"
          maxOpacity={0.15}
          numSquares={40}
          duration={3}
          width={50}
          height={50}
        />
        {/* Dark overlay to ensure text visibility */}
        <div className="absolute inset-0 bg-ink/90" aria-hidden="true"></div>
      </div>

      {/* Main Footer Content - EcoFresh Text Full Viewport */}
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center w-full">
          <div className="ecofresh-brand text-8xl md:text-[12rem] lg:text-[16rem] xl:text-[20rem] font-space-grotesk font-black text-white tracking-tight leading-none" data-split>
            EcoFresh
          </div>
        </div>
      </div>

      {/* Bottom Section - Navigation and Links */}
      <div className="border-t border-white/10 py-6">
        <div className="mx-auto max-w-[1200px] px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex gap-6 text-white/60 text-sm">
            <a href="#technology" className="hover:text-white/80 transition-colors font-space-grotesk font-medium">Technology</a>
            <a href="#investors" className="hover:text-white/80 transition-colors font-space-grotesk font-medium">Investors</a>
            <a href="#team" className="hover:text-white/80 transition-colors font-space-grotesk font-medium">Team</a>
            <a href="mailto:hello@ecofresh.com" className="hover:text-white/80 transition-colors font-space-grotesk font-medium">Contact</a>
          </div>
          <div className="flex gap-6 text-white/60 text-sm">
            <a href="#" className="hover:text-white/80 transition-colors font-space-grotesk font-medium">Privacy Policy</a>
            <a href="#" className="hover:text-white/80 transition-colors font-space-grotesk font-medium">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
