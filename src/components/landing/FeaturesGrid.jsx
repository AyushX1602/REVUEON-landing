import React, { useRef } from 'react';
import { BarChart3, Globe, Zap, Shield, ArrowUpRight } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollRevealText from './ScrollRevealText';

gsap.registerPlugin(ScrollTrigger);

const FeaturesGrid = () => {
  const containerRef = useRef(null);
  const gridRef = useRef(null);

  useGSAP(() => {
    const cards = gridRef.current.children;
    // Smooth staggered fade-in animation
    gsap.fromTo(cards,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
          once: true
        }
      }
    );
  }, { scope: containerRef });

  // Chart Data
  const chartData = [
    { value: 30 }, { value: 45 }, { value: 35 }, { value: 60 }, { value: 50 }, { value: 75 }, { value: 65 }, { value: 85 }
  ];

  const features = [
    {
      id: 1,
      title: "Real-time Analytics",
      description: "Monitor your key metrics as they happen with millisecond precision.",
      icon: <BarChart3 className="w-6 h-6 text-[#111]" />,
      colSpan: "md:col-span-2",
      bgClass: "bg-white",
      textClass: "text-[#111]",
      descClass: "text-gray-500",
      borderClass: "hover:border-[#E3F221]",
      visual: (
        <div className="absolute bottom-0 right-0 w-1/2 h-32 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#E3F221" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#E3F221" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="value" stroke="#E3F221" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )
    },
    {
      id: 2,
      title: "Global Scale",
      description: "Deploy anywhere, instantly.",
      icon: <Globe className="w-6 h-6 text-[#5B5F97]" />,
      colSpan: "md:col-span-1",
      bgClass: "bg-[#E5E5E5]",
      textClass: "text-[#111]",
      descClass: "text-[#444]",
      borderClass: "hover:border-[#5B5F97]",
      visual: (
        <div className="absolute bottom-4 right-4 opacity-10 group-hover:opacity-30 transition-opacity transform group-hover:scale-110 duration-500">
          <Globe className="w-24 h-24 text-[#5B5F97]" />
        </div>
      )
    },
    {
      id: 3,
      title: "Lightning Fast",
      description: "Optimized for speed.",
      icon: <Zap className="w-6 h-6 text-[#E3F221]" />,
      colSpan: "md:col-span-1",
      bgClass: "bg-[#E5E5E5]",
      textClass: "text-[#111]",
      descClass: "text-[#444]",
      borderClass: "hover:border-[#E3F221]",
      visual: (
        <div className="absolute bottom-4 right-4 opacity-10 group-hover:opacity-30 transition-opacity transform group-hover:rotate-12 duration-500">
          <Zap className="w-24 h-24 text-[#E3F221]" />
        </div>
      )
    },
    {
      id: 4,
      title: "Enterprise Security",
      description: "Bank-grade encryption for your data.",
      icon: <Shield className="w-6 h-6 text-[#5B5F97]" />,
      colSpan: "md:col-span-2",
      bgClass: "bg-white",
      textClass: "text-black",
      descClass: "text-black", // Explicitly black as requested
      borderClass: "hover:border-[#5B5F97]",
      visual: (
        <div className="absolute bottom-8 right-8 bg-[#F8F7F7] px-4 py-2 rounded-lg border border-gray-100 flex items-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-medium text-gray-500">SOC2 Compliant</span>
        </div>
      )
    }
  ];

  return (
    <section ref={containerRef} className="relative py-20 px-6 pb-0 bg-gradient-to-b from-[#F8F7F7] via-white to-[#F8F7F7] overflow-hidden isolate z-10">
      {/* Subtle gradient orbs */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#E3F221] rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-pulse -z-10" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#5B5F97] rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-pulse -z-10" style={{ animationDelay: '2s' }} />
      
      {/* 1. Dot Pattern Background for Texture */}
      <div className="absolute inset-0 opacity-[0.4] -z-10" 
           style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>

      {/* 2. Extended Gradient Transition to Dark Mode */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-b from-transparent via-[#0A0A0A]/50 to-[#0A0A0A] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-12 text-center">
          <ScrollRevealText>
            <h2 className="text-4xl md:text-5xl font-bold text-[#111] font-heading mb-4">
              Everything you need to <br />
              <span className="text-[#5B5F97]">Scale Faster</span>
            </h2>
          </ScrollRevealText>
          
          {/* Live Review Stream - Animated Ticker */}
          <div className="my-12 max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-sm font-semibold text-gray-600">Live Review Stream</span>
                </div>
                <span className="text-xs text-gray-400 font-mono">Real-time Feed</span>
              </div>
              <div className="p-2 h-[200px] overflow-hidden relative">
                 {/* Mask for fade out at bottom */}
                 <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none"></div>
                 
                 <div className="animate-[scrollY_10s_linear_infinite]">
                    {[
                      { icon: "Star", color: "text-green-600", bg: "bg-green-50", text: "New 5-Star Review: \"Love the quality!\"", time: "Just now", sentiment: "Positive" },
                      { icon: "AlertTriangle", color: "text-red-500", bg: "bg-red-50", text: "Negative Sentiment: \"Shipping was slow\"", time: "2m ago", sentiment: "Negative" },
                      { icon: "TrendingUp", color: "text-[#E3F221]", bg: "bg-yellow-50", text: "Trend Alert: \"Sizing\" mentions up 15%", time: "5m ago", sentiment: "Neutral" },
                      { icon: "Star", color: "text-green-600", bg: "bg-green-50", text: "New 5-Star Review: \"Best purchase ever\"", time: "8m ago", sentiment: "Positive" },
                      { icon: "MessageCircle", color: "text-blue-500", bg: "bg-blue-50", text: "Question: \"Do you ship to Canada?\"", time: "12m ago", sentiment: "Neutral" },
                      { icon: "Star", color: "text-green-600", bg: "bg-green-50", text: "New 5-Star Review: \"Customer service is A+\"", time: "15m ago", sentiment: "Positive" },
                      // Duplicate for seamless loop
                      { icon: "Star", color: "text-green-600", bg: "bg-green-50", text: "New 5-Star Review: \"Love the quality!\"", time: "Just now", sentiment: "Positive" },
                      { icon: "AlertTriangle", color: "text-red-500", bg: "bg-red-50", text: "Negative Sentiment: \"Shipping was slow\"", time: "2m ago", sentiment: "Negative" },
                      { icon: "TrendingUp", color: "text-[#E3F221]", bg: "bg-yellow-50", text: "Trend Alert: \"Sizing\" mentions up 15%", time: "5m ago", sentiment: "Neutral" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-4 p-3 mb-2 hover:bg-gray-50 rounded-lg transition-colors cursor-default group">
                        <div className={`w-10 h-10 rounded-full ${item.bg} flex items-center justify-center ${item.color}`}>
                          <div className="w-5 h-5 bg-current opacity-20 rounded-full" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-700 group-hover:text-[#5B5F97] transition-colors">{item.text}</p>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full mb-1 ${item.sentiment === 'Positive' ? 'bg-green-100 text-green-700' : item.sentiment === 'Negative' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                {item.sentiment}
                            </span>
                            <span className="text-xs text-gray-400">{item.time}</span>
                        </div>
                      </div>
                    ))}
                 </div>
              </div>
            </div>
          </div>

          <ScrollRevealText delay={0.1}>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Powerful features designed for modern teams who move fast.
            </p>
          </ScrollRevealText>
        </div>

        {/* The Grid - Clean, No GSAP, Pure CSS */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.id}
              className={`group relative overflow-hidden rounded-3xl p-8 ${feature.colSpan} ${feature.bgClass} shadow-lg hover:shadow-xl transition-all duration-300 border border-transparent ${feature.borderClass}`}
            >
              {/* 3. Shimmer Effect for Enterprise Card */}
              {feature.id === 4 && (
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent z-20 pointer-events-none" />
              )}

              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center mb-6 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-white group-hover:shadow-md">
                    {feature.icon}
                  </div>
                  <h3 className={`text-2xl font-bold mb-2 ${feature.textClass}`}>{feature.title}</h3>
                  <p className={`${feature.descClass} font-medium max-w-sm`}>{feature.description}</p>
                </div>
                
                {/* Visual Accent */}
                {feature.visual}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
