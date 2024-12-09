"use client"
import { useState } from 'react';
import Image from 'next/image';
import { BeatLoader } from 'react-spinners';
import { imageUrl, imgWidth, placeholders } from '@/lib/constants';
import { MovieResult } from '@/lib/types/movie';
import { TvResult } from '@/lib/types/tv';
import { PeopleResult } from '@/lib/types/people';

//
const MultiCard = ({ item }: { item: MovieResult | TvResult | PeopleResult }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const image = item.media_type === 'person' ? item.profile_path : item.poster_path;

  const onLoadCallback = () => {
    setIsImageLoaded(true);
  };
  const onErrorCallback = () => {
    setIsImageLoaded(false);
  };

  return (
    <div className=" flex flex-col w-full max-w-[140px] rounded-lg mx-auto bg-transparent text-foreground gap-3 ">
      <div className="relative w-full max-h-92 pb-[150%] rounded-lg overflow-hidden">
        {!isImageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <BeatLoader color='#ffffff' size={10} />
          </div>
        )}
        <Image
          src={image ? `${imageUrl}${imgWidth.backdrop[300]}${image}` : placeholders.multi}
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
        {item.media_type === 'person' ? (
          <div className="font-semibold text-center mb-2 text-base">{item.name}</div>
        ) : (
          <div className="font-semibold text-center mb-2 text-base">{item.media_type === "movie" ? item.title : item.name}</div>
        )}
        <div className='flex gap-2 justify-center '>
          {item.media_type && (
            <p className=" font-light px-3 py-1 border border-foreground/30 rounded-xl  text-sm">{item.media_type[0].toUpperCase() + item.media_type.slice(1)} </p>
          )}
          {item.media_type !== "person" && (
            item.media_type === "movie" ? (
              item.release_date && (
                <p className=' font-light px-3 py-1 border border-foreground/30 rounded-xl text-sm'>{item.release_date?.slice(0, 4)}</p>
              )
            ) : (
              (item.first_air_date) && (
                <p className='font-light px-3 py-1 border border-foreground/30 rounded-xl text-sm'>{item.first_air_date?.slice(0, 4)}</p>
              )
            ))}
        </div>
      </div>
    </div>
  );
};

export default MultiCard;