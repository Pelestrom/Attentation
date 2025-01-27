import React, { useState } from 'react';
import { Download } from 'lucide-react';

export const AnimatedDownloadIcon: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <Download 
      className={`w-5 h-5 transition-transform duration-300 ${
        isAnimating ? 'translate-y-1' : ''
      }`}
      onAnimationEnd={() => setIsAnimating(false)}
      onClick={() => setIsAnimating(true)}
    />
  );
};