import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

const productData = [
  { name: 'Product A', positive: 85, neutral: 10, negative: 5 },
  { name: 'Product B', positive: 72, neutral: 18, negative: 10 },
  { name: 'Product C', positive: 65, neutral: 25, negative: 10 },
  { name: 'Product D', positive: 90, neutral: 7, negative: 3 },
  { name: 'Product E', positive: 58, neutral: 30, negative: 12 },
];

export function ProductSentiment() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm h-full">
      <div className="mb-6">
        <h2 className="text-xl text-gray-900">Product-wise Sentiment</h2>
        <p className="text-sm text-gray-500 mt-1">Sentiment breakdown by product</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={productData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
          <XAxis
            dataKey="name"
            stroke="#9ca3af"
            tick={{ fill: '#6b7280', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            stroke="#9ca3af"
            tick={{ fill: '#6b7280', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
            cursor={{ fill: '#f3f4f6' }}
          />
          <Bar dataKey="positive" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} />
          <Bar dataKey="neutral" stackId="a" fill="#f59e0b" radius={[0, 0, 0, 0]} />
          <Bar dataKey="negative" stackId="a" fill="#ef4444" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-sm text-gray-600">Positive</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <span className="text-sm text-gray-600">Neutral</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <span className="text-sm text-gray-600">Negative</span>
        </div>
      </div>
    </div>
  );
}
