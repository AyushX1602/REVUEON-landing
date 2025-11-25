import { motion } from 'motion/react';
import { AlertTriangle, Package } from 'lucide-react';

const priorities = [
  {
    product: 'Product B - Wireless Headphones',
    issue: 'Delayed shipping times',
    impact: 'High',
    reviews: 186,
    priority: 1,
  },
  {
    product: 'Product E - Smart Watch',
    issue: 'Size inconsistencies reported',
    impact: 'Medium',
    reviews: 124,
    priority: 2,
  },
  {
    product: 'Product C - USB Cable',
    issue: 'Product packaging issues',
    impact: 'Medium',
    reviews: 98,
    priority: 3,
  },
  {
    product: 'Product A - Phone Case',
    issue: 'Color mismatch complaints',
    impact: 'Low',
    reviews: 67,
    priority: 4,
  },
];

export function FixThisFirst() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm h-full">
      <div className="mb-6">
        <h2 className="text-xl text-gray-900">Fix This First</h2>
        <p className="text-sm text-gray-500 mt-1">Prioritized issues by impact</p>
      </div>

      <div className="space-y-3">
        {priorities.map((item, index) => (
          <motion.div
            key={index}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.05 }}
            className={`p-4 rounded-lg border-l-4 ${
              item.impact === 'High'
                ? 'bg-red-50 border-red-500'
                : item.impact === 'Medium'
                ? 'bg-yellow-50 border-yellow-500'
                : 'bg-blue-50 border-blue-500'
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-start gap-3 flex-1">
                <div className={`p-1.5 rounded-lg ${
                  item.impact === 'High'
                    ? 'bg-red-100'
                    : item.impact === 'Medium'
                    ? 'bg-yellow-100'
                    : 'bg-blue-100'
                }`}>
                  <AlertTriangle className={`w-4 h-4 ${
                    item.impact === 'High'
                      ? 'text-red-600'
                      : item.impact === 'Medium'
                      ? 'text-yellow-600'
                      : 'text-blue-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Package className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-900">{item.product}</span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{item.issue}</p>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      item.impact === 'High'
                        ? 'bg-red-100 text-red-700'
                        : item.impact === 'Medium'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {item.impact} Impact
                    </span>
                    <span className="text-xs text-gray-500">{item.reviews} mentions</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center w-8 h-8 bg-white rounded-full text-sm text-gray-700">
                #{item.priority}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
