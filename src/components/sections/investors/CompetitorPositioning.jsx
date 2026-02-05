import SectionHeader from '../SectionHeader'
import { siteCopy } from '../../../content/siteCopy'

export default function CompetitorPositioning() {
  return (
    <section className="section bg-white" id="positioning">
      <div className="container-default space-y-12">
        <SectionHeader eyebrow={siteCopy.investors.competitors.eyebrow} title={siteCopy.investors.competitors.title} />
        <div className="grid gap-6 md:grid-cols-3" data-reveal>
          {siteCopy.investors.competitors.cards.map((card) => (
            <div key={card.title} className="rounded-3xl border border-ink/10 bg-sand p-6">
              <p className="text-sm font-semibold text-eco mb-3">{card.title}</p>
              <p className="text-sm text-ink-muted">{card.text}</p>
            </div>
          ))}
        </div>
        <div className="rounded-3xl border border-dashed border-eco/40 bg-mist p-6 text-sm text-ink-muted" data-reveal>
          "EcoFresh uniquely combines segregation-agnostic processing, mid-scale modularity, and standardized deployment - capabilities not offered together by existing solutions."
        </div>
      </div>
    </section>
  )
}
