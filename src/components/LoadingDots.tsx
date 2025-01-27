import React from 'react';

export const LoadingDots: React.FC = () => {
  return (
    <div className="flex items-center justify-center space-x-2 my-4">
      {[1, 2, 3].map((dot) => (
        <div
          key={dot}
          className="w-3 h-3 bg-green-500 rounded-full animate-bounce"
          style={{ 
            animationDelay: `${dot * 0.15}s`,
            animationDuration: '0.6s'
          }}
        />
      ))}
    </div>
  );
};