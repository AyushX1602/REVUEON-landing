import { motion } from 'motion/react';
import { Star, TrendingUp, AlertCircle, Search, Filter, ArrowUpDown } from 'lucide-react';
import { useState, useMemo } from 'react';
import { EmptyState } from '../shared/EmptyState';

const products = [
  {
    id: 1,
    name: 'Wireless Headphones Pro Max',
    category: 'Electronics',
    rating: 4.8,
    reviews: 1240,
    positive: 85,
    neutral: 10,
    negative: 5,
    status: 'Excellent',
  },
  {
    id: 2,
    name: 'Smart Watch Series 5',
    category: 'Wearables',
    rating: 4.7,
    reviews: 980,
    positive: 78,
    neutral: 15,
    negative: 7,
    status: 'Good',
  },
  {
    id: 3,
    name: 'USB-C Fast Charging Cable',
    category: 'Accessories',
    rating: 4.6,
    reviews: 856,
    positive: 72,
    neutral: 20,
    negative: 8,
    status: 'Good',
  },
  {
    id: 4,
    name: 'Premium Phone Case',
    category: 'Accessories',
    rating: 4.9,
    reviews: 742,
    positive: 92,
    neutral: 6,
    negative: 2,
    status: 'Excellent',
  },
  {
    id: 5,
    name: 'Bluetooth Speaker Mini',
    category: 'Electronics',
    rating: 4.2,
    reviews: 420,
    positive: 65,
    neutral: 22,
    negative: 13,
    status: 'Needs Attention',
  },
];

export function ProductList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortField, setSortField] = useState('reviews');
  const [sortOrder, setSortOrder] = useState('desc');

  // Get unique categories
  const categories = useMemo(() => {
    return ['all', ...new Set(products.map(p => p.category))];
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });

    // Sort
    filtered.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      
      if (typeof aVal === 'string') aVal = aVal.toLowerCase();
      if (typeof bVal === 'string') bVal = bVal.toLowerCase();

      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    return filtered;
  }, [searchQuery, categoryFilter, sortField, sortOrder]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm">
      <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-800">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <h2 className="text-lg sm:text-xl text-gray-900 dark:text-white">All Products</h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              {filteredProducts.length} of {products.length} products
            </p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400"
              aria-label="Search products"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400"
              aria-label="Filter by category"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <EmptyState
          icon={Search}
          title="No products found"
          description={`No products match your search "${searchQuery}". Try adjusting your filters.`}
          action={
            <button
              onClick={() => {
                setSearchQuery('');
                setCategoryFilter('all');
              }}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              Clear Filters
            </button>
          }
        />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                <th className="text-left p-3 sm:p-4">
                  <button
                    onClick={() => handleSort('name')}
                    className="flex items-center gap-1 text-xs sm:text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    aria-label="Sort by product name"
                  >
                    Product Name
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="text-left p-3 sm:p-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400">Category</th>
                <th className="text-left p-3 sm:p-4">
                  <button
                    onClick={() => handleSort('rating')}
                    className="flex items-center gap-1 text-xs sm:text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    aria-label="Sort by rating"
                  >
                    Rating
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="text-left p-3 sm:p-4">
                  <button
                    onClick={() => handleSort('reviews')}
                    className="flex items-center gap-1 text-xs sm:text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    aria-label="Sort by review count"
                  >
                    Reviews
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="text-left p-3 sm:p-4">
                  <button
                    onClick={() => handleSort('positive')}
                    className="flex items-center gap-1 text-xs sm:text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    aria-label="Sort by sentiment"
                  >
                    Sentiment
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="text-left p-3 sm:p-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product, index) => (
                <motion.tr
                  key={product.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <td className="p-3 sm:p-4">
                    <span className="text-xs sm:text-sm text-gray-900 dark:text-white">{product.name}</span>
                  </td>
                  <td className="p-3 sm:p-4">
                    <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{product.category}</span>
                  </td>
                  <td className="p-3 sm:p-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-xs sm:text-sm text-gray-900 dark:text-white">{product.rating}</span>
                    </div>
                  </td>
                  <td className="p-3 sm:p-4">
                    <span className="text-xs sm:text-sm text-gray-900 dark:text-white">{product.reviews}</span>
                  </td>
                  <td className="p-3 sm:p-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden flex min-w-[60px]">
                        <div
                          className="bg-green-500"
                          style={{ width: `${product.positive}%` }}
                        />
                        <div
                          className="bg-yellow-500"
                          style={{ width: `${product.neutral}%` }}
                        />
                        <div
                          className="bg-red-500"
                          style={{ width: `${product.negative}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{product.positive}%</span>
                    </div>
                  </td>
                  <td className="p-3 sm:p-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full text-xs ${
                        product.status === 'Excellent'
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                          : product.status === 'Good'
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                          : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                      }`}
                    >
                      {product.status === 'Needs Attention' && (
                        <AlertCircle className="w-3 h-3" />
                      )}
                      {product.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
