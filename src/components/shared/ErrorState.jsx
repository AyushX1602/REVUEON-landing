import { motion } from 'motion/react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export function ErrorState({ 
  title = 'Something went wrong',
  message, 
  onRetry,
  variant = 'card'
}) {
  
  if (variant === 'inline') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-2 p-3 bg-[#FFE8E8] dark:bg-[#FF5B5B]/10 border border-[#FF5B5B]/20 rounded-lg"
      >
        <AlertCircle className="w-4 h-4 text-[#FF5B5B] flex-shrink-0" />
        <p className="text-sm text-[#FF5B5B] dark:text-[#FF5B5B]">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="ml-auto text-xs text-[#FF5B5B] hover:text-[#E63946] underline"
          >
            Retry
          </button>
        )}
      </motion.div>
    );
  }

  if (variant === 'full') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center min-h-[400px] text-center"
      >
        {/* Error Icon with Animation */}
        <motion.div
          animate={{ 
            rotate: [0, -5, 5, -5, 0],
          }}
          transition={{ 
            duration: 0.5,
            repeat: 3,
            ease: 'easeInOut'
          }}
          className="relative mb-6"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.1, 0.3]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="absolute inset-0 w-20 h-20 rounded-full"
            style={{ background: 'radial-gradient(circle, #FF5B5B40, transparent)' }}
          />
          <div className="relative w-20 h-20 flex items-center justify-center rounded-full bg-[#FFE8E8] dark:bg-[#FF5B5B]/10">
            <AlertCircle className="w-10 h-10 text-[#FF5B5B]" />
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 
            className="text-xl text-gray-900 dark:text-white mb-2"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 max-w-md">
            {message}
          </p>

          {onRetry && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onRetry}
              className="flex items-center gap-2 px-4 py-2 text-sm text-white rounded-lg shadow-sm"
              style={{ background: 'linear-gradient(135deg, #FF5B5B 0%, #E63946 100%)' }}
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </motion.button>
          )}
        </motion.div>
      </motion.div>
    );
  }

  // Default: card variant
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-white dark:bg-gray-900 border border-[#FF5B5B]/20 rounded-xl"
    >
      <div className="flex items-start gap-4">
        <div className="p-2 bg-[#FFE8E8] dark:bg-[#FF5B5B]/10 rounded-lg flex-shrink-0">
          <AlertCircle className="w-5 h-5 text-[#FF5B5B]" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 
            className="text-base text-gray-900 dark:text-white mb-1"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {title}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            {message}
          </p>

          {onRetry && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onRetry}
              className="flex items-center gap-2 px-3 py-1.5 text-xs text-[#FF5B5B] border border-[#FF5B5B]/30 rounded-lg hover:bg-[#FFE8E8] dark:hover:bg-[#FF5B5B]/10 transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
              Retry
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
