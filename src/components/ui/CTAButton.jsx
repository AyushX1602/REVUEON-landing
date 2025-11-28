import React from 'react';
import { Link } from 'react-router-dom';

const CTAButton = ({ 
  to, 
  variant = 'primary', 
  size = 'medium',
  children, 
  onClick,
  className = '',
  disabled = false,
  ...props 
}) => {
  const baseClasses = "relative inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] overflow-hidden group";
  
  const sizes = {
    small: "px-4 py-2 text-xs rounded-full",
    medium: "px-5 py-2.5 text-sm rounded-full",
    large: "px-8 py-4 text-base rounded-full"
  };

  const variants = {
    primary: "bg-[#E3F221] text-[#47423D] hover:shadow-lg hover:shadow-[#E3F221]/30 focus:ring-[#E3F221] font-semibold",
    secondary: "bg-[#5B5F97] text-white hover:bg-[#4A4E87] hover:shadow-lg hover:shadow-[#5B5F97]/30 focus:ring-[#5B5F97] font-semibold",
    ghost: "hover:text-[#5B5F97] hover:bg-gray-50 focus:text-[#5B5F97] focus:ring-[#5B5F97]",
    outline: "border-2 border-[#47423D]/20 text-[#47423D] hover:text-[#5B5F97] hover:border-[#5B5F97] focus:ring-[#5B5F97] font-semibold"
  };

  const combinedClasses = `${baseClasses} ${sizes[size]} ${variants[variant]} ${className}`;

  // Shimmer effect element for primary button
  const shimmer = variant === 'primary' ? (
    <span className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1s_ease-in-out] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
  ) : null;

  if (to) {
    return (
      <Link
        to={to}
        onClick={onClick}
        className={combinedClasses}
        {...props}
      >
        {shimmer}
        <span className="relative z-10">{children}</span>
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
      {...props}
    >
      {shimmer}
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default CTAButton;
