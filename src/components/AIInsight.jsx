import React from 'react';
import { Sparkles, Check, X } from 'lucide-react';
import { motion } from 'framer-motion';
import FadeIn from './FadeIn';

const AIInsight = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 order-2 md:order-1">
            <FadeIn direction="right">
              <div className="relative max-w-md mx-auto">
                {/* AI Analysis Card */}
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 relative z-10"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center">
                        <Sparkles size={16} className="text-brand-text" />
                      </div>
                      <span className="font-heading font-bold">Revyno AI</span>
                    </div>
                    <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-500">Confidence: 98%</span>
                  </div>
                  
                  <div className="mb-6">
                    <p className="text-sm text-gray-400 mb-2">Analyzing Review #4921</p>
                    <p className="text-gray-800 italic border-l-2 border-brand-primary pl-4 py-1">
                      "The product quality is amazing, but shipping took way longer than expected. I might buy again if shipping improves."
                    </p>
                  </div>

                  <div className="space-y-3">
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      className="flex items-center justify-between p-3 bg-brand-bg rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        <span className="font-medium text-sm">Quality: High</span>
                      </div>
                      <button className="p-1 hover:bg-white rounded-full transition-colors"><Check size={16} className="text-green-600" /></button>
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 }}
                      className="flex items-center justify-between p-3 bg-brand-bg rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-red-500"></span>
                        <span className="font-medium text-sm">Shipping: Delayed</span>
                      </div>
                      <button className="p-1 hover:bg-white rounded-full transition-colors"><Check size={16} className="text-green-600" /></button>
                    </motion.div>
                  </div>
                  
                  <div className="mt-6 flex gap-2">
                    <button className="flex-1 bg-brand-text text-white py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">Apply Tags</button>
                    <button className="px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"><X size={16} className="text-gray-400" /></button>
                  </div>
                </motion.div>

                {/* Background Elements */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-secondary/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
              </div>
            </FadeIn>
          </div>

          <div className="flex-1 order-1 md:order-2">
            <FadeIn direction="left">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                AI that understands <br /><span className="text-brand-primary">context</span>, not just keywords.
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Our proprietary NLP model detects nuance, sarcasm, and specific product attributes. It doesn't just tell you "good" or "bad"—it tells you *why*.
              </p>
              <ul className="space-y-4">
                {[
                  'Prioritized "Fix This First" actions',
                  'Confidence scores for every insight',
                  'Suggested replies for customer support'
                ].map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + (i * 0.1) }}
                    className="flex items-center gap-3 text-lg font-medium text-brand-text"
                  >
                    <Check className="text-brand-primary" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIInsight;
