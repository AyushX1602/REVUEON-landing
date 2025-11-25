import React from 'react';

const BrandLogo = ({ className = "", light = false }) => {
  return (
    <div className={`flex items-center gap-2 font-heading font-bold tracking-tight ${className}`}>
      <div className="relative flex items-center justify-center w-8 h-8 bg-[#E3F221] rounded-lg">
        <span className="text-[#47423D] text-xl leading-none">R</span>
      </div>
      <span className={`text-xl ${light ? 'text-white' : 'text-[#47423D]'}`}>
        REVUEON
      </span>
    </div>
  );
};

export default BrandLogo;
