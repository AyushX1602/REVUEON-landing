import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Skew elements based on scroll velocity
 * Creates dynamic movement like Stripe
 */
const ScrollVelocity = ({ 
  children, 
  className = "",
  skewAmount = 5, // max degrees
  direction = "horizontal" // "horizontal" | "vertical"
}) => {
  const containerRef = useRef(null);
  const skewRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const element = skewRef.current;
    if (!container || !element) return;

    let currentSkew = 0;
    let targetSkew = 0;
    let lastScrollY = window.scrollY;
    let rafId;

    const getScrollVelocity = () => {
      const velocity = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;
      return velocity;
    };

    const animate = () => {
      const velocity = getScrollVelocity();
      
      // Calculate target skew based on velocity
      targetSkew = gsap.utils.clamp(-skewAmount, skewAmount, velocity * 0.5);
      
      // Smooth lerp
      currentSkew += (targetSkew - currentSkew) * 0.1;
      
      if (direction === "horizontal") {
        element.style.transform = `skewY(${currentSkew}deg)`;
      } else {
        element.style.transform = `skewX(${currentSkew}deg)`;
      }
      
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [skewAmount, direction]);

  return (
    <div ref={containerRef} className={className}>
      <div ref={skewRef} className="transform-gpu will-change-transform">
        {children}
      </div>
    </div>
  );
};

export default ScrollVelocity;
