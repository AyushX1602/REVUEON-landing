import { motion } from 'motion/react';
import { ThumbsUp, AlertCircle } from 'lucide-react';

const insights = [
  {
    type: 'positive',
    icon: ThumbsUp,
    title: 'Top Positive',
    items: [
      { text: 'Great quality', count: 1245 },
      { text: 'Fast shipping', count: 892 },
      { text: 'Excellent service', count: 734 },
    ],
  },
  {
    type: 'negative',
    icon: AlertCircle,
    title: 'Top Negative',
    items: [
      { text: 'Size runs small', count: 234 },
      { text: 'Delayed delivery', count: 187 },
      { text: 'Color mismatch', count: 156 },
    ],
  },
];

export function TopInsights() {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm h-full">
      <h2 className="text-xl text-gray-900 dark:text-white mb-6">Key Insights</h2>

      <div className="space-y-6">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          const isPositive = insight.type === 'positive';

          return (
            <motion.div
              key={insight.title}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div
                  className={`p-2 rounded-lg ${
                    isPositive ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`}
                  />
                </div>
                <h3 className="text-sm text-gray-900 dark:text-white">{insight.title}</h3>
              </div>

              <div className="space-y-2">
                {insight.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors"
                  >
                    <span className="text-sm text-gray-700 dark:text-gray-300">{item.text}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700 px-2 py-1 rounded">
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}