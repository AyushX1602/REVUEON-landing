import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Exit Intent Popup
 * Shows special offer when user is about to leave
 */
const ExitIntentPopup = ({ 
  delay = 3000, // Minimum time on page before popup can show
  cookieDays = 7 // Days before showing again if dismissed
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  // Check if popup was recently dismissed
  const wasRecentlyDismissed = useCallback(() => {
    const dismissed = localStorage.getItem('exitPopupDismissed');
    if (!dismissed) return false;
    
    const dismissedTime = parseInt(dismissed, 10);
    const daysSince = (Date.now() - dismissedTime) / (1000 * 60 * 60 * 24);
    return daysSince < cookieDays;
  }, [cookieDays]);

  useEffect(() => {
    if (wasRecentlyDismissed()) return;
    
    let timeOnPage = 0;
    const timer = setInterval(() => {
      timeOnPage += 1000;
    }, 1000);

    const handleMouseLeave = (e) => {
      // Only trigger when mouse leaves from top of viewport
      if (e.clientY <= 0 && timeOnPage >= delay && !hasTriggered) {
        setIsVisible(true);
        setHasTriggered(true);
      }
    };

    // Also trigger on back button attempt (mobile)
    const handlePopState = () => {
      if (timeOnPage >= delay && !hasTriggered) {
        setIsVisible(true);
        setHasTriggered(true);
        // Push state back so they don't actually leave
        window.history.pushState(null, '', window.location.href);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('popstate', handlePopState);
    window.history.pushState(null, '', window.location.href);

    return () => {
      clearInterval(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [delay, hasTriggered, wasRecentlyDismissed]);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('exitPopupDismissed', Date.now().toString());
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={handleDismiss}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleDismiss}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 z-10 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header with gradient */}
            <div className="bg-gradient-to-br from-[#E3F221] to-[#c9d41c] p-6 text-center">
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg mb-4"
              >
                <Gift className="w-8 h-8 text-[#1A1A1A]" />
              </motion.div>
              <h3 className="text-2xl font-bold text-[#1A1A1A] font-heading">
                Wait! Don't Leave Empty-Handed
              </h3>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="text-center mb-6">
                <p className="text-gray-600 mb-4">
                  Get <span className="font-bold text-[#1A1A1A]">30% off</span> your first 3 months when you sign up today!
                </p>
                
                {/* Urgency Timer */}
                <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full text-sm font-medium">
                  <Clock className="w-4 h-4" />
                  <span>Offer expires in 24 hours</span>
                </div>
              </div>

              {/* Benefits */}
              <ul className="space-y-3 mb-6">
                {[
                  "14-day free trial included",
                  "No credit card required",
                  "Cancel anytime"
                ].map((benefit, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                      <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {benefit}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                to="/signup"
                onClick={handleDismiss}
                className="group flex items-center justify-center gap-2 w-full py-4 bg-[#1A1A1A] text-white rounded-xl font-bold text-lg hover:bg-[#2A2A2A] transition-colors"
              >
                Claim My 30% Discount
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <button
                onClick={handleDismiss}
                className="w-full mt-3 text-sm text-gray-400 hover:text-gray-600 transition-colors"
              >
                No thanks, I'll pay full price
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExitIntentPopup;
