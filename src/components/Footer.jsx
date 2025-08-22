export default function Footer() {
  return (
    <footer className="bg-ink text-bg1 py-20 relative overflow-hidden" id="footer">
      {/* Video Background */}
      <div className="absolute inset-0 -z-10">
        <video 
          className="absolute inset-0 w-full h-full object-cover" 
          autoPlay 
          muted 
          loop 
          playsInline 
          preload="metadata"
          aria-hidden="true"
        >
          <source src="/assets/Organic_Material_to_PHA_Pellets.mp4" type="video/mp4" />
        </video>
        {/* Overlay to ensure text visibility */}
        <div className="absolute inset-0 bg-ink/85" aria-hidden="true"></div>
      </div>

      <div className="mx-auto max-w-[1200px] px-4 relative z-10">
        {/* Main Footer Content - Centered Large Text */}
        <div className="text-center mb-16">
          <div className="text-6xl md:text-8xl font-bold text-white/90 mb-8 tracking-tight">
            EcoFresh
          </div>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            AI-driven EcoForm® for a plastic-free tomorrow
          </p>
        </div>

        {/* Simple Navigation Links */}
        <div className="flex justify-center items-center gap-8 mb-12">
          <a href="#technology" className="text-white/70 hover:text-white transition-colors">Technology</a>
          <a href="#investors" className="text-white/70 hover:text-white transition-colors">Investors</a>
          <a href="#team" className="text-white/70 hover:text-white transition-colors">Team</a>
          <a href="mailto:hello@ecofresh.com" className="text-white/70 hover:text-white transition-colors">Contact</a>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm">© 2025 EcoFresh. All rights reserved.</p>
          <div className="flex gap-6 text-white/50 text-sm">
            <a href="#" className="hover:text-white/70 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/70 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
