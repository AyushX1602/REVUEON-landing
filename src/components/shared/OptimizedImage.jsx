import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  effect = 'blur',
  threshold = 100,
  ...props 
}) => {
  return (
    <LazyLoadImage
      src={src}
      alt={alt}
      effect={effect}
      threshold={threshold}
      className={className}
      {...props}
      wrapperClassName={className}
    />
  );
};

export default OptimizedImage;
