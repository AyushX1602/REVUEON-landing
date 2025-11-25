import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const KineticIntro = ({ onComplete }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const subtextRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    // Initial State
    gsap.set(textRef.current, { y: 100, opacity: 0 });
    gsap.set(subtextRef.current, { y: 50, opacity: 0 });

    // Sequence
    tl.to(textRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out"
    })
    .to(subtextRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.4")
    .to([textRef.current, subtextRef.current], {
      scale: 1.5,
      opacity: 0,
      filter: "blur(10px)",
      duration: 0.8,
      ease: "power2.in",
      delay: 0.5
    })
    .to(containerRef.current, {
      yPercent: -100,
      duration: 0.8,
      ease: "power4.inOut"
    }, "-=0.2");

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100] bg-[#E3F221] flex flex-col items-center justify-center overflow-hidden">
      <div className="text-center">
        <h1 ref={textRef} className="text-8xl md:text-[12rem] font-bold text-[#47423D] font-heading leading-none tracking-tighter">
          REVUEON
        </h1>
        <p ref={subtextRef} className="text-xl md:text-3xl font-medium text-[#47423D] mt-4 tracking-widest uppercase">
          The Future of Analytics
        </p>
      </div>
    </div>
  );
};

export default KineticIntro;
