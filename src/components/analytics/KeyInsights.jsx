import { motion } from 'motion/react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

const positiveInsights = [
  { text: 'Excellent product quality', count: 1240 },
  { text: 'Fast shipping and delivery', count: 980 },
  { text: 'Great customer service', count: 856 },
  { text: 'Value for money', count: 742 },
];

const negativeInsights = [
  { text: 'Delayed shipping times', count: 320 },
  { text: 'Product packaging issues', count: 186 },
  { text: 'Size inconsistencies', count: 124 },
];

export function KeyInsights() {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm h-full">
      <div className="mb-6">
        <h2 className="text-xl text-gray-900 dark:text-white">Key Insights</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Top positives and negatives</p>
      </div>

      <div className="space-y-6">
        {/* Positive Insights */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <ThumbsUp className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-sm text-gray-900 dark:text-white">Top Positives</h3>
          </div>
          <div className="space-y-2">
            {positiveInsights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-3 rounded-lg bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
              >
                <span className="text-sm text-gray-700 dark:text-gray-300">{insight.text}</span>
                <span className="text-sm text-green-600 dark:text-green-400 px-2 py-0.5 bg-white dark:bg-gray-800 rounded-full">
                  {insight.count}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Negative Insights */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <ThumbsDown className="w-4 h-4 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-sm text-gray-900 dark:text-white">Top Negatives</h3>
          </div>
          <div className="space-y-2">
            {negativeInsights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.05 + 0.2 }}
                className="flex items-center justify-between p-3 rounded-lg bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
              >
                <span className="text-sm text-gray-700 dark:text-gray-300">{insight.text}</span>
                <span className="text-sm text-red-600 dark:text-red-400 px-2 py-0.5 bg-white dark:bg-gray-800 rounded-full">
                  {insight.count}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
