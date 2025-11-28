import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

/**
 * Premium page preloader with REVUEON branding
 * Shows loading progress then transitions to Kinetic intro reveal
 */
const Preloader = ({ onComplete }) => {
  const [phase, setPhase] = useState('loading'); // 'loading' | 'kinetic' | 'done'
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const progressRef = useRef(null);
  const kineticRef = useRef(null);
  const kineticTextRef = useRef(null);
  const kineticSubRef = useRef(null);

  // Phase 1: Loading Progress
  useEffect(() => {
    if (phase !== 'loading') return;
    
    const duration = 2000;
    const startTime = Date.now();
    
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(Math.round(newProgress));
      
      if (newProgress < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        // Loading complete - transition to kinetic phase
        setTimeout(() => {
          transitionToKinetic();
        }, 300);
      }
    };
    
    requestAnimationFrame(updateProgress);
  }, [phase]);

  // Transition from loading to kinetic
  const transitionToKinetic = () => {
    const tl = gsap.timeline({
      onComplete: () => setPhase('kinetic')
    });

    // Fade out progress elements
    tl.to(progressRef.current, {
      opacity: 0,
      y: -30,
      duration: 0.4,
      ease: "power2.in"
    })
    .to(logoRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.3,
      ease: "power2.in"
    }, "-=0.2")
    .to(containerRef.current, {
      backgroundColor: "#E3F221",
      duration: 0.5,
      ease: "power2.inOut"
    }, "-=0.1");
  };

  // Phase 2: Kinetic Intro Animation
  useEffect(() => {
    if (phase !== 'kinetic') return;
    
    // Set initial states
    gsap.set(kineticTextRef.current, { y: 100, opacity: 0, scale: 0.9 });
    gsap.set(kineticSubRef.current, { y: 50, opacity: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        setPhase('done');
        onComplete?.();
      }
    });

    // Kinetic Intro Animation Sequence
    tl.to(kineticTextRef.current, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "power3.out"
    })
    .to(kineticSubRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power3.out"
    }, "-=0.4")
    // Hold for a moment
    .to({}, { duration: 0.6 })
    // Dramatic exit - zoom and blur out
    .to(kineticTextRef.current, {
      scale: 2,
      opacity: 0,
      filter: "blur(20px)",
      duration: 0.7,
      ease: "power2.in"
    })
    .to(kineticSubRef.current, {
      scale: 1.5,
      opacity: 0,
      filter: "blur(10px)",
      duration: 0.5,
      ease: "power2.in"
    }, "-=0.5")
    // Slide up to reveal content
    .to(kineticRef.current, {
      yPercent: -100,
      duration: 0.9,
      ease: "power4.inOut"
    }, "-=0.2");

  }, [phase, onComplete]);

  // Logo animation on mount
  useEffect(() => {
    if (!logoRef.current || phase !== 'loading') return;
    
    gsap.fromTo(logoRef.current, 
      { scale: 0.8, opacity: 0, rotateY: -90 },
      { 
        scale: 1, 
        opacity: 1, 
        rotateY: 0,
        duration: 0.8, 
        ease: "back.out(1.7)" 
      }
    );
  }, [phase]);

  if (phase === 'done') return null;

  return (
    <div className="fixed inset-0 z-[9999]">
      {/* Phase 1: Loading Screen */}
      {phase === 'loading' && (
        <motion.div
          ref={containerRef}
          className="absolute inset-0 flex flex-col items-center justify-center bg-[#0A0A0A]"
          initial={{ opacity: 1 }}
        >
          {/* Animated Background Grid */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:60px_60px]" />
            
            {/* Animated gradient orbs */}
            <motion.div
              className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E3F221]/10 blur-[100px]"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 w-[400px] h-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#5B5F97]/20 blur-[80px]"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>

          {/* Logo */}
          <div ref={logoRef} className="relative z-10 mb-8">
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {/* Logo Icon - Letter R */}
              <div className="relative w-20 h-20">
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#E3F221] to-[#c9d41c]"
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(227, 242, 33, 0.3)",
                      "0 0 50px rgba(227, 242, 33, 0.6)",
                      "0 0 20px rgba(227, 242, 33, 0.3)"
                    ]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-5xl font-black text-[#0A0A0A] font-heading">R</span>
                </div>
              </div>
              
              {/* Logo Text */}
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-white font-heading tracking-tight">
                  REVU<span className="text-[#E3F221]">EON</span>
                </span>
              </div>
            </motion.div>
          </div>

          {/* Progress */}
          <div ref={progressRef} className="relative z-10 w-64">
            {/* Progress Bar */}
            <div className="h-1 bg-white/10 rounded-full overflow-hidden mb-4">
              <motion.div
                className="h-full bg-gradient-to-r from-[#E3F221] to-[#5B5F97] rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            
            {/* Progress Text */}
            <div className="flex justify-between items-center">
              <motion.span 
                className="text-sm text-white/50 font-mono"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                Loading Experience
              </motion.span>
              <span className="text-sm text-[#E3F221] font-mono font-bold">
                {progress}%
              </span>
            </div>
          </div>

          {/* Decorative corners */}
          <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-[#E3F221]/30" />
          <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-[#E3F221]/30" />
          <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-[#E3F221]/30" />
          <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-[#E3F221]/30" />
        </motion.div>
      )}

      {/* Phase 2: Kinetic Intro */}
      {phase === 'kinetic' && (
        <div 
          ref={kineticRef}
          className="absolute inset-0 bg-[#E3F221] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Kinetic Background Pattern */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#47423D08_1px,transparent_1px),linear-gradient(to_bottom,#47423D08_1px,transparent_1px)] bg-[size:80px_80px]" />
          </div>

          <div className="relative z-10 text-center">
            <h1 
              ref={kineticTextRef}
              className="text-7xl md:text-[10rem] lg:text-[12rem] font-bold text-[#47423D] font-heading leading-none tracking-tighter"
            >
              REVUEON
            </h1>
            <p 
              ref={kineticSubRef}
              className="text-lg md:text-2xl lg:text-3xl font-medium text-[#47423D]/80 mt-4 tracking-[0.3em] uppercase"
            >
              The Future of Analytics
            </p>
          </div>

          {/* Decorative Elements */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#47423D] animate-pulse" />
            <div className="w-2 h-2 rounded-full bg-[#47423D] animate-pulse" style={{ animationDelay: '0.2s' }} />
            <div className="w-2 h-2 rounded-full bg-[#47423D] animate-pulse" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Preloader;
