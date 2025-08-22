import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { initScrollAnimations, initSmoothScroll } from './animations'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Add loading screen and progressive content loading
document.addEventListener('DOMContentLoaded', () => {
  // Hide all sections initially except hero
  const sections = document.querySelectorAll('section:not(#hero)')
  sections.forEach(section => {
    section.style.opacity = '0'
    section.style.transform = 'translateY(20px)'
  })

  // Show hero immediately
  const hero = document.querySelector('#hero')
  if (hero) {
    hero.style.opacity = '1'
    hero.style.transform = 'translateY(0)'
  }

  // Init GSAP after content mounts
  requestAnimationFrame(() => {
    initSmoothScroll()
    initScrollAnimations()
    
    // Gradually reveal sections as they come into view
    sections.forEach((section, index) => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out'
            entry.target.style.opacity = '1'
            entry.target.style.transform = 'translateY(0)'
            observer.unobserve(entry.target)
          }
        })
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      })
      
      observer.observe(section)
    })
  })
})
