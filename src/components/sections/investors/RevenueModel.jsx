import SectionHeader from '../SectionHeader'
import { siteCopy } from '../../../content/siteCopy'

export default function RevenueModel() {
  return (
    <section className="section" id="revenue">
      <div className="container-default space-y-12">
        <SectionHeader eyebrow={siteCopy.investors.revenueModel.eyebrow} title={siteCopy.investors.revenueModel.title} />
        <div className="grid gap-6 md:grid-cols-2" data-reveal>
          <div className="rounded-3xl border border-ink/10 bg-white p-6">
            <p className="text-sm font-semibold text-eco mb-4">Primary Revenue</p>
            <ul className="space-y-3 text-sm text-ink-muted">
              {siteCopy.investors.revenueModel.primary.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-eco">●</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-ink/10 bg-white p-6">
            <p className="text-sm font-semibold text-eco mb-4">Secondary Value Capture</p>
            <ul className="space-y-3 text-sm text-ink-muted">
              {siteCopy.investors.revenueModel.secondary.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-eco">●</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
