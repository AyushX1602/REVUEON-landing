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
  const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const sizes = {
    small: "px-3 py-1.5 text-xs rounded",
    medium: "px-4 py-2 text-sm rounded-lg",
    large: "px-6 py-3 text-base rounded-lg"
  };

  const variants = {
    primary: "bg-[#E3F221] text-[#47423D] hover:bg-[#FDFFA8] focus:ring-[#FDFFA8] font-medium",
    secondary: "bg-[#5B5F97] text-white hover:bg-[#4A4E87] focus:ring-[#4A4E87]",
    ghost: "hover:text-[#5B5F97] hover:bg-gray-50 focus:text-[#5B5F97] focus:ring-[#5B5F97]",
    outline: "border border-[#47423D]/20 text-[#47423D] hover:text-[#5B5F97] hover:border-[#5B5F97] focus:ring-[#5B5F97]"
  };

  const combinedClasses = `${baseClasses} ${sizes[size]} ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link
        to={to}
        onClick={onClick}
        className={combinedClasses}
        {...props}
      >
        {children}
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
      {children}
    </button>
  );
};

export default CTAButton;
