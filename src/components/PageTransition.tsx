import React, { useState, useEffect } from 'react';
import { LoadingDots } from './LoadingDots';

interface PageTransitionProps {
  children: React.ReactNode;
  isChanging: boolean;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children, isChanging }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isChanging) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isChanging]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
        <LoadingDots />
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      {children}
    </div>
  );
};

export default PageTransition;