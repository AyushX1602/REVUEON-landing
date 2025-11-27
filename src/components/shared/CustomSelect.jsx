import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const colorClasses = {
  teal: {
    border: 'border-teal-300 dark:border-teal-600',
    focus: 'ring-teal-500 dark:ring-teal-400',
    icon: 'text-teal-600 dark:text-teal-400',
    selected: 'bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400',
  },
  purple: {
    border: 'border-purple-300 dark:border-purple-600',
    focus: 'ring-purple-500 dark:ring-purple-400',
    icon: 'text-purple-600 dark:text-purple-400',
    selected: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
  },
  cyan: {
    border: 'border-cyan-300 dark:border-cyan-600',
    focus: 'ring-cyan-500 dark:ring-cyan-400',
    icon: 'text-cyan-600 dark:text-cyan-400',
    selected: 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400',
  },
  orange: {
    border: 'border-orange-300 dark:border-orange-600',
    focus: 'ring-orange-500 dark:ring-orange-400',
    icon: 'text-orange-600 dark:text-orange-400',
    selected: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400',
  },
};

export function CustomSelect({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  icon,
  color = 'teal',
  className = '',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const colors = colorClasses[color];

  const selectedOption = options.find(opt => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-1.5 text-sm border bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg transition-all duration-200 hover:${colors.border} focus:outline-none focus:ring-2 focus:${colors.focus} ${
          isOpen ? colors.border : 'border-gray-200 dark:border-gray-700'
        }`}
      >
        {icon && <span className={colors.icon}>{icon}</span>}
        <span className="whitespace-nowrap">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50 overflow-hidden max-h-64 overflow-y-auto"
          >
            {options.map((option) => (
              <motion.button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                whileHover={{ backgroundColor: 'rgba(156, 163, 175, 0.1)' }}
                className={`w-full px-3 py-2.5 text-left text-sm transition-colors flex items-center justify-between ${
                  value === option.value
                    ? colors.selected
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                <span>{option.label}</span>
                {value === option.value && (
                  <Check className="w-4 h-4 flex-shrink-0" />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
