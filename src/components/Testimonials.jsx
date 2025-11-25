import React from 'react';
import { motion } from 'framer-motion';
import FadeIn from './FadeIn';

const Testimonials = () => {
  const logos = [
    "Stripe", "Shopify", "Glossier", "Allbirds", "Gymshark", "Huel"
  ];

  return (
    <section className="py-24 bg-brand-surface border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <p className="text-center text-sm font-bold text-gray-400 uppercase tracking-widest mb-12">Trusted by modern brands</p>
          
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-50 grayscale mb-24">
            {logos.map((logo, i) => (
              <motion.span 
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="text-2xl font-heading font-bold text-gray-800"
              >
                {logo}
              </motion.span>
            ))}
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              quote: "Revueon completely changed how we look at customer feedback. It's not just noise anymore; it's our product roadmap.",
              author: "Sarah Jenkins",
              role: "Head of CX, Glossier"
            },
            {
              quote: "The AI categorization is scarily accurate. We saved 20 hours a week on manual tagging.",
              author: "Mike Chen",
              role: "Founder, TechGear"
            },
            {
              quote: "Clean, fast, and actually useful. The revenue impact chart helped us justify our support budget.",
              author: "Elena Rodriguez",
              role: "Director of Ops, Huel"
            }
          ].map((testimonial, i) => (
            <FadeIn key={i} delay={i * 0.2} className="h-full">
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 h-full flex flex-col"
              >
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-brand-primary">★</span>
                  ))}
                </div>
                <p className="text-lg text-gray-800 mb-6 leading-relaxed flex-1">"{testimonial.quote}"</p>
                <div>
                  <p className="font-bold text-brand-text">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
