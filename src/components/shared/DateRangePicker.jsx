import { motion } from 'motion/react';
import { Calendar, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const dateRanges = [
  { label: 'Last 7 days', value: '7d', shortLabel: '7D' },
  { label: 'Last 30 days', value: '30d', shortLabel: '30D' },
  { label: 'Last 3 months', value: '3m', shortLabel: '3M' },
  { label: 'Last 6 months', value: '6m', shortLabel: '6M' },
  { label: 'Last year', value: '1y', shortLabel: '1Y' },
  { label: 'All time', value: 'all', shortLabel: 'All' },
  { label: 'Custom range', value: 'custom', shortLabel: 'Custom' },
];

export function DateRangePicker({ onChange }) {
  const [selectedRange, setSelectedRange] = useState('30d');
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSelect = (value) => {
    setSelectedRange(value);
    setShowDropdown(false);
    onChange?.(value);
  };

  const selectedLabel = dateRanges.find(r => r.value === selectedRange)?.label || 'Last 30 days';

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-teal-300 dark:hover:border-teal-600 transition-all duration-200 text-sm"
      >
        <Calendar className="w-4 h-4 text-teal-600 dark:text-teal-400" />
        <span className="text-gray-900 dark:text-white hidden sm:inline">{selectedLabel}</span>
        <span className="text-gray-900 dark:text-white sm:hidden">
          {dateRanges.find(r => r.value === selectedRange)?.shortLabel}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
      </motion.button>

      {showDropdown && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setShowDropdown(false)}
          />
          
          {/* Dropdown */}
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-20 overflow-hidden"
          >
            {dateRanges.map((range) => (
              <motion.button
                key={range.value}
                onClick={() => handleSelect(range.value)}
                whileHover={{ backgroundColor: 'rgba(20, 184, 166, 0.1)' }}
                className={`w-full px-4 py-2.5 text-left text-sm transition-colors ${
                  selectedRange === range.value
                    ? 'bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 font-medium'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {range.label}
              </motion.button>
            ))}
          </motion.div>
        </>
      )}
    </div>
  );
}
