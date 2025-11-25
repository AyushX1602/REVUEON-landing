import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export function Toast({ message, type, onClose, duration = 4000 }) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    
    // Animate progress bar
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);
      
      if (remaining === 0) {
        clearInterval(interval);
      }
    }, 16); // ~60fps
    
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [duration, onClose]);

  const config = {
    success: {
      icon: CheckCircle,
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      borderColor: 'border-green-500 dark:border-green-400',
      textColor: 'text-green-800 dark:text-green-200',
      iconColor: 'text-green-500 dark:text-green-400',
      progressColor: 'bg-green-500 dark:bg-green-400',
    },
    error: {
      icon: AlertCircle,
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      borderColor: 'border-red-500 dark:border-red-400',
      textColor: 'text-red-800 dark:text-red-200',
      iconColor: 'text-red-500 dark:text-red-400',
      progressColor: 'bg-red-500 dark:bg-red-400',
    },
    info: {
      icon: Info,
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-500 dark:border-blue-400',
      textColor: 'text-blue-800 dark:text-blue-200',
      iconColor: 'text-blue-500 dark:text-blue-400',
      progressColor: 'bg-blue-500 dark:bg-blue-400',
    },
  };

  const { icon: Icon, bgColor, borderColor, textColor, iconColor, progressColor } = config[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="relative overflow-hidden"
    >
      <div className={`flex items-center gap-3 px-4 py-3 rounded-lg border-l-4 ${bgColor} ${borderColor} shadow-lg backdrop-blur-sm`}>
        <Icon className={`w-5 h-5 flex-shrink-0 ${iconColor}`} />
        <p className={`text-sm font-medium flex-1 ${textColor}`}>{message}</p>
        <button
          onClick={onClose}
          className={`flex-shrink-0 p-1 rounded hover:bg-black/10 dark:hover:bg-white/10 transition-colors ${textColor}`}
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700">
        <motion.div
          className={`h-full ${progressColor}`}
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.016, ease: 'linear' }}
        />
      </div>
    </motion.div>
  );
}

export function ToastContainer({ toasts, onRemove }) {
  return (
    <div className="fixed top-20 right-4 z-[100] space-y-2 max-w-md">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => onRemove(toast.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
