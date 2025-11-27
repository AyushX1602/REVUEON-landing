import { motion } from 'framer-motion';
import { Calendar, Filter, TrendingUp, Package } from 'lucide-react';
import { useState } from 'react';
import { CustomSelect } from './CustomSelect';
import { FilterChips } from './FilterChips';

const timeOptions = [
  { value: 'all', label: 'All Time' },
  { value: '7d', label: 'Last 7 days' },
  { value: '30d', label: 'Last 30 days' },
  { value: '3m', label: 'Last 3 months' },
  { value: '6m', label: 'Last 6 months' },
  { value: '1y', label: 'Last year' },
];

const productOptions = [
  { value: 'all', label: 'All Products' },
  { value: 'a', label: 'Product A' },
  { value: 'b', label: 'Product B' },
  { value: 'c', label: 'Product C' },
  { value: 'd', label: 'Product D' },
  { value: 'e', label: 'Product E' },
];

const sentimentOptions = [
  { value: 'all', label: 'All Sentiments' },
  { value: 'positive', label: 'Positive Only' },
  { value: 'neutral', label: 'Neutral Only' },
  { value: 'negative', label: 'Negative Only' },
];

export function DashboardFilters() {
  const [timePeriod, setTimePeriod] = useState('30d');
  const [product, setProduct] = useState('all');
  const [sentiment, setSentiment] = useState('all');

  const activeFilters = [
    timePeriod !== '30d' && {
      id: 'time',
      label: 'Time',
      value: timeOptions.find(o => o.value === timePeriod)?.label || '',
      color: 'teal',
    },
    product !== 'all' && {
      id: 'product',
      label: 'Product',
      value: productOptions.find(o => o.value === product)?.label || '',
      color: 'purple',
    },
    sentiment !== 'all' && {
      id: 'sentiment',
      label: 'Sentiment',
      value: sentimentOptions.find(o => o.value === sentiment)?.label || '',
      color: 'cyan',
    },
  ].filter(Boolean);

  const handleRemoveFilter = (id) => {
    if (id === 'time') setTimePeriod('30d');
    if (id === 'product') setProduct('all');
    if (id === 'sentiment') setSentiment('all');
  };

  const handleClearAll = () => {
    setTimePeriod('30d');
    setProduct('all');
    setSentiment('all');
  };

  return (
    <motion.div
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-sm space-y-3"
    >
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Filters:</span>
        </div>

        {/* Time Period */}
        <CustomSelect
          options={timeOptions}
          value={timePeriod}
          onChange={setTimePeriod}
          icon={<Calendar className="w-4 h-4" />}
          color="teal"
        />

        {/* Product Filter */}
        <CustomSelect
          options={productOptions}
          value={product}
          onChange={setProduct}
          icon={<Package className="w-4 h-4" />}
          color="purple"
        />

        {/* Sentiment Filter */}
        <CustomSelect
          options={sentimentOptions}
          value={sentiment}
          onChange={setSentiment}
          icon={<TrendingUp className="w-4 h-4" />}
          color="cyan"
        />

        {/* Clear All Button */}
        {activeFilters.length > 0 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClearAll}
            className="ml-auto px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors font-medium"
            aria-label="Clear all filters"
          >
            Clear All
          </motion.button>
        )}
      </div>

      {/* Active Filter Chips */}
      {activeFilters.length > 0 && (
        <FilterChips
          filters={activeFilters}
          onRemove={handleRemoveFilter}
          onClearAll={handleClearAll}
        />
      )}
    </motion.div>
  );
}
