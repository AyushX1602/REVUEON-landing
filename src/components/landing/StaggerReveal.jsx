import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Section reveal with staggered children animation
 * Perfect for lists, grids, and content blocks
 */
const StaggerReveal = ({ 
  children, 
  className = "",
  childSelector = "> *", // CSS selector for children to animate
  stagger = 0.1,
  duration = 0.8,
  y = 60,
  x = 0,
  opacity = 0,
  scale = 1,
  rotation = 0,
  ease = "power3.out",
  start = "top 85%",
  once = true,
  delay = 0
}) => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const children = container.querySelectorAll(childSelector);
    
    gsap.fromTo(children,
      { 
        y: y,
        x: x,
        opacity: opacity,
        scale: scale,
        rotation: rotation
      },
      {
        y: 0,
        x: 0,
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: duration,
        stagger: stagger,
        ease: ease,
        delay: delay,
        scrollTrigger: {
          trigger: container,
          start: start,
          toggleActions: once ? "play none none none" : "play none none reverse"
        }
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

/**
 * Single element reveal animation
 */
export const RevealOnScroll = ({ 
  children, 
  className = "",
  animation = "fadeUp", // "fadeUp" | "fadeIn" | "slideLeft" | "slideRight" | "zoom" | "flip"
  duration = 0.8,
  delay = 0,
  ease = "power3.out",
  start = "top 85%",
  once = true
}) => {
  const elementRef = useRef(null);

  useGSAP(() => {
    const element = elementRef.current;
    if (!element) return;

    const animations = {
      fadeUp: { from: { y: 60, opacity: 0 }, to: { y: 0, opacity: 1 } },
      fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
      slideLeft: { from: { x: 100, opacity: 0 }, to: { x: 0, opacity: 1 } },
      slideRight: { from: { x: -100, opacity: 0 }, to: { x: 0, opacity: 1 } },
      zoom: { from: { scale: 0.8, opacity: 0 }, to: { scale: 1, opacity: 1 } },
      flip: { from: { rotationX: 90, opacity: 0 }, to: { rotationX: 0, opacity: 1 } }
    };

    const anim = animations[animation] || animations.fadeUp;

    gsap.fromTo(element, anim.from, {
      ...anim.to,
      duration,
      delay,
      ease,
      scrollTrigger: {
        trigger: element,
        start,
        toggleActions: once ? "play none none none" : "play none none reverse"
      }
    });
  }, { scope: elementRef });

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};

export default StaggerReveal;
