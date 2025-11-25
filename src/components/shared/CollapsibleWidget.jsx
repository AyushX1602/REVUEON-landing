import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

export function CollapsibleWidget({ 
  title, 
  subtitle, 
  children, 
  defaultExpanded = true,
  className = ''
}) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className={`bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm ${className}`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-6 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors rounded-t-xl"
        aria-expanded={isExpanded}
        aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${title}`}
      >
        <div>
          <h2 className="text-xl text-gray-900 dark:text-white">{title}</h2>
          {subtitle && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>
          )}
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </motion.div>
      </button>
      
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
