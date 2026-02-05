import { siteCopy } from '../../../content/siteCopy'

export default function InvestorHero() {
  return (
    <section className="section pt-28 md:pt-32" id="investor-hero">
      <div className="container-default space-y-6" data-reveal>
        <span className="section-eyebrow">{siteCopy.investors.hero.eyebrow}</span>
        <h1 className="text-4xl md:text-5xl font-semibold leading-tight">{siteCopy.investors.hero.title}</h1>
        <p className="text-lg text-ink-muted max-w-3xl">{siteCopy.investors.hero.subtitle}</p>
        <div className="flex flex-wrap gap-3">
          <a className="btn-primary" href={siteCopy.links.deck} target="_blank" rel="noopener noreferrer" data-cursor="Open">Open Investor Deck</a>
          <a className="btn-outline" href={siteCopy.links.investorEmail} data-cursor="Email">Contact EcoFresh</a>
        </div>
      </div>
    </section>
  )
}
