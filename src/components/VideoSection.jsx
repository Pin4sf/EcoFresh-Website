import { useRef, useState } from 'react'

export default function VideoSection() {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  function play() {
    if (videoRef.current) {
      videoRef.current.play()
      setPlaying(true)
    }
  }

  return (
    <section className="py-20 bg-bg1" id="video-section">
      <div className="mx-auto max-w-[1200px] px-4">
        <h2 className="section-title text-center font-display text-3xl font-semibold mb-10">A Look Behind the Scenes</h2>
        <div className="max-w-3xl mx-auto">
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl">
            <video ref={videoRef} id="processVideoReact" controls={!playing} preload="metadata" poster="/assets/hero-poster.svg" className="w-full h-full object-cover">
              <source src="/assets/Organic_Material_to_PHA_Pellets.mp4" type="video/mp4" />
            </video>
            {!playing && (
              <button className="absolute inset-0 bg-black/30 hover:bg-black/50 transition flex items-center justify-center" onClick={play} aria-label="Play">
                <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center text-2xl text-ink">▶</div>
              </button>
            )}
          </div>
          <p className="text-ink-light text-center mt-4">How EcoFresh converts organic waste into AI-tuned PHA—modular hardware, circular inputs, real-time optimization.</p>
        </div>
      </div>
    </section>
  )
}



