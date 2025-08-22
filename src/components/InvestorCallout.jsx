import { Button } from './ui/button'

export default function InvestorCallout() {
  return (
    <section data-reveal className="py-20 bg-ink text-bg1" id="investors">
      <div className="mx-auto max-w-[1200px] px-4 text-center">
        <h2 className="font-display text-3xl font-semibold mb-3">Join Our Investor Community</h2>
        <p className="text-white/80 mb-6">Shape the future of sustainable materials with breakthrough technology and massive market opportunity.</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild>
            <a href="#investors">Open Investor Deck</a>
          </Button>
          <Button variant="outline" asChild>
            <a href="mailto:investors@ecofresh.com?subject=Investor%20Intro%20Call&body=Hi%20EcoFresh%20Team%2C%0D%0A%0D%0AI%27d%20like%20to%20book%20a%2030-min%20intro%20call.%20Here%20are%20some%20time%20windows%3A%0D%0A-%20%0D%0A-%20%0D%0A%0D%0ARegards%2C%0D%0A">Schedule Call</a>
          </Button>
          <Button variant="secondary" asChild>
            <a href="#investors">Request Data Room</a>
          </Button>
        </div>
      </div>
    </section>
  )
}



