import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollRevealText = ({ children, className = "", delay = 0 }) => {
  const textRef = useRef(null);

  useGSAP(() => {
    const el = textRef.current;
    
    gsap.fromTo(el, 
      { 
        y: 50, 
        opacity: 0,
        rotateX: 20
      },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1,
        ease: "power3.out",
        delay: delay,
        scrollTrigger: {
          trigger: el,
          start: "top 85%", // Start animation when top of text hits 85% of viewport height
          toggleActions: "play none none reverse"
        }
      }
    );
  }, { scope: textRef });

  return (
    <div ref={textRef} className={`transform-gpu ${className}`}>
      {children}
    </div>
  );
};

export default ScrollRevealText;
