import React from 'react';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import FadeIn from './FadeIn';

const Pricing = () => {
  return (
    <section id="pricing" className="py-24 bg-brand-text text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <FadeIn direction="up">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Simple, transparent pricing</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Start with a 14-day free trial. No credit card required.
            </p>
          </FadeIn>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Starter Plan */}
          <FadeIn delay={0.2} direction="right">
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-gray-900 rounded-2xl p-8 border border-gray-800 hover:border-gray-700 transition-colors h-full flex flex-col"
            >
              <h3 className="text-xl font-bold mb-2">Starter</h3>
              <p className="text-gray-400 mb-6">For Shopify Store Owners.</p>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-bold">$49</span>
                <span className="text-gray-500">/month</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {['Up to 1,000 reviews/mo', 'Basic sentiment analysis', 'Weekly email reports', 'Email support'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <Check size={18} className="text-brand-primary" />
                    {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 rounded-full border border-white text-white font-medium hover:bg-white hover:text-black transition-colors">
                Start Free Trial
              </button>
            </motion.div>
          </FadeIn>

          {/* Pro Plan */}
          <FadeIn delay={0.4} direction="left">
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-brand-primary rounded-2xl p-8 text-brand-text relative overflow-hidden h-full flex flex-col"
            >
              <div className="absolute top-0 right-0 bg-black/10 px-4 py-1 rounded-bl-xl text-xs font-bold uppercase tracking-wider">Popular</div>
              <h3 className="text-xl font-bold mb-2">Pro</h3>
              <p className="text-gray-800 mb-6">For DTC Brand Managers.</p>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-bold">$149</span>
                <span className="text-gray-700">/month</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {['Unlimited reviews', 'Advanced AI insights', 'Competitor benchmarking', 'Priority 24/7 support', 'API Access'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-900 font-medium">
                    <Check size={18} className="text-black" />
                    {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 rounded-full bg-black text-white font-medium hover:bg-gray-800 transition-colors">
                Get Started
              </button>
            </motion.div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
