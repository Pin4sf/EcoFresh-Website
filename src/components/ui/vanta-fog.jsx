import React, { useEffect, useRef } from 'react';

export const VantaFog = ({ 
  className = "", 
  children,
  highlightColor = "#67C090", // Your primary1 green
  midtoneColor = "#86c8b8", // Your primary2 green
  lowlightColor = "#124170", // Your secondary2 blue
  backgroundColor = "#f7f2ec", // Your bg2 color
  mouseControls = true,
  touchControls = true,
  gyroControls = false,
  minHeight = 200.00,
  minWidth = 200.00,
  blurFactor = 0.50,
  speed = 1.50,
  zoom = 0.70
}) => {
  const vantaRef = useRef(null);
  const effectRef = useRef(null);

  useEffect(() => {
    // Initialize Vanta.js Fog effect
    const initializeVanta = () => {
      if (window.VANTA && vantaRef.current) {
        // Convert hex colors to integers for Vanta.js
        const highlightColorInt = parseInt(highlightColor.replace('#', ''), 16);
        const midtoneColorInt = parseInt(midtoneColor.replace('#', ''), 16);
        const lowlightColorInt = parseInt(lowlightColor.replace('#', ''), 16);
        const backgroundColorInt = parseInt(backgroundColor.replace('#', ''), 16);

        effectRef.current = window.VANTA.FOG({
          el: vantaRef.current,
          mouseControls,
          touchControls,
          gyroControls,
          minHeight,
          minWidth,
          highlightColor: highlightColorInt,
          midtoneColor: midtoneColorInt,
          lowlightColor: lowlightColorInt,
          baseColor: backgroundColorInt,
          blurFactor,
          speed,
          zoom,
        });
      }
    };

    // Wait for scripts to load, then initialize
    const checkAndInitialize = () => {
      if (window.VANTA) {
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
  }, [highlightColor, midtoneColor, lowlightColor, backgroundColor, mouseControls, touchControls, gyroControls, minHeight, minWidth, blurFactor, speed, zoom]);

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
