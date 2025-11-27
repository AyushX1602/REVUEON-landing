import React, { useRef } from 'react';
import { TrendingUp } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FadeIn from './FadeIn';

gsap.registerPlugin(ScrollTrigger);

const ReviewImpact = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Count Up Animation
    const stats = containerRef.current.querySelectorAll('.stat-number');
    stats.forEach(stat => {
      const value = parseFloat(stat.getAttribute('data-value'));
      const suffix = stat.getAttribute('data-suffix') || '';
      const prefix = stat.getAttribute('data-prefix') || '';
      
      gsap.fromTo(stat, 
        { innerText: 0 },
        {
          innerText: value,
          duration: 2,
          ease: "power2.out",
          snap: { innerText: 0.1 },
          scrollTrigger: {
            trigger: stat,
            start: "top 85%",
            toggleActions: "play none none reverse"
          },
          onUpdate: function() {
            stat.innerText = prefix + Math.ceil(this.targets()[0].innerText) + suffix;
            // Handle decimal for 3.5x
            if (value % 1 !== 0) {
               stat.innerText = prefix + Number(this.targets()[0].innerText).toFixed(1) + suffix;
            }
          }
        }
      );
    });

    // Chart Animation
    const bars = containerRef.current.querySelectorAll('.chart-bar');
    gsap.fromTo(bars,
      { height: "0%" },
      {
        height: (i, target) => target.getAttribute('data-height'),
        duration: 1.5,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current.querySelector('.chart-container'),
          start: "top 70%",
        }
      }
    );

  }, { scope: containerRef });

  return (
    <section id="impact" className="py-24 bg-brand-bg overflow-hidden" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1">
            <FadeIn direction="right">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-secondary/30 text-brand-text font-medium text-sm mb-8">
                <TrendingUp size={16} />
                <span>Revenue Impact</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Identify <span className="bg-brand-primary px-2">Business-Impacting</span> Patterns
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Revueon visualizes your analytics via clean, interactive dashboards. See exactly how sentiment trends affect your bottom line.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:-translate-y-1 transition-transform duration-300">
                  <p className="text-4xl font-bold text-brand-text mb-2 stat-number" data-value="24" data-prefix="+" data-suffix="%">0%</p>
                  <p className="text-gray-500 text-sm">Conversion Rate</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:-translate-y-1 transition-transform duration-300">
                  <p className="text-4xl font-bold text-brand-text mb-2 stat-number" data-value="3.5" data-suffix="x">0x</p>
                  <p className="text-gray-500 text-sm">Return on Ad Spend</p>
                </div>
              </div>
            </FadeIn>
          </div>

          <div className="flex-1 w-full relative">
            <FadeIn direction="left">
              {/* Abstract Chart Visualization */}
              <div className="chart-container bg-white rounded-3xl shadow-xl border border-gray-200 p-8 relative z-10">
                <div className="flex justify-between items-end h-64 gap-4">
                  {[40, 65, 55, 80, 70, 90, 100].map((height, i) => (
                    <div key={i} className="w-full bg-brand-bg rounded-t-lg relative group overflow-hidden">
                      <div 
                        className="chart-bar absolute bottom-0 left-0 right-0 bg-brand-text group-hover:bg-brand-primary transition-colors duration-300"
                        data-height={`${height}%`}
                        style={{ height: 0 }}
                      ></div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex justify-between text-sm text-gray-400 font-medium">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-primary rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-secondary rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewImpact;
