import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const sentimentData = [
  { name: 'Positive', value: 65, color: '#4ADE80' },
  { name: 'Neutral', value: 20, color: '#D1DFF3' },
  { name: 'Negative', value: 15, color: '#F87171' },
];

const topicData = [
  { name: 'Quality', positive: 85, negative: 15 },
  { name: 'Shipping', positive: 60, negative: 40 },
  { name: 'Price', positive: 75, negative: 25 },
  { name: 'Support', positive: 90, negative: 10 },
  { name: 'Fit', positive: 50, negative: 50 },
];

const DashboardAnalytics = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-brand-text">Analytics</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sentiment Overview */}
        <div className="card">
          <h3 className="font-bold text-lg mb-6">Sentiment Overview</h3>
          <div className="h-80 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
              <p className="text-3xl font-bold text-brand-text">85%</p>
              <p className="text-xs text-gray-500">Positive</p>
            </div>
          </div>
        </div>

        {/* Topic Analysis */}
        <div className="card">
          <h3 className="font-bold text-lg mb-6">Topic Analysis</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={topicData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={60} tick={{fill: '#4B5563', fontSize: 13, fontWeight: 500}} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Legend />
                <Bar dataKey="positive" name="Positive" stackId="a" fill="#E3F221" radius={[0, 4, 4, 0]} />
                <Bar dataKey="negative" name="Negative" stackId="a" fill="#F3F2F0" radius={[4, 0, 0, 4]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAnalytics;
