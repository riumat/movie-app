// components/MovieCardSkeleton.tsx
import React from 'react';

const MovieCardSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col bg-transparent cursor-pointer w-full max-w-[200px] mx-auto">
      <div className="relative w-full max-h-64 pb-[150%] rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-700 animate-pulse" />
      </div>

    </div>
  );
};

export default MovieCardSkeleton;