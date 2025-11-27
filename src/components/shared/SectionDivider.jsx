import { motion } from 'framer-motion';

export function SectionDivider({ title, subtitle, className = '' }) {
  if (!title && !subtitle) {
    return (
      <div className={`relative ${className}`}>
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300 dark:border-gray-700" />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`relative ${className}`}
    >
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t-2 border-gray-200 dark:border-gray-800" />
      </div>
      <div className="relative flex justify-start">
        <span className="bg-gradient-to-r from-white via-white to-transparent dark:from-gray-950 dark:via-gray-950 dark:to-transparent pr-6 py-1">
          {title && (
            <span className="font-bold text-lg text-gray-900 dark:text-white">
              {title}
            </span>
          )}
          {subtitle && (
            <span className="ml-3 text-xs text-gray-500 dark:text-gray-400">
              {subtitle}
            </span>
          )}
        </span>
      </div>
    </motion.div>
  );
}
