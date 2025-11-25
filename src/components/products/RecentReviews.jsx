import { motion } from 'motion/react';
import { Star, ThumbsUp, ThumbsDown } from 'lucide-react';

const reviews = [
  {
    id: 1,
    product: 'Wireless Headphones Pro Max',
    customer: 'John D.',
    rating: 5,
    comment: 'Excellent sound quality! Battery life is amazing.',
    sentiment: 'positive',
    date: '2 hours ago',
  },
  {
    id: 2,
    product: 'Smart Watch Series 5',
    customer: 'Sarah M.',
    rating: 4,
    comment: 'Great features but the charging time could be better.',
    sentiment: 'neutral',
    date: '5 hours ago',
  },
  {
    id: 3,
    product: 'USB-C Fast Charging Cable',
    customer: 'Mike R.',
    rating: 5,
    comment: 'Fast charging works perfectly. Highly recommend!',
    sentiment: 'positive',
    date: '1 day ago',
  },
  {
    id: 4,
    product: 'Bluetooth Speaker Mini',
    customer: 'Emma L.',
    rating: 3,
    comment: 'Sound is decent but not as loud as expected.',
    sentiment: 'negative',
    date: '1 day ago',
  },
];

export function RecentReviews() {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl text-gray-900 dark:text-white">Recent Reviews</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Latest customer feedback</p>
      </div>

      <div className="space-y-4">
        {reviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.05 }}
            className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-teal-200 dark:hover:border-teal-700 hover:bg-teal-50/30 dark:hover:bg-teal-900/10 transition-all"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm text-gray-900 dark:text-white">{review.customer}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">•</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{review.date}</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">{review.product}</p>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < review.rating
                        ? 'text-yellow-500 fill-yellow-500'
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{review.comment}</p>
            <div className="flex items-center justify-between">
              <div
                className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                  review.sentiment === 'positive'
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                    : review.sentiment === 'neutral'
                    ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                    : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                }`}
              >
                {review.sentiment === 'positive' ? (
                  <ThumbsUp className="w-3 h-3" />
                ) : (
                  <ThumbsDown className="w-3 h-3" />
                )}
                {review.sentiment.charAt(0).toUpperCase() + review.sentiment.slice(1)}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
