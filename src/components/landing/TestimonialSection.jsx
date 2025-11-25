import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TestimonialSection = () => {
  const containerRef = useRef(null);
  const quoteRef = useRef(null);
  const metricsRef = useRef(null);

  useGSAP(() => {
    // Quote Reveal
    gsap.from(quoteRef.current, {
      y: 50,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: quoteRef.current,
        start: "top 85%",
      }
    });

    // Metrics Cards Stagger
    gsap.from(metricsRef.current.children, {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: metricsRef.current,
        start: "top 85%",
      }
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-white w-full border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 xl:py-20">
          
          {/* Header Text and Client Logos */}
          <div className="mb-16 lg:mb-20">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-12">
              <p className="text-xs uppercase text-[#47423D] font-mono tracking-wide mb-6 lg:mb-0">
                Join over 500,000 businesses using Revyno
              </p>
              
              {/* Client Logos Row - Placeholders */}
              <div className="flex flex-wrap items-center justify-center lg:justify-end gap-x-8 gap-y-3 opacity-60 grayscale">
                 <span className="text-xl font-bold text-[#47423D]">ACME Corp</span>
                 <span className="text-xl font-bold text-[#47423D]">GlobalTech</span>
                 <span className="text-xl font-bold text-[#47423D]">Nebula</span>
                 <span className="text-xl font-bold text-[#47423D]">Trio</span>
                 <span className="text-xl font-bold text-[#47423D]">FoxRun</span>
              </div>
            </div>

            {/* Main Quote and Attribution - Side by Side */}
            <div ref={quoteRef} className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
                
              <div className="lg:col-span-3">
                <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-heading font-medium leading-tight tracking-tight text-[#47423D]">
                  Revueon supports people who <br /> want to be innovative — to do <br />something new.
                </h2>
              </div>
              
              {/* Attribution Section - Takes 1/4 width */}
              <div className="lg:col-span-1 lg:flex lg:items-end">
                <div className="flex flex-col items-start">
                  <p className="text-xs uppercase text-[#47423D] font-mono tracking-wide mb-2">
                    Hutej Mane
                  </p>
                  <p className="text-xs uppercase text-[#47423D] font-mono tracking-wide mb-4 leading-relaxed">
                    Senior Manager of Sales<br />Development & Operations
                  </p>
                  <div className="flex items-center">
                    <span className="text-[#47423D] font-bold text-lg tracking-wider">REVUEON</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Success Metrics Cards - Always in Same Line */}
          <div ref={metricsRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            {/* Card 1 */}
            <div className="bg-[#F3F2F0] rounded-xl p-6 lg:p-8 h-40 lg:h-48 flex flex-col justify-between hover:shadow-md transition-shadow duration-200">
              <div className="flex flex-col-reverse lg:flex-row lg:justify-between lg:items-start gap-1 lg:gap-2">
                <p className="text-sm text-[#47423D]/70 leading-tight">
                  5x meetings booked
                </p>
                <div className="flex justify-end lg:justify-start">
                  <span className="text-[#47423D] font-bold text-sm">Leadium.</span>
                </div>
              </div>
              <h3 className="text-5xl lg:text-6xl font-normal leading-none text-[#5B5F97] tracking-tight mt-2">
                5x
              </h3>
            </div>

            {/* Card 2 */}
            <div className="bg-[#F3F2F0] rounded-xl p-6 lg:p-8 h-40 lg:h-48 flex flex-col justify-between hover:shadow-md transition-shadow duration-200">
              <div className="flex flex-col-reverse lg:flex-row lg:justify-between lg:items-start gap-1 lg:gap-2">
                <p className="text-sm text-[#47423D]/70 leading-tight">
                  Increase in revenue
                </p>
                <div className="flex justify-end lg:justify-start">
                  <span className="text-[#47423D] font-bold text-sm">TechFlow.</span>
                </div>
              </div>
              <h3 className="text-5xl lg:text-6xl font-normal leading-none text-[#E3F221] tracking-tight mt-2 drop-shadow-sm text-stroke-1 text-stroke-[#47423D]">
                120%
              </h3>
            </div>

             {/* Card 3 */}
             <div className="bg-[#F3F2F0] rounded-xl p-6 lg:p-8 h-40 lg:h-48 flex flex-col justify-between hover:shadow-md transition-shadow duration-200">
              <div className="flex flex-col-reverse lg:flex-row lg:justify-between lg:items-start gap-1 lg:gap-2">
                <p className="text-sm text-[#47423D]/70 leading-tight">
                  Faster response time
                </p>
                <div className="flex justify-end lg:justify-start">
                  <span className="text-[#47423D] font-bold text-sm">Swift.</span>
                </div>
              </div>
              <h3 className="text-5xl lg:text-6xl font-normal leading-none text-[#47423D] tracking-tight mt-2">
                10x
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
