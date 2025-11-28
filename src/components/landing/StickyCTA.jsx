import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Sticky CTA bar that appears after scrolling past hero
 * Increases conversion by keeping the action visible
 */
const StickyCTA = ({ 
  showAfter = 600, // pixels scrolled before showing
  position = 'bottom' // 'top' | 'bottom'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isDismissed) return;
      
      const scrollY = window.scrollY;
      const shouldShow = scrollY > showAfter;
      
      // Don't show near footer
      const nearBottom = scrollY + window.innerHeight > document.body.scrollHeight - 400;
      
      setIsVisible(shouldShow && !nearBottom);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showAfter, isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: position === 'bottom' ? 100 : -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: position === 'bottom' ? 100 : -100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={`fixed ${position === 'bottom' ? 'bottom-0' : 'top-0'} left-0 right-0 z-50`}
        >
          <div className="bg-gradient-to-r from-[#1A1A1A] via-[#2A2A2A] to-[#1A1A1A] border-t border-white/10 shadow-2xl">
            <div className="max-w-7xl mx-auto px-4 py-3">
              <div className="flex items-center justify-between gap-4">
                {/* Left: Message */}
                <div className="flex items-center gap-4">
                  <div className="hidden sm:flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E3F221] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E3F221]"></span>
                    </span>
                    <span className="text-sm text-white/70">Limited Time</span>
                  </div>
                  <p className="text-white font-medium text-sm sm:text-base">
                    <span className="text-[#E3F221] font-bold">14-day free trial</span>
                    <span className="hidden sm:inline"> — No credit card required</span>
                  </p>
                </div>

                {/* Right: CTA & Close */}
                <div className="flex items-center gap-3">
                  <Link
                    to="/signup"
                    className="group flex items-center gap-2 px-4 sm:px-6 py-2 bg-[#E3F221] text-[#1A1A1A] rounded-full font-bold text-sm hover:shadow-lg hover:shadow-[#E3F221]/30 transition-all duration-300"
                  >
                    Start Free
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <button
                    onClick={handleDismiss}
                    className="p-2 text-white/50 hover:text-white transition-colors"
                    aria-label="Dismiss"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyCTA;
