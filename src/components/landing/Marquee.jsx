import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Marquee = () => {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);

  const logos = [
    "Acme Corp", "GlobalTech", "Nebula", "Vertex", "Horizon", "Pinnacle", "Apex", "Zenith", "Summit", "Vanguard"
  ];

  // Double the logos for seamless infinite scroll
  const allLogos = [...logos, ...logos];

  useGSAP(() => {
    if (!scrollerRef.current) return;

    // Smooth fade-in entrance
    gsap.fromTo(scrollerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    );

    // Start scrolling animation
    gsap.to(scrollerRef.current, {
      x: "-50%",
      duration: 40,
      ease: "none",
      repeat: -1,
      delay: 0.3
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative py-12 bg-white overflow-hidden border-b border-gray-100 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <p className="text-sm font-medium text-[#47423D]/60 uppercase tracking-widest">
          Trusted by industry leaders
        </p>
      </div>
      
      <div className="relative w-full overflow-hidden">
        <div 
          ref={scrollerRef}
          className="flex w-max gap-16 items-center whitespace-nowrap"
        >
          {allLogos.map((logo, idx) => (
            <div 
              key={idx} 
              className="text-2xl font-heading font-bold text-[#47423D]/30 hover:text-[#47423D] transition-colors duration-300 cursor-default"
            >
              {logo}
            </div>
          ))}
        </div>
        
        {/* Gradient Masks */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
};

export default Marquee;
