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

// Initialize GSAP on next frame to be resilient to HMR
requestAnimationFrame(() => {
  initSmoothScroll()
  initScrollAnimations()
})
