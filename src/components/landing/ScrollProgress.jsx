import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll progress indicator
 * Shows how far user has scrolled through the page
 */
const ScrollProgress = ({ 
  position = 'top', // 'top' | 'bottom' | 'left' | 'right'
  color = '#E3F221',
  height = 3,
  showPercentage = false,
  zIndex = 9999
}) => {
  const progressRef = useRef(null);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      
      if (progressRef.current) {
        if (position === 'left' || position === 'right') {
          progressRef.current.style.height = `${progress}%`;
        } else {
          progressRef.current.style.width = `${progress}%`;
        }
      }
      
      setPercentage(Math.round(progress));
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    return () => window.removeEventListener('scroll', updateProgress);
  }, [position]);

  const getPositionStyles = () => {
    const base = {
      position: 'fixed',
      zIndex,
      backgroundColor: color,
      transition: 'all 0.1s ease-out',
    };

    switch (position) {
      case 'top':
        return { ...base, top: 0, left: 0, height, width: '0%' };
      case 'bottom':
        return { ...base, bottom: 0, left: 0, height, width: '0%' };
      case 'left':
        return { ...base, top: 0, left: 0, width: height, height: '0%' };
      case 'right':
        return { ...base, top: 0, right: 0, width: height, height: '0%' };
      default:
        return { ...base, top: 0, left: 0, height, width: '0%' };
    }
  };

  return (
    <>
      <div 
        ref={progressRef} 
        style={getPositionStyles()}
        className="shadow-[0_0_10px_rgba(227,242,33,0.5)]"
      />
      
      {showPercentage && (
        <div 
          className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-[#1A1A1A] border border-[#E3F221]/30 flex items-center justify-center shadow-lg"
          style={{ zIndex }}
        >
          <span className="text-xs font-bold text-[#E3F221] font-mono">
            {percentage}%
          </span>
        </div>
      )}
    </>
  );
};

export default ScrollProgress;
