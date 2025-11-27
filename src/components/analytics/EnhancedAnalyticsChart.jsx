import { motion } from 'framer-motion';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { TrendingUp, TrendingDown, Info } from 'lucide-react';
import { useState } from 'react';

// Enhanced data with metadata for annotations
const data = [
  { day: '1', value: 120, label: 'Day 1' },
  { day: '2', value: 210, label: 'Day 2' },
  { day: '3', value: 180, label: 'Day 3' },
  { day: '4', value: 260, label: 'Day 4' },
  { day: '5', value: 220, label: 'Day 5' },
  { day: '6', value: 380, label: 'Day 6', annotation: 'Spike after discount campaign', isPeak: true },
  { day: '7', value: 190, label: 'Day 7' },
  { day: '8', value: 140, label: 'Day 8', annotation: 'Drop after poor delivery week', isTrough: true },
  { day: '9', value: 240, label: 'Day 9' },
  { day: '10', value: 280, label: 'Day 10' },
  { day: '11', value: 330, label: 'Day 11' },
  { day: '12', value: 290, label: 'Day 12' },
  { day: '13', value: 250, label: 'Day 13' },
  { day: '14', value: 310, label: 'Day 14' },
  { day: '15', value: 270, label: 'Day 15' },
  { day: '16', value: 340, label: 'Day 16' },
  { day: '17', value: 290, label: 'Day 17' },
  { day: '18', value: 320, label: 'Day 18' },
  { day: '19', value: 280, label: 'Day 19' },
  { day: '20', value: 360, label: 'Day 20 (Today)', isRecent: true },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const prevValue = payload[0].payload.day > 1 ? 280 : 0; // Mock previous value
    const change = data.value - prevValue;
    const changePercent = prevValue > 0 ? ((change / prevValue) * 100).toFixed(1) : '0';

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-xl backdrop-blur-sm"
      >
        <p className="text-xs text-[#6B7C93] dark:text-gray-400 mb-1">{data.label}</p>
        <p className="text-2xl font-bold text-[#32325D] dark:text-white mb-2">
          {data.value.toLocaleString()}
        </p>
        
        {/* Trend Indicator */}
        {prevValue > 0 && (
          <div className={`flex items-center gap-1.5 text-sm ${
            change >= 0 ? 'text-[#00B86B]' : 'text-[#FF5B5B]'
          }`}>
            {change >= 0 ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span className="font-semibold">
              {change >= 0 ? '+' : ''}{changePercent}%
            </span>
            <span className="text-xs opacity-75">vs previous day</span>
          </div>
        )}

        {/* Annotation */}
        {data.annotation && (
          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-[#3297FF] flex-shrink-0 mt-0.5" />
              <p className="text-xs text-[#6B7C93] dark:text-gray-400 italic">
                {data.annotation}
              </p>
            </div>
          </div>
        )}
      </motion.div>
    );
  }
  return null;
};

// Custom dot for the most recent data point
const CustomDot = (props) => {
  const { cx, cy, payload } = props;
  
  if (payload.isRecent) {
    return (
      <g>
        {/* Pulsing outer ring */}
        <motion.circle
          cx={cx}
          cy={cy}
          r={8}
          fill="#635BFF"
          opacity={0.3}
          initial={{ r: 8, opacity: 0.3 }}
          animate={{ r: 12, opacity: 0 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
        {/* Main dot */}
        <circle cx={cx} cy={cy} r={5} fill="#635BFF" stroke="#fff" strokeWidth={2} />
      </g>
    );
  }
  
  if (payload.isPeak) {
    return <circle cx={cx} cy={cy} r={5} fill="#00B86B" stroke="#fff" strokeWidth={2} />;
  }
  
  if (payload.isTrough) {
    return <circle cx={cx} cy={cy} r={5} fill="#FF5B5B" stroke="#fff" strokeWidth={2} />;
  }
  
  return null;
};

export function EnhancedAnalyticsChart() {
  const [timeRange, setTimeRange] = useState('monthly');
  const [isVisible, setIsVisible] = useState(false);

  // Calculate overall trend
  const firstValue = data[0].value;
  const lastValue = data[data.length - 1].value;
  const overallChange = lastValue - firstValue;
  const overallChangePercent = ((overallChange / firstValue) * 100).toFixed(1);

  // Trigger animation on mount
  useState(() => {
    setTimeout(() => setIsVisible(true), 100);
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-xl text-[#32325D] dark:text-white font-semibold">Review Trends</h2>
            
            {/* Overall Trend Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-sm font-medium ${
                overallChange >= 0 
                  ? 'bg-[#E6F9F2] text-[#00B86B]' 
                  : 'bg-[#FFE8E8] text-[#FF5B5B]'
              }`}
            >
              {overallChange >= 0 ? (
                <TrendingUp className="w-3.5 h-3.5" />
              ) : (
                <TrendingDown className="w-3.5 h-3.5" />
              )}
              <span>{overallChange >= 0 ? '+' : ''}{overallChangePercent}%</span>
            </motion.div>
          </div>
          <p className="text-sm text-[#6B7C93] dark:text-gray-400">
            Daily review volume • Last 20 days
          </p>
        </div>

        {/* Time Range Selector */}
        <div className="flex gap-2">
          <button
            onClick={() => setTimeRange('weekly')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              timeRange === 'weekly'
                ? 'text-white shadow-sm'
                : 'text-[#6B7C93] dark:text-gray-400 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            style={timeRange === 'weekly' ? { background: 'linear-gradient(135deg, #635BFF 0%, #00D4FF 100%)' } : {}}
          >
            Weekly
          </button>
          <button
            onClick={() => setTimeRange('monthly')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              timeRange === 'monthly'
                ? 'text-white shadow-sm'
                : 'text-[#6B7C93] dark:text-gray-400 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            style={timeRange === 'monthly' ? { background: 'linear-gradient(135deg, #635BFF 0%, #00D4FF 100%)' } : {}}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* Chart */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#635BFF" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#00D4FF" stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#E0E6ED" 
              vertical={false}
              opacity={0.5}
            />
            
            <XAxis
              dataKey="day"
              stroke="#6B7C93"
              tick={{ fill: '#6B7C93', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              label={{ value: 'Days', position: 'insideBottom', offset: -5, fill: '#6B7C93', fontSize: 12 }}
            />
            
            <YAxis
              stroke="#6B7C93"
              tick={{ fill: '#6B7C93', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              label={{ value: 'Reviews', angle: -90, position: 'insideLeft', fill: '#6B7C93', fontSize: 12 }}
            />
            
            <Tooltip content={<CustomTooltip />} />
            
            <Area
              type="monotone"
              dataKey="value"
              stroke="#635BFF"
              strokeWidth={2}
              fill="url(#colorGradient)"
              animationDuration={1500}
              animationBegin={0}
              dot={<CustomDot />}
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Legend - Annotations */}
      <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
        <div className="flex flex-wrap gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#635BFF] ring-2 ring-white dark:ring-gray-900"></div>
            <span className="text-[#6B7C93] dark:text-gray-400">Most recent (pulsing)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#00B86B] ring-2 ring-white dark:ring-gray-900"></div>
            <span className="text-[#6B7C93] dark:text-gray-400">Peak (hover for insights)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#FF5B5B] ring-2 ring-white dark:ring-gray-900"></div>
            <span className="text-[#6B7C93] dark:text-gray-400">Drop (hover for insights)</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
