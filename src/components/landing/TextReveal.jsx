import React, { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Premium text reveal animation 
 * This component wraps children and animates them WITHOUT destroying their structure
 * All font styles, colors, and classes are preserved
 */
const TextReveal = ({ 
  children, 
  className = "", 
  delay = 0,
  animation = "fadeUp", // "fadeUp" | "fadeIn" | "slideUp" | "blur" | "scale" | "none"
  duration = 0.8,
  once = true,
  trigger = true // false = animate immediately on mount
}) => {
  const containerRef = useRef(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    
    // Animation presets that work on the container
    const animations = {
      fadeUp: {
        from: { y: 40, opacity: 0 },
        to: { y: 0, opacity: 1 }
      },
      fadeIn: {
        from: { opacity: 0 },
        to: { opacity: 1 }
      },
      slideUp: {
        from: { y: 60, opacity: 0 },
        to: { y: 0, opacity: 1 }
      },
      blur: {
        from: { filter: 'blur(10px)', opacity: 0, y: 20 },
        to: { filter: 'blur(0px)', opacity: 1, y: 0 }
      },
      scale: {
        from: { scale: 0.9, opacity: 0 },
        to: { scale: 1, opacity: 1 }
      },
      none: {
        from: { opacity: 1 },
        to: { opacity: 1 }
      }
    };

    const anim = animations[animation] || animations.fadeUp;
    
    const animConfig = {
      ...anim.to,
      duration: duration,
      ease: "power3.out",
      delay: delay
    };

    if (trigger) {
      animConfig.scrollTrigger = {
        trigger: containerRef.current,
        start: "top 85%",
        toggleActions: once ? "play none none none" : "play none none reverse"
      };
    }

    // Use fromTo for better control
    gsap.fromTo(containerRef.current, anim.from, animConfig);

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

export default TextReveal;
