import React from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import FadeIn from './FadeIn';

const Hero = () => {
  const handleMouseMove = (e) => {
    const { currentTarget: target, clientX, clientY } = e;
    const { left, top, width, height } = target.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    
    target.style.setProperty('--rx', `${y * 10}deg`);
    target.style.setProperty('--ry', `${-x * 10}deg`);
  };

  return (
    <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden relative perspective-1000">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[100px] mix-blend-multiply animate-blob"></div>
        <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-brand-secondary/20 rounded-full blur-[100px] mix-blend-multiply animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn delay={0.1}>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
              Uncover Actionable Insights from <span className="text-brand-primary relative inline-block">
                Reviews
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-brand-primary opacity-50" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <motion.path 
                    d="M0 5 Q 50 10 100 5" 
                    stroke="currentColor" 
                    strokeWidth="8" 
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
                  />
                </svg>
              </span>
            </h1>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Revueon is a premium analytics platform for Shopify merchants. We analyze sentiment trends and business-impacting patterns to help you make smarter decisions.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary flex items-center gap-2 group shadow-lg shadow-brand-primary/20 relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Try Free
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary flex items-center gap-2 shadow-sm"
              >
                <Play size={20} fill="currentColor" className="text-gray-400" />
                View Demo
              </motion.button>
            </div>
          </FadeIn>
        </div>

        {/* Abstract Visual Element */}
        <FadeIn delay={0.5} direction="up" className="mt-20 relative mx-auto max-w-5xl perspective-1000">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={(e) => {
              e.currentTarget.style.setProperty('--rx', '0deg');
              e.currentTarget.style.setProperty('--ry', '0deg');
            }}
            style={{
              transform: 'rotateX(var(--rx)) rotateY(var(--ry))',
              transition: 'transform 0.1s ease-out'
            }}
            className="aspect-[16/9] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden relative group transform-gpu transition-transform duration-200 ease-out hover:shadow-brand-primary/10"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-50 pointer-events-none"></div>
            
            {/* Mock UI Elements */}
            <div className="absolute inset-0 p-8 flex flex-col pointer-events-none">
              <div className="flex items-center gap-4 mb-8 border-b border-gray-100 pb-4">
                <div className="w-32 h-8 bg-gray-100 rounded-lg animate-pulse"></div>
                <div className="flex-1"></div>
                <div className="w-8 h-8 bg-gray-100 rounded-full"></div>
              </div>
              <div className="flex gap-8 h-full">
                <div className="w-1/4 space-y-4">
                  <div className="w-full h-12 bg-brand-bg rounded-lg"></div>
                  <div className="w-full h-8 bg-gray-50 rounded-lg"></div>
                  <div className="w-full h-8 bg-gray-50 rounded-lg"></div>
                </div>
                <div className="flex-1 bg-brand-surface rounded-xl p-6 border border-gray-100 relative overflow-hidden">
                  {/* Animated Chart Bars */}
                  <div className="flex items-end justify-between h-full gap-4 px-4 pb-4">
                    {[40, 70, 50, 90, 60, 80, 95].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        transition={{ duration: 1, delay: 0.8 + (i * 0.1) }}
                        className="w-full bg-brand-text rounded-t-md opacity-80"
                      ></motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative blobs */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-primary/20 rounded-full blur-3xl group-hover:bg-brand-primary/30 transition-colors duration-500 pointer-events-none"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-brand-secondary/30 rounded-full blur-3xl group-hover:bg-brand-secondary/40 transition-colors duration-500 pointer-events-none"></div>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Hero;
