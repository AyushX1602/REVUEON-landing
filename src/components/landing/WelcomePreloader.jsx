import React, { useState, useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const WelcomePreloader = () => {
  const [count, setCount] = useState(0);
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [isComplete, setIsComplete] = useState(false);

  // Check session storage to run only once
  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisited');
    if (hasVisited) {
      setIsComplete(true);
      return;
    }
  }, []);

  useGSAP(() => {
    if (isComplete) return;

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem('hasVisited', 'true');
        setIsComplete(true);
      }
    });

    // Counter Animation
    tl.to({}, {
      duration: 1.5,
      onUpdate: function() {
        setCount(Math.round(this.progress() * 100));
      },
      ease: "power2.inOut"
    });

    // Slide Up Animation
    tl.to(containerRef.current, {
      yPercent: -100,
      duration: 0.8,
      ease: "power4.inOut",
      delay: 0.2
    });

  }, { scope: containerRef });

  if (isComplete) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-[#111] flex items-center justify-center text-[#E3F221]"
    >
      <div className="relative">
        <h1 className="text-[15vw] font-bold font-heading leading-none tracking-tighter">
          {count}%
        </h1>
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#E3F221]/20">
          <div 
            className="h-full bg-[#E3F221]" 
            style={{ width: `${count}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default WelcomePreloader;
