import React, { useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const AnimatedBackground = ({ variant = 'dots' }) => {
  const containerRef = useRef(null);
  const particlesRef = useRef([]);

  useGSAP(() => {
    if (variant === 'particles') {
      // Animate particles
      particlesRef.current.forEach((particle, i) => {
        gsap.to(particle, {
          y: `random(-30, 30)`,
          x: `random(-30, 30)`,
          duration: `random(3, 6)`,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.1,
        });
      });
    }
  }, { scope: containerRef });

  if (variant === 'gradient-mesh') {
    return (
      <div ref={containerRef} className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FAFAFA] via-white to-[#F8F7F7]" />
        
        {/* Animated Mesh Gradients */}
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-to-br from-[#E3F221]/20 to-transparent rounded-full blur-3xl animate-[pulse_8s_ease-in-out_infinite] mix-blend-multiply" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-[#5B5F97]/15 to-transparent rounded-full blur-3xl animate-[pulse_10s_ease-in-out_infinite] mix-blend-multiply" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-[#E3F221]/10 via-transparent to-[#5B5F97]/10 rounded-full blur-3xl animate-[pulse_12s_ease-in-out_infinite] mix-blend-multiply" style={{ animationDelay: '4s' }} />
      </div>
    );
  }

  if (variant === 'particles') {
    return (
      <div ref={containerRef} className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAFAFA] to-white" />
        
        {/* Floating Particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            ref={(el) => (particlesRef.current[i] = el)}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: i % 2 === 0 ? '#E3F221' : '#5B5F97',
              opacity: Math.random() * 0.3 + 0.2,
            }}
          />
        ))}
      </div>
    );
  }

  // Default: Grid + Gradient
  return (
    <div className="absolute inset-0 -z-10">
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:64px_64px]" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white/80" />
      
      {/* Accent Blobs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-[#E3F221]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#5B5F97]/5 rounded-full blur-3xl" />
    </div>
  );
};

export default AnimatedBackground;
