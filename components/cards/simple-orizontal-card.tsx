"use client"
import React from 'react';
import Image from 'next/image';
import { imageUrl, imgWidth, placeholders } from '@/lib/constants';
import { MovieData } from '@/lib/types/movie';
import { TvData } from '@/lib/types/tv';
import Loader from '@/components/layout/loader';


const SimpleOrizontalCard = ({ item }: { item: MovieData | TvData }) => {
  const imgSrc = item.backdrop_path ? `${imageUrl}${imgWidth.backdrop[780]}${item.backdrop_path}` : placeholders.multi;
  const [isImageLoaded, setIsImageLoaded] = React.useState(false);

  const onLoadCallback = () => {
    setIsImageLoaded(true);
  };

  const onErrorCallback = () => {
    setIsImageLoaded(false);
  };


  return (
    <div className={`flex flex-col bg-transparent w-full max-w-[350px]  rounded-lg mx-auto relative group `}>
      <div className="relative w-full max-h-44 h-[140px] rounded-lg overflow-hidden">
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
          sizes='(max-width: 768px) 500vw, (max-width: 1200px) 140vw, 100vw'
          loading='lazy'
        />
        <div className="absolute h-full w-full  inset-0 bg-background/85 opacity-0 group-hover:opacity-100  transition-opacity duration-300 flex flex-col items-center justify-evenly p-2 z-50">
          {item.type === "movie" && (
            <p className="text-foreground text-xl font-bold z-50  text-center">{item.title}</p>
          )}
          {item.type === "tv" && (
            <p className="text-foreground text-xl font-bold z-50  text-center">{item.name}</p>
          )}

        </div>
      </div>
    </div>
  );
};

export default SimpleOrizontalCard;
