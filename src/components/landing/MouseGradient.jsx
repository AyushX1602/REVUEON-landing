import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

/**
 * Smooth mouse-following gradient effect
 * Creates a premium "alive" feeling like Stripe
 */
const MouseGradient = ({ 
  children, 
  className = "",
  gradientColor = "rgba(227, 242, 33, 0.15)", // Lime default
  gradientSize = 600,
  smoothness = 0.15
}) => {
  const containerRef = useRef(null);
  const gradientRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const gradient = gradientRef.current;
    if (!container || !gradient) return;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const handleMouseEnter = () => {
      gsap.to(gradient, { opacity: 1, duration: 0.3 });
    };

    const handleMouseLeave = () => {
      gsap.to(gradient, { opacity: 0, duration: 0.5 });
    };

    // Smooth animation loop
    const animate = () => {
      // Lerp towards mouse position
      currentPos.current.x += (mousePos.current.x - currentPos.current.x) * smoothness;
      currentPos.current.y += (mousePos.current.y - currentPos.current.y) * smoothness;
      
      gradient.style.background = `radial-gradient(${gradientSize}px circle at ${currentPos.current.x}px ${currentPos.current.y}px, ${gradientColor}, transparent 50%)`;
      
      rafId.current = requestAnimationFrame(animate);
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [gradientColor, gradientSize, smoothness]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div 
        ref={gradientRef} 
        className="absolute inset-0 pointer-events-none opacity-0 transition-opacity z-0"
        style={{ willChange: 'background' }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default MouseGradient;
