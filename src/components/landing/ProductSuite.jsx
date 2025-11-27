import React, { useRef } from 'react';
import { Brain, BarChart, TrendingUp, Target, ArrowUpRight, Shield, Globe, Zap } from 'lucide-react';
import ScrollRevealText from './ScrollRevealText';

const ProductSuite = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

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
    <section ref={containerRef} className="relative z-30 py-32 bg-[#111] overflow-hidden">
        {/* Ambient Background Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#5B5F97]/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#E3F221]/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="mb-20">
                <div className="text-sm font-bold text-[#E3F221] mb-4 tracking-widest uppercase">
                    REVUEON PRODUCT SUITE
                </div>
                <ScrollRevealText>
                    <h2 className="text-4xl md:text-6xl font-heading font-medium text-white mb-8 leading-tight">
                        A complete ecosystem <br />
                        <span className="text-gray-500">for growth.</span>
                    </h2>
                </ScrollRevealText>

                {/* Interactive Sentiment Demo - Dark Mode */}
                <div className="my-16 relative w-full max-w-4xl mx-auto">
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#E3F221] to-[#5B5F97] rounded-2xl blur opacity-20"></div>
                    <div className="relative bg-[#1A1A1A] rounded-2xl border border-white/10 p-8 shadow-2xl overflow-hidden">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                            <div className="flex items-center gap-3">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                </div>
                                <span className="text-sm text-gray-400 font-mono">sentiment_analysis_v2.py</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                <span className="text-xs text-[#E3F221] font-mono">AI ACTIVE</span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="grid md:grid-cols-2 gap-12">
                            {/* Input Side */}
                            <div>
                                <div className="text-xs text-gray-500 mb-2 font-mono uppercase">Input Review</div>
                                <div className="text-lg text-white/90 font-serif italic leading-relaxed">
                                    "The <span className="bg-green-500/20 text-green-400 px-1 rounded">shipping was incredibly fast</span>, but the <span className="bg-red-500/20 text-red-400 px-1 rounded">packaging was damaged</span>. However, the <span className="bg-green-500/20 text-green-400 px-1 rounded">product quality is amazing</span>!"
                                </div>
                            </div>

                            {/* Output Side */}
                            <div className="space-y-4">
                                <div className="text-xs text-gray-500 mb-2 font-mono uppercase">Analysis Result</div>
                                
                                {/* Sentiment Score */}
                                <div className="bg-white/5 rounded-lg p-4 border border-white/5">
                                    <div className="flex justify-between mb-2">
                                        <span className="text-sm text-gray-400">Overall Sentiment</span>
                                        <span className="text-sm text-[#E3F221] font-bold">Positive (85%)</span>
                                    </div>
                                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-[#E3F221] w-[85%]"></div>
                                    </div>
                                </div>

                                {/* Key Phrases */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-400">Shipping</span>
                                        <span className="text-green-400">Positive (+0.9)</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-400">Packaging</span>
                                        <span className="text-red-400">Negative (-0.6)</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-400">Quality</span>
                                        <span className="text-green-400">Positive (+0.95)</span>
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
