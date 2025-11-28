import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Marquee = () => {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);

  const logos = [
    "Acme Corp", "GlobalTech", "Nebula", "Vertex", "Horizon", "Pinnacle", "Apex", "Zenith", "Summit", "Vanguard"
  ];

  useGSAP(() => {
    if (!scrollerRef.current) return;
    
    const scrollerContent = Array.from(scrollerRef.current.children);
    
    // Clone items for infinite scroll
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", true);
      scrollerRef.current.appendChild(duplicatedItem);
    });

    // Start animation immediately with no delay
    gsap.set(scrollerRef.current, { x: 0 });
    gsap.to(scrollerRef.current, {
      x: "-50%",
      duration: 30,
      ease: "none",
      repeat: -1,
      immediateRender: true,
    });
  }, { scope: containerRef, dependencies: [] });

  return (
    <section ref={containerRef} className="py-12 bg-white overflow-hidden border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <p className="text-sm font-medium text-[#47423D]/60 uppercase tracking-widest">
          Trusted by industry leaders
        </p>
      </div>
      
      <div className="relative w-full overflow-hidden mask-linear-fade">
        <div 
          ref={scrollerRef}
          className="flex w-max gap-16 items-center whitespace-nowrap"
        >
          {logos.map((logo, idx) => (
            <div 
              key={idx} 
              className="text-2xl font-heading font-bold text-[#47423D]/30 hover:text-[#47423D] transition-colors duration-300 cursor-default"
            >
              {logo}
            </div>
          ))}
        </div>
        
        {/* Gradient Masks */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent pointer-events-none" />
      </div>
    </section>
  );
};

export default Marquee;
