import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function EnhancedBorderedText({ 
  children, 
  className = "", 
  gradientColors = ["from-cyan-400", "via-blue-500", "to-purple-600"],
  animationDuration = 4 
}) {
  const borderRef = useRef(null)
  const textRef = useRef(null)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    const borderTween = gsap.fromTo(
      borderRef.current,
      { backgroundPosition: "0% 50%" },
      { backgroundPosition: "100% 50%", ease: "none", duration: animationDuration, repeat: -1, yoyo: true }
    )
    const textTween = gsap.fromTo(
      textRef.current,
      { backgroundPosition: "0% 50%" },
      { backgroundPosition: "100% 50%", ease: "none", duration: animationDuration, repeat: -1, yoyo: true }
    )
    return () => {
      borderTween.kill()
      textTween.kill()
    }
  }, [animationDuration])
  return (
    <div className="relative inline-block">
      {/* Simple animated gradient border */}
      <span
        ref={borderRef}
        className={`absolute inset-0 rounded-lg bg-gradient-to-r ${gradientColors.join(" ")} p-1`}
        style={{ backgroundSize: "200% 100%" }}
      />
      
      {/* Text content with transparent background */}
      <div className={`relative bg-transparent rounded-md px-3 py-1 ${className}`}>
        <span
          ref={textRef}
          className={`bg-gradient-to-r ${gradientColors.join(" ")} bg-clip-text text-transparent bg-[length:200%_100%] font-bold text-2xl`}
        >
          {children}
        </span>
      </div>
    </div>
  );
}
