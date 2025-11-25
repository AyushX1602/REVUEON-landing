import { motion } from 'motion/react';
import { TrendingUp } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const sentimentData = [
  { name: 'Positive', value: 68, color: '#10b981' },
  { name: 'Neutral', value: 22, color: '#f59e0b' },
  { name: 'Negative', value: 10, color: '#ef4444' },
];

export function SentimentOverview() {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 sm:p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4 sm:mb-6">
        <div>
          <h2 className="text-lg sm:text-xl text-gray-900 dark:text-white">Overall Sentiment Analysis</h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">Customer sentiment distribution</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 rounded-lg w-fit">
          <TrendingUp className="w-4 h-4" />
          <span className="text-xs sm:text-sm">+12% vs last month</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="flex items-center justify-center">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={sentimentData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {sentimentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend 
                verticalAlign="bottom" 
                height={36}
                formatter={(value, entry) => (
                  <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    {value} ({entry.payload.value}%)
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Sentiment Stats */}
        <div className="flex flex-col justify-center space-y-3 sm:space-y-4">
          {sentimentData.map((sentiment, index) => (
            <motion.div
              key={sentiment.name}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 sm:p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div
                  className="w-3 h-3 sm:w-4 sm:h-4 rounded-full"
                  style={{ backgroundColor: sentiment.color }}
                />
                <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">{sentiment.name} Reviews</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-base sm:text-lg text-gray-900 dark:text-white">{sentiment.value}%</span>
                <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  {sentiment.name === 'Positive' ? '4,280' : sentiment.name === 'Neutral' ? '1,386' : '630'} reviews
                </span>
              </div>
            </motion.div>
          ))}
          
          <div className="pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Total Reviews Analyzed</span>
              <span className="text-base sm:text-lg text-gray-900 dark:text-white">6,296</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
