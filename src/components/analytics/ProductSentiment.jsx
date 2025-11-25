import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

const productData = [
  { name: 'Product A', positive: 85, neutral: 10, negative: 5 },
  { name: 'Product B', positive: 72, neutral: 18, negative: 10 },
  { name: 'Product C', positive: 65, neutral: 25, negative: 10 },
  { name: 'Product D', positive: 90, neutral: 7, negative: 3 },
  { name: 'Product E', positive: 58, neutral: 30, negative: 12 },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-lg">
        <p className="text-sm text-gray-900 dark:text-white mb-2">{payload[0].payload.name}</p>
        {payload.map((entry) => (
          <div key={entry.dataKey} className="flex items-center justify-between gap-4">
            <span className="text-xs text-gray-600 dark:text-gray-400 capitalize">{entry.dataKey}</span>
            <span className="text-xs font-medium" style={{ color: entry.fill }}>{entry.value}%</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function ProductSentiment() {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm h-full">
      <div className="mb-6">
        <h2 className="text-xl text-gray-900 dark:text-white">Product-wise Sentiment</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Sentiment breakdown by product</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={productData}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" vertical={false} />
          <XAxis
            dataKey="name"
            className="text-gray-500 dark:text-gray-400"
            tick={{ fill: 'currentColor', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            className="text-gray-500 dark:text-gray-400"
            tick={{ fill: 'currentColor', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(156, 163, 175, 0.1)' }} />
          <Bar dataKey="positive" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} />
          <Bar dataKey="neutral" stackId="a" fill="#f59e0b" radius={[0, 0, 0, 0]} />
          <Bar dataKey="negative" stackId="a" fill="#ef4444" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-sm text-gray-600 dark:text-gray-400">Positive</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <span className="text-sm text-gray-600 dark:text-gray-400">Neutral</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <span className="text-sm text-gray-600 dark:text-gray-400">Negative</span>
        </div>
      </div>
    </div>
  );
}
