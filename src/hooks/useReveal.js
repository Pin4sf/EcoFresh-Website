import { useEffect } from 'react'

export default function useReveal(trigger) {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Helper to check if element is in viewport
    const isInViewport = (el) => {
      const rect = el.getBoundingClientRect()
      return (
        rect.top < window.innerHeight &&
        rect.bottom > 0
      )
    }

    // Delay to wait for page transition to complete and new elements to render
    const timeoutId = setTimeout(() => {
      const elements = Array.from(document.querySelectorAll('[data-reveal]:not(.is-visible)'))

      if (prefersReduced) {
        elements.forEach((el) => el.classList.add('is-visible'))
        return
      }

      // Immediately reveal elements already in viewport
      elements.forEach((el) => {
        if (isInViewport(el)) {
          el.classList.add('is-visible')
        }
      })

      // Get remaining unrevealed elements
      const remainingElements = elements.filter((el) => !el.classList.contains('is-visible'))

      if (remainingElements.length === 0) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible')
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
      )

      remainingElements.forEach((el) => observer.observe(el))

      // Store observer reference for cleanup
      window.__revealObserver = observer
    }, 700) // Delay to ensure DOM is ready after page transition overlay (650ms) + page enter (400ms)

    return () => {
      clearTimeout(timeoutId)
      if (window.__revealObserver) {
        window.__revealObserver.disconnect()
        window.__revealObserver = null
      }
    }
  }, [trigger])
}
