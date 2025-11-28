import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Award, CheckCircle, CreditCard, RefreshCw } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextReveal from './TextReveal';

gsap.registerPlugin(ScrollTrigger);

const badges = [
  {
    icon: <Shield className="w-8 h-8" />,
    title: "SOC 2 Compliant",
    description: "Enterprise-grade security",
    color: "from-blue-500 to-blue-600"
  },
  {
    icon: <Lock className="w-8 h-8" />,
    title: "256-bit Encryption",
    description: "Bank-level data protection",
    color: "from-green-500 to-green-600"
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: "GDPR Ready",
    description: "Full compliance guaranteed",
    color: "from-purple-500 to-purple-600"
  },
  {
    icon: <RefreshCw className="w-8 h-8" />,
    title: "99.9% Uptime",
    description: "Reliable service always",
    color: "from-orange-500 to-orange-600"
  }
];

const guarantees = [
  { icon: <CheckCircle className="w-5 h-5" />, text: "14-day free trial" },
  { icon: <CreditCard className="w-5 h-5" />, text: "No credit card required" },
  { icon: <RefreshCw className="w-5 h-5" />, text: "30-day money-back guarantee" },
  { icon: <Lock className="w-5 h-5" />, text: "Cancel anytime" },
];

const TrustBadges = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const badges = containerRef.current?.querySelectorAll('.trust-badge');
    if (!badges) return;

    gsap.fromTo(badges,
      { y: 40, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          once: true
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section className="py-20 bg-[#0A0A0A] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#E3F221]/5 rounded-full blur-[100px]" />
      </div>

      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <TextReveal animation="fadeUp">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-heading mb-4">
              Trusted by <span className="text-[#E3F221]">10,000+</span> Teams Worldwide
            </h2>
          </TextReveal>
          <TextReveal animation="blur" delay={0.2}>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Enterprise-grade security and reliability you can count on
            </p>
          </TextReveal>
        </div>

        {/* Trust Badges Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              className="trust-badge group"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-6 text-center h-full hover:border-[#E3F221]/30 transition-colors">
                <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br ${badge.color} text-white mb-3 sm:mb-4 group-hover:scale-110 transition-transform`}>
                  {badge.icon}
                </div>
                <h3 className="text-white font-semibold mb-1 text-sm sm:text-base">{badge.title}</h3>
                <p className="text-gray-500 text-xs sm:text-sm">{badge.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Guarantee Strip */}
        <div className="bg-gradient-to-r from-[#E3F221]/10 via-[#E3F221]/20 to-[#E3F221]/10 rounded-2xl p-6 md:p-8">
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12">
            {guarantees.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2 text-white"
              >
                <span className="text-[#E3F221]">{item.icon}</span>
                <span className="font-medium whitespace-nowrap">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Company Logos */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm mb-8 uppercase tracking-wider">Powering reviews for brands like</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50">
            {['Allbirds', 'Gymshark', 'MVMT', 'Brooklinen', 'Casper'].map((brand, i) => (
              <span key={i} className="text-xl md:text-2xl font-bold text-white/50 font-heading">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
