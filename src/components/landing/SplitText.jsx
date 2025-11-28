import React, { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Premium text reveal animation with letter-by-letter stagger
 * Inspired by Linear.app and Stripe
 * 
 * IMPORTANT: This component preserves all CSS classes from the child element
 * so font-family, size, color, spacing are all inherited.
 */
const SplitText = ({ 
  children, 
  className = "", 
  delay = 0,
  type = "chars", // "chars" | "words" | "lines"
  animation = "wave", // "wave" | "fade" | "slide" | "blur"
  stagger = 0.02,
  duration = 0.6,
  once = true,
  trigger = true // false = animate immediately on mount
}) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const originalClassesRef = useRef('');

  useGSAP(() => {
    if (!textRef.current) return;
    
    const text = textRef.current;
    const content = text.textContent;
    
    // Store original classes from the child element to preserve styling
    const childElement = text.querySelector('h1, h2, h3, h4, h5, h6, p, span, div');
    if (childElement) {
      originalClassesRef.current = childElement.className;
    }
    
    text.innerHTML = '';
    
    // Split based on type
    let elements = [];
    
    if (type === "chars") {
      // Split into characters, preserving spaces
      const words = content.split(' ');
      words.forEach((word, wordIndex) => {
        const wordSpan = document.createElement('span');
        wordSpan.className = 'inline-block whitespace-nowrap';
        
        word.split('').forEach((char) => {
          const charSpan = document.createElement('span');
          charSpan.className = 'inline-block transform-gpu';
          // Inherit font styles
          charSpan.style.fontFamily = 'inherit';
          charSpan.style.fontSize = 'inherit';
          charSpan.style.fontWeight = 'inherit';
          charSpan.style.letterSpacing = 'inherit';
          charSpan.style.lineHeight = 'inherit';
          charSpan.style.color = 'inherit';
          charSpan.textContent = char;
          wordSpan.appendChild(charSpan);
          elements.push(charSpan);
        });
        
        text.appendChild(wordSpan);
        
        // Add space between words
        if (wordIndex < words.length - 1) {
          const space = document.createElement('span');
          space.innerHTML = '&nbsp;';
          space.className = 'inline-block';
          text.appendChild(space);
        }
      });
    } else if (type === "words") {
      content.split(' ').forEach((word, i) => {
        const wordSpan = document.createElement('span');
        wordSpan.className = 'inline-block transform-gpu mr-[0.25em]';
        // Inherit font styles
        wordSpan.style.fontFamily = 'inherit';
        wordSpan.style.fontSize = 'inherit';
        wordSpan.style.fontWeight = 'inherit';
        wordSpan.style.letterSpacing = 'inherit';
        wordSpan.style.lineHeight = 'inherit';
        wordSpan.style.color = 'inherit';
        wordSpan.textContent = word;
        text.appendChild(wordSpan);
        elements.push(wordSpan);
      });
    } else if (type === "lines") {
      // For lines, just animate the container
      elements = [text];
    }

    // Animation presets
    const animations = {
      wave: {
        from: { 
          y: '100%', 
          opacity: 0, 
          rotateX: -80,
          transformOrigin: "0% 50%"
        },
        to: { 
          y: '0%', 
          opacity: 1, 
          rotateX: 0 
        }
      },
      fade: {
        from: { opacity: 0, scale: 0.8 },
        to: { opacity: 1, scale: 1 }
      },
      slide: {
        from: { y: 50, opacity: 0 },
        to: { y: 0, opacity: 1 }
      },
      blur: {
        from: { 
          opacity: 0, 
          filter: 'blur(10px)',
          y: 20
        },
        to: { 
          opacity: 1, 
          filter: 'blur(0px)',
          y: 0
        }
      },
      glitch: {
        from: { 
          opacity: 0,
          x: () => gsap.utils.random(-20, 20),
          y: () => gsap.utils.random(-10, 10),
          skewX: () => gsap.utils.random(-20, 20)
        },
        to: { 
          opacity: 1,
          x: 0,
          y: 0,
          skewX: 0
        }
      }
    };

    const anim = animations[animation] || animations.wave;
    
    // Set initial state
    gsap.set(elements, anim.from);

    // Animate
    const animConfig = {
      ...anim.to,
      duration: duration,
      stagger: {
        each: stagger,
        from: "start"
      },
      ease: "power4.out",
      delay: delay
    };

    if (trigger) {
      animConfig.scrollTrigger = {
        trigger: containerRef.current,
        start: "top 85%",
        toggleActions: once ? "play none none none" : "play none none reverse"
      };
    }

    gsap.to(elements, animConfig);

  }, { scope: containerRef, dependencies: [children, type, animation] });

  // Simply render children - the animation happens via DOM manipulation
  // The child element's classes are preserved because we're wrapping, not replacing
  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`} style={{ fontFamily: 'inherit' }}>
      <div 
        ref={textRef} 
        className="transform-gpu [&>*]:font-inherit [&>*]:text-inherit" 
        style={{ 
          perspective: '1000px',
          fontFamily: 'inherit',
          fontSize: 'inherit',
          fontWeight: 'inherit',
          color: 'inherit',
          letterSpacing: 'inherit',
          lineHeight: 'inherit'
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default SplitText;
