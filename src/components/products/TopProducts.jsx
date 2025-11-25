import { motion } from 'motion/react';
import { Star, TrendingUp } from 'lucide-react';

const topProducts = [
  { name: 'Wireless Headphones', rating: 4.8, reviews: 1240, trend: '+15%' },
  { name: 'Smart Watch Pro', rating: 4.7, reviews: 980, trend: '+22%' },
  { name: 'USB-C Cable', rating: 4.6, reviews: 856, trend: '+8%' },
  { name: 'Phone Case Premium', rating: 4.9, reviews: 742, trend: '+18%' },
];

export function TopProducts() {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl text-gray-900 dark:text-white">Top Products</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Best performing items</p>
      </div>

      <div className="space-y-4">
        {topProducts.map((product, index) => (
          <motion.div
            key={index}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.05 }}
            className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <span className="text-sm text-gray-900 dark:text-white">{product.name}</span>
              <div className="flex items-center gap-1 text-sm text-teal-600 dark:text-teal-400">
                <TrendingUp className="w-3 h-3" />
                {product.trend}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">{product.rating}</span>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">{product.reviews} reviews</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
