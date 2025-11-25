import React, { useState } from 'react';
import Icon from '../AppIcon';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const LiveDemoPreview = () => {
  const [activeView, setActiveView] = useState('insights');

  const sentimentData = [
    { month: 'Jan', positive: 85, negative: 15, neutral: 25 },
    { month: 'Feb', positive: 88, negative: 12, neutral: 22 },
    { month: 'Mar', positive: 92, negative: 8, neutral: 18 },
    { month: 'Apr', positive: 89, negative: 11, neutral: 20 },
    { month: 'May', positive: 94, negative: 6, neutral: 15 },
    { month: 'Jun', positive: 96, negative: 4, neutral: 12 }
  ];

  const categoryData = [
    { name: 'Features', value: 35, color: '#4F46E5' },
    { name: 'Support', value: 25, color: '#06B6D4' },
    { name: 'Pricing', value: 20, color: '#8B5CF6' },
    { name: 'Usability', value: 20, color: '#10B981' }
  ];

  return (
    <section className="py-20 bg-[#F3F2F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-medium text-[#47423D] mb-6">
            Powerful Insights at Your Fingertips
          </h2>
          <p className="text-lg text-[#47423D]/70 max-w-3xl mx-auto font-sans">
            Visualize your data with our interactive dashboard.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <div className="text-sm font-medium text-gray-500">Dashboard Preview</div>
          </div>
          
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h4 className="text-lg font-semibold text-[#47423D] mb-6">Sentiment Trends</h4>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={sentimentData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                      />
                      <Line type="monotone" dataKey="positive" stroke="#E3F221" strokeWidth={3} dot={{ r: 4, fill: '#E3F221' }} />
                      <Line type="monotone" dataKey="negative" stroke="#5B5F97" strokeWidth={3} dot={{ r: 4, fill: '#5B5F97' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h4 className="text-lg font-semibold text-[#47423D] mb-6">Review Categories</h4>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-[#E3F221]/10 rounded-xl p-6 border border-[#E3F221]/20">
                <div className="flex items-center mb-3">
                  <Icon name="TrendingUp" size={24} className="text-[#47423D] mr-3" />
                  <span className="font-semibold text-[#47423D]">Positive Trend</span>
                </div>
                <p className="text-sm text-[#47423D]/80">Sentiment improved by 12% this month</p>
              </div>
              
              <div className="bg-[#5B5F97]/10 rounded-xl p-6 border border-[#5B5F97]/20">
                <div className="flex items-center mb-3">
                  <Icon name="Star" size={24} className="text-[#5B5F97] mr-3" />
                  <span className="font-semibold text-[#5B5F97]">Top Feature</span>
                </div>
                <p className="text-sm text-[#5B5F97]/80">Users love the new dashboard design</p>
              </div>
              
              <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                <div className="flex items-center mb-3">
                  <Icon name="AlertTriangle" size={24} className="text-orange-600 mr-3" />
                  <span className="font-semibold text-orange-800">Action Needed</span>
                </div>
                <p className="text-sm text-orange-700">Support response time concerns</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveDemoPreview;
