import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollRevealText from './ScrollRevealText';

gsap.registerPlugin(ScrollTrigger);

const ParallaxSection = () => {
  const containerRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  const bgOrbRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1 // Smooth scrubbing
      }
    });

    // Parallax Movements
    // Card 1 (Left) - Moves up faster
    tl.to(card1Ref.current, { y: -150, rotation: -5 }, 0);
    
    // Card 2 (Center) - Moves up slower
    tl.to(card2Ref.current, { y: -50, rotation: 0 }, 0);
    
    // Card 3 (Right) - Moves up fast
    tl.to(card3Ref.current, { y: -200, rotation: 5 }, 0);

    // Background Orb - Moves down (opposition)
    tl.to(bgOrbRef.current, { y: 200, scale: 1.2 }, 0);

    // Mouse Parallax
    const xTo1 = gsap.quickTo(card1Ref.current, "x", { duration: 0.5, ease: "power3" });
    const yTo1 = gsap.quickTo(card1Ref.current, "y", { duration: 0.5, ease: "power3" });
    
    const xTo2 = gsap.quickTo(card2Ref.current, "x", { duration: 0.5, ease: "power3" });
    const yTo2 = gsap.quickTo(card2Ref.current, "y", { duration: 0.5, ease: "power3" });
    
    const xTo3 = gsap.quickTo(card3Ref.current, "x", { duration: 0.5, ease: "power3" });
    const yTo3 = gsap.quickTo(card3Ref.current, "y", { duration: 0.5, ease: "power3" });

    const handleMouseMove = (e) => {
      const { clientX, clientY, innerWidth, innerHeight } = e;
      const x = (clientX / innerWidth - 0.5) * 2; // -1 to 1
      const y = (clientY / innerHeight - 0.5) * 2; // -1 to 1

      // Card 1 (Left) - Deep layer
      xTo1(x * -30);
      yTo1(y * -30 - 150); // Keep the scroll offset (-150)

      // Card 2 (Center) - Mid layer
      xTo2(x * 20);
      yTo2(y * 20 - 50); // Keep scroll offset (-50)

      // Card 3 (Right) - Front layer
      xTo3(x * -50);
      yTo3(y * -50 - 200); // Keep scroll offset (-200)
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative min-h-[120vh] overflow-hidden flex flex-col items-center justify-center bg-[#111] py-20">
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div ref={bgOrbRef} className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#E3F221] rounded-full blur-[120px] opacity-20" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#5B5F97] rounded-full blur-[100px] opacity-20" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
      </div>

      {/* Content Header */}
      <div className="relative z-10 text-center mb-20 max-w-4xl px-6">
        <ScrollRevealText>
          <h2 className="text-5xl md:text-7xl font-bold text-white font-heading leading-tight mb-6">
            Orchestrate Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E3F221] to-white">
              Entire Workflow
            </span>
          </h2>
        </ScrollRevealText>
        <ScrollRevealText delay={0.2}>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Experience the power of a unified platform. Connect every data point, automate every insight, and scale without limits.
          </p>
        </ScrollRevealText>
      </div>

      {/* Floating Cards Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto h-[600px] perspective-1000">
        
        {/* Card 1: Analytics (Left) */}
        <div 
          ref={card1Ref}
          className="absolute top-20 left-4 md:left-20 w-72 h-80 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl transform-gpu"
        >
          <div className="h-full flex flex-col justify-between">
            <div className="w-12 h-12 rounded-full bg-[#E3F221]/20 flex items-center justify-center text-[#E3F221]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-1">+127%</div>
              <div className="text-sm text-gray-400">Revenue Growth</div>
            </div>
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="w-[70%] h-full bg-[#E3F221]" />
            </div>
          </div>
        </div>

        {/* Card 2: Main Dashboard (Center) */}
        <div 
          ref={card2Ref}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[340px] md:w-[500px] h-[300px] bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-6 shadow-[0_0_50px_rgba(227,242,33,0.1)] transform-gpu z-20"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="text-xs text-gray-400">Live Dashboard</div>
          </div>
          <div className="space-y-4">
            <div className="h-24 bg-white/5 rounded-lg border border-white/5" />
            <div className="grid grid-cols-2 gap-4">
              <div className="h-24 bg-white/5 rounded-lg border border-white/5" />
              <div className="h-24 bg-white/5 rounded-lg border border-white/5" />
            </div>
          </div>
        </div>

        {/* Card 3: Users (Right) */}
        <div 
          ref={card3Ref}
          className="absolute top-40 right-4 md:right-20 w-64 h-72 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl transform-gpu"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-full bg-[#5B5F97] flex items-center justify-center text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            </div>
            <div className="text-white font-medium">Active Users</div>
          </div>
          <div className="text-3xl font-bold text-white mb-2">14.2k</div>
          <div className="text-xs text-[#E3F221] flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
            <span>+12% this week</span>
          </div>
          <div className="mt-8 flex -space-x-2">
            {[1,2,3,4].map(i => (
              <div key={i} className="w-8 h-8 rounded-full bg-gray-600 border-2 border-[#111]" />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ParallaxSection;
