import React from 'react';
import { TrendingUp, Users, Star, ArrowUp, ArrowDown } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', reviews: 40 },
  { name: 'Tue', reviews: 30 },
  { name: 'Wed', reviews: 20 },
  { name: 'Thu', reviews: 27 },
  { name: 'Fri', reviews: 18 },
  { name: 'Sat', reviews: 23 },
  { name: 'Sun', reviews: 34 },
];

const DashboardOverview = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-brand-text">Overview</h1>
        <div className="flex gap-2">
          <select className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-brand-primary">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last Quarter</option>
          </select>
          <button className="btn-primary text-sm px-4 py-2">Export Report</button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Revenue</p>
              <h3 className="text-3xl font-bold mt-1">$12,450</h3>
            </div>
            <div className="p-2 bg-brand-primary/20 rounded-lg text-brand-text">
              <TrendingUp size={20} />
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm text-green-600 font-medium">
            <ArrowUp size={16} />
            <span>+12.5%</span>
            <span className="text-gray-400 font-normal ml-1">vs last period</span>
          </div>
        </div>

        <div className="card">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Reviews</p>
              <h3 className="text-3xl font-bold mt-1">1,284</h3>
            </div>
            <div className="p-2 bg-brand-secondary/30 rounded-lg text-brand-text">
              <Users size={20} />
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm text-green-600 font-medium">
            <ArrowUp size={16} />
            <span>+8.2%</span>
            <span className="text-gray-400 font-normal ml-1">vs last period</span>
          </div>
        </div>

        <div className="card">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-gray-500 text-sm font-medium">Average Rating</p>
              <h3 className="text-3xl font-bold mt-1">4.8</h3>
            </div>
            <div className="p-2 bg-yellow-100 rounded-lg text-yellow-600">
              <Star size={20} fill="currentColor" />
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm text-red-500 font-medium">
            <ArrowDown size={16} />
            <span>-0.1%</span>
            <span className="text-gray-400 font-normal ml-1">vs last period</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Review Trends Chart */}
        <div className="card lg:col-span-2">
          <h3 className="font-bold text-lg mb-6">Review Trends</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorReviews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E3F221" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#E3F221" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#111827', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="reviews" stroke="#D4E310" strokeWidth={3} fillOpacity={1} fill="url(#colorReviews)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Reviews Feed */}
        <div className="card">
          <h3 className="font-bold text-lg mb-4">Recent Reviews</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star key={star} size={12} className="text-yellow-400" fill="currentColor" />
                    ))}
                  </div>
                  <span className="text-xs text-gray-400">2m ago</span>
                </div>
                <p className="text-sm text-gray-700 line-clamp-2">
                  "Absolutely love the quality! Shipping was super fast too. Will definitely buy again."
                </p>
                <p className="text-xs text-gray-500 mt-2 font-medium">- Sarah J.</p>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 text-sm text-brand-text font-medium hover:text-brand-primary transition-colors">
            View All Reviews →
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
