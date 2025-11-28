import React, { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Animated number counter with easing
 * Perfect for stats and metrics
 */
const AnimatedCounter = ({ 
  value, 
  suffix = "",
  prefix = "",
  duration = 2,
  delay = 0,
  decimals = 0,
  className = "",
  ease = "power2.out",
  separator = ",",
  trigger = true
}) => {
  const counterRef = useRef(null);
  const [displayValue, setDisplayValue] = useState(0);

  useGSAP(() => {
    if (!counterRef.current) return;

    const numValue = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.]/g, '')) : value;
    
    const counter = { value: 0 };
    
    const animConfig = {
      value: numValue,
      duration: duration,
      delay: delay,
      ease: ease,
      onUpdate: () => {
        const formatted = formatNumber(counter.value, decimals, separator);
        setDisplayValue(formatted);
      }
    };

    if (trigger) {
      animConfig.scrollTrigger = {
        trigger: counterRef.current,
        start: "top 85%",
        once: true
      };
    }

    gsap.to(counter, animConfig);
  }, { scope: counterRef, dependencies: [value] });

  const formatNumber = (num, dec, sep) => {
    const fixed = num.toFixed(dec);
    const parts = fixed.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, sep);
    return parts.join('.');
  };

  return (
    <span ref={counterRef} className={`tabular-nums ${className}`}>
      {prefix}{displayValue}{suffix}
    </span>
  );
};

export default AnimatedCounter;
