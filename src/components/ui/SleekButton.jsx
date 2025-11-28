import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const SleekButton = ({ 
  children, 
  to, 
  href, 
  variant = 'primary', 
  size = 'md',
  icon,
  className = '',
  ...props 
}) => {
  const variants = {
    primary: 'bg-gradient-to-r from-[#E3F221] to-[#E3F221]/90 text-black hover:shadow-[0_0_30px_-5px_rgba(227,242,33,0.6)] border border-[#E3F221]',
    secondary: 'bg-gradient-to-r from-[#5B5F97] to-[#5B5F97]/90 text-white hover:shadow-[0_0_30px_-5px_rgba(91,95,151,0.6)] border border-[#5B5F97]',
    outline: 'bg-transparent border-2 border-current hover:bg-white/10 backdrop-blur-sm',
    glass: 'bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 hover:border-white/40',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const baseClasses = `
    relative overflow-hidden rounded-full font-semibold 
    transition-all duration-300 inline-flex items-center gap-2 
    group cursor-pointer
    ${variants[variant]} 
    ${sizes[size]} 
    ${className}
  `;

  const content = (
    <>
      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6 }}
      />
      
      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {icon && <span className="transition-transform group-hover:translate-x-1">{icon}</span>}
      </span>

      {/* Ripple effect on hover */}
      <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="absolute inset-0 rounded-full bg-white/20 animate-ping" />
      </span>
    </>
  );

  if (to) {
    return (
      <Link to={to}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={baseClasses}
          {...props}
        >
          {content}
        </motion.button>
      </Link>
    );
  }

  if (href) {
    return (
      <motion.a
        href={href}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={baseClasses}
        {...props}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={baseClasses}
      {...props}
    >
      {content}
    </motion.button>
  );
};

export default SleekButton;
