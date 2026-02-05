import { useEffect } from 'react'

export default function useParallax() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return undefined

    const elements = Array.from(document.querySelectorAll('[data-parallax]'))
    if (!elements.length) return undefined

    let frame = null
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        const scrollY = window.scrollY
        elements.forEach((el) => {
          const speed = Number(el.dataset.parallax || 0.1)
          const offset = scrollY * speed
          el.style.transform = `translate3d(0, ${offset}px, 0)`
        })
        frame = null
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])
}
