"use client"
import React from 'react';
import Image from 'next/image';
import { imageUrl, imgWidth, placeholders } from '@/lib/constants';
import { MovieData } from '@/lib/types/movie';
import { TvData } from '@/lib/types/tv';
import { FaRegBookmark, FaBookmark } from "react-icons/fa6";
import { FaEye, FaRegEye } from "react-icons/fa6";
import Loader from '@/components/layout/loader';


const SimpleContentCard = ({ item, }:
  { item: any }
) => {
  const [isImageLoaded, setIsImageLoaded] = React.useState(false);
  const imgSrc = item.poster_path ? `${imageUrl}${imgWidth.poster[342]}${item.poster_path}` : placeholders.multi;

  const onLoadCallback = () => {
    setIsImageLoaded(true);
  };

  const onErrorCallback = () => {
    setIsImageLoaded(false);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>, handler: () => void) => {
    e.stopPropagation();
    e.preventDefault();
    handler();
  }

  return (
    <div className="flex items-center gap-3 w-32 h-32 relative justify-start border">
      <div className='flex justify-start relative w-32 h-32'>
        {!isImageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader />
          </div>
        )}
        <Image
          src={`${imageUrl}${imgWidth.poster[342]}${item.poster_path}`}
          alt={item.title}
          fill
          className='rounded-lg z-30 object-contain block '
          onLoad={onLoadCallback}
          onError={onErrorCallback}
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          loading='lazy'
        />
      </div>
      <div className="flex flex-col gap-1 items-start">
        <p className="font-bold text-xl">{item.type === "movie" ? item.title : item.name}</p>
        <p className='px-3 py-1 rounded-xl border'>{item.type}</p>
      </div>

    </div>
  );
};

export default SimpleContentCard;
