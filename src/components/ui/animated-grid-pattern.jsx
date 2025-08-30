import { useEffect, useId, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "./utils";
import { getPerformanceMode, shouldReduceAnimations } from '../../utils/deviceDetection';

export function AnimatedGridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = 0,
  numSquares = 50,
  className,
  maxOpacity = 0.5,
  duration = 4,
  repeatDelay = 0.5,
  color = "#7ADAA5", // EcoFresh green color
  ...props
}) {
  const id = useId();
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [squares, setSquares] = useState([]);
  const [shouldRender, setShouldRender] = useState(false);
  const [isInView, setIsInView] = useState(false);

  // Performance optimizations
  const performanceMode = getPerformanceMode();
  const reduceAnimations = shouldReduceAnimations();
  
  // Optimize based on device performance
  const optimizedProps = {
    numSquares: performanceMode === 'low' ? Math.floor(numSquares * 0.5) : 
                 performanceMode === 'medium' ? Math.floor(numSquares * 0.7) : numSquares,
    maxOpacity: performanceMode === 'low' ? maxOpacity * 0.6 : 
                performanceMode === 'medium' ? maxOpacity * 0.8 : maxOpacity,
    duration: reduceAnimations ? duration * 1.5 : duration,
    width: performanceMode === 'low' ? width * 1.2 : width,
    height: performanceMode === 'low' ? height * 1.2 : height
  };

  function getPos() {
    if (!dimensions.width || !dimensions.height) {
      return [0, 0];
    }
    return [
      Math.floor((Math.random() * dimensions.width) / optimizedProps.width),
      Math.floor((Math.random() * dimensions.height) / optimizedProps.height),
    ];
  }

  // Adjust the generateSquares function to return objects with an id, x, and y
  function generateSquares(count) {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      pos: getPos(),
    }));
  }

  // Function to update a single square's position
  const updateSquarePosition = (id) => {
    if (reduceAnimations) return; // Skip updates on low-end devices
    setSquares((currentSquares) =>
      currentSquares.map((sq) =>
        sq.id === id
          ? {
              ...sq,
              pos: getPos(),
            }
          : sq,
      ),
    );
  };

  // Update squares to animate in
  useEffect(() => {
    if (dimensions.width && dimensions.height) {
      setSquares(generateSquares(optimizedProps.numSquares));
    }
  }, [dimensions, optimizedProps.numSquares]);

  // Resize observer to update container dimensions
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, [containerRef]);

  // Intersection Observer for conditional rendering
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry && entry.isIntersecting;
        setIsInView(isIntersecting);
        
        // Delay rendering to avoid initial load impact
        if (isIntersecting && !shouldRender) {
          setTimeout(() => setShouldRender(true), 100);
        } else if (!isIntersecting) {
          setShouldRender(false);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    observer.observe(container);

    return () => {
      observer.unobserve(container);
    };
  }, [shouldRender]);

  // Don't render on low-end devices with reduced animations
  if (reduceAnimations && performanceMode === 'low') {
    return (
      <div className={cn("absolute inset-0", className)} {...props}>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-current opacity-5" />
      </div>
    );
  }

  return (
    <svg
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full",
        className,
      )}
      style={{
        fill: `${color}30`,
        stroke: `${color}30`
      }}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={optimizedProps.width}
          height={optimizedProps.height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path
            d={`M.5 ${optimizedProps.height}V.5H${optimizedProps.width}`}
            fill="none"
            strokeDasharray={strokeDasharray}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
      {shouldRender && isInView && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(({ pos: [x, y], id }, index) => (
            <motion.rect
              initial={{ opacity: 0 }}
              animate={{ opacity: optimizedProps.maxOpacity }}
              transition={{
                duration: optimizedProps.duration,
                repeat: reduceAnimations ? 0 : 1,
                delay: reduceAnimations ? 0 : index * 0.1,
                repeatType: "reverse",
              }}
              onAnimationComplete={() => updateSquarePosition(id)}
              key={`${x}-${y}-${index}`}
              width={optimizedProps.width - 1}
              height={optimizedProps.height - 1}
              x={x * optimizedProps.width + 1}
              y={y * optimizedProps.height + 1}
              fill={color}
              strokeWidth="0"
            />
          ))}
        </svg>
      )}
    </svg>
  );
}
