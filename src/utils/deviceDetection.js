// Device detection utilities for performance optimization
export const isMobile = () => {
  if (typeof window === 'undefined') return false
  
  return (
    window.innerWidth <= 768 ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    ('ontouchstart' in window && window.innerWidth <= 1024)
  )
}

export const isLowEndDevice = () => {
  if (typeof window === 'undefined') return false
  
  // Check for low-end devices based on hardware concurrency and memory
  const hardwareConcurrency = navigator.hardwareConcurrency || 1
  const memory = navigator.deviceMemory || 4 // Default to 4GB if not available
  
  return (
    isMobile() ||
    hardwareConcurrency <= 4 ||
    memory <= 4
  )
}

export const getPerformanceMode = () => {
  if (isLowEndDevice()) return 'low'
  if (isMobile()) return 'medium'
  return 'high'
}

export const getMaxFPS = () => {
  const mode = getPerformanceMode()
  switch (mode) {
    case 'low': return 30
    case 'medium': return 45
    case 'high': return 60
    default: return 60
  }
}

export const shouldReduceAnimations = () => {
  if (typeof window === 'undefined') return false
  
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  
  return prefersReducedMotion || isLowEndDevice()
}
