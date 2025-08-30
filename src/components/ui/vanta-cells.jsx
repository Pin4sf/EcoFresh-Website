import React, { useEffect, useRef } from 'react';

export const VantaCells = ({ 
  className = "", 
  children,
  color1 = "#67C090", // Your primary1 green
  color2 = "#124170", // Your ink color
  size = 1.00,
  mouseControls = true,
  touchControls = true,
  gyroControls = false,
  minHeight = 200.00,
  minWidth = 200.00,
  scale = 1.00
}) => {
  const vantaRef = useRef(null);
  const effectRef = useRef(null);

  useEffect(() => {
    // Initialize Vanta.js Cells effect
    const initializeVanta = () => {
      if (window.VANTA && vantaRef.current) {
        // Convert hex colors to integers for Vanta.js
        const color1Int = parseInt(color1.replace('#', ''), 16);
        const color2Int = parseInt(color2.replace('#', ''), 16);

        effectRef.current = window.VANTA.CELLS({
          el: vantaRef.current,
          mouseControls,
          touchControls,
          gyroControls,
          minHeight,
          minWidth,
          scale,
          color1: color1Int,
          color2: color2Int,
          size,
          // Additional EcoFresh-specific settings
          backgroundColor: 0x0a0a0a, // Dark background
          cellSize: 0.8,
          speed: 0.8,
          // Performance optimizations
          points: 8.00,
          maxDistance: 25.00,
          spacing: 20.00
        });
      }
    };

    // Wait for scripts to load, then initialize
    const checkAndInitialize = () => {
      if (window.VANTA && window.THREE) {
        initializeVanta();
      } else {
        // Retry after a short delay
        setTimeout(checkAndInitialize, 100);
      }
    };

    checkAndInitialize();

    // Cleanup function
    return () => {
      if (effectRef.current && effectRef.current.destroy) {
        effectRef.current.destroy();
      }
    };
  }, [color1, color2, size, mouseControls, touchControls, gyroControls, minHeight, minWidth, scale]);

  return (
    <div 
      ref={vantaRef} 
      className={`w-full h-full ${className}`}
      style={{ position: 'absolute', top: 0, left: 0 }}
    >
      {children}
    </div>
  );
};
