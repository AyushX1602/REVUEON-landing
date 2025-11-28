import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link, Brain, MessageSquare, TrendingUp, ArrowRight } from 'lucide-react';
import TextReveal from './TextReveal';

gsap.registerPlugin(ScrollTrigger);

const Workflow = () => {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const progressRef = useRef(null);

  const steps = [
    {
      id: 1,
      title: "Connect Your Data",
      description: "Integrate with 50+ platforms in seconds. No coding required.",
      icon: <Link className="w-8 h-8 text-white" />,
      color: "bg-blue-500"
    },
    {
      id: 2,
      title: "Analyze Sentiment",
      description: "Our AI automatically categorizes reviews by sentiment and topic.",
      icon: <Brain className="w-8 h-8 text-white" />,
      color: "bg-purple-500"
    },
    {
      id: 3,
      title: "Automate Responses",
      description: "Set up smart rules to reply to customers instantly.",
      icon: <MessageSquare className="w-8 h-8 text-white" />,
      color: "bg-lime-500"
    },
    {
      id: 4,
      title: "Watch Revenue Grow",
      description: "Turn happy customers into your best marketing channel.",
      icon: <TrendingUp className="w-8 h-8 text-white" />,
      color: "bg-green-500"
    }
  ];

  useGSAP(() => {
    const totalWidth = sectionRef.current.scrollWidth;
    const windowWidth = window.innerWidth;
    const scrollDistance = totalWidth - windowWidth;
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top top",
        end: () => `+=${scrollDistance}`,
        scrub: 1,
        pin: true,
        invalidateOnRefresh: true,
      }
    });

    // Horizontal Scroll
    tl.to(sectionRef.current, {
      x: -scrollDistance,
      ease: "none",
    });

    // Progress Line Animation
    gsap.fromTo(progressRef.current, 
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: () => `+=${scrollDistance}`,
          scrub: 1,
        }
      }
    );

    // Stagger Steps Fade In
    const cards = sectionRef.current.children;
    gsap.fromTo(cards,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top 60%", // Start animating when section is in view
          toggleActions: "play none none reverse"
        }
      }
    );

  }, { scope: triggerRef });

  return (
    <section ref={triggerRef} className="relative overflow-hidden bg-gradient-to-br from-[#0A0A0A] via-[#111] to-[#1A1A1A] text-white isolate z-0">
      {/* Animated Grid */}
      <div className="absolute inset-0 opacity-5 -z-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(227, 242, 33, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(227, 242, 33, 0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          animation: 'float 15s ease-in-out infinite'
        }} />
      </div>
      
      {/* Gradient Accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#E3F221] to-transparent opacity-50" />
      
      {/* Background Noise */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="h-screen flex flex-col justify-center relative z-10">
        <div className="px-4 sm:px-6 lg:px-8 mb-8 md:mb-12 flex flex-col md:flex-row items-start md:items-end justify-between max-w-7xl mx-auto w-full gap-6 md:gap-0">
          <div>
            <TextReveal animation="fadeUp" duration={0.6}>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-heading font-medium text-[#E3F221] mb-2 md:mb-4">
                How Revueon Works
              </h2>
            </TextReveal>
            <TextReveal animation="blur" delay={0.3}>
              <p className="font-sans text-white/60 text-lg max-w-xl">
                A simple, powerful workflow designed for modern teams.
              </p>
            </TextReveal>
          </div>
          
          {/* Progress Bar */}
          <div className="hidden md:block w-64 h-1 bg-white/10 rounded-full overflow-hidden">
            <div ref={progressRef} className="h-full bg-[#E3F221] origin-left" />
          </div>
        </div>

        <div 
          ref={sectionRef} 
          className="flex gap-8 px-4 sm:px-6 lg:px-8 w-fit items-center"
        >
          {steps.map((step, index) => (
            <div 
              key={step.id}
              className="w-[85vw] md:w-[600px] h-[50vh] flex-shrink-0 bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm hover:bg-white/10 transition-all duration-500 flex flex-col justify-between group hover:scale-105 hover:border-[#E3F221]/30"
            >
              <div className="flex justify-between items-start">
                <span className="text-8xl font-bold text-white/5 group-hover:text-white/10 transition-colors font-heading">
                  0{step.id}
                </span>
                <div className={`w-20 h-20 rounded-2xl ${step.color} flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500`}>
                  {step.icon}
                </div>
              </div>
              
              <div className="relative">
                {/* Connecting Line Segment (Visual only) */}
                {index < steps.length - 1 && (
                  <div className="absolute -right-20 top-1/2 w-12 h-[2px] bg-white/10 hidden md:block" />
                )}
                
                <h3 className="text-3xl md:text-4xl font-semibold mb-4 text-white group-hover:text-[#E3F221] transition-colors">
                  {step.title}
                </h3>
                <p className="text-lg text-white/70 leading-relaxed max-w-md">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
          
          {/* CTA Card */}
          <div className="w-[85vw] md:w-[500px] h-[50vh] flex-shrink-0 bg-[#E3F221] rounded-3xl p-8 md:p-12 flex flex-col justify-center items-center text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
            
            <div className="relative z-10">
              <h3 className="text-4xl font-heading font-bold text-[#47423D] mb-8">
                Ready to start?
              </h3>
              <button className="px-8 py-4 bg-[#47423D] text-white rounded-full font-bold text-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto group-hover:scale-105">
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Workflow;
