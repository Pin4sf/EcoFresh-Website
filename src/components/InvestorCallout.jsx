import { Button } from './ui/button'
import { AnimatedGridPattern } from './ui/animated-grid-pattern'

export default function InvestorCallout() {
  return (
    <section data-reveal className="py-20 bg-ink text-bg1 relative overflow-hidden" id="investors">
      {/* Animated grid pattern background */}
      <div className="absolute inset-0 -z-0 pointer-events-none">
        <AnimatedGridPattern
          className="[mask-image:radial-gradient(1200px_circle_at_center,white,transparent)]"
          color="#7ADAA5"
          maxOpacity={0.18}
          numSquares={45}
          duration={3}
          width={40}
          height={40}
        />
      </div>
      <div className="mx-auto max-w-[1200px] px-4 text-center relative z-10">
        <h2 className="font-display text-3xl font-semibold mb-3">Join Our Investor Community</h2>
        <p className="text-white/80 mb-6">Shape the future of sustainable materials with breakthrough technology and massive market opportunity.</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button variant="cta" asChild>
            <a href="https://docs.google.com/presentation/d/12yjtNQnuhZZkTr1NPIfER--LK_buJwOF/edit?usp=drivesdk&ouid=115342461485325584335&rtpof=true&sd=true" target="_blank" rel="noopener noreferrer">Open Investor Deck</a>
          </Button>
          <Button variant="cta" asChild>
            <a href="tel:+919665437830">Schedule Call</a>
          </Button>
          <Button variant="cta" asChild>
            <a href="https://docs.google.com/presentation/d/12yjtNQnuhZZkTr1NPIfER--LK_buJwOF/edit?usp=drivesdk&ouid=115342461485325584335&rtpof=true&sd=true" target="_blank" rel="noopener noreferrer">Request Data Room</a>
          </Button>
        </div>
      </div>
    </section>
  )
}



