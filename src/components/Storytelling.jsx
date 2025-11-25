import React from 'react';
import { BarChart3, MessageSquare, Zap } from 'lucide-react';
import FadeIn from './FadeIn';
import { motion } from 'framer-motion';

const features = [
  {
    title: "Real-Time KPI Grid",
    description: "Track high-level metrics like total reviews, average rating, and NPS in real-time. Visualize spikes, drops, or patterns instantly.",
    icon: <BarChart3 className="w-6 h-6 text-brand-primary" />,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    align: "right"
  },
  {
    title: "Sentiment Analysis",
    description: "Donut and area charts break down customer emotions. Understand exactly how your customers feel about your products.",
    icon: <Zap className="w-6 h-6 text-brand-primary" />,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    align: "left"
  },
  {
    title: "Prioritized Actions",
    description: "Our 'Fix This First' section highlights issues with the highest impact potential. Download reports in PDF/CSV for your team.",
    icon: <MessageSquare className="w-6 h-6 text-brand-primary" />,
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800",
    align: "right"
  }
];

const Storytelling = () => {
  return (
    <section id="features" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <FadeIn direction="up">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Why Revueon?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We turn the chaos of customer feedback into a clear path for growth.
            </p>
          </FadeIn>
        </div>

        <div className="space-y-32">
          {features.map((feature, index) => (
            <div key={index} className={`flex flex-col lg:flex-row items-center gap-16 ${feature.align === 'left' ? 'lg:flex-row-reverse' : ''}`}>
              <div className="flex-1 space-y-8">
                <FadeIn direction={feature.align === 'left' ? 'right' : 'left'}>
                  <div className="w-12 h-12 bg-brand-text rounded-xl flex items-center justify-center mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold leading-tight">{feature.title}</h3>
                  <p className="text-lg text-gray-600 leading-relaxed">{feature.description}</p>
                  <ul className="space-y-4">
                    {['Real-time sync', 'Sentiment analysis', 'Export to CSV'].map((item, i) => (
                      <motion.li 
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + (i * 0.1) }}
                        className="flex items-center gap-3 text-gray-700 font-medium"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-primary"></div>
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </FadeIn>
              </div>
              <div className="flex-1 w-full">
                <FadeIn direction={feature.align === 'left' ? 'left' : 'right'}>
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-100 aspect-[4/3] group cursor-pointer">
                    <div className="absolute inset-0 bg-brand-primary/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                    <motion.img 
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.7 }}
                      src={feature.image} 
                      alt={feature.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </FadeIn>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Storytelling;
