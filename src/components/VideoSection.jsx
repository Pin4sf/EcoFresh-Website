import { useState } from 'react'

export default function VideoSection() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  return (
    <section className="py-20 bg-bg1" id="video-section">
      <div className="mx-auto max-w-[1200px] px-4">
        <h2 className="section-title text-center font-display text-3xl font-semibold mb-10">A Look Behind the Scenes</h2>
        <div className="max-w-3xl mx-auto">
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl">
            <iframe
              src="https://www.youtube.com/embed/w6-0Zl9yTH0?rel=0&modestbranding=1&showinfo=0"
              title="EcoFresh Process Video"
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onLoad={() => setIsVideoLoaded(true)}
            />
          </div>
          <p className="text-ink-light text-center mt-4">How EcoFresh converts organic waste into AI-tuned PHA—modular hardware, circular inputs, real-time optimization.</p>
        </div>
      </div>
    </section>
  )
}
