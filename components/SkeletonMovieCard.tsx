// components/MovieCardSkeleton.tsx
import React from 'react';

const MovieCardSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col bg-transparent cursor-pointer w-full max-w-[200px] mx-auto">
      <div className="relative w-full max-h-64 pb-[150%] rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 animate-pulse" />
      </div>
      <div className="mt-2">
        <h3 className="font-semibold text-sm text-center line-clamp-2 bg-gray-800 rounded-lg animate-pulse h-4 w-1/2" />
      </div>
    </div>
  );
};

export default MovieCardSkeleton;