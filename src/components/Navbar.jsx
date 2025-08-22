import { Button } from './ui/button'

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur border-b border-black/10">
      <div className="max-w-[1200px] mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <img src="/assets/Picture1.png" alt="EcoFresh Logo" className="h-8 w-auto" />
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a href="#technology" className="text-sm font-medium hover:text-primary2">Technology</a>
          <a href="#revenue-streams" className="text-sm font-medium hover:text-primary2">Revenue</a>
          <a href="#timeline" className="text-sm font-medium hover:text-primary2">Timeline</a>
          <a href="#government" className="text-sm font-medium hover:text-primary2">Policy</a>
          <a href="#team" className="text-sm font-medium hover:text-primary2">Team</a>
          <a href="#investors" className="text-sm font-medium hover:text-primary2">Investors</a>
        </nav>
        <div className="hidden md:flex gap-3">
          <Button variant="outline" size="sm" asChild>
            <a href="#investors">Investor Deck</a>
          </Button>
          <Button size="sm" asChild>
            <a href="mailto:investors@ecofresh.com?subject=Investor%20Intro%20Call&body=Hi%20EcoFresh%20Team%2C%0D%0A%0D%0AI%27d%20like%20to%20book%20a%2030-min%20intro%20call.%20Here%20are%20some%20time%20windows%3A%0D%0A-%20%0D%0A-%20%0D%0A%0D%0ARegards%2C%0D%0A">Book Investor Call</a>
          </Button>
        </div>
      </div>
    </header>
  )
}


