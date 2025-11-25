import { motion } from 'motion/react';
import { ReviewTrends } from './ReviewTrends';
import { TopInsights } from './TopInsights';
import { ProductsTable } from './ProductsTable';
import { EnhancedStatsCard } from './EnhancedStatsCard';
import { TrendingUp, Users, Star, MessageSquare } from 'lucide-react';
import { useLoadingState } from '../hooks/useLoadingState';
import { StatCardSkeleton, ChartSkeleton, TableSkeleton } from './shared/LoadingSkeletons';

export function Overview() {
  const isLoading = useLoadingState(800);

  const statsCards = [
    {
      title: 'Total Reviews',
      value: '12,543',
      change: '+18.2%',
      changeType: 'positive',
      icon: MessageSquare,
      sparklineData: [30, 40, 35, 50, 45, 60, 55, 70, 65, 75],
      gradient: { from: '#E3F221', to: '#C7D61E' } // Lime
    },
    {
      title: 'Average Rating',
      value: '4.6',
      change: '+0.3',
      changeType: 'positive',
      icon: Star,
      sparklineData: [4.2, 4.3, 4.4, 4.3, 4.5, 4.5, 4.6, 4.6, 4.7, 4.6],
      gradient: { from: '#5B5F97', to: '#4A4E85' } // Purple
    },
    {
      title: 'Active Products',
      value: '48',
      change: '+5',
      changeType: 'positive',
      icon: TrendingUp,
      sparklineData: [40, 41, 42, 43, 43, 44, 45, 46, 47, 48],
      gradient: { from: '#47423D', to: '#2D2A26' } // Dark
    },
    {
      title: 'Response Rate',
      value: '94%',
      change: '+2.1%',
      changeType: 'positive',
      icon: Users,
      sparklineData: [88, 89, 90, 91, 92, 92, 93, 93, 94, 94],
      gradient: { from: '#06B6D4', to: '#0891B2' } // Cyan (Secondary)
    }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 
            className="text-3xl sm:text-4xl text-gray-900 dark:text-white tracking-tight font-heading font-bold"
          >
            Overview
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Welcome back! Here's what's happening with your reviews.</p>
        </div>
      </motion.div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {isLoading ? (
          <>
            {[...Array(4)].map((_, i) => (
              <StatCardSkeleton key={i} />
            ))}
          </>
        ) : (
          statsCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <EnhancedStatsCard {...stat} />
            </motion.div>
          ))
        )}
      </div>

      {/* Top Section - Chart and Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="lg:col-span-2"
        >
          {isLoading ? <ChartSkeleton /> : <ReviewTrends />}
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {isLoading ? <ChartSkeleton /> : <TopInsights />}
        </motion.div>
      </div>

      {/* Products Table */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {isLoading ? <TableSkeleton rows={5} /> : <ProductsTable />}
      </motion.div>
    </div>
  );
}
