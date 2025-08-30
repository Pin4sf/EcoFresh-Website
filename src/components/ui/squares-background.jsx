import { useRef, useEffect, useState } from "react"
import { getPerformanceMode, shouldReduceAnimations } from "../../utils/deviceDetection"

export function Squares({
  direction = "right",
  speed = 1,
  borderColor = "#26667F",
  squareSize = 40,
  hoverFillColor = "#7ADAA5",
  className,
}) {
  const canvasRef = useRef(null)
  const requestRef = useRef()
  const numSquaresX = useRef()
  const numSquaresY = useRef()
  const gridOffset = useRef({ x: 0, y: 0 })
  const [hoveredSquare, setHoveredSquare] = useState(null)
  const [shouldRender, setShouldRender] = useState(false)
  const [isInView, setIsInView] = useState(false)

  // Performance optimizations
  const performanceMode = getPerformanceMode()
  const reduceAnimations = shouldReduceAnimations()

  // Optimize parameters based on device performance
  const optimizedSpeed = performanceMode === 'low' ? speed * 0.5 : speed
  const optimizedSquareSize = performanceMode === 'low' ? squareSize * 1.5 : squareSize

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas background with EcoFresh colors
    canvas.style.background = "#DDF4E7"

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      numSquaresX.current = Math.ceil(canvas.width / optimizedSquareSize) + 1
      numSquaresY.current = Math.ceil(canvas.height / optimizedSquareSize) + 1
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const startX = Math.floor(gridOffset.current.x / optimizedSquareSize) * optimizedSquareSize
      const startY = Math.floor(gridOffset.current.y / optimizedSquareSize) * optimizedSquareSize

      ctx.lineWidth = performanceMode === 'low' ? 1 : 0.5

      for (let x = startX; x < canvas.width + optimizedSquareSize; x += optimizedSquareSize) {
        for (let y = startY; y < canvas.height + optimizedSquareSize; y += optimizedSquareSize) {
          const squareX = x - (gridOffset.current.x % optimizedSquareSize)
          const squareY = y - (gridOffset.current.y % optimizedSquareSize)

          if (
            hoveredSquare &&
            Math.floor((x - startX) / optimizedSquareSize) === hoveredSquare.x &&
            Math.floor((y - startY) / optimizedSquareSize) === hoveredSquare.y
          ) {
            ctx.fillStyle = hoverFillColor
            ctx.fillRect(squareX, squareY, optimizedSquareSize, optimizedSquareSize)
          }

          ctx.strokeStyle = borderColor
          ctx.strokeRect(squareX, squareY, optimizedSquareSize, optimizedSquareSize)
        }
      }

      // EcoFresh gradient overlay
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.sqrt(Math.pow(canvas.width, 2) + Math.pow(canvas.height, 2)) / 2,
      )
      gradient.addColorStop(0, "rgba(221, 244, 231, 0)") // #DDF4E7 transparent
      gradient.addColorStop(1, "#DDF4E7")

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    const updateAnimation = () => {
      if (!shouldRender || !isInView) {
        requestRef.current = requestAnimationFrame(updateAnimation)
        return
      }

      const effectiveSpeed = Math.max(optimizedSpeed, 0.1)

      switch (direction) {
        case "right":
          gridOffset.current.x =
            (gridOffset.current.x - effectiveSpeed + optimizedSquareSize) % optimizedSquareSize
          break
        case "left":
          gridOffset.current.x =
            (gridOffset.current.x + effectiveSpeed + optimizedSquareSize) % optimizedSquareSize
          break
        case "up":
          gridOffset.current.y =
            (gridOffset.current.y + effectiveSpeed + optimizedSquareSize) % optimizedSquareSize
          break
        case "down":
          gridOffset.current.y =
            (gridOffset.current.y - effectiveSpeed + optimizedSquareSize) % optimizedSquareSize
          break
        case "diagonal":
          gridOffset.current.x =
            (gridOffset.current.x - effectiveSpeed + optimizedSquareSize) % optimizedSquareSize
          gridOffset.current.y =
            (gridOffset.current.y - effectiveSpeed + optimizedSquareSize) % optimizedSquareSize
          break
      }

      drawGrid()
      requestRef.current = requestAnimationFrame(updateAnimation)
    }

    const handleMouseMove = (event) => {
      if (reduceAnimations) return
      
      const rect = canvas.getBoundingClientRect()
      const mouseX = event.clientX - rect.left
      const mouseY = event.clientY - rect.top

      const startX = Math.floor(gridOffset.current.x / optimizedSquareSize) * optimizedSquareSize
      const startY = Math.floor(gridOffset.current.y / optimizedSquareSize) * optimizedSquareSize

      const hoveredSquareX = Math.floor(
        (mouseX + gridOffset.current.x - startX) / optimizedSquareSize,
      )
      const hoveredSquareY = Math.floor(
        (mouseY + gridOffset.current.y - startY) / optimizedSquareSize,
      )

      setHoveredSquare({ x: hoveredSquareX, y: hoveredSquareY })
    }

    const handleMouseLeave = () => {
      setHoveredSquare(null)
    }

    // Event listeners
    window.addEventListener("resize", resizeCanvas)
    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseleave", handleMouseLeave)

    // Initial setup
    resizeCanvas()
    requestRef.current = requestAnimationFrame(updateAnimation)

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [direction, optimizedSpeed, borderColor, hoverFillColor, hoveredSquare, optimizedSquareSize, shouldRender, isInView, reduceAnimations])

  // Intersection Observer for conditional rendering
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry && entry.isIntersecting
        setIsInView(isIntersecting)
        
        if (isIntersecting && !shouldRender) {
          setTimeout(() => setShouldRender(true), 100)
        } else if (!isIntersecting) {
          setShouldRender(false)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px'
      }
    )

    observer.observe(canvas)

    return () => {
      observer.unobserve(canvas)
    }
  }, [shouldRender])

  // Don't render on low-end devices with reduced animations
  if (reduceAnimations && performanceMode === 'low') {
    return (
      <div className={`w-full h-full ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-[#DDF4E7] via-[#67C090]/20 to-[#26667F]/30" />
      </div>
    )
  }

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full border-none block ${className}`}
    />
  )
}
