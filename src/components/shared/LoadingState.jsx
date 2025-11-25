import { motion } from 'motion/react';
import { Loader2 } from 'lucide-react';

export function LoadingState({ 
  message = 'Loading...', 
  variant = 'spinner',
  size = 'md'
}) {
  
  const sizeClasses = {
    sm: 'py-4',
    md: 'py-8',
    lg: 'py-12'
  };

  if (variant === 'skeleton') {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="space-y-3"
          >
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" style={{ width: '80%' }} />
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" style={{ width: '60%' }} />
          </motion.div>
        ))}
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div className={`flex flex-col items-center justify-center ${sizeClasses[size]}`}>
        <div className="flex items-center gap-2 mb-3">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -12, 0],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.15,
                ease: 'easeInOut'
              }}
              className="w-2 h-2 rounded-full"
              style={{ background: 'linear-gradient(135deg, #635BFF 0%, #00D4FF 100%)' }}
            />
          ))}
        </div>
        {message && (
          <p 
            className="text-sm text-gray-500 dark:text-gray-400"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {message}
          </p>
        )}
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <div className={`flex flex-col items-center justify-center ${sizeClasses[size]}`}>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.5, 1]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="w-16 h-16 rounded-full mb-3"
          style={{ background: 'linear-gradient(135deg, #635BFF 0%, #00D4FF 100%)' }}
        />
        {message && (
          <p 
            className="text-sm text-gray-500 dark:text-gray-400"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {message}
          </p>
        )}
      </div>
    );
  }

  // Default: spinner variant
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`flex flex-col items-center justify-center ${sizeClasses[size]}`}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="mb-3"
      >
        <Loader2 
          className={`${
            size === 'sm' ? 'w-6 h-6' : 
            size === 'md' ? 'w-8 h-8' : 
            'w-12 h-12'
          }`}
          style={{ color: '#635BFF' }}
        />
      </motion.div>
      {message && (
        <motion.p
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-gray-500 dark:text-gray-400"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {message}
        </motion.p>
      )}
    </motion.div>
  );
}
