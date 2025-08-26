import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function EcoFormSimpleBorder({ 
  children = "EcoForm®", 
  className = "", 
  gradientColors = ["from-primary1", "via-primary2", "to-ink"],
  animationDuration = 4 
}) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    const tween = gsap.fromTo(
      el,
      { backgroundPosition: "0% 50%" },
      { backgroundPosition: "100% 50%", ease: "none", duration: animationDuration, repeat: -1, yoyo: true }
    )
    return () => tween.kill()
  }, [animationDuration])

  return (
    <span
      ref={ref}
      className={`bg-gradient-to-r ${gradientColors.join(" ")} bg-clip-text text-transparent bg-[length:200%_100%] font-bold text-5xl md:text-6xl lg:text-8xl cursor-pointer transition-all duration-300 hover:scale-105 hover:drop-shadow-lg font-sans ${className}`}
    >
      {children}
    </span>
  );
}

