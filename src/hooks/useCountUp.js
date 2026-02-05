import { useEffect, useRef, useState } from 'react'

export default function useCountUp(target, duration = 900) {
  const [value, setValue] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return undefined

    let start = null
    let frameId = null
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()

        if (prefersReduced) {
          setValue(target)
          return
        }

        const step = (timestamp) => {
          if (!start) start = timestamp
          const progress = Math.min((timestamp - start) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setValue(Math.round(target * eased))
          if (progress < 1) frameId = requestAnimationFrame(step)
        }

        frameId = requestAnimationFrame(step)
      },
      { threshold: 0.6 }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
      if (frameId) cancelAnimationFrame(frameId)
    }
  }, [target, duration])

  return { ref, value }
}
