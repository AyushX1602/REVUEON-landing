import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'Product - 1234',
    action: 'Refresh',
    actionStyle: 'green',
    reviews: 1500,
    insights: '2456 reviews',
    growth: '+15.6%',
  },
  {
    id: 2,
    name: 'Product - 5678',
    action: 'Download',
    actionStyle: 'gray',
    reviews: 3200,
    insights: '10,000 reviews',
    growth: '+20.1%',
  },
  {
    id: 3,
    name: 'Product - 91011',
    action: 'View',
    actionStyle: 'green',
    reviews: 2800,
    insights: '2456 reviews',
    growth: '+18.3%',
  },
  {
    id: 4,
    name: 'Product - 121314',
    action: 'Refresh',
    actionStyle: 'gray',
    reviews: 1900,
    insights: '6,000 reviews',
    growth: '+22.0%',
  },
];

export function ProductsTable() {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
              <th className="text-left p-4 text-sm text-gray-600 dark:text-gray-400">Analytics</th>
              <th className="text-left p-4 text-sm text-gray-600 dark:text-gray-400">Dashboard</th>
              <th className="text-left p-4 text-sm text-gray-600 dark:text-gray-400">Review Count</th>
              <th className="text-left p-4 text-sm text-gray-600 dark:text-gray-400">Insights</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <motion.tr
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <td className="p-4">
                  <span className="text-sm text-gray-900 dark:text-white">{product.name}</span>
                </td>
                <td className="p-4">
                  <button
                    className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
                      product.actionStyle === 'green'
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {product.action}
                  </button>
                </td>
                <td className="p-4">
                  <span className="text-sm text-gray-900 dark:text-white">{product.reviews.toLocaleString()}</span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm whitespace-nowrap">
                      {product.insights}
                    </span>
                    <div className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
                      <TrendingUp className="w-4 h-4" />
                      {product.growth}
                    </div>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}