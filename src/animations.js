import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

function setupGsap() {
  // Respect reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  // No global timescale changes; individual animations handle reduced motion

  // Performance-friendly defaults
  gsap.defaults({ ease: 'power2.out', duration: 0.5 })
  ScrollTrigger.config({ ignoreMobileResize: true })
  // Normalize scroll behavior across devices (free utility)
  if (ScrollTrigger.normalizeScroll) {
    ScrollTrigger.normalizeScroll(true)
  }
}

export function initScrollAnimations() {
  setupGsap()

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Enhanced split-text animation for headings tagged with data-split
  initSplitTextAnimations()

  // Batch reveal animations (efficient and less janky)
  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 85%',
    once: true,
    onEnter: (batch) => {
      if (prefersReducedMotion) {
        batch.forEach((el) => gsap.set(el, { autoAlpha: 1, y: 0 }))
        return
      }
      gsap.fromTo(
        batch,
        { y: 20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.06, clearProps: 'transform,opacity' }
      )
    },
  })

  // Section headings and primary content
  document.querySelectorAll('section').forEach((section) => {
    const targets = section.querySelectorAll('h1, h2, h3, p, .grid, .flex')
    if (!targets.length) return
    gsap.fromTo(
      targets,
      { y: 16, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: prefersReducedMotion ? 0 : 0.45,
        stagger: 0.05,
        scrollTrigger: { trigger: section, start: 'top 80%', once: true, markers: false },
        clearProps: 'transform,opacity',
      }
    )
  })

  // Special animations for specific sections
  initHeroAnimations()
  initTechTilesAnimations()
  initTimelineAnimations()
  initFloatingElements()
  initNavbarEffects()
  initRevenueCardEffects()
  initFlywheelSvgAnimation()
  initNarrativeChips()
  initFooterReveal()
}

function initHeroAnimations() {
  const hero = document.querySelector('#hero')
  if (!hero) return

  // Hero elements animate in sequence
  const heroElements = hero.querySelectorAll('h1, .flex, p')
  gsap.fromTo(
    heroElements,
    { y: 36, autoAlpha: 0 },
    {
      y: 0,
      autoAlpha: 1,
      duration: 0.6,
      stagger: 0.15,
      scrollTrigger: { trigger: hero, start: 'top center', once: true },
      clearProps: 'transform,opacity',
    }
  )
}

function initTechTilesAnimations() {
  const techTiles = document.querySelector('#technology')
  if (!techTiles) return

  // Animate tech tiles with staggered entrance
  const tiles = techTiles.querySelectorAll('.group')
  gsap.fromTo(
    tiles,
    { y: 28, autoAlpha: 0 },
    {
      y: 0,
      autoAlpha: 1,
      duration: 0.45,
      stagger: 0.12,
      scrollTrigger: { trigger: techTiles, start: 'top 75%', once: true },
      clearProps: 'transform,opacity',
    }
  )
}

function initTimelineAnimations() {
  const timeline = document.querySelector('#timeline')
  if (!timeline) return

  // Animate timeline items from left to right
  const timelineItems = timeline.querySelectorAll('.timeline-item, [data-reveal]')
  gsap.fromTo(
    timelineItems,
    { x: -24, autoAlpha: 0 },
    {
      x: 0,
      autoAlpha: 1,
      duration: 0.45,
      stagger: 0.15,
      scrollTrigger: { trigger: timeline, start: 'top 80%', once: true },
      clearProps: 'transform,opacity',
    }
  )
}

export function initSmoothScroll() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href')
      if (!href || href === '#') return
      const target = document.querySelector(href)
      if (!target) return
      e.preventDefault()
      const y = target
      if (prefersReducedMotion) {
        const top = target.getBoundingClientRect().top + window.scrollY - 72
        window.scrollTo(0, top)
        return
      }
      gsap.to(window, {
        duration: 0.6,
        ease: 'power2.out',
        scrollTo: { y, offsetY: 72, autoKill: true },
      })
    })
  })
}

function initFloatingElements() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion) return

  const configs = [
    { selector: '.animate-float-slow, .animate-float-slow-delayed', distanceY: 18, distanceX: 8, duration: 8 },
    { selector: '.animate-float-medium, .animate-float-medium-delayed', distanceY: 14, distanceX: 6, duration: 6 },
    { selector: '.animate-float-fast, .animate-float-fast-delayed', distanceY: 10, distanceX: 5, duration: 4 },
  ]

  configs.forEach(({ selector, distanceY, distanceX, duration }) => {
    document.querySelectorAll(selector).forEach((el, idx) => {
      const dx = (idx % 2 === 0 ? 1 : -1) * distanceX
      const dy = -distanceY
      const delay = -(idx % 3) * 0.5

      const tween = gsap.to(el, {
        x: `+=${dx}`,
        y: `+=${dy}`,
        rotation: (idx % 2 === 0 ? 1 : -1) * 3,
        duration,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay,
        paused: true,
      })

      ScrollTrigger.create({
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        onEnter: () => tween.play(),
        onEnterBack: () => tween.play(),
        onLeave: () => tween.pause(),
        onLeaveBack: () => tween.pause(),
      })
    })
  })
}

// --- Awwwards-style additions ---
function initSplitTextAnimations() {
  const targets = document.querySelectorAll('[data-split]:not([data-split-ready])')
  targets.forEach((el) => {
    const text = el.textContent || ''
    const words = text.trim().split(/\s+/)
    el.textContent = ''
    const wordEls = []
    words.forEach((w, i) => {
      const wrapper = document.createElement('span')
      wrapper.style.display = 'inline-block'
      wrapper.style.overflow = 'hidden'
      wrapper.style.verticalAlign = 'top'
      const word = document.createElement('span')
      word.textContent = w + (i < words.length - 1 ? ' ' : '')
      word.style.display = 'inline-block'
      word.style.transform = 'translateY(100%)'
      wrapper.appendChild(word)
      el.appendChild(wrapper)
      wordEls.push(word)
    })

    el.setAttribute('data-split-ready', 'true')
    gsap.to(wordEls, {
      y: 0,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.04,
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      clearProps: 'transform',
    })
  })
}

function initNavbarEffects() {
  const header = document.querySelector('header')
  if (!header) return
  ScrollTrigger.create({
    start: 'top -10',
    end: 99999,
    onEnter: () => gsap.to(header, { backgroundColor: 'rgba(255,255,255,0.9)', paddingTop: 6, paddingBottom: 6, boxShadow: '0 6px 20px rgba(0,0,0,0.06)', duration: 0.3 }),
    onLeaveBack: () => gsap.to(header, { backgroundColor: 'rgba(255,255,255,0.8)', paddingTop: 8, paddingBottom: 8, boxShadow: '0 1px 0 rgba(0,0,0,0.08)', duration: 0.3 }),
  })
}

function initRevenueCardEffects() {
  const cards = document.querySelectorAll('.card-tilt')
  cards.forEach((card) => {
    function onMove(e) {
      const rect = card.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) / rect.width
      const dy = (e.clientY - cy) / rect.height
      const rx = dy * -8
      const ry = dx * 12
      gsap.to(card, { rotateX: rx, rotateY: ry, y: -6, transformPerspective: 600, transformOrigin: 'center', duration: 0.3 })
    }
    function onLeave() {
      gsap.to(card, { rotateX: 0, rotateY: 0, y: 0, duration: 0.4, ease: 'power2.out' })
    }
    card.addEventListener('pointermove', onMove)
    card.addEventListener('pointerleave', onLeave)
    gsap.fromTo(card, { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, ease: 'power2.out', scrollTrigger: { trigger: card, start: 'top 85%', once: true } })
  })
}

function initFlywheelSvgAnimation() {
  const section = document.querySelector('#flywheel')
  if (!section) return
  const circle = section.querySelector('svg circle')
  if (!circle) return
  const length = circle.getTotalLength()
  circle.style.strokeDasharray = String(length)
  circle.style.strokeDashoffset = String(length)
  gsap.to(circle, { strokeDashoffset: 0, duration: 1.2, ease: 'power2.out', scrollTrigger: { trigger: section, start: 'top 80%', once: true } })
}

function initNarrativeChips() {
  const section = document.querySelector('#narrative')
  if (!section) return
  const chips = section.querySelectorAll('.rounded-full')
  if (!chips.length) return
  gsap.fromTo(chips, { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: section, start: 'top 80%', once: true } })
}

function initFooterReveal() {
  const footer = document.querySelector('#footer')
  if (!footer) return
  const heading = footer.querySelector('.text-6xl, .text-8xl')
  if (heading) {
    heading.setAttribute('data-split', 'true')
  }
}



