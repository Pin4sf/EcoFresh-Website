import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Lightweight canvas background that spawns falling "pellets" on mouse move
// Designed to be easily extensible: pass different pelletTypes or custom shape drawers
export default function PelletBackground({
  className = '',
  pelletTypes = ['circle', 'square', 'triangle'],
  colors = ['#e8f6ef', '#cdeee0', '#a9dfbf', '#67c090'],
  maxPellets = 180,
  gravity = 0.25,
  spawnRate = 6,
  sizeRange = [3, 7],
  drift = 0.2,
  shapeDrawers = {}, // optional map: name -> (ctx, x, y, size, rotation) => void
}) {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const rafRef = useRef(0)
  const pelletsRef = useRef([])
  const runningRef = useRef(true)
  const lastSpawnRef = useRef(0)
  const resizeObserverRef = useRef(null)
  const stRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Helpers
    const clamp = (v, min, max) => Math.min(max, Math.max(min, v))
    const rand = (min, max) => min + Math.random() * (max - min)
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

    // Size canvas to container
    const resize = () => {
      const { clientWidth: w, clientHeight: h } = container
      if (!w || !h) return
      const dpr = clamp(window.devicePixelRatio || 1, 1, 2)
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    resizeObserverRef.current = new ResizeObserver(resize)
    resizeObserverRef.current.observe(container)

    // Default shape drawers
    const drawers = {
      circle: (ctx, x, y, size) => {
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fill()
      },
      square: (ctx, x, y, size, rotation) => {
        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(rotation)
        ctx.fillRect(-size, -size, size * 2, size * 2)
        ctx.restore()
      },
      triangle: (ctx, x, y, size, rotation) => {
        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(rotation)
        ctx.beginPath()
        ctx.moveTo(0, -size)
        ctx.lineTo(size, size)
        ctx.lineTo(-size, size)
        ctx.closePath()
        ctx.fill()
        ctx.restore()
      },
      ...shapeDrawers,
    }

    function spawnPellets(mx, my, count) {
      const pellets = pelletsRef.current
      for (let i = 0; i < count; i++) {
        if (pellets.length >= maxPellets) break
        const size = rand(sizeRange[0], sizeRange[1])
        pellets.push({
          x: mx + rand(-6, 6),
          y: my + rand(-6, 6),
          vx: rand(-drift, drift),
          vy: rand(0.2, 1),
          size,
          color: pick(colors),
          shape: pick(pelletTypes),
          rotation: rand(0, Math.PI * 2),
          vr: rand(-0.1, 0.1),
          life: rand(2.5, 4.5),
        })
      }
    }

    function update(dt) {
      const pellets = pelletsRef.current
      for (let i = pellets.length - 1; i >= 0; i--) {
        const p = pellets[i]
        p.vy += gravity * dt
        p.x += p.vx * 60 * dt
        p.y += p.vy * 60 * dt
        p.rotation += p.vr * 60 * dt
        p.life -= dt
        if (p.y - p.size > canvas.height || p.life <= 0) {
          pellets.splice(i, 1)
        }
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const pellets = pelletsRef.current
      for (let i = 0; i < pellets.length; i++) {
        const p = pellets[i]
        ctx.fillStyle = p.color
        const drawFn = drawers[p.shape] || drawers.circle
        drawFn(ctx, p.x, p.y, p.size, p.rotation)
      }
    }

    let lastTs = performance.now()
    function loop(ts) {
      if (!runningRef.current) {
        rafRef.current = requestAnimationFrame(loop)
        lastTs = ts
        return
      }
      const dt = Math.min(0.05, (ts - lastTs) / 1000)
      lastTs = ts
      update(dt)
      draw()
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)

    function onMouseMove(e) {
      if (!runningRef.current || prefersReducedMotion) return
      const rect = canvas.getBoundingClientRect()
      const mx = e.clientX - rect.left
      const my = e.clientY - rect.top
      const now = performance.now()
      if (now - lastSpawnRef.current > 40) {
        spawnPellets(mx, my, spawnRate)
        lastSpawnRef.current = now
      }
    }

    container.addEventListener('mousemove', onMouseMove)

    // Pause/resume with scroll
    stRef.current = ScrollTrigger.create({
      trigger: container,
      start: 'top bottom',
      end: 'bottom top',
      onEnter: () => (runningRef.current = !prefersReducedMotion),
      onEnterBack: () => (runningRef.current = !prefersReducedMotion),
      onLeave: () => (runningRef.current = false),
      onLeaveBack: () => (runningRef.current = false),
    })

    // Initial state respects reduced motion
    runningRef.current = !prefersReducedMotion

    return () => {
      container.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafRef.current)
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect()
        resizeObserverRef.current = null
      }
      if (stRef.current) {
        stRef.current.kill()
        stRef.current = null
      }
    }
  }, [pelletTypes, colors, maxPellets, gravity, spawnRate, sizeRange, drift, shapeDrawers])

  return (
    <div ref={containerRef} className={`absolute inset-0 ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  )
}


