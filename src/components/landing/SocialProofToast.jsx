import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Users } from 'lucide-react';

/**
 * Social Proof Toast Notifications
 * Shows recent signups/activity to build trust
 */

const socialProofData = [
  { name: "Sarah M.", location: "New York", action: "just started their free trial", time: "2 min ago" },
  { name: "Mike T.", location: "London", action: "upgraded to Growth plan", time: "5 min ago" },
  { name: "Emma L.", location: "Sydney", action: "just signed up", time: "8 min ago" },
  { name: "David K.", location: "Toronto", action: "connected their Shopify store", time: "12 min ago" },
  { name: "Lisa R.", location: "Berlin", action: "just started their free trial", time: "15 min ago" },
  { name: "James W.", location: "Singapore", action: "upgraded to Enterprise", time: "18 min ago" },
  { name: "Anna P.", location: "Paris", action: "just signed up", time: "22 min ago" },
  { name: "Tom H.", location: "Chicago", action: "started analyzing 5,000 reviews", time: "25 min ago" },
];

const SocialProofToast = ({ 
  interval = 15000, // Time between notifications (ms)
  duration = 5000,   // How long each notification shows (ms)
  position = 'bottom-left', // 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'
  maxShow = 5 // Max notifications to show before pausing
}) => {
  const [currentNotification, setCurrentNotification] = useState(null);
  const [showCount, setShowCount] = useState(0);
  const [isEnabled, setIsEnabled] = useState(true);

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-left': return 'bottom-4 left-4';
      case 'bottom-right': return 'bottom-4 right-4';
      case 'top-left': return 'top-20 left-4';
      case 'top-right': return 'top-20 right-4';
      default: return 'bottom-4 left-4';
    }
  };

  const showNotification = useCallback(() => {
    if (!isEnabled || showCount >= maxShow) return;
    
    // Pick a random notification
    const randomIndex = Math.floor(Math.random() * socialProofData.length);
    setCurrentNotification(socialProofData[randomIndex]);
    setShowCount(prev => prev + 1);

    // Hide after duration
    setTimeout(() => {
      setCurrentNotification(null);
    }, duration);
  }, [isEnabled, showCount, maxShow, duration]);

  useEffect(() => {
    // Initial delay before first notification
    const initialDelay = setTimeout(() => {
      showNotification();
    }, 5000); // Show first one after 5 seconds

    return () => clearTimeout(initialDelay);
  }, []);

  useEffect(() => {
    if (showCount === 0) return;
    
    const intervalId = setInterval(() => {
      showNotification();
    }, interval);

    return () => clearInterval(intervalId);
  }, [interval, showNotification, showCount]);

  const handleDismiss = () => {
    setCurrentNotification(null);
    setIsEnabled(false);
  };

  return (
    <AnimatePresence>
      {currentNotification && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className={`fixed ${getPositionClasses()} z-50 max-w-sm`}
        >
          <div className="bg-white rounded-xl shadow-2xl border border-gray-100 p-4 flex items-start gap-3">
            {/* Avatar/Icon */}
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#E3F221] to-[#c9d41c] flex items-center justify-center">
              <Users className="w-5 h-5 text-[#1A1A1A]" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900">
                <span className="font-semibold">{currentNotification.name}</span>
                <span className="text-gray-500"> from {currentNotification.location}</span>
              </p>
              <p className="text-sm text-gray-600 mt-0.5">
                {currentNotification.action}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <CheckCircle className="w-3 h-3 text-green-500" />
                <span className="text-xs text-gray-400">{currentNotification.time}</span>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={handleDismiss}
              className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Verified badge */}
          <div className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            Verified
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SocialProofToast;
