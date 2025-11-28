import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Building2, Rocket, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextReveal from './TextReveal';
import TiltCard from './TiltCard';
import AnimatedCounter from './AnimatedCounter';
import GlowEffect from './GlowEffect';

gsap.registerPlugin(ScrollTrigger);

const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: "Starter",
      description: "Perfect for small stores just getting started",
      price: isAnnual ? 20 : 29,
      period: "/month",
      savings: isAnnual ? "Save $120/year" : null,
      icon: <Zap className="w-6 h-6" />,
      color: "from-gray-500 to-gray-600",
      features: [
        "Up to 1,000 reviews/month",
        "Basic sentiment analysis",
        "Email notifications",
        "7-day data history",
        "1 Shopify store",
        "Email support"
      ],
      cta: "Start Free Trial",
      popular: false
    },
    {
      name: "Growth",
      description: "For growing brands that need more power",
      price: isAnnual ? 79 : 99,
      period: "/month",
      savings: isAnnual ? "Save $240/year" : null,
      icon: <Rocket className="w-6 h-6" />,
      color: "from-[#E3F221] to-[#c9d41c]",
      features: [
        "Up to 10,000 reviews/month",
        "Advanced AI sentiment analysis",
        "Smart auto-responses",
        "90-day data history",
        "3 Shopify stores",
        "Priority support",
        "Custom dashboards",
        "API access"
      ],
      cta: "Start Free Trial",
      popular: true
    },
    {
      name: "Enterprise",
      description: "Custom solutions for large organizations",
      price: "Custom",
      period: "",
      savings: null,
      icon: <Building2 className="w-6 h-6" />,
      color: "from-[#5B5F97] to-[#484b7a]",
      features: [
        "Unlimited reviews",
        "Custom AI models",
        "White-label options",
        "Unlimited data history",
        "Unlimited stores",
        "Dedicated success manager",
        "SLA guarantee",
        "Custom integrations",
        "On-premise deployment"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-[#F8F7F7] to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#E3F221] rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#5B5F97] rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 bg-[#E3F221]/20 text-[#47423D] text-sm font-medium font-sans rounded-full mb-4"
          >
            Simple Pricing
          </motion.span>
          <TextReveal animation="fadeUp" duration={0.6}>
            <h2 className="text-4xl md:text-5xl font-bold text-[#47423D] font-heading mb-4">
              Plans that scale with you
            </h2>
          </TextReveal>
          <TextReveal animation="blur" delay={0.3}>
            <p className="text-xl font-sans text-gray-600 max-w-2xl mx-auto">
              Start free, upgrade when you're ready. No hidden fees.
            </p>
          </TextReveal>

          {/* Billing Toggle */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-4 mt-8"
          >
            <span className={`text-sm font-medium ${!isAnnual ? 'text-[#47423D]' : 'text-gray-400'}`}>Monthly</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${isAnnual ? 'bg-[#E3F221]' : 'bg-gray-300'}`}
            >
              <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${isAnnual ? 'translate-x-8' : 'translate-x-1'}`} />
            </button>
            <span className={`text-sm font-medium ${isAnnual ? 'text-[#47423D]' : 'text-gray-400'}`}>
              Annual <span className="text-[#E3F221] font-bold">(Save 25%)</span>
            </span>
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <TiltCard 
              key={plan.name}
              tiltAmount={plan.popular ? 6 : 10}
              scaleOnHover={plan.popular ? 1.01 : 1.03}
              className="h-full"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative rounded-2xl p-8 h-full ${
                  plan.popular 
                    ? 'bg-[#1A1A1A] text-white shadow-2xl border-2 border-[#E3F221]' 
                    : 'bg-white text-[#47423D] shadow-xl border border-gray-100'
                }`}
              >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#E3F221] text-[#1A1A1A] text-sm font-bold rounded-full">
                  Most Popular
                </div>
              )}

              {/* Plan Icon */}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center text-white mb-6`}>
                {plan.icon}
              </div>

              {/* Plan Details */}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className={`text-sm mb-6 ${plan.popular ? 'text-gray-400' : 'text-gray-500'}`}>
                {plan.description}
              </p>

              {/* Price */}
              <div className="mb-6">
                <span className="text-5xl font-bold">
                  {typeof plan.price === 'number' ? `$${plan.price}` : plan.price}
                </span>
                <span className={plan.popular ? 'text-gray-400' : 'text-gray-500'}>
                  {plan.period}
                </span>
                {plan.savings && (
                  <span className="block text-sm text-[#E3F221] font-medium mt-1">{plan.savings}</span>
                )}
              </div>

              {/* CTA */}
              <Link
                to={plan.name === 'Enterprise' ? '/contact' : '/signup'}
                className={`w-full py-3 px-6 rounded-full font-bold text-center flex items-center justify-center gap-2 transition-all duration-300 mb-8 ${
                  plan.popular 
                    ? 'bg-[#E3F221] text-[#1A1A1A] hover:shadow-lg hover:shadow-[#E3F221]/30' 
                    : 'bg-[#47423D] text-white hover:bg-[#5a534d]'
                }`}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Features */}
              <ul className="space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${plan.popular ? 'text-[#E3F221]' : 'text-green-500'}`} />
                    <span className={`text-sm ${plan.popular ? 'text-gray-300' : 'text-gray-600'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              </motion.div>
            </TiltCard>
          ))}
        </div>

        {/* Trust Badge */}
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-gray-500 text-sm mt-12"
        >
          🔒 All plans include a 14-day free trial. No credit card required.
        </motion.p>
      </div>
    </section>
  );
};

export default PricingSection;
