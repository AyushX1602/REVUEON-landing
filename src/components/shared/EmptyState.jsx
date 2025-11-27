import { motion } from 'framer-motion';

export function EmptyState({ 
  icon: Icon, 
  title, 
  description, 
  action,
  size = 'md' 
}) {
  const sizeClasses = {
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16'
  };

  const iconSizes = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`flex flex-col items-center justify-center text-center ${sizeClasses[size]}`}
    >
      {/* Animated Icon */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
        className="relative mb-4"
      >
        {/* Pulsing background */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.1, 0.3]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className={`absolute inset-0 ${iconSizes[size]} rounded-full`}
          style={{ background: 'radial-gradient(circle, #635BFF20, transparent)' }}
        />
        
        {/* Icon */}
        <div 
          className={`relative ${iconSizes[size]} flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800`}
        >
          <Icon className={`${size === 'sm' ? 'w-6 h-6' : size === 'md' ? 'w-8 h-8' : 'w-10 h-10'} text-gray-400 dark:text-gray-500`} />
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-sm"
      >
        <h3 
          className="text-lg text-gray-900 dark:text-white mb-2"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {title}
        </h3>
        <p 
          className="text-sm text-gray-500 dark:text-gray-400 mb-6"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {description}
        </p>

        {/* Action Button */}
        {action && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={action.onClick}
            className="px-4 py-2 text-sm text-white rounded-lg shadow-sm transition-all"
            style={{ 
              background: 'linear-gradient(135deg, #635BFF 0%, #00D4FF 100%)',
              fontFamily: 'var(--font-body)'
            }}
          >
            {action.label}
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  );
}
