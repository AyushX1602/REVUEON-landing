import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const MagneticButton = ({ children, className = "", onClick, strength = 0.3 }) => {
  const buttonRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    const button = buttonRef.current;
    const text = textRef.current;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = button.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);

      gsap.to(button, {
        x: x * strength,
        y: y * strength,
        rotation: x * 0.02,
        duration: 0.4,
        ease: "power2.out"
      });

      gsap.to(text, {
        x: x * (strength * 0.5),
        y: y * (strength * 0.5),
        duration: 0.4,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to([button, text], {
        x: 0,
        y: 0,
        rotation: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.3)"
      });
    };

    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, { scope: buttonRef });

  return (
    <div
      ref={buttonRef}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center overflow-visible rounded-full transition-transform cursor-pointer ${className}`}
    >
      <span ref={textRef} className="relative z-10 block">
        {children}
      </span>
    </div>
  );
};

export default MagneticButton;
