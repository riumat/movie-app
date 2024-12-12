"use client"
import React from 'react';
import Image from 'next/image';
import { imageUrl, imgWidth, placeholders } from '@/lib/constants';
import { MovieData } from '@/lib/types/movie';
import { TvData } from '@/lib/types/tv';
import Loader from '@/components/layout/loader';


const SimpleContentCard = ({ item }: { item: MovieData | TvData }) => {
  const [isImageLoaded, setIsImageLoaded] = React.useState(false);
  const imgSrc = item.poster_path ? `${imageUrl}${imgWidth.poster[342]}${item.poster_path}` : placeholders.multi;

  const onLoadCallback = () => {
    setIsImageLoaded(true);
  };

  const onErrorCallback = () => {
    setIsImageLoaded(false);
  };

  return (
    <div className={`flex flex-col bg-transparent w-full max-w-[170px] rounded-lg mx-auto relative group `}>

      <div className="relative w-full max-h-60 pb-[150%] rounded-lg overflow-hidden">
        {!isImageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader />
          </div>
        )}
        <Image
          src={imgSrc}
          alt={"alt item"}
          fill
          className='rounded-lg z-30 object-contain'
          onLoad={onLoadCallback}
          onError={onErrorCallback}
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          loading='lazy'
        />
        <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-between p-2 z-50">
          {(item.media_type === "movie"||item.type==="movie") && (
            <p className="text-foreground text-sm font-bold z-50 mt-3 text-center">{(item as MovieData).title}</p>
          )}
          {(item.media_type === "tv"||item.type==="tv") && (
            <p className="text-foreground text-sm font-bold z-50 mt-3 text-center">{(item as TvData).name}</p>
          )}

        </div>
      </div>
    </div>
  );
};

export default SimpleContentCard;
