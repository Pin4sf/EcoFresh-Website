import SectionHeader from '../SectionHeader'
import { siteCopy } from '../../../content/siteCopy'

export default function UnitEconomics() {
  return (
    <section className="section" id="economics">
      <div className="container-default space-y-12">
        <SectionHeader eyebrow={siteCopy.investors.economics.eyebrow} title={siteCopy.investors.economics.title} />
        <div className="rounded-3xl border border-ink/10 bg-white p-6" data-reveal>
          <div className="grid gap-4 md:grid-cols-2">
            {siteCopy.investors.economics.metrics.map((metric) => (
              <div key={metric.label} className="flex items-center justify-between border-b border-ink/10 pb-3 text-sm">
                <span className="text-ink-muted">{metric.label}</span>
                <span className="font-semibold text-ink">{metric.value}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-ink-muted mt-6">{siteCopy.investors.economics.note}</p>
        </div>
      </div>
    </section>
  )
}
