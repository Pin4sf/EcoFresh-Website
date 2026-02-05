import SectionHeader from '../SectionHeader'
import { siteCopy } from '../../../content/siteCopy'

export default function DeploymentPlan() {
  return (
    <section className="section" id="deployment">
      <div className="container-default space-y-12">
        <SectionHeader eyebrow={siteCopy.investors.deployment.eyebrow} title={siteCopy.investors.deployment.title} />
        <div className="grid gap-6 md:grid-cols-2" data-reveal>
          {siteCopy.investors.deployment.steps.map((step) => (
            <div key={step.title} className="rounded-3xl border border-ink/10 bg-sand p-6">
              <p className="text-sm font-semibold text-eco mb-2">{step.title}</p>
              <p className="text-sm text-ink-muted">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
