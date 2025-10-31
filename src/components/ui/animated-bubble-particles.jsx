import { useEffect, useRef, useState, useCallback } from 'react'

function classNames(...args) {
  return args.filter(Boolean).join(' ')
}

export default function AnimatedBubbleParticles({
  className,
  backgroundColor = '#edf3f8',
  particleColor = '#3e82f7',
  particleSize = 30,
  spawnInterval = 180,
  height = '100vh',
  width = '100vw',
  enableGooEffect = true,
  blurStrength = 12,
  pauseOnBlur = true,
  zIndex = 1,
  friction = { min: 1, max: 2 },
  scaleRange = { min: 0.4, max: 2.4 },
  children,
}) {
  const containerRef = useRef(null)
  const particlesRef = useRef(null)
  const animationRef = useRef()
  const intervalRef = useRef()
  const particlesArrayRef = useRef([])
  const isPausedRef = useRef(false)
  const gooIdRef = useRef('goo-' + Math.random().toString(36).substring(2, 11))
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const createParticleElement = useCallback(() => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.style.cssText = `display:block;width:${particleSize}px;height:${particleSize}px;position:absolute;transform:translateZ(0px);`
    svg.setAttribute('viewBox', '0 0 67.4 67.4')
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    circle.setAttribute('cx', '33.7')
    circle.setAttribute('cy', '33.7')
    circle.setAttribute('r', '33.7')
    circle.setAttribute('fill', particleColor)
    svg.appendChild(circle)
    return svg
  }, [particleSize, particleColor])

  const createParticle = useCallback(() => {
    const element = createParticleElement()
    if (particlesRef.current) {
      particlesRef.current.appendChild(element)
    }
    const x = Math.random() * dimensions.width
    const y = dimensions.height + 100
    const steps = dimensions.height / 2
    const frictionValue = friction.min + Math.random() * (friction.max - friction.min)
    const scale = scaleRange.min + Math.random() * (scaleRange.max - scaleRange.min)
    const siner = (dimensions.width / 2.5) * Math.random()
    const rotationDirection = Math.random() > 0.5 ? '+' : '-'
    element.style.transform = `translateX(${x}px) translateY(${y}px)`
    return { x, y, vx: 0, vy: 0, scale, rotation: 0, rotationDirection, siner, steps, friction: frictionValue, element }
  }, [createParticleElement, dimensions, friction, scaleRange])

  const updateParticle = (particle) => {
    particle.y -= particle.friction
    const left = particle.x + Math.sin((particle.y * Math.PI) / particle.steps) * particle.siner
    const top = particle.y
    const rotation = particle.rotationDirection + (particle.y + particleSize)
    if (particle.element) {
      const element = particle.element
      element.style.transform = `translateX(${left}px) translateY(${top}px) scale(${particle.scale}) rotate(${rotation}deg)`
    }
    if (particle.y < -particleSize) {
      if (particle.element && particle.element.parentNode) {
        particle.element.parentNode.removeChild(particle.element)
      }
      return false
    }
    return true
  }

  const animate = useCallback(() => {
    if (isPausedRef.current || prefersReducedMotion) {
      animationRef.current = requestAnimationFrame(animate)
      return
    }
    particlesArrayRef.current = particlesArrayRef.current.filter(updateParticle)
    animationRef.current = requestAnimationFrame(animate)
  }, [prefersReducedMotion])

  const spawnParticle = useCallback(() => {
    if (!isPausedRef.current && !prefersReducedMotion && dimensions.width > 0 && dimensions.height > 0) {
      const particle = createParticle()
      particlesArrayRef.current.push(particle)
    }
  }, [dimensions, createParticle, prefersReducedMotion])

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setDimensions({ width: rect.width, height: rect.height })
      }
    }
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  useEffect(() => {
    if (!pauseOnBlur) return
    const handleBlur = () => { isPausedRef.current = true }
    const handleFocus = () => { isPausedRef.current = false }
    window.addEventListener('blur', handleBlur)
    window.addEventListener('focus', handleFocus)
    return () => {
      window.removeEventListener('blur', handleBlur)
      window.removeEventListener('focus', handleFocus)
    }
  }, [pauseOnBlur])

  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0) {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      if (intervalRef.current) clearInterval(intervalRef.current)
      animationRef.current = requestAnimationFrame(animate)
      intervalRef.current = window.setInterval(spawnParticle, spawnInterval)
    }
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      if (intervalRef.current) clearInterval(intervalRef.current)
      particlesArrayRef.current.forEach((p) => {
        if (p.element && p.element.parentNode) p.element.parentNode.removeChild(p.element)
      })
      particlesArrayRef.current = []
    }
  }, [dimensions, spawnInterval, animate, spawnParticle])

  return (
    <div
      ref={containerRef}
      className={classNames('relative overflow-hidden w-screen h-screen', className)}
      style={{ zIndex, width, height, backgroundColor }}
    >
      <div
        ref={particlesRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        style={{ filter: enableGooEffect ? `url(#${gooIdRef.current})` : undefined }}
      />
      <div className="absolute inset-0 flex items-center justify-center z-10 w-full h-full">
        {children}
      </div>
      {enableGooEffect && (
        <svg className="absolute w-0 h-0 z-0">
          <defs>
            <filter id={gooIdRef.current}>
              <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation={blurStrength} />
              <feColorMatrix in="blur" result="colormatrix" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -9" />
              <feBlend in="SourceGraphic" in2="colormatrix" />
            </filter>
          </defs>
        </svg>
      )}
    </div>
  )
}


