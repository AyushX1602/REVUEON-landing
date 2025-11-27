import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { month: 'Jan', direct: 45, referral: 60, organic: 75, social: 30 },
  { month: 'Feb', direct: 52, referral: 48, organic: 68, social: 35 },
  { month: 'Mar', direct: 48, referral: 55, organic: 72, social: 28 },
  { month: 'Apr', direct: 60, referral: 62, organic: 80, social: 42 },
  { month: 'May', direct: 55, referral: 58, organic: 65, social: 38 },
  { month: 'Jun', direct: 62, referral: 70, organic: 78, social: 45 },
  { month: 'Jul', direct: 58, referral: 65, organic: 82, social: 40 },
  { month: 'Aug', direct: 65, referral: 72, organic: 88, social: 48 },
];

export function AcquisitionChannels() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl text-gray-900">Acquisition Channels</h2>
        <p className="text-sm text-gray-500 mt-1">Traffic sources breakdown</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
          <XAxis
            dataKey="month"
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
          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="circle"
          />
          <Bar dataKey="direct" stackId="a" fill="#3b82f6" name="Direct" />
          <Bar dataKey="referral" stackId="a" fill="#8b5cf6" name="Referral" />
          <Bar dataKey="organic" stackId="a" fill="#10b981" name="Organic Search" />
          <Bar dataKey="social" stackId="a" fill="#f59e0b" name="Social" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
