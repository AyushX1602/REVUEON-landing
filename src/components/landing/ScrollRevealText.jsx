import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollRevealText = ({ children, className = "", delay = 0 }) => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const words = containerRef.current.querySelectorAll('.word');
    
    if (words.length > 0) {
      gsap.fromTo(words, 
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
          stagger: 0.1,
          ease: "power3.out",
          delay: delay,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    } else {
      // Fallback for non-text children
      gsap.fromTo(containerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          delay: delay,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, { scope: containerRef });

  // Helper to split text into words if children is a string
  const renderContent = () => {
    if (typeof children === 'string') {
      return children.split(' ').map((word, i) => (
        <span key={i} className="word inline-block mr-[0.25em] transform-gpu">
          {word}
        </span>
      ));
    }
    // If children is complex (like the H1 with span), we just wrap it
    // The user of this component needs to manually split if they want stagger on complex trees
    // For now, we'll just animate the container for complex children to avoid breaking layout
    return children;
  };

  return (
    <div ref={containerRef} className={`${className}`}>
      {renderContent()}
    </div>
  );
};

export default ScrollRevealText;
