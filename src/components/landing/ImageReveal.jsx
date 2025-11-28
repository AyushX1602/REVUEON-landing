import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Image reveal effect with clip-path animations
 * Creates dramatic image reveals on scroll
 */
const ImageReveal = ({ 
  src, 
  alt = "",
  className = "",
  direction = "left", // "left" | "right" | "top" | "bottom" | "center"
  duration = 1,
  delay = 0,
  ease = "power3.inOut",
  overlay = true,
  overlayColor = "#E3F221"
}) => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const overlayRef = useRef(null);

  useGSAP(() => {
    const container = containerRef.current;
    const image = imageRef.current;
    const overlayEl = overlayRef.current;

    // Define clip paths based on direction
    const clipPaths = {
      left: {
        from: 'inset(0 100% 0 0)',
        to: 'inset(0 0% 0 0)'
      },
      right: {
        from: 'inset(0 0 0 100%)',
        to: 'inset(0 0 0 0%)'
      },
      top: {
        from: 'inset(0 0 100% 0)',
        to: 'inset(0 0 0% 0)'
      },
      bottom: {
        from: 'inset(100% 0 0 0)',
        to: 'inset(0% 0 0 0)'
      },
      center: {
        from: 'inset(50% 50% 50% 50%)',
        to: 'inset(0% 0% 0% 0%)'
      }
    };

    const clip = clipPaths[direction] || clipPaths.left;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        once: true
      }
    });

    // Image reveal
    tl.fromTo(image, 
      { clipPath: clip.from, scale: 1.3 },
      { 
        clipPath: clip.to, 
        scale: 1,
        duration: duration,
        delay: delay,
        ease: ease
      }
    );

    // Overlay animation (if enabled)
    if (overlay && overlayEl) {
      tl.fromTo(overlayEl,
        { scaleX: direction === 'left' || direction === 'right' ? 0 : 1, 
          scaleY: direction === 'top' || direction === 'bottom' ? 0 : 1 },
        { 
          scaleX: 1, 
          scaleY: 1,
          duration: duration * 0.5,
          ease: "power2.inOut"
        }, 0)
        .to(overlayEl, {
          scaleX: direction === 'left' || direction === 'right' ? 0 : 1,
          scaleY: direction === 'top' || direction === 'bottom' ? 0 : 1,
          transformOrigin: direction === 'left' ? 'right center' : 
                          direction === 'right' ? 'left center' :
                          direction === 'top' ? 'center bottom' : 'center top',
          duration: duration * 0.5,
          ease: "power2.inOut"
        });
    }

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <img 
        ref={imageRef}
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        style={{ clipPath: 'inset(0 100% 0 0)' }}
      />
      {overlay && (
        <div 
          ref={overlayRef}
          className="absolute inset-0 z-10"
          style={{ 
            backgroundColor: overlayColor,
            transformOrigin: direction === 'left' ? 'left center' : 
                            direction === 'right' ? 'right center' :
                            direction === 'top' ? 'center top' : 'center bottom'
          }}
        />
      )}
    </div>
  );
};

export default ImageReveal;
