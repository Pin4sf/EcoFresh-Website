import { motion } from "framer-motion";

export function EcoFormSimpleBorder({ 
  children = "EcoForm®", 
  className = "", 
  gradientColors = ["from-primary1", "via-primary2", "to-ink"],
  animationDuration = 4 
}) {
  return (
    <motion.span
      className={`bg-gradient-to-r ${gradientColors.join(" ")} bg-clip-text text-transparent bg-[length:200%_100%] font-bold text-5xl md:text-6xl lg:text-8xl cursor-pointer transition-all duration-300 hover:scale-105 hover:drop-shadow-lg font-sans ${className}`}
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
      }}
      transition={{
        duration: animationDuration,
        repeat: Infinity,
        ease: "linear"
      }}
      whileHover={{
        scale: 1.05,
        filter: "drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3))"
      }}
    >
      {children}
    </motion.span>
  );
}

