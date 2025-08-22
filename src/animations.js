import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function initScrollAnimations() {
  // Basic reveal animations for elements with data-reveal
  const reveal = document.querySelectorAll('[data-reveal]')
  reveal.forEach((el) => {
    gsap.fromTo(
      el,
      { y: 24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        clearProps: 'transform,opacity',
      },
    )
  })

  // Section-based animations
  const sections = document.querySelectorAll('section')
  sections.forEach((section, index) => {
    // Add stagger delay for better visual flow
    const staggerDelay = index * 0.1
    
    // Animate section content progressively
    const sectionContent = section.querySelectorAll('h1, h2, h3, p, .grid, .flex, [data-reveal]')
    
    gsap.fromTo(
      sectionContent,
      { 
        y: 30, 
        opacity: 0,
        scale: 0.95
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'power2.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
        delay: staggerDelay,
      }
    )
  })

  // Special animations for specific sections
  initHeroAnimations()
  initTechTilesAnimations()
  initTimelineAnimations()
}

function initHeroAnimations() {
  const hero = document.querySelector('#hero')
  if (!hero) return

  // Hero elements animate in sequence
  const heroElements = hero.querySelectorAll('h1, .flex, p')
  gsap.fromTo(
    heroElements,
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
      stagger: 0.2,
      scrollTrigger: {
        trigger: hero,
        start: 'top center',
        toggleActions: 'play none none reverse',
      }
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
    { 
      y: 40, 
      opacity: 0,
      rotationY: 15,
      scale: 0.9
    },
    {
      y: 0,
      opacity: 1,
      rotationY: 0,
      scale: 1,
      duration: 0.5,
      ease: 'back.out(1.7)',
      stagger: 0.15,
      scrollTrigger: {
        trigger: techTiles,
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      }
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
    { 
      x: -50, 
      opacity: 0,
      scale: 0.95
    },
    {
      x: 0,
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: 'power2.out',
      stagger: 0.2,
      scrollTrigger: {
        trigger: timeline,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      }
    }
  )
}

export function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href')
      if (!href || href === '#') return
      const target = document.querySelector(href)
      if (!target) return
      e.preventDefault()
      const top = target.getBoundingClientRect().top + window.scrollY - 72
      window.scrollTo({ top, behavior: 'smooth' })
    })
  })
}



