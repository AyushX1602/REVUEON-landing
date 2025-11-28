import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextReveal from './TextReveal';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "How does the 14-day free trial work?",
    answer: "Start using Revueon immediately with full access to all features. No credit card required. If you love it, choose a plan that fits your needs. If not, no worries - your trial simply expires."
  },
  {
    question: "Can I connect multiple Shopify stores?",
    answer: "Yes! Our Growth plan supports up to 3 stores, and Enterprise plans offer unlimited store connections. Each store gets its own dashboard with combined analytics."
  },
  {
    question: "How accurate is the AI sentiment analysis?",
    answer: "Our AI achieves 95%+ accuracy in sentiment detection, trained on millions of e-commerce reviews. It understands context, sarcasm, and industry-specific terminology."
  },
  {
    question: "What happens to my data?",
    answer: "Your data is encrypted at rest and in transit. We're SOC2 compliant and GDPR ready. We never sell your data, and you can export or delete it anytime."
  },
  {
    question: "Do you offer refunds?",
    answer: "Yes, we offer a 30-day money-back guarantee. If you're not satisfied for any reason, contact us for a full refund - no questions asked."
  },
  {
    question: "How quickly can I see results?",
    answer: "Most users see actionable insights within the first hour of connecting their store. Our AI processes your entire review history, not just new reviews."
  },
  {
    question: "Can I cancel anytime?",
    answer: "Absolutely. No contracts, no hidden fees. Cancel with one click from your dashboard. Your data remains accessible for 30 days after cancellation."
  },
  {
    question: "Do you offer custom enterprise solutions?",
    answer: "Yes! Our Enterprise plan includes custom AI models, dedicated support, SLA guarantees, and on-premise deployment options. Contact us for a tailored solution."
  }
];

const FAQItem = ({ faq, isOpen, onClick, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="border-b border-gray-200 last:border-b-0"
    >
      <button
        onClick={onClick}
        className="w-full py-5 flex items-center justify-between text-left group"
      >
        <span className={`text-lg font-medium transition-colors ${isOpen ? 'text-[#5B5F97]' : 'text-[#47423D] group-hover:text-[#5B5F97]'}`}>
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={`flex-shrink-0 ml-4 ${isOpen ? 'text-[#E3F221]' : 'text-gray-400'}`}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-gray-600 leading-relaxed">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const containerRef = useRef(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section ref={containerRef} className="py-24 bg-gradient-to-b from-white to-[#F8F7F7] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#E3F221] rounded-full mix-blend-multiply filter blur-3xl opacity-5" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-[#5B5F97] rounded-full mix-blend-multiply filter blur-3xl opacity-5" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#5B5F97]/10 rounded-full mb-4"
          >
            <HelpCircle className="w-4 h-4 text-[#5B5F97]" />
            <span className="text-sm font-medium text-[#5B5F97]">FAQ</span>
          </motion.div>
          
          <TextReveal animation="fadeUp">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#47423D] font-heading mb-4">
              Frequently Asked Questions
            </h2>
          </TextReveal>
          
          <TextReveal animation="blur" delay={0.2}>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about Revueon
            </p>
          </TextReveal>
        </div>

        {/* FAQ List */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              index={index}
              isOpen={openIndex === index}
              onClick={() => handleToggle(index)}
            />
          ))}
        </div>

        {/* Still have questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-4 bg-[#1A1A1A] rounded-2xl">
            <div className="w-12 h-12 rounded-full bg-[#E3F221] flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-6 h-6 text-[#1A1A1A]" />
            </div>
            <div className="text-center sm:text-left">
              <p className="text-white font-medium">Still have questions?</p>
              <p className="text-gray-400 text-sm">Our team is here to help</p>
            </div>
            <a
              href="mailto:support@revueon.com"
              className="px-4 py-2 bg-white text-[#1A1A1A] rounded-full font-medium text-sm hover:bg-gray-100 transition-colors whitespace-nowrap"
            >
              Contact Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
