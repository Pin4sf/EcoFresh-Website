import React, { useEffect, useRef } from 'react';

export const VantaTopology = ({ 
  className = "", 
  children,
  color = "#67C090", // Your primary1 green
  backgroundColor = "#DDF4E7", // Your bg1 color
  mouseControls = true,
  touchControls = true,
  gyroControls = false,
  minHeight = 200.00,
  minWidth = 200.00,
  scale = 1.00,
  scaleMobile = 1.00
}) => {
  const vantaRef = useRef(null);
  const effectRef = useRef(null);

  useEffect(() => {
    // Initialize Vanta.js Topology effect
    const initializeVanta = () => {
      if (window.VANTA && vantaRef.current) {
        // Convert hex colors to integers for Vanta.js
        const colorInt = parseInt(color.replace('#', ''), 16);
        const backgroundColorInt = parseInt(backgroundColor.replace('#', ''), 16);

        effectRef.current = window.VANTA.TOPOLOGY({
          el: vantaRef.current,
          mouseControls,
          touchControls,
          gyroControls,
          minHeight,
          minWidth,
          scale,
          scaleMobile,
          color: colorInt,
          backgroundColor: backgroundColorInt,
          // Additional EcoFresh-specific settings
          size: 1.5,
          speed: 1.2,
          // Performance optimizations
          points: 12.00,
          maxDistance: 25.00,
          spacing: 20.00
        });
      }
    };

    // Wait for scripts to load, then initialize
    const checkAndInitialize = () => {
      if (window.VANTA && window.p5) {
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
  }, [color, backgroundColor, mouseControls, touchControls, gyroControls, minHeight, minWidth, scale, scaleMobile]);

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
