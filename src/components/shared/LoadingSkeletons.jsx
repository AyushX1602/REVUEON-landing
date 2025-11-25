import { motion } from 'motion/react';

// Shimmer animation
const shimmer = {
  animate: {
    backgroundPosition: ['200% 0', '-200% 0'],
  },
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: 'linear',
  },
};

export function StatCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <motion.div
          {...shimmer}
          className="w-10 h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-lg"
          style={{ backgroundSize: '200% 100%' }}
        />
        <motion.div
          {...shimmer}
          className="w-16 h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded"
          style={{ backgroundSize: '200% 100%' }}
        />
      </div>
      <motion.div
        {...shimmer}
        className="w-24 h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded mb-2"
        style={{ backgroundSize: '200% 100%' }}
      />
      <motion.div
        {...shimmer}
        className="w-32 h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded"
        style={{ backgroundSize: '200% 100%' }}
      />
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
      <div className="mb-6">
        <motion.div
          {...shimmer}
          className="w-48 h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded mb-2"
          style={{ backgroundSize: '200% 100%' }}
        />
        <motion.div
          {...shimmer}
          className="w-64 h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded"
          style={{ backgroundSize: '200% 100%' }}
        />
      </div>
      <motion.div
        {...shimmer}
        className="w-full h-64 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-lg"
        style={{ backgroundSize: '200% 100%' }}
      />
    </div>
  );
}

export function TableSkeleton({ rows = 5 }) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm">
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <motion.div
          {...shimmer}
          className="w-48 h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded"
          style={{ backgroundSize: '200% 100%' }}
        />
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-800">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="p-4 flex items-center gap-4">
            <motion.div
              {...shimmer}
              className="w-12 h-12 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded"
              style={{ backgroundSize: '200% 100%' }}
            />
            <div className="flex-1 space-y-2">
              <motion.div
                {...shimmer}
                className="w-3/4 h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded"
                style={{ backgroundSize: '200% 100%' }}
              />
              <motion.div
                {...shimmer}
                className="w-1/2 h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded"
                style={{ backgroundSize: '200% 100%' }}
              />
            </div>
            <motion.div
              {...shimmer}
              className="w-20 h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded"
              style={{ backgroundSize: '200% 100%' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ListSkeleton({ items = 4 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: items }).map((_, i) => (
        <motion.div
          key={i}
          {...shimmer}
          className="w-full h-16 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-lg"
          style={{ backgroundSize: '200% 100%' }}
        />
      ))}
    </div>
  );
}
