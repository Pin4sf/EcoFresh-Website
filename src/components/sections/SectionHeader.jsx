export default function SectionHeader({ eyebrow, title, description, align = 'left', accentColor = 'eco' }) {
  const alignment = align === 'center' ? 'text-center items-center' : 'text-left items-start'
  const colorMap = {
    eco: 'text-eco',
    violet: 'text-violet-600',
    amber: 'text-amber-600',
    sky: 'text-sky',
    red: 'text-red-500',
  }
  const eyebrowColor = colorMap[accentColor] || colorMap.eco

  return (
    <div className={`flex flex-col gap-3 ${alignment}`}>
      {eyebrow && <span className={`section-eyebrow ${eyebrowColor}`}>{eyebrow}</span>}
      {title && <h2 className="section-title">{title}</h2>}
      {description && <p className="text-ink-muted max-w-3xl">{description}</p>}
    </div>
  )
}
