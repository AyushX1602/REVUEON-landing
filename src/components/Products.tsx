import { motion } from 'motion/react';
import { ProductList } from './products/ProductList';
import { ProductPerformance } from './products/ProductPerformance';
import { TopProducts } from './products/TopProducts';
import { RecentReviews } from './products/RecentReviews';
import { Download, Filter } from 'lucide-react';

export function Products() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 
            className="text-3xl sm:text-4xl text-gray-900 dark:text-white tracking-tight"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: 'var(--tracking-tight)' }}
          >
            Products Reports
          </h1>
          <p 
            className="text-sm text-gray-600 dark:text-gray-400 mt-1"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Detailed product analytics and reviews
          </p>
        </div>
        <div className="flex gap-2 sm:gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
            aria-label="Filter products"
          >
            <Filter className="w-4 h-4" />
            Filter
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm text-white rounded-lg transition-all shadow-lg"
            style={{ background: 'linear-gradient(135deg, #635BFF 0%, #00D4FF 100%)' }}
            aria-label="Export report"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export Report</span>
            <span className="sm:hidden">Export</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Top Section - Performance and Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          <ProductPerformance />
        </motion.div>
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <TopProducts />
        </motion.div>
      </div>

      {/* Product List */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <ProductList />
      </motion.div>

      {/* Recent Reviews */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <RecentReviews />
      </motion.div>
    </div>
  );
}