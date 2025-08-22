const team = [
  { name: 'Ark Patil', role: 'CEO & Founder', bullets: ['Operations & Executions', 'Smart manufacturings', 'Strategic planning'] },
  { name: 'Shivansh Fulper', role: 'CTO & Co-Founder', bullets: ['AI/ML systems architect', 'Smart manufacturing systems', 'Business analytics'] },
  { name: 'Ansh Bathija', role: 'CDO & Co-Founder', bullets: ['Industrial prototyping', 'Design strategy', 'Hardware systems'] },
  { name: 'Mayur Kumar', role: 'CPO & Co-Founder', bullets: ['Product Design', '3D Modeling', 'System architecture'] },
]

export default function Team() {
  return (
    <section className="py-20 bg-bg1" id="team">
      <div className="mx-auto max-w-[1200px] px-4">
        <h2 className="section-title text-center font-display text-3xl font-semibold mb-10">Leadership Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {team.map((t) => (
            <div key={t.name} className="text-center bg-bg2 border-2 border-primary1 rounded-2xl p-6 transition hover:-translate-y-2">
              <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-primary1 to-secondary1 border-4 border-bg1 mb-4" />
              <h4 className="font-semibold mb-1">{t.name}</h4>
              <p className="text-primary2 font-semibold text-sm mb-3">{t.role}</p>
              <ul className="text-ink-light text-sm space-y-1 text-left mx-auto max-w-[220px]">
                {t.bullets.map((b) => (
                  <li key={b}>• {b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}



