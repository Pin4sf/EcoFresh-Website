import { motion } from "framer-motion";

export function AnimatedGradientText({ 
  children, 
  className = "", 
  gradientColors = ["from-primary1", "via-primary2", "to-ink"],
  animationDuration = 4 
}) {
  return (
    <motion.span
      className={`bg-gradient-to-r ${gradientColors.join(" ")} bg-clip-text text-transparent bg-[length:200%_100%] ${className}`}
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
      }}
      transition={{
        duration: animationDuration,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      {children}
    </motion.span>
  );
}

