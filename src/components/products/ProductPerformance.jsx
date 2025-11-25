import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', reviews: 340, rating: 4.5 },
  { month: 'Feb', reviews: 420, rating: 4.6 },
  { month: 'Mar', reviews: 380, rating: 4.4 },
  { month: 'Apr', reviews: 510, rating: 4.7 },
  { month: 'May', reviews: 480, rating: 4.6 },
  { month: 'Jun', reviews: 620, rating: 4.8 },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-lg">
        <p className="text-sm text-gray-900 dark:text-white mb-1">{payload[0].payload.month}</p>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-600 dark:text-gray-400">Reviews:</span>
          <span className="text-xs font-medium text-teal-600 dark:text-teal-400">{payload[0].value}</span>
        </div>
      </div>
    );
  }
  return null;
};

export function ProductPerformance() {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl text-gray-900 dark:text-white">Product Performance Trend</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Review volume over time</p>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorReviews" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" vertical={false} />
          <XAxis
            dataKey="month"
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
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="reviews"
            stroke="#14b8a6"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorReviews)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
