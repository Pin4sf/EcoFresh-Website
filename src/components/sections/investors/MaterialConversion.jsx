import SectionHeader from '../SectionHeader'
import { siteCopy } from '../../../content/siteCopy'

export default function MaterialConversion() {
  return (
    <section className="section bg-white" id="conversion">
      <div className="container-default space-y-12">
        <SectionHeader eyebrow={siteCopy.investors.conversion.eyebrow} title={siteCopy.investors.conversion.title} />
        <div className="grid gap-8 lg:grid-cols-2" data-reveal>
          <div className="rounded-3xl border border-ink/10 bg-sand p-6">
            <div className="grid grid-cols-3 text-xs font-semibold text-ink-muted border-b border-ink/10 pb-3">
              <span>Output Stream</span>
              <span>Quantity</span>
              <span>Basis</span>
            </div>
            <div className="mt-4 space-y-4 text-sm text-ink-muted">
              {siteCopy.investors.conversion.table.map((row) => (
                <div key={row.stream} className="grid grid-cols-3 gap-2">
                  <span className="text-ink">{row.stream}</span>
                  <span>{row.quantity}</span>
                  <span>{row.basis}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-ink/10 bg-sand p-6">
            <p className="text-sm font-semibold text-eco mb-4">Monthly Output (3-TPD system)</p>
            <div className="space-y-4 text-sm text-ink-muted">
              {siteCopy.investors.conversion.monthlyOutput.map((item) => (
                <div key={item.metric} className="flex items-center justify-between border-b border-ink/10 pb-3">
                  <span>{item.metric}</span>
                  <span className="font-semibold text-ink">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
