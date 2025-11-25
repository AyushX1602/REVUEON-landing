import React from 'react';

function Image({
  src,
  alt = "Image Name",
  className = "",
  ...props
}) {

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        // Fallback if image fails
        e.target.style.display = 'none'; 
      }}
      {...props}
    />
  );
}

export default Image;
