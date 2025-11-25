import { motion } from 'motion/react';
import { TrendingUp, Download } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Sector } from 'recharts';
import { useState } from 'react';

const sentimentData = [
  { name: 'Positive', value: 68, color: '#00B86B', count: 4280 },
  { name: 'Neutral', value: 22, color: '#FFC542', count: 1386 },
  { name: 'Negative', value: 10, color: '#FF5B5B', count: 630 },
];

const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload } = props;

  return (
    <g>
      {/* Outer glow */}
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        opacity={0.3}
      />
      {/* Main sector */}
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 5}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      {/* Center text */}
      <text x={cx} y={cy - 10} textAnchor="middle" fill={fill} className="font-bold text-2xl">
        {payload.value}%
      </text>
      <text x={cx} y={cy + 10} textAnchor="middle" fill="currentColor" className="text-sm opacity-60">
        {payload.name}
      </text>
      <text x={cx} y={cy + 28} textAnchor="middle" fill="currentColor" className="text-xs opacity-40">
        {payload.count.toLocaleString()} reviews
      </text>
    </g>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const lastMonthValue = data.value - 3; // Mock data
    const change = data.value - lastMonthValue;
    const changePercent = ((change / lastMonthValue) * 100).toFixed(1);

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-xl"
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: data.color }} />
          <p className="font-semibold text-gray-900 dark:text-white">{data.name} Reviews</p>
        </div>
        <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{data.value}%</p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          {data.count.toLocaleString()} reviews
        </p>
        <div className={`flex items-center gap-1 text-xs ${change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
          <TrendingUp className={`w-3 h-3 ${change < 0 ? 'rotate-180' : ''}`} />
          <span className="font-medium">
            {change >= 0 ? '+' : ''}{changePercent}% vs last month
          </span>
        </div>
      </motion.div>
    );
  }
  return null;
};

export function InteractiveSentimentChart() {
  const [activeIndex, setActiveIndex] = useState(undefined);

  const handleExport = () => {
    // In a real app, this would export the chart as PNG
    alert('Chart exported! (Demo mode)');
  };

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(undefined);
  };

  const handleClick = (entry) => {
    console.log('Filter by:', entry.name);
    // In real app: filterReviews(entry.name)
    alert(`Filter applied: ${entry.name} reviews only (Demo mode)`);
  };

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 sm:p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4 sm:mb-6">
        <div>
          <h2 className="text-lg sm:text-xl text-gray-900 dark:text-white">Overall Sentiment Analysis</h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Click segments to filter • Hover for insights
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: 'linear-gradient(135deg, #00B86B15, #00B86B10)', color: '#00B86B' }}>
            <TrendingUp className="w-4 h-4" />
            <span className="text-xs sm:text-sm font-medium">+12% vs last month</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleExport}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
            title="Export chart"
          >
            <Download className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Interactive Pie Chart */}
        <div className="flex items-center justify-center">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={sentimentData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
                onClick={(data) => handleClick(data)}
                style={{ cursor: 'pointer' }}
              >
                {sentimentData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                    style={{ 
                      filter: activeIndex === index ? 'brightness(1.1)' : 'brightness(1)',
                      transition: 'filter 0.3s'
                    }}
                  />
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

        {/* Sentiment Stats with Click Handlers */}
        <div className="flex flex-col justify-center space-y-3 sm:space-y-4">
          {sentimentData.map((sentiment, index) => (
            <motion.button
              key={sentiment.name}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleClick(sentiment)}
              className="flex items-center justify-between p-3 sm:p-4 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all cursor-pointer group text-left"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div
                  className="w-3 h-3 sm:w-4 sm:h-4 rounded-full group-hover:scale-125 transition-transform"
                  style={{ backgroundColor: sentiment.color }}
                />
                <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">{sentiment.name} Reviews</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-base sm:text-lg text-gray-900 dark:text-white">{sentiment.value}%</span>
                <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  {sentiment.count.toLocaleString()} reviews
                </span>
              </div>
            </motion.button>
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
