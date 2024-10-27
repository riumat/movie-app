"use client"
import React from 'react';
import Image from 'next/image';
import { BeatLoader } from 'react-spinners';
import { imageUrl, imgWidth, placeholders } from '@/utils/constants';
import { ContentItem } from '@/utils/types';

interface MovieCardProps {
  item: ContentItem;
}

const MovieCard: React.FC<MovieCardProps> = ({ item }) => {
  const imgSrc = item.poster_path ? `${imageUrl}${imgWidth.poster[342]}${item.poster_path}` : placeholders.multi;
  const [isImageLoaded, setIsImageLoaded] = React.useState(false);

  const onLoadCallback = () => {
    setIsImageLoaded(true);
  };

  const onErrorCallback = () => {
    setIsImageLoaded(false);
  };

  return (
    <div className="flex flex-col bg-transparent w-full max-w-[170px] mx-auto">
      <div className="relative w-full max-h-60 pb-[150%] rounded-lg overflow-hidden">
        {!isImageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <BeatLoader color='#ffffff' size={10} />
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
      </div>
    </div>
  );
};

export default MovieCard;
