import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function AnimatedGradientText({ 
  children, 
  className = "", 
  gradientColors = ["from-[#B6F500]", "via-[#00FFDE]", "via-[#A4DD00]", "to-[#0065F8]"],
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
      className={`bg-gradient-to-r ${gradientColors.join(" ")} bg-clip-text text-transparent bg-[length:200%_100%] ${className}`}
    >
      {children}
    </span>
  );
}

