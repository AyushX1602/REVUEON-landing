import { motion, useMotionValue, useTransform, animate } from 'motion/react';
import { TrendingUp, TrendingDown, Users, ShoppingCart, Eye, Star } from 'lucide-react';
import { useEffect } from 'react';

function Counter({ value, duration = 2 }) {
  const count = useMotionValue(0);
  
  // Extract numeric value from string (e.g., "12,345" -> 12345, "45.2K" -> 45.2)
  const numericValue = parseFloat(value.replace(/,/g, '').replace('K', ''));
  const isK = value.includes('K');
  
  useEffect(() => {
    const controls = animate(count, numericValue, { 
      duration: 0.8,
      ease: "easeOut"
    });
    
    return controls.stop;
  }, [numericValue, duration, count]);

  return (
    <motion.span>
      {useTransform(count, (latest) => {
        const rounded = Math.floor(latest);
        if (isK) {
          return `${(latest).toFixed(1)}K`;
        }
        return rounded.toLocaleString();
      })}
    </motion.span>
  );
}

const stats = [
  {
    label: 'Total Reviews',
    value: '12,345',
    change: '+12.5%',
    isPositive: true,
    icon: Star,
  },
  {
    label: 'Active Users',
    value: '8,234',
    change: '+8.2%',
    isPositive: true,
    icon: Users,
  },
  {
    label: 'Page Views',
    value: '45.2K',
    change: '-3.1%',
    isPositive: false,
    icon: Eye,
  },
  {
    label: 'Conversions',
    value: '1,234',
    change: '+15.3%',
    isPositive: true,
    icon: ShoppingCart,
  },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -4, boxShadow: '0 12px 24px -8px rgba(99, 91, 255, 0.25)' }}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm hover:border-[#635BFF]/20 transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-lg" style={{ background: 'linear-gradient(135deg, #635BFF15, #00D4FF10)' }}>
                <Icon className="w-5 h-5 text-[#635BFF]" />
              </div>
              <div className={`flex items-center gap-1 text-sm ${
                stat.isPositive ? 'text-[#00B86B]' : 'text-[#FF5B5B]'
              }`}>
                {stat.isPositive ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                {stat.change}
              </div>
            </div>
            <div>
              <p className="text-2xl text-gray-900 dark:text-white mb-1">
                <Counter value={stat.value} duration={2 + index * 0.2} />
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
