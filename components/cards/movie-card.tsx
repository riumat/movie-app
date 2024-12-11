"use client"
import { useState } from 'react';
import Image from 'next/image';
import { imageUrl, imgWidth, placeholders } from '@/lib/constants';
import { MovieResult } from '@/lib/types/movie';
import Loader from '@/components/layout/loader';

//
const MovieCard = ({ item }: { item: MovieResult }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const onLoadCallback = () => {
    setIsImageLoaded(true);
  };
  const onErrorCallback = () => {
    setIsImageLoaded(false);
  };

  return (
    <div className=" flex flex-col w-full max-w-[190px] rounded-lg mx-auto bg-transparent text-foreground gap-3 ">
      <div className="relative w-full max-h-92 pb-[150%] rounded-lg overflow-hidden">
        {!isImageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader />
          </div>
        )}
        <Image
          src={item.poster_path ? `${imageUrl}${imgWidth.backdrop[300]}${item.poster_path}` : placeholders.multi}
          alt={"alt item"}
          fill
          className='rounded-lg z-30 object-contain'
          onLoad={onLoadCallback}
          onError={onErrorCallback}
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          loading='lazy'
        />
      </div>
      <div className=" flex flex-col items-center text-sm">
        <div className="font-semibold text-center mb-2 text-base">{item.title}</div>
        <div className='flex gap-2 justify-center '>
          {item.media_type && (
            <p className=" font-light px-3 py-1 border border-foreground/30 rounded-xl  text-sm">{item.media_type[0].toUpperCase() + item.media_type.slice(1)} </p>
          )}
          {(item.release_date) && (
            <p className=' font-light px-3 py-1 border border-foreground/30 rounded-xl text-sm'>{item.release_date?.slice(0, 4)}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;