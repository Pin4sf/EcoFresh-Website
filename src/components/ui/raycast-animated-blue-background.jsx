import { cn } from "./utils";
import { useState, useEffect } from "react";
import UnicornScene from "unicornstudio-react";

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    
    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

export const RaycastAnimatedBackground = ({ className, children }) => {
  const { width, height } = useWindowSize();

  return (
    <div className={cn("absolute inset-0 w-full h-full min-h-full", className)}>
      {/* Beige background with dark teal rays overlay */}
      <div className="absolute inset-0 bg-bg1"></div>
      
      {/* Dark teal rays effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary2/20 to-primary2/40"></div>
      
      {/* Additional ray effects */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary2/15 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-primary2/10 to-transparent"></div>
      
      {/* Subtle animated rays */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary2 to-transparent animate-pulse"></div>
        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-primary2 to-transparent animate-pulse delay-1000"></div>
        <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-primary2 to-transparent animate-pulse delay-2000"></div>
      </div>
      
      {children && (
        <div className="absolute inset-0 z-10">
          {children}
        </div>
      )}
    </div>
  );
};
