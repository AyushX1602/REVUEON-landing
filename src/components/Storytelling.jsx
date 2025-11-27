import React, { useRef } from 'react';
import { BarChart3, MessageSquare, Zap } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "Real-Time KPI Grid",
    description: "Track high-level metrics like total reviews, average rating, and NPS in real-time. Visualize spikes, drops, or patterns instantly.",
    icon: <BarChart3 className="w-6 h-6 text-[#47423D]" />,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    align: "right"
  },
  {
    title: "Sentiment Analysis",
    description: "Donut and area charts break down customer emotions. Understand exactly how your customers feel about your products.",
    icon: <Zap className="w-6 h-6 text-[#47423D]" />,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    align: "left"
  },
  {
    title: "Prioritized Actions",
    description: "Our 'Fix This First' section highlights issues with the highest impact potential. Download reports in PDF/CSV for your team.",
    icon: <MessageSquare className="w-6 h-6 text-[#47423D]" />,
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800",
    align: "right"
  }
];

const Storytelling = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const sections = gsap.utils.toArray('.story-section');

    sections.forEach((section) => {
      const img = section.querySelector('.story-img');
      const text = section.querySelector('.story-text');

      // Parallax Image
      gsap.fromTo(img, 
        { y: -50 },
        {
          y: 50,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );

      // Text Reveal
      gsap.from(text, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      });
    });

  }, { scope: containerRef });

  return (
    <section id="features" className="py-32 bg-white overflow-hidden" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-32">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 font-heading tracking-tight">Why Revueon?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We turn the chaos of customer feedback into a clear path for growth.
          </p>
        </div>

        <div className="space-y-40">
          {features.map((feature, index) => (
            <div key={index} className={`story-section flex flex-col lg:flex-row items-center gap-20 ${feature.align === 'left' ? 'lg:flex-row-reverse' : ''}`}>
              
              {/* Text Side */}
              <div className="story-text flex-1 space-y-8">
                <div className="w-14 h-14 bg-[#E3F221] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-[#E3F221]/20">
                  {feature.icon}
                </div>
                <h3 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">{feature.title}</h3>
                <p className="text-lg text-gray-600 leading-relaxed">{feature.description}</p>
                <ul className="space-y-4 pt-4">
                  {['Real-time sync', 'Sentiment analysis', 'Export to CSV'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                      <div className="w-2 h-2 rounded-full bg-[#E3F221]"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Image Side with Parallax */}
              <div className="flex-1 w-full relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100 aspect-[4/3] group">
                  <div className="absolute inset-0 bg-[#47423D]/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                  <img 
                    src={feature.image} 
                    alt={feature.title} 
                    className="story-img w-full h-[120%] object-cover -mt-[10%]" // Extra height for parallax
                  />
                </div>
                {/* Decorative Blob */}
                <div className={`absolute -z-10 w-full h-full top-10 ${feature.align === 'left' ? '-right-10' : '-left-10'} bg-[#E3F221]/20 rounded-3xl blur-3xl opacity-50`}></div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Storytelling;
