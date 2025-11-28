import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

/**
 * Custom cursor follower with trail effect
 * Adds a premium interactive feel
 */
const CursorFollower = () => {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const trailRefs = useRef([]);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState('');

  useEffect(() => {
    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Check if touch device
    if ('ontouchstart' in window) return;

    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    const trails = trailRefs.current;
    
    let mouseX = 0;
    let mouseY = 0;
    
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Instant dot movement
      gsap.to(cursorDot, {
        x: mouseX,
        y: mouseY,
        duration: 0.1,
        ease: "power2.out"
      });
      
      // Smooth cursor ring movement
      gsap.to(cursor, {
        x: mouseX,
        y: mouseY,
        duration: 0.5,
        ease: "power3.out"
      });

      // Trail effect
      trails.forEach((trail, i) => {
        gsap.to(trail, {
          x: mouseX,
          y: mouseY,
          duration: 0.3 + (i * 0.1),
          ease: "power2.out"
        });
      });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Detect hoverable elements
    const handleMouseEnter = (e) => {
      const target = e.target;
      if (target.matches('a, button, [data-cursor="pointer"]')) {
        setIsHovering(true);
        const text = target.getAttribute('data-cursor-text');
        if (text) setCursorText(text);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setCursorText('');
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
    };
  }, []);

  // Don't render on touch devices or reduced motion
  if (typeof window !== 'undefined') {
    if ('ontouchstart' in window) return null;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null;
  }

  return (
    <>
      {/* Trail circles */}
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          ref={(el) => (trailRefs.current[i] = el)}
          className="fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
          style={{
            width: 8 + i * 4,
            height: 8 + i * 4,
            borderRadius: '50%',
            backgroundColor: `rgba(227, 242, 33, ${0.3 - i * 0.1})`,
            opacity: 0.5
          }}
        />
      ))}

      {/* Main cursor ring */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        animate={{
          width: isHovering ? 80 : isClicking ? 30 : 40,
          height: isHovering ? 80 : isClicking ? 30 : 40,
          borderColor: isHovering ? '#E3F221' : 'rgba(255,255,255,0.5)',
          backgroundColor: isHovering ? 'rgba(227, 242, 33, 0.1)' : 'transparent',
        }}
        transition={{ duration: 0.3, ease: "backOut" }}
        style={{
          border: '2px solid',
          borderRadius: '50%',
        }}
      >
        {cursorText && (
          <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Center dot */}
      <motion.div
        ref={cursorDotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        animate={{
          scale: isClicking ? 0.5 : 1,
          backgroundColor: isHovering ? '#E3F221' : '#ffffff',
        }}
        transition={{ duration: 0.15 }}
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
        }}
      />

      {/* Hide default cursor globally */}
      <style>{`
        @media (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default CursorFollower;
