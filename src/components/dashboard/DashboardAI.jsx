import React from 'react';
import { Sparkles, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';

const DashboardAI = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center">
          <Sparkles size={20} className="text-brand-text" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-brand-text">AI Insights</h1>
          <p className="text-gray-500 text-sm">Powered by Revueon Intelligence</p>
        </div>
      </div>

      {/* Fix This First Section */}
      <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4 text-red-700">
          <AlertTriangle size={20} />
          <h2 className="font-bold text-lg">Fix This First</h2>
        </div>
        <div className="bg-white rounded-xl p-4 border border-red-100 shadow-sm flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 mb-1">Shipping Delays Detected</h3>
            <p className="text-gray-600 text-sm">
              We've detected a <span className="font-bold text-red-600">45% increase</span> in negative sentiment related to "shipping" in the last 48 hours. Most complaints mention the "Express" option.
            </p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
              View Reviews
            </button>
            <button className="flex-1 md:flex-none px-4 py-2 border border-gray-200 bg-white rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
              Dismiss
            </button>
          </div>
        </div>
      </div>

      {/* Recommendations Grid */}
      <h2 className="font-bold text-xl mt-8 mb-4">Smart Recommendations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          {
            title: "Update Product Description",
            desc: "Customers are confused about the sizing of the 'Classic Tee'. Consider adding a size chart.",
            confidence: 98,
            type: "Content"
          },
          {
            title: "Potential Fraud Alert",
            desc: "Detected 3 reviews with identical text patterns from different accounts.",
            confidence: 92,
            type: "Security"
          },
          {
            title: "Trending Feature Request",
            desc: "15 customers requested a 'Dark Mode' version of the app this week.",
            confidence: 85,
            type: "Product"
          },
          {
            title: "Competitor Alert",
            desc: "Your main competitor just lowered prices by 10%. Sentiment analysis suggests price sensitivity is high.",
            confidence: 78,
            type: "Market"
          }
        ].map((item, i) => (
          <div key={i} className="card hover:border-brand-primary transition-colors cursor-pointer group">
            <div className="flex justify-between items-start mb-4">
              <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium text-gray-500">{item.type}</span>
              <span className="text-xs font-mono text-brand-primary bg-black px-2 py-1 rounded">
                {item.confidence}% Confidence
              </span>
            </div>
            <h3 className="font-bold text-lg mb-2 group-hover:text-brand-primary transition-colors">{item.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{item.desc}</p>
            <div className="flex items-center text-sm font-bold text-brand-text gap-1 group-hover:gap-2 transition-all">
              Take Action <ArrowRight size={16} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardAI;
