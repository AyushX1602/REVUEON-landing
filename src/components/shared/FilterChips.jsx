import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

const colorClasses = {
  teal: 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 border-teal-300 dark:border-teal-700',
  purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-700',
  cyan: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 border-cyan-300 dark:border-cyan-700',
  orange: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-300 dark:border-orange-700',
};

export function FilterChips({ filters, onRemove, onClearAll }) {
  if (filters.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap items-center gap-2"
    >
      <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
        Active filters ({filters.length}):
      </span>
      
      <AnimatePresence mode="popLayout">
        {filters.map((filter) => (
          <motion.div
            key={filter.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${
              colorClasses[filter.color || 'teal']
            }`}
          >
            <span className="font-semibold">{filter.label}:</span>
            <span>{filter.value}</span>
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onRemove(filter.id)}
              className="ml-1 p-0.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
              aria-label={`Remove ${filter.label} filter`}
            >
              <X className="w-3 h-3" />
            </motion.button>
          </motion.div>
        ))}
      </AnimatePresence>

      {filters.length > 1 && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClearAll}
          className="text-xs text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 font-medium transition-colors underline"
        >
          Clear all
        </motion.button>
      )}
    </motion.div>
  );
}
