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
    <div ref={containerRef} className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-to-b from-[#FAFAFA] via-white to-[#F8F7F7]">
      {/* Enhanced Background Elements with Grid */}
      <div className="absolute inset-0 -z-10">
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px]" />
        
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-r from-[#E3F221]/20 via-[#E3F221]/10 to-transparent rounded-full blur-[120px] opacity-50 animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-gradient-to-l from-[#5B5F97]/15 via-[#5B5F97]/5 to-transparent rounded-full blur-[100px] animate-[pulse_10s_ease-in-out_infinite_reverse]" />
        
        {/* Floating Particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#E3F221] rounded-full animate-[float_6s_ease-in-out_infinite]" />
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-[#5B5F97] rounded-full animate-[float_8s_ease-in-out_infinite_1s]" style={{animationDelay: '2s'}} />
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-[#E3F221]/50 rounded-full animate-[float_7s_ease-in-out_infinite]" style={{animationDelay: '4s'}} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-16">
          {/* Badge */}
          <ScrollRevealText delay={0}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm mb-8 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E3F221] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E3F221]"></span>
              </span>
              <span className="text-sm font-medium text-gray-700">AI-Powered Analytics Platform</span>
            </div>
          </ScrollRevealText>

          {/* Headline with ScrollReveal */}
          <ScrollRevealText>
            <h1 className="text-5xl lg:text-7xl font-bold text-[#47423D] font-heading tracking-tight mb-6 leading-tight">
              Turn Shopify Reviews <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E3F221] via-[#5B5F97] to-[#E3F221] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite]">
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
              <button className="px-8 py-4 bg-[#E3F221] text-[#47423D] rounded-full font-bold text-lg hover:shadow-[0_0_30px_-5px_#E3F221] transition-all duration-300 flex items-center gap-2 relative overflow-hidden group">
                <span className="relative z-10 flex items-center gap-2">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
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
