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
    quote: "Revyno completely transformed how we handle customer feedback. The AI insights are scary good.",
    image: "https://randomuser.me/api/portraits/women/1.jpg"
  },
  {
    name: "Michael Chen",
    role: "Founder, StartScale",
    quote: "I've never seen a tool that makes sentiment analysis this easy. It's like having a data scientist on the team.",
    image: "https://randomuser.me/api/portraits/men/2.jpg"
  },
  {
    name: "Jessica Wu",
    role: "Product Lead, Nexus",
    quote: "The ROI was immediate. We cut our response time by 80% in the first week.",
    image: "https://randomuser.me/api/portraits/women/3.jpg"
  },
  {
    name: "David Miller",
    role: "COO, SwiftLogistics",
    quote: "Finally, a dashboard that my entire executive team actually understands and uses.",
    image: "https://randomuser.me/api/portraits/men/4.jpg"
  },
  {
    name: "Emily Davis",
    role: "Head of CX, BrightPath",
    quote: "The automated workflows are a game changer. We're catching issues before they become problems.",
    image: "https://randomuser.me/api/portraits/women/5.jpg"
  },
  {
    name: "James Wilson",
    role: "Director, FutureCorp",
    quote: "Simply the best analytics platform on the market. The design is beautiful and the data is actionable.",
    image: "https://randomuser.me/api/portraits/men/6.jpg"
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
          Join thousands of teams who are scaling faster with Revyno.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {/* Row 1 */}
        <div className="flex gap-6 w-max" ref={row1Ref}>
          {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
            <div 
              key={i}
              className="w-[400px] bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300"
            >
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
          ))}
        </div>

        {/* Row 2 */}
        <div className="flex gap-6 w-max" ref={row2Ref}>
          {[...testimonials, ...testimonials, ...testimonials].reverse().map((t, i) => (
            <div 
              key={i}
              className="w-[400px] bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300"
            >
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfiniteTestimonials;
