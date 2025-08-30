import { Button } from './ui/button'
import { AnimatedGridPattern } from './ui/animated-grid-pattern'

export default function Policy() {
  const complianceStandards = [
    {
      icon: '🏛️',
      title: 'EPA CERTIFIED',
      description: 'Our technology meets EPA standards for environmental protection and waste management.'
    },
    {
      icon: '🌍',
      title: 'EU BIODEGRADABLE',
      description: 'Compliant with European Union biodegradability standards and regulations.'
    },
    {
      icon: '📋',
      title: 'ASTM D6400',
      description: 'Meets ASTM International standards for compostable plastic materials.'
    },
    {
      icon: '♻️',
      title: 'EN 13432',
      description: 'European standard for packaging recoverable through composting and biodegradation.'
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-bg2 to-bg1 relative overflow-hidden" id="government">
      {/* Animated grid pattern background */}
      <div className="absolute inset-0 -z-0 pointer-events-none">
        <AnimatedGridPattern
          className="[mask-image:radial-gradient(1200px_circle_at_center,white,transparent)]"
          color="#7ADAA5"
          maxOpacity={0.10}
          numSquares={20}
          duration={3}
          width={60}
          height={60}
        />
      </div>
      <div className="mx-auto max-w-[1200px] px-4 relative z-10">
        <div className="bg-gradient-to-br from-primary2/20 to-secondary2/20 rounded-3xl p-8 lg:p-12 border border-primary1/20 shadow-xl">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Section: Main Policy Statement */}
            <div className="text-center lg:text-left">
              <h2 className="font-display text-3xl lg:text-4xl xl:text-5xl font-semibold mb-6 text-ink leading-tight">
                Government & Policy Alignment
              </h2>
              <p className="text-ink-light text-lg mb-8 leading-relaxed">
                Our technology directly addresses regulatory mandates for plastic waste reduction and circular economy initiatives. We work closely with environmental agencies to ensure compliance and maximize policy incentives.
              </p>
              <Button variant="cta" size="lg" className="text-lg px-8 py-4">
                View Compliance Framework →
              </Button>
            </div>

            {/* Right Section: Compliance Grid */}
            <div className="grid grid-cols-2 gap-4">
              {complianceStandards.map((standard, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="text-center">
                    <div className="text-3xl mb-3">{standard.icon}</div>
                    <h3 className="font-semibold text-ink text-sm mb-2 tracking-wide">
                      {standard.title}
                    </h3>
                    <p className="text-ink-light text-xs leading-relaxed">
                      {standard.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}



