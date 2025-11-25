import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BarChart3, Globe, Zap, Shield, ArrowUpRight, Bell, Heart, MessageCircle } from 'lucide-react';
import ScrollRevealText from './ScrollRevealText';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

gsap.registerPlugin(ScrollTrigger);

const FeaturesGrid = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  // Mock data for mini chart
  const chartData = [
    { value: 30 }, { value: 45 }, { value: 35 }, { value: 60 }, { value: 50 }, { value: 75 }, { value: 65 }, { value: 85 }
  ];

  useGSAP(() => {
    // Staggered Fade In
    gsap.from(cardsRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      }
    });

    // Spotlight Effect
    const handleMouseMove = (e) => {
      cardsRef.current.forEach((card) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-20 px-6 bg-[#F8F7F7]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <ScrollRevealText>
            <h2 className="text-4xl md:text-5xl font-bold text-[#47423D] font-heading mb-4">
              Everything you need to <br />
              <span className="text-[#5B5F97]">Scale Faster</span>
            </h2>
          </ScrollRevealText>
          
          {/* Live Review Stream - Shopify Centric */}
          <div className="my-12 max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-sm font-semibold text-gray-600">Live Review Stream</span>
                </div>
                <span className="text-xs text-gray-400 font-mono">Analyzing Store...</span>
              </div>
              <div className="p-2">
                {[
                  { icon: "Star", color: "text-green-600", bg: "bg-green-50", text: "New 5-Star Review: \"Love the quality!\"", time: "Just now", sentiment: "Positive" },
                  { icon: "AlertTriangle", color: "text-red-500", bg: "bg-red-50", text: "Negative Sentiment: \"Shipping was slow\"", time: "2m ago", sentiment: "Negative" },
                  { icon: "TrendingUp", color: "text-[#E3F221]", bg: "bg-yellow-50", text: "Trend Alert: \"Sizing\" mentions up 15%", time: "5m ago", sentiment: "Neutral" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-default group">
                    <div className={`w-10 h-10 rounded-full ${item.bg} flex items-center justify-center ${item.color}`}>
                      {item.icon === "Star" && <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>}
                      {item.icon === "AlertTriangle" && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>}
                      {item.icon === "TrendingUp" && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
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

          <ScrollRevealText delay={0.1}>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Powerful features designed for modern teams who move fast.
            </p>
          </ScrollRevealText>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Real-time Analytics (Large) */}
          <div
            ref={el => cardsRef.current[0] = el}
            className="group relative overflow-hidden rounded-3xl p-8 md:col-span-2 bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-transparent hover:border-[#E3F221]/50"
          >
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="mb-8">
                <div className="w-12 h-12 rounded-2xl bg-[#E3F221]/20 flex items-center justify-center mb-6 backdrop-blur-sm">
                  <BarChart3 className="w-6 h-6 text-[#47423D]" />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-[#47423D]">Real-time Analytics</h3>
                <p className="text-gray-500 max-w-sm">Monitor your key metrics as they happen with millisecond precision.</p>
              </div>
              
              {/* Mini Chart */}
              <div className="absolute bottom-0 right-0 w-1/2 h-1/2 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
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
            </div>
          </div>

          {/* Card 2: Global Scale */}
          <div
            ref={el => cardsRef.current[1] = el}
            className="group relative overflow-hidden rounded-3xl p-8 md:col-span-1 bg-[#E5E5E5] shadow-lg hover:shadow-xl transition-all duration-300 border border-transparent hover:border-[#E3F221]/50"
          >
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-sm">
                  <Globe className="w-6 h-6 text-[#5B5F97]" />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-[#47423D]">Global Scale</h3>
                <p className="text-[#47423D] font-medium">Deploy anywhere, instantly.</p>
              </div>
              {/* Floating Icon */}
              <div className="absolute bottom-4 right-4 opacity-10 group-hover:opacity-30 transition-opacity transform group-hover:scale-110 duration-500">
                <Globe className="w-24 h-24 text-[#5B5F97]" />
              </div>
            </div>
          </div>

          {/* Card 3: Lightning Fast */}
          <div
            ref={el => cardsRef.current[2] = el}
            className="group relative overflow-hidden rounded-3xl p-8 md:col-span-1 bg-[#E5E5E5] shadow-lg hover:shadow-xl transition-all duration-300 border border-transparent hover:border-[#E3F221]/50"
          >
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-sm">
                  <Zap className="w-6 h-6 text-[#E3F221]" />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-[#47423D]">Lightning Fast</h3>
                <p className="text-[#47423D] font-medium">Optimized for speed.</p>
              </div>
              <div className="absolute bottom-4 right-4 opacity-10 group-hover:opacity-30 transition-opacity transform group-hover:rotate-12 duration-500">
                <Zap className="w-24 h-24 text-[#E3F221]" />
              </div>
            </div>
          </div>

          {/* Card 4: Enterprise Security (Large) */}
          <div
            ref={el => cardsRef.current[3] = el}
            className="group relative overflow-hidden rounded-3xl p-8 md:col-span-2 bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-transparent hover:border-[#E3F221]/50"
          >
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="mb-8">
                <div className="w-12 h-12 rounded-2xl bg-[#5B5F97]/10 flex items-center justify-center mb-6 backdrop-blur-sm">
                  <Shield className="w-6 h-6 text-[#5B5F97]" />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-[#47423D]">Enterprise Security</h3>
                <p className="text-gray-500 max-w-sm">Bank-grade encryption for your data.</p>
              </div>
              
              {/* Security Badge Visual */}
              <div className="absolute bottom-8 right-8 bg-[#F8F7F7] px-4 py-2 rounded-lg border border-gray-100 flex items-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-medium text-gray-500">SOC2 Compliant</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
