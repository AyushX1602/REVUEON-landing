import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    question: 'How do I connect my Shopify store?',
    answer: 'Go to Settings > Integrations and click "Connect" next to Shopify. Follow the authorization steps.',
  },
  {
    question: 'Can I export review data?',
    answer: 'Yes! You can export reviews as PDF or CSV from the Analytics page using the Export button.',
  },
  {
    question: 'How often is data synced?',
    answer: 'Review data is synchronized every 6 hours. Premium plans get real-time sync.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, and bank transfers for annual subscriptions.',
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl text-gray-900 dark:text-white">Frequently Asked Questions</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Quick answers to common questions</p>
      </div>

      <div className="space-y-2">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.05 }}
            className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              aria-expanded={openIndex === index}
              aria-label={`Toggle FAQ: ${faq.question}`}
            >
              <span className="text-sm text-gray-900 dark:text-white">{faq.question}</span>
              <ChevronDown
                className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="px-4 pb-4"
              >
                <p className="text-sm text-gray-600 dark:text-gray-400">{faq.answer}</p>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
