import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const colors = ['#635BFF', '#00D4FF', '#00B86B', '#FFC542', '#FF5B5B', '#3297FF'];

export function Confetti({ trigger, onComplete }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (trigger) {
      const newParticles = [];
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: -20,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * 360,
          scale: Math.random() * 0.5 + 0.5
        });
      }
      setParticles(newParticles);

      // Clear particles after animation
      const timeout = setTimeout(() => {
        setParticles([]);
        onComplete?.();
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [trigger, onComplete]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{
              x: particle.x,
              y: particle.y,
              opacity: 1,
              rotate: particle.rotation,
              scale: particle.scale
            }}
            animate={{
              y: window.innerHeight + 100,
              x: particle.x + (Math.random() - 0.5) * 200,
              rotate: particle.rotation + 360 * (Math.random() > 0.5 ? 1 : -1),
              opacity: [1, 1, 0]
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 2 + Math.random() * 1,
              ease: 'easeIn'
            }}
            className="absolute w-3 h-3 rounded-sm"
            style={{ backgroundColor: particle.color }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
