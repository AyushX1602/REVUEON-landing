import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChevronDown } from 'lucide-react';

const data = [
  { day: '1', value: 120 },
  { day: '2', value: 210 },
  { day: '3', value: 180 },
  { day: '4', value: 260 },
  { day: '5', value: 220 },
  { day: '6', value: 280 },
  { day: '7', value: 190 },
  { day: '8', value: 310 },
  { day: '9', value: 240 },
  { day: '10', value: 280 },
  { day: '11', value: 330 },
  { day: '12', value: 290 },
  { day: '13', value: 250 },
  { day: '14', value: 310 },
  { day: '15', value: 270 },
  { day: '16', value: 340 },
  { day: '17', value: 290 },
  { day: '18', value: 320 },
  { day: '19', value: 280 },
  { day: '20', value: 360 },
];

export function AnalyticsChart() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl text-gray-900">Analytics</h2>
          <p className="text-sm text-gray-500 mt-1">Shopify analytics over 30 days</p>
        </div>
        <div className="flex gap-3">
          <button className="px-3 py-1.5 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
            Weekly
          </button>
          <button className="px-3 py-1.5 text-sm text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors">
            Monthly
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
            30 days
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
          <XAxis
            dataKey="day"
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
          <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
