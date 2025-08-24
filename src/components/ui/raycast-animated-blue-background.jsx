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
      <UnicornScene 
        production={true} 
        projectId="ed7SJMvTJEVxfqzypOOQ" 
        width={width} 
        height={height} 
        style={{
          width: '100%',
          height: '100%',
          minHeight: '100%',
          objectFit: 'cover'
        }}
      />
      {children && (
        <div className="absolute inset-0 z-10">
          {children}
        </div>
      )}
    </div>
  );
};
