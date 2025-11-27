import { motion, AnimatePresence } from 'framer-motion';
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { useState } from 'react';

interface EnhancedStatsCardProps {
  title: string;
  value: string | number;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  sparklineData?: number[];
  gradient?: { from: string; to: string };
}

export function EnhancedStatsCard({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  sparklineData = [20, 35, 30, 45, 40, 55, 50, 65, 60, 70],
  gradient = { from: '#14b8a6', to: '#0f766e' }
}: EnhancedStatsCardProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const changeColor =
    changeType === 'positive' ? 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20' :
      changeType === 'negative' ? 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20' :
        'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800';

  const TrendIcon = changeType === 'positive' ? TrendingUp : changeType === 'negative' ? TrendingDown : Minus;

  const data = sparklineData.map((value, index) => ({ value, index }));

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      whileHover={{
        y: -8,
        transition: { duration: 0.2 }
      }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 relative overflow-hidden group cursor-pointer hover:border-[#E3F221]/50 dark:hover:border-[#E3F221]/50"
      style={{
        zIndex: 1,
        boxShadow: '0 1px 3px rgba(99, 91, 255, 0.08)',
      }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Animated Background Gradient */}
      <motion.div
        className="absolute top-0 right-0 w-40 h-40 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle, ${gradient.from}, transparent)`
        }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Glow Effect on Hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(135deg, ${gradient.from}15, ${gradient.to}15)`,
        }}
      />

      <div className="flex items-start justify-between mb-4 relative z-10">
        <div className="flex-1">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{title}</p>
          <motion.h3
            className="text-3xl sm:text-4xl text-gray-900 dark:text-white tracking-tight"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 15,
              delay: 0.1
            }}
          >
            {value}
          </motion.h3>
        </div>

        <motion.div
          className="p-3 rounded-xl shadow-lg"
          style={{
            background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})`
          }}
          whileHover={{ rotate: 10, scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <Icon className="w-5 h-5 text-white" />
        </motion.div>
      </div>

      {/* Sparkline with Animation */}
      <div className="h-14 mb-3 -mx-2 relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Line
              type="monotone"
              dataKey="value"
              stroke={gradient.from}
              strokeWidth={2.5}
              dot={false}
              animationDuration={1200}
              animationBegin={0}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Enhanced Change Indicator with Arrow */}
      <div className="flex items-center justify-between relative z-10">
        <motion.span
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${changeColor}`}
          whileHover={{ scale: 1.05 }}
        >
          <TrendIcon className="w-3.5 h-3.5" />
          {change}
        </motion.span>
        <span className="text-xs text-gray-500 dark:text-gray-400">vs last month</span>
      </div>

      {/* Tooltip on Hover */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 dark:bg-gray-800 text-white text-xs rounded-lg shadow-xl whitespace-nowrap z-50"
          >
            {changeType === 'positive' ? '📈 Trending up' : changeType === 'negative' ? '📉 Trending down' : '➡️ Stable'}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-800 rotate-45 -mt-1" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}