import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

/**
 * Button with Material-style ripple effect
 * Adds satisfying tactile feedback on click
 */
const RippleButton = ({ 
  children, 
  onClick, 
  className = "",
  rippleColor = "rgba(255, 255, 255, 0.4)",
  disabled = false,
  ...props 
}) => {
  const [ripples, setRipples] = useState([]);

  const addRipple = useCallback((e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    
    const ripple = {
      x: e.clientX - rect.left - size / 2,
      y: e.clientY - rect.top - size / 2,
      size,
      id: Date.now()
    };
    
    setRipples(prev => [...prev, ripple]);
    
    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== ripple.id));
    }, 600);
  }, []);

  const handleClick = (e) => {
    if (disabled) return;
    addRipple(e);
    onClick?.(e);
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      {/* Ripple container */}
      <span className="absolute inset-0 pointer-events-none">
        {ripples.map(ripple => (
          <motion.span
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute rounded-full"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: ripple.size,
              height: ripple.size,
              backgroundColor: rippleColor
            }}
          />
        ))}
      </span>
      
      {/* Button content */}
      <span className="relative z-10">
        {children}
      </span>
    </button>
  );
};

export default RippleButton;
