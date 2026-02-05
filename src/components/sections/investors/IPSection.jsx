import SectionHeader from '../SectionHeader'
import { siteCopy } from '../../../content/siteCopy'

export default function IPSection() {
  return (
    <section className="section bg-white" id="ip">
      <div className="container-default" data-reveal>
        <div className="rounded-3xl border border-ink/10 bg-sand p-8">
          <SectionHeader eyebrow={siteCopy.investors.ip.eyebrow} title={siteCopy.investors.ip.title} />
          <p className="text-sm text-ink-muted mt-4 max-w-3xl">{siteCopy.investors.ip.text}</p>
        </div>
      </div>
    </section>
  )
}
