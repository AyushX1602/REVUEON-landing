import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

/**
 * Floating decorative elements that respond to scroll
 * Adds depth and visual interest
 */
const FloatingElements = ({ className = "" }) => {
  const containerRef = useRef(null);

  const elements = [
    { 
      shape: 'circle', 
      size: 300, 
      color: 'rgba(227, 242, 33, 0.08)', 
      blur: 60,
      position: { top: '10%', left: '5%' },
      speed: 0.3
    },
    { 
      shape: 'circle', 
      size: 200, 
      color: 'rgba(91, 95, 151, 0.1)', 
      blur: 40,
      position: { top: '30%', right: '10%' },
      speed: -0.2
    },
    { 
      shape: 'ring', 
      size: 150, 
      color: 'rgba(227, 242, 33, 0.15)', 
      blur: 0,
      position: { bottom: '20%', left: '15%' },
      speed: 0.4
    },
    { 
      shape: 'square', 
      size: 80, 
      color: 'rgba(91, 95, 151, 0.1)', 
      blur: 0,
      position: { top: '50%', right: '5%' },
      speed: -0.3,
      rotation: 45
    },
    { 
      shape: 'dot', 
      size: 12, 
      color: '#E3F221', 
      blur: 0,
      position: { top: '15%', right: '25%' },
      speed: 0.5
    },
    { 
      shape: 'dot', 
      size: 8, 
      color: '#5B5F97', 
      blur: 0,
      position: { bottom: '30%', right: '20%' },
      speed: -0.4
    },
    { 
      shape: 'line', 
      width: 100, 
      height: 2, 
      color: 'rgba(227, 242, 33, 0.3)', 
      blur: 0,
      position: { top: '70%', left: '8%' },
      speed: 0.2,
      rotation: -15
    }
  ];

  useGSAP(() => {
    elements.forEach((el, i) => {
      const element = containerRef.current?.querySelector(`[data-float="${i}"]`);
      if (!element) return;

      gsap.to(element, {
        y: el.speed * 100,
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 1
        }
      });
    });
  }, { scope: containerRef });

  const renderShape = (el, i) => {
    const baseStyle = {
      position: 'absolute',
      ...el.position,
      filter: el.blur ? `blur(${el.blur}px)` : 'none',
      transform: el.rotation ? `rotate(${el.rotation}deg)` : 'none',
      pointerEvents: 'none'
    };

    switch (el.shape) {
      case 'circle':
        return (
          <motion.div
            key={i}
            data-float={i}
            style={{
              ...baseStyle,
              width: el.size,
              height: el.size,
              borderRadius: '50%',
              backgroundColor: el.color
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        );
      
      case 'ring':
        return (
          <motion.div
            key={i}
            data-float={i}
            style={{
              ...baseStyle,
              width: el.size,
              height: el.size,
              borderRadius: '50%',
              border: `2px solid ${el.color}`,
              backgroundColor: 'transparent'
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.05, 1]
            }}
            transition={{
              rotate: { duration: 20 + i * 5, repeat: Infinity, ease: "linear" },
              scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
          />
        );
      
      case 'square':
        return (
          <motion.div
            key={i}
            data-float={i}
            style={{
              ...baseStyle,
              width: el.size,
              height: el.size,
              backgroundColor: el.color,
              borderRadius: 8
            }}
            animate={{
              rotate: [el.rotation || 0, (el.rotation || 0) + 90, el.rotation || 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        );
      
      case 'dot':
        return (
          <motion.div
            key={i}
            data-float={i}
            style={{
              ...baseStyle,
              width: el.size,
              height: el.size,
              borderRadius: '50%',
              backgroundColor: el.color
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        );
      
      case 'line':
        return (
          <motion.div
            key={i}
            data-float={i}
            style={{
              ...baseStyle,
              width: el.width,
              height: el.height,
              backgroundColor: el.color,
              borderRadius: el.height
            }}
            animate={{
              scaleX: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div 
      ref={containerRef} 
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
    >
      {elements.map(renderShape)}
    </div>
  );
};

export default FloatingElements;
