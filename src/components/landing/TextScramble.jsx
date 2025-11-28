import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

/**
 * Text scramble/decode effect like hacker terminals
 * Creates a premium tech feel
 */
const TextScramble = ({ 
  text, 
  className = "",
  delay = 0,
  duration = 1.5,
  trigger = true, // true = on scroll, false = immediate
  chars = "!<>-_\\/[]{}—=+*^?#________",
  scrambleSpeed = 30 // ms between updates
}) => {
  const containerRef = useRef(null);
  const [displayText, setDisplayText] = useState(text);
  const [hasAnimated, setHasAnimated] = useState(false);
  const frameRef = useRef(null);
  const frameCountRef = useRef(0);
  const queueRef = useRef([]);

  const randomChar = () => chars[Math.floor(Math.random() * chars.length)];

  const scramble = () => {
    if (hasAnimated) return;
    
    const oldText = "";
    const newText = text;
    const length = Math.max(oldText.length, newText.length);
    const totalFrames = Math.round(duration * (1000 / scrambleSpeed));
    
    // Build queue of character changes
    queueRef.current = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = newText[i] || "";
      const start = Math.floor(Math.random() * (totalFrames * 0.4));
      const end = start + Math.floor(Math.random() * (totalFrames * 0.6));
      queueRef.current.push({ from, to, start, end, char: "" });
    }

    frameCountRef.current = 0;
    
    const update = () => {
      let output = "";
      let complete = 0;
      
      for (let i = 0; i < queueRef.current.length; i++) {
        let { from, to, start, end, char } = queueRef.current[i];
        
        if (frameCountRef.current >= end) {
          complete++;
          output += to;
        } else if (frameCountRef.current >= start) {
          if (!char || Math.random() < 0.28) {
            char = randomChar();
            queueRef.current[i].char = char;
          }
          output += `<span class="text-[#E3F221]/70">${char}</span>`;
        } else {
          output += from;
        }
      }
      
      if (containerRef.current) {
        containerRef.current.innerHTML = output;
      }
      
      if (complete === queueRef.current.length) {
        setHasAnimated(true);
        setDisplayText(text);
      } else {
        frameCountRef.current++;
        frameRef.current = requestAnimationFrame(update);
      }
    };

    // Start after delay
    setTimeout(update, delay * 1000);
  };

  useEffect(() => {
    if (!trigger) {
      scramble();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          scramble();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [trigger, hasAnimated, text]);

  return (
    <span 
      ref={containerRef} 
      className={`inline-block ${className}`}
      style={{ fontFamily: 'inherit' }}
    >
      {displayText}
    </span>
  );
};

export default TextScramble;
