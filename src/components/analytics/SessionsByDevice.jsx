import { motion } from 'motion/react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const data = [
  { name: 'Desktop', value: 55, color: '#3b82f6' },
  { name: 'Mobile', value: 35, color: '#8b5cf6' },
  { name: 'Tablet', value: 10, color: '#ec4899' },
];

export function SessionsByDevice() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl text-gray-900">Sessions by Device</h2>
        <p className="text-sm text-gray-500 mt-1">Device distribution</p>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value, entry) => (
              <span className="text-sm text-gray-700">
                {value} ({entry.payload.value}%)
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="mt-4 space-y-2">
        {data.map((device, index) => (
          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: device.color }}
              />
              <span className="text-sm text-gray-700">{device.name}</span>
            </div>
            <span className="text-sm text-gray-900">{device.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
