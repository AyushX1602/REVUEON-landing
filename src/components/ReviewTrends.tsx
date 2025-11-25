import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

const data = [
  { month: 'Jan', reviews: 400 },
  { month: 'Feb', reviews: 650 },
  { month: 'Mar', reviews: 800 },
  { month: 'Apr', reviews: 950 },
  { month: 'May', reviews: 1100 },
  { month: 'Jun', reviews: 1250 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const currentValue = payload[0].value;
    const prevValue = payload[0].payload.reviews > 400 ? 400 : 0; // Mock
    const change = currentValue - prevValue;
    const changePercent = prevValue > 0 ? ((change / prevValue) * 100).toFixed(1) : '0';

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-xl"
      >
        <p className="text-sm font-semibold text-[#32325D] dark:text-white mb-1">{payload[0].payload.month}</p>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs text-[#6B7C93] dark:text-gray-400">Reviews:</span>
          <span className="text-lg font-bold text-[#635BFF]">{currentValue.toLocaleString()}</span>
        </div>
        {prevValue > 0 && (
          <div className={`flex items-center gap-1 text-xs ${
            change >= 0 ? 'text-[#00B86B]' : 'text-[#FF5B5B]'
          }`}>
            <TrendingUp className={`w-3 h-3 ${change < 0 ? 'rotate-180' : ''}`} />
            <span className="font-medium">
              {change >= 0 ? '+' : ''}{changePercent}%
            </span>
          </div>
        )}
      </motion.div>
    );
  }
  return null;
};

export function ReviewTrends() {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm h-full hover:shadow-md transition-shadow duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
        <div>
          <h2 className="text-xl text-[#32325D] dark:text-white font-semibold">Review Trends</h2>
          <p className="text-sm text-[#6B7C93] dark:text-gray-400 mt-1">Monthly review count over the last 6 months</p>
        </div>
        <div className="mt-3 sm:mt-0">
          <select className="px-3 py-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#635BFF]" aria-label="Select time period">
            <option>Last 6 months</option>
            <option>Last 3 months</option>
            <option>Last year</option>
          </select>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#635BFF" stopOpacity={1}/>
              <stop offset="100%" stopColor="#00D4FF" stopOpacity={0.8}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E0E6ED" vertical={false} opacity={0.5} />
          <XAxis 
            dataKey="month" 
            tick={{ fill: '#6B7C93', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            tick={{ fill: '#6B7C93', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="reviews" 
            fill="url(#barGradient)" 
            radius={[8, 8, 0, 0]}
            animationDuration={1000}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}