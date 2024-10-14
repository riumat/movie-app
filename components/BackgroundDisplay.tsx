"use client"
import { imageUrl, imgWidth } from '@/utils/constants';
import Image from 'next/image';
import React from 'react'
import { BeatLoader } from 'react-spinners';

interface Movie {
  poster_path: string;
  title: string;
}
interface SearchResult {
  name?: string;
  title?: string;
}

interface HeroProps {
  movies: Movie[];
}



const BackgroundDisplay: React.FC<HeroProps> = ({ movies }) => {
  const [isImageLoaded, setIsImageLoaded] = React.useState(false);
  const onLoadCallback = () => {
    setIsImageLoaded(true);
  };
  const onErrorCallback = () => {
    setIsImageLoaded(false);
  };
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/85 to-black -z-10 " />
      <div className="flex h-full ">
        {movies.map((movie, index) => (
          <div key={index} className="flex-1 relative -z-20">
            {!isImageLoaded && (
              <div className='z-40 flex justify-center items-center h-full'>
                <BeatLoader color='#ffffff' size={10} />
              </div>
            )}
            <Image
              src={`${imageUrl}${imgWidth.poster.original}${movie.poster_path}`}
              alt={movie.title}
              fill
              priority
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              className="filter grayscale-[80%] brightness-90 object-cover"
              onLoad={onLoadCallback}
              onError={onErrorCallback}
            />
          </div>
        ))}
      </div>
    </div >
  )
}

export default BackgroundDisplay


