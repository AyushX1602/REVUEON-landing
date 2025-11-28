import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "VP of Sales, TechFlow",
    company: "TechFlow",
    quote: "Revueon completely transformed how we handle customer feedback. The AI insights are scary good.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Founder, StartScale",
    company: "StartScale",
    quote: "I've never seen a tool that makes sentiment analysis this easy. It's like having a data scientist on the team.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    rating: 5
  },
  {
    name: "Jessica Wu",
    role: "Product Lead, Nexus",
    company: "Nexus",
    quote: "The ROI was immediate. We cut our response time by 80% in the first week.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    rating: 5
  },
  {
    name: "David Miller",
    role: "COO, SwiftLogistics",
    company: "SwiftLogistics",
    quote: "Finally, a dashboard that my entire executive team actually understands and uses.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    rating: 5
  },
  {
    name: "Emily Davis",
    role: "Head of CX, BrightPath",
    company: "BrightPath",
    quote: "The automated workflows are a game changer. We're catching issues before they become problems.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    rating: 5
  },
  {
    name: "James Wilson",
    role: "Director, FutureCorp",
    company: "FutureCorp",
    quote: "Simply the best analytics platform on the market. The design is beautiful and the data is actionable.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    rating: 5
  }
];

const InfiniteTestimonials = () => {
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);

  useGSAP(() => {
    // Row 1 - Moves Left
    gsap.to(row1Ref.current, {
      xPercent: -50,
      repeat: -1,
      duration: 20,
      ease: "linear",
    });

    // Row 2 - Moves Right
    gsap.fromTo(row2Ref.current, 
      { xPercent: -50 },
      {
        xPercent: 0,
        repeat: -1,
        duration: 25,
        ease: "linear",
      }
    );
  }, { scope: row1Ref }); // Scope doesn't matter much here but good practice

  return (
    <section className="py-24 bg-[#111] overflow-hidden relative">
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-full bg-gradient-to-r from-[#111] to-transparent z-10" />
        <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-[#111] to-transparent z-10" />
      </div>

      <div className="max-w-7xl mx-auto px-6 mb-16 text-center relative z-20">
        <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
          Loved by <span className="text-[#E3F221]">Innovators</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Join thousands of teams who are scaling faster with Revueon.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {/* Row 1 */}
        <div className="flex gap-6 w-max" ref={row1Ref}>
          {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
            <div 
              key={i}
              className="group relative w-[400px] bg-white/5 rounded-2xl p-8 backdrop-blur-sm transition-colors duration-300 overflow-hidden"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
              }}
            >
              {/* Spotlight Gradient */}
              <div 
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(227, 242, 33, 0.15), transparent 40%)`
                }}
              />
              <div className="absolute inset-0 border border-white/10 rounded-2xl pointer-events-none"></div>

              <div className="relative z-10">
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(star => (
                    <Star key={star} className="w-4 h-4 text-[#E3F221] fill-current" />
                  ))}
                </div>
                <p className="text-white/80 text-lg mb-6 leading-relaxed">"{t.quote}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full border-2 border-[#E3F221]/20" />
                  <div>
                    <div className="text-white font-bold">{t.name}</div>
                    <div className="text-[#E3F221] text-sm">{t.role}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2 */}
        <div className="flex gap-6 w-max" ref={row2Ref}>
          {[...testimonials, ...testimonials, ...testimonials].reverse().map((t, i) => (
            <div 
              key={i}
              className="group relative w-[400px] bg-white/5 rounded-2xl p-8 backdrop-blur-sm transition-colors duration-300 overflow-hidden"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
              }}
            >
              {/* Spotlight Gradient (Purple for Row 2) */}
              <div 
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(91, 95, 151, 0.2), transparent 40%)`
                }}
              />
              <div className="absolute inset-0 border border-white/10 rounded-2xl pointer-events-none"></div>

              <div className="relative z-10">
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(star => (
                    <Star key={star} className="w-4 h-4 text-[#5B5F97] fill-current" />
                  ))}
                </div>
                <p className="text-white/80 text-lg mb-6 leading-relaxed">"{t.quote}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full border-2 border-[#5B5F97]/20" />
                  <div>
                    <div className="text-white font-bold">{t.name}</div>
                    <div className="text-[#5B5F97] text-sm">{t.role}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfiniteTestimonials;
