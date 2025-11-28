import React, { useRef } from 'react';
import gsap from 'gsap';

/**
 * 3D Tilt card effect on hover
 * Creates depth and premium feel
 */
const TiltCard = ({ 
  children, 
  className = "",
  tiltAmount = 10, // degrees
  glareEnabled = true,
  scaleOnHover = 1.02,
  transitionDuration = 0.4
}) => {
  const cardRef = useRef(null);
  const glareRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -tiltAmount;
    const rotateY = ((x - centerX) / centerX) * tiltAmount;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      scale: scaleOnHover,
      duration: transitionDuration,
      ease: "power2.out",
      transformPerspective: 1000,
      transformOrigin: "center center"
    });

    // Update glare position
    if (glareEnabled && glareRef.current) {
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      glareRef.current.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.15) 0%, transparent 50%)`;
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: transitionDuration * 1.5,
      ease: "power3.out"
    });
  };

  return (
    <div 
      ref={cardRef}
      className={`transform-gpu ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {glareEnabled && (
        <div 
          ref={glareRef}
          className="absolute inset-0 rounded-inherit pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ borderRadius: 'inherit' }}
        />
      )}
      {children}
    </div>
  );
};

export default TiltCard;
