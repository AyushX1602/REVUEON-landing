import React, { useRef } from 'react';
import { Brain, BarChart, TrendingUp, Target, ArrowUpRight, Shield, Globe, Zap } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextReveal from './TextReveal';
import TiltCard from './TiltCard';
import StaggerReveal from './StaggerReveal';

gsap.registerPlugin(ScrollTrigger);

const ProductSuite = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const barRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    // Ensure refs are mounted before animation
    if (!barRef.current || !textRef.current) return;

    // 1. Animate Sentiment Bar & Text with Scrub
    // Use a proxy object to ensure perfect sync between width and number
    const proxy = { value: 0 };

    gsap.to(proxy, {
      value: 85,
      ease: "none",
      scrollTrigger: {
        trigger: barRef.current,
        start: "top 90%",
        end: "bottom 60%",
        scrub: 1,
        invalidateOnRefresh: true,
      },
      onUpdate: () => {
        const currentVal = Math.round(proxy.value);
        // Update Bar Width
        if (barRef.current) {
          barRef.current.style.width = `${proxy.value}%`;
        }
        // Update Text
        if (textRef.current) {
          textRef.current.textContent = `Positive (${currentVal}%)`;
        }
      }
    });

    // 2. Stagger Cards
    gsap.fromTo(cardsRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardsRef.current[0],
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );

  }, { scope: containerRef });

  const products = [
    {
      id: 1,
      category: "Revueon Intelligence",
      title: "AI that works for you",
      description: "Automate 80% of your analysis with our proprietary AI models.",
      icon: <Brain className="w-8 h-8" />,
      color: "bg-[#E3F221]",
      colSpan: "md:col-span-2 md:row-span-2",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 2,
      category: "Review Analytics",
      title: "Deep Insights",
      description: "Understand the 'why' behind every rating.",
      icon: <BarChart className="w-6 h-6" />,
      color: "bg-[#5B5F97]",
      colSpan: "md:col-span-1 md:row-span-1",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 3,
      category: "Sentiment Management",
      title: "Sentiment Tracking",
      description: "Real-time emotion analysis.",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "bg-[#E3F221]",
      colSpan: "md:col-span-1 md:row-span-1",
      image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 4,
      category: "Competitive Analysis",
      title: "Stay Ahead",
      description: "Benchmark against your top 5 competitors.",
      icon: <Target className="w-6 h-6" />,
      color: "bg-[#5B5F97]",
      colSpan: "md:col-span-2 md:row-span-1",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <section ref={containerRef} className="relative z-30 py-16 md:py-32 bg-gradient-to-b from-[#0A0A0A] via-[#111] to-[#0A0A0A] overflow-hidden">
        {/* Enhanced Ambient Background */}
        <div className="absolute inset-0">
          {/* Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] md:bg-[size:80px_80px]" />
          
          {/* Animated Gradient Orbs */}
          <div className="absolute top-0 left-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-gradient-to-r from-[#5B5F97]/20 via-[#5B5F97]/10 to-transparent rounded-full blur-[80px] md:blur-[120px] animate-[pulse_8s_ease-in-out_infinite]"></div>
          <div className="absolute bottom-0 right-1/4 w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-gradient-to-l from-[#E3F221]/15 via-[#E3F221]/5 to-transparent rounded-full blur-[60px] md:blur-[100px] animate-[pulse_10s_ease-in-out_infinite]" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-gradient-to-br from-[#E3F221]/10 to-[#5B5F97]/10 rounded-full blur-[60px] md:blur-[80px] animate-[pulse_12s_ease-in-out_infinite]" style={{animationDelay: '4s'}}></div>
          
          {/* Light Rays */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-[#E3F221]/20 via-transparent to-transparent" />
          <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-[#5B5F97]/10 via-transparent to-transparent" />
          <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-[#5B5F97]/10 via-transparent to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="mb-20 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
                  <div className="w-2 h-2 rounded-full bg-[#E3F221] animate-pulse" />
                  <span className="text-sm font-medium text-[#E3F221] tracking-wider uppercase">Product Suite</span>
                </div>
                <TextReveal animation="fadeUp" duration={0.6}>
                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-heading font-bold text-white mb-4 md:mb-6 leading-tight">
                        A complete ecosystem <br className="hidden sm:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600">for exponential growth.</span>
                    </h2>
                </TextReveal>
                <TextReveal animation="blur" delay={0.4}>
                    <p className="text-xl font-sans text-gray-400 max-w-2xl mx-auto">
                      Every tool you need to understand, engage, and delight your customers.
                    </p>
                </TextReveal>

                {/* Interactive Sentiment Demo - Dark Mode */}
                <div className="my-8 md:my-16 relative w-full max-w-4xl mx-auto">
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#E3F221] to-[#5B5F97] rounded-2xl blur opacity-20"></div>
                    <div className="relative bg-[#1A1A1A] rounded-2xl border border-white/10 p-4 sm:p-6 md:p-8 shadow-2xl overflow-hidden">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-8 border-b border-white/5 pb-4 gap-3 sm:gap-0">
                            <div className="flex items-center gap-3">
                                <div className="flex gap-2">
                                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
                                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
                                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
                                </div>
                                <span className="text-xs sm:text-sm text-gray-400 font-mono truncate">sentiment_analysis_v2.py</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                <span className="text-[10px] sm:text-xs text-[#E3F221] font-mono">AI ACTIVE</span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
                            {/* Input Side */}
                            <div className="group">
                                <div className="text-xs text-gray-500 mb-3 font-mono uppercase tracking-wider flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 rounded-full bg-[#E3F221] animate-pulse" />
                                  Input Review
                                </div>
                                <div className="relative p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group-hover:border-[#E3F221]/30">
                                  <div className="text-base text-white/90 font-serif italic leading-relaxed">
                                      "The <span className="bg-gradient-to-r from-green-500/30 to-green-400/20 text-green-300 px-2 py-0.5 rounded-md border border-green-500/20">shipping was incredibly fast</span>, but the <span className="bg-gradient-to-r from-red-500/30 to-red-400/20 text-red-300 px-2 py-0.5 rounded-md border border-red-500/20">packaging was damaged</span>. However, the <span className="bg-gradient-to-r from-green-500/30 to-green-400/20 text-green-300 px-2 py-0.5 rounded-md border border-green-500/20">product quality is amazing</span>!"
                                  </div>
                                  {/* Glow effect on hover */}
                                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#E3F221]/0 to-[#E3F221]/0 group-hover:from-[#E3F221]/5 group-hover:to-transparent transition-all duration-500" />
                                </div>
                            </div>

                            {/* Output Side */}
                            <div className="space-y-4">
                                <div className="text-xs text-gray-500 mb-3 font-mono uppercase tracking-wider flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 rounded-full bg-[#5B5F97] animate-pulse" style={{animationDelay: '0.5s'}} />
                                  Analysis Result
                                </div>
                                
                                {/* Sentiment Score */}
                                <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-5 border border-white/10 backdrop-blur-sm hover:border-[#E3F221]/30 transition-all duration-300 group">
                                    <div className="flex justify-between mb-3">
                                        <span className="text-sm text-gray-300 font-medium">Overall Sentiment</span>
                                        <span ref={textRef} className="text-sm text-[#E3F221] font-bold tracking-wide">Positive (0%)</span>
                                    </div>
                                    <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden relative">
                                        <div ref={barRef} className="h-full bg-gradient-to-r from-[#E3F221] to-[#E3F221]/70 w-[0%] rounded-full shadow-lg shadow-[#E3F221]/50"></div>
                                        {/* Shine effect */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_2s_infinite]" />
                                    </div>
                                </div>

                                {/* Key Phrases */}
                                <div className="space-y-3 bg-gradient-to-br from-white/5 to-transparent rounded-xl p-5 border border-white/10 backdrop-blur-sm">
                                    <div className="flex items-center justify-between text-sm p-2 rounded-lg hover:bg-white/5 transition-colors">
                                        <span className="text-gray-300 font-medium">Shipping</span>
                                        <span className="text-green-400 font-semibold flex items-center gap-1.5">
                                          <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                                          Positive (+0.9)
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm p-2 rounded-lg hover:bg-white/5 transition-colors">
                                        <span className="text-gray-300 font-medium">Packaging</span>
                                        <span className="text-red-400 font-semibold flex items-center gap-1.5">
                                          <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                                          Negative (-0.6)
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm p-2 rounded-lg hover:bg-white/5 transition-colors">
                                        <span className="text-gray-300 font-medium">Quality</span>
                                        <span className="text-green-400 font-semibold flex items-center gap-1.5">
                                          <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                                          Positive (+0.95)
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[300px]">
                {products.map((product, index) => (
                    <div
                        key={product.id}
                        ref={el => cardsRef.current[index] = el}
                        className={`group relative z-50 !opacity-100 !visible overflow-hidden rounded-3xl bg-[#1A1A1A] border border-white/10 p-8 transition-all duration-500 hover:border-[#E3F221]/30 hover:shadow-2xl hover:shadow-[#E3F221]/10 ${product.colSpan}`}
                        onMouseMove={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const x = e.clientX - rect.left;
                            const y = e.clientY - rect.top;
                            e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                            e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
                        }}
                    >
                        {/* 3D Glare Effect */}
                        <div 
                            className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30"
                            style={{
                                background: `radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.06), transparent 40%)`
                            }}
                        />

                        {/* Background Image Reveal - High Visibility */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-60 transition-opacity duration-700">
                            <img src={product.image} alt="" className="w-full h-full object-cover" />
                        </div>

                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                {/* Icon Box */}
                                <div className={`w-14 h-14 rounded-2xl ${product.color === 'bg-[#E3F221]' ? 'bg-[#E3F221] text-[#47423D]' : 'bg-[#5B5F97] text-white'} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                                    {product.icon}
                                </div>
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                                    <ArrowUpRight className="w-5 h-5 text-white" />
                                </div>
                            </div>
                            
                            <div>
                                <div className="text-sm font-bold text-gray-400 mb-2 tracking-wide uppercase group-hover:text-[#E3F221] transition-colors">
                                    {product.category}
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:translate-x-2 transition-transform duration-300">
                                    {product.title}
                                </h3>
                                <p className="text-gray-400 font-medium max-w-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 transform translate-y-4 group-hover:translate-y-0">
                                    {product.description}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
};

export default ProductSuite;
