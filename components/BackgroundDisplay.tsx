"use client"
import { imageUrl, imgWidth } from '@/utils/constants';
import Image from 'next/image';
import React from 'react'
import { BeatLoader } from 'react-spinners';

interface BackgroundDisplayProps {
  movies: {
    poster_path: string;
  }[];
}

const BackgroundDisplay: React.FC<BackgroundDisplayProps> = ({ movies }) => {
  const [imageLoaded, setImageLoaded] = React.useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageLoaded(false);
  };

  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/85 to-black -z-10" />
      <div className="flex h-full">
        {movies.map((movie, index) => (
          <div key={index} className="flex-1 relative -z-20">
            {!imageLoaded && (
              <div className="z-40 flex justify-center items-center h-full">
                <BeatLoader color="#ffffff" size={10} />
              </div>
            )}
            <Image
              src={`${imageUrl}${imgWidth.poster.original}${movie.poster_path}`}
              alt={"movie poster"}
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="filter grayscale-[80%] brightness-90 object-cover"
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BackgroundDisplay


