import React from 'react';
import { motion } from 'framer-motion';

/**
 * Animated glow/pulse effect for accents
 * Adds life to key elements
 */
const GlowEffect = ({ 
  children, 
  className = "",
  color = "#E3F221",
  intensity = 0.5,
  size = 100,
  duration = 2,
  pulse = true
}) => {
  return (
    <div className={`relative ${className}`}>
      {/* Animated Glow */}
      <motion.div
        className="absolute inset-0 rounded-inherit pointer-events-none"
        style={{ 
          borderRadius: 'inherit',
          filter: `blur(${size / 3}px)`
        }}
        animate={pulse ? {
          boxShadow: [
            `0 0 ${size * 0.5}px ${size * 0.1}px ${color}${Math.round(intensity * 0.3 * 255).toString(16).padStart(2, '0')}`,
            `0 0 ${size}px ${size * 0.3}px ${color}${Math.round(intensity * 0.6 * 255).toString(16).padStart(2, '0')}`,
            `0 0 ${size * 0.5}px ${size * 0.1}px ${color}${Math.round(intensity * 0.3 * 255).toString(16).padStart(2, '0')}`
          ]
        } : {}}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Static Outer Glow */}
      <div 
        className="absolute inset-0 rounded-inherit pointer-events-none opacity-30"
        style={{ 
          borderRadius: 'inherit',
          boxShadow: `0 0 ${size}px ${size * 0.2}px ${color}`,
          filter: `blur(${size / 4}px)`
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

/**
 * Animated border glow
 */
export const GlowBorder = ({ 
  children, 
  className = "",
  color = "#E3F221",
  borderWidth = 1,
  animate = true
}) => {
  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="absolute inset-0 rounded-inherit pointer-events-none"
        style={{ 
          borderRadius: 'inherit',
          padding: borderWidth,
          background: `linear-gradient(90deg, ${color}, transparent, ${color})`,
          backgroundSize: '200% 100%',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude'
        }}
        animate={animate ? {
          backgroundPosition: ['0% 50%', '200% 50%']
        } : {}}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      {children}
    </div>
  );
};

export default GlowEffect;
