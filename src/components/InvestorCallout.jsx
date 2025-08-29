import { Button } from './ui/button'
import { FlickeringGrid } from './ui/flickering-grid-hero'

export default function InvestorCallout() {
  return (
    <section data-reveal className="py-20 bg-ink text-bg1 relative overflow-hidden" id="investors">
      {/* Flickering grid background */}
      <div className="absolute inset-0 -z-0 pointer-events-none">
        <FlickeringGrid
          className="[mask-image:radial-gradient(1200px_circle_at_center,white,transparent)]"
          color="7ADAA5"
          maxOpacity={0.2}
          flickerChance={0.12}
          squareSize={3}
          gridGap={6}
        />
      </div>
      <div className="mx-auto max-w-[1200px] px-4 text-center relative z-10">
        <h2 className="font-display text-3xl font-semibold mb-3">Join Our Investor Community</h2>
        <p className="text-white/80 mb-6">Shape the future of sustainable materials with breakthrough technology and massive market opportunity.</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button variant="cta" asChild>
            <a href="#investors">Open Investor Deck</a>
          </Button>
          <Button variant="cta" asChild>
            <a href="mailto:investors@ecofresh.com?subject=Investor%20Intro%20Call&body=Hi%20EcoFresh%20Team%2C%0D%0A%0D%0AI%27d%20like%20to%20book%20a%2030-min%20intro%20call.%20Here%20are%20some%20time%20windows%3A%0D%0A-%20%0D%0A-%20%0D%0A%0D%0ARegards%2C%0D%0A">Schedule Call</a>
          </Button>
          <Button variant="cta" asChild>
            <a href="#investors">Request Data Room</a>
          </Button>
        </div>
      </div>
    </section>
  )
}



