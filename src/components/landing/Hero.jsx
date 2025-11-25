import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, CheckCircle2, Play, Star } from 'lucide-react';
import MagneticButton from '../MagneticButton';
import ScrollRevealText from './ScrollRevealText';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);
  const dashboardRef = useRef(null);
  const badge1Ref = useRef(null);
  const badge2Ref = useRef(null);

  useGSAP(() => {
    // Initial Reveal Animation
    const tl = gsap.timeline();

    tl.from(dashboardRef.current, {
      y: 100,
      opacity: 0,
      duration: 1.5,
      ease: "power4.out",
      delay: 0.5
    });

    // Floating Badges Animation
    gsap.to(badge1Ref.current, {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(badge2Ref.current, {
      y: 20,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 1
    });

    // 3D Tilt Effect on Mouse Move
    const handleMouseMove = (e) => {
      if (!dashboardRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPos = (clientX / innerWidth - 0.5) * 10; // -5 to 5 deg
      const yPos = (clientY / innerHeight - 0.5) * 10;

      gsap.to(dashboardRef.current, {
        rotationY: xPos,
        rotationX: -yPos,
        duration: 1,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#E3F221]/20 rounded-full blur-[120px] opacity-50" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-[#5B5F97]/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-16">
          {/* Headline with ScrollReveal */}
          <ScrollRevealText>
            <h1 className="text-5xl lg:text-7xl font-bold text-[#47423D] font-heading tracking-tight mb-6 leading-tight">
              Turn Shopify Reviews <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E3F221] to-[#b8c418]">
                into Revenue
              </span>
            </h1>
          </ScrollRevealText>

          <ScrollRevealText delay={0.2}>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Stop guessing what your customers think. AI-powered sentiment analysis for modern e-commerce brands.
            </p>
          </ScrollRevealText>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up delay-300">
            <MagneticButton>
              <button className="px-8 py-4 bg-[#E3F221] text-[#47423D] rounded-full font-bold text-lg hover:shadow-lg hover:shadow-[#E3F221]/20 transition-all duration-300 flex items-center gap-2">
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </button>
            </MagneticButton>
            
            <button className="px-8 py-4 bg-white text-[#47423D] rounded-full font-bold text-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 flex items-center gap-2 group">
              <Play className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" />
              Watch Demo
            </button>
          </div>

          {/* Social Proof */}
          <div className="flex items-center justify-center gap-8 text-gray-400 animate-fade-in-up delay-400">
            <div className="flex -space-x-4">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" className="w-10 h-10 rounded-full border-2 border-white" />
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" className="w-10 h-10 rounded-full border-2 border-white" />
              <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="User" className="w-10 h-10 rounded-full border-2 border-white" />
              <img src="https://randomuser.me/api/portraits/men/86.jpg" alt="User" className="w-10 h-10 rounded-full border-2 border-white" />
            </div>
            <div className="flex items-center gap-2">
              <div className="flex text-[#E3F221]">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <span className="text-sm font-medium">Loved by 10,000+ teams</span>
            </div>
          </div>
        </div>

        {/* Dashboard Preview with 3D Tilt */}
        <div className="relative perspective-1000">
          <div 
            ref={dashboardRef}
            className="relative rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl lg:p-4 transform-gpu bg-white shadow-2xl"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="rounded-md bg-white overflow-hidden">
              <img 
                src="/src/assets/dashboard_hero.png" 
                alt="Dashboard Preview" 
                className="w-full h-auto object-cover rounded-md"
              />
            </div>

            {/* Floating UI Elements (Badges) */}
            <div 
              ref={badge1Ref}
              className="absolute -top-10 -right-10 bg-white p-4 rounded-xl shadow-xl border border-gray-100 z-20 hidden md:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E3F221]/20 flex items-center justify-center text-[#E3F221]">
                  <ArrowRight className="w-5 h-5 -rotate-45" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Growth</div>
                  <div className="text-lg font-bold text-[#47423D]">+127%</div>
                </div>
              </div>
            </div>

            <div 
              ref={badge2Ref}
              className="absolute -bottom-8 -left-8 bg-white p-4 rounded-xl shadow-xl border border-gray-100 z-20 hidden md:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#5B5F97]/20 flex items-center justify-center text-[#5B5F97]">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Status</div>
                  <div className="text-lg font-bold text-[#47423D]">All Systems Go</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
