import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const CinematicIntro = ({ onComplete }) => {
  const containerRef = useRef(null);
  const curtainRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    // Initial state
    gsap.set(curtainRef.current, {
      scaleY: 1,
      transformOrigin: "top center"
    });
    
    // Start with image hidden/rolled up
    gsap.set(imageWrapperRef.current, {
      y: -200,
      scale: 0.8,
      opacity: 0,
      rotationX: -60,
      transformOrigin: "top center"
    });

    gsap.set(textRef.current, {
      opacity: 0,
      y: 20
    });

    // Animation Sequence
    tl.to(textRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    })
    .to(textRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: "power3.in",
      delay: 0.2
    })
    // The "Cylindrical Moment" - Curtain unrolls
    .to(curtainRef.current, {
      scaleY: 0,
      duration: 1.4,
      ease: "power4.inOut",
    })
    // The "Throw" - Image falls/unrolls into exact place
    .to(imageWrapperRef.current, {
      y: 0,
      scale: 1,
      opacity: 1,
      rotationX: 0,
      duration: 1.2,
      ease: "elastic.out(1, 0.7)" // Bouncy "throw" landing
    }, "-=1.2") 
    .to(containerRef.current, {
      opacity: 0,
      pointerEvents: "none",
      duration: 0.3
    }, "-=0.1");

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100] bg-transparent pointer-events-auto perspective-1000 overflow-hidden">
      {/* The Curtain/Cylinder - White Theme with Cylindrical Gradient */}
      <div 
        ref={curtainRef} 
        className="absolute inset-0 w-full h-full origin-top z-20"
        style={{
          background: "linear-gradient(to right, #e0e0e0, #ffffff 20%, #ffffff 80%, #e0e0e0)",
          boxShadow: "0 10px 50px rgba(0,0,0,0.2)"
        }}
      >
        {/* Noise Texture */}
        <div className="absolute inset-0 opacity-30" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.1'/%3E%3C/svg%3E")` }} 
        />
        {/* Bottom "Roll" Edge */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-300 to-transparent opacity-50" />
      </div>

      {/* Content Container - Mimicking Hero.jsx Layout EXACTLY */}
      <div className="relative z-10 w-full h-full flex flex-col items-center pt-16 px-4 sm:px-6 lg:px-8">
        
        {/* Intro Text (Absolute to not affect layout flow) */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
          <h1 ref={textRef} className="text-4xl md:text-6xl font-bold text-[#47423D] font-heading tracking-tight text-center">
            REVYNO
          </h1>
        </div>

        {/* Spacer to match Hero's text height approx */}
        <div className="h-[300px] w-full shrink-0" />

        {/* The "Thrown" Hero Image - Positioned to match Hero.jsx */}
        <div className="relative w-full max-w-5xl mx-auto perspective-1000">
           <div 
             ref={imageWrapperRef} 
             className="relative rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl lg:p-4 transform-gpu bg-white shadow-2xl"
           >
              <div className="rounded-md bg-white overflow-hidden">
                <img 
                  src="/src/assets/dashboard_hero.png" 
                  alt="Dashboard Preview" 
                  className="w-full h-auto object-cover rounded-md"
                />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CinematicIntro;
