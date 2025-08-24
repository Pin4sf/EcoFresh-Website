import { motion } from "framer-motion";

export function EnhancedBorderedText({ 
  children, 
  className = "", 
  gradientColors = ["from-cyan-400", "via-blue-500", "to-purple-600"],
  animationDuration = 4 
}) {
  return (
    <div className="relative inline-block">
      {/* Simple animated gradient border */}
      <motion.div
        className={`absolute inset-0 rounded-lg bg-gradient-to-r ${gradientColors.join(" ")} p-1`}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
        }}
        transition={{
          duration: animationDuration,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          backgroundSize: "200% 100%"
        }}
      />
      
      {/* Text content with transparent background */}
      <div className={`relative bg-transparent rounded-md px-3 py-1 ${className}`}>
        <motion.span
          className={`bg-gradient-to-r ${gradientColors.join(" ")} bg-clip-text text-transparent bg-[length:200%_100%] font-bold text-2xl`}
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
      </div>
    </div>
  );
}
