"use client"
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { BeatLoader } from 'react-spinners';
import { imageUrl, imgWidth, placeholders } from '@/utils/constants';

interface CardProps {
  item: {
    id?: number;
    name?: string;
    title?: string;
    media_type?: string;
    poster_path?: string;
    release_date?: string;
    first_air_date?: string;
    profile_path?: string;
  };
}

const MultiCard: React.FC<CardProps> = ({ item }) => {
  const title = item.name || item.title || 'Unknown';
  const imagePath = item.poster_path ?? item.profile_path;
  const imageSrc = imagePath ? `${imageUrl}${imgWidth.backdrop[300]}${imagePath}` : placeholders.multi;
  const router = useRouter();
  const [isImageLoaded, setIsImageLoaded] = React.useState(false);

  const handleClick = () => {
    switch (item.media_type) {
      case 'movie':
        router.push(`/movie/${item.id}`);
        break;
      case 'tv':
        router.push(`/tv/${item.id}`);
        break;
      case 'person':
        router.push(`/person/${item.id}`);
        break;
    }
  };

  const onLoadCallback = () => {
    setIsImageLoaded(true);
  };
  const onErrorCallback = () => {
    setIsImageLoaded(false);
  };

  return (
    <div className="py-5 flex flex-col gap-5 bg-transparent cursor-pointer items-center  hover:bg-gray-500/15 w-64  rounded-lg" onClick={handleClick}>
      <div className="relative rounded-lg w-44 h-64 overflow-hidden flex items-center">
        {!isImageLoaded && (
          <BeatLoader color='#ffffff' size={10} />
        )}
        <Image
          src={imageSrc}
          alt={title}
          fill
          onLoad={onLoadCallback}
          onError={onErrorCallback}
          className={`object-contain ${imagePath ? '' : 'grayscale brightness-125 contrast-0'}`}
        />
      </div>
      <div className=" flex flex-col items-center ">
        <div className="font-bold text-center  mb-2">{title}</div>
        <div className='flex gap-2 justify-center'>
          {item.media_type && (
            <p className="text-gray-400 px-3 py-1 border border-white/30 rounded-xl  text-sm">{item.media_type ? item.media_type[0].toUpperCase() + item.media_type.slice(1) : ''} </p>
          )}
          {(item.release_date || item.first_air_date) && (
            <div className='text-gray-400 px-3 py-1 border border-white/30 rounded-xl text-sm'>{item.release_date?.slice(0, 4) ?? item.first_air_date?.slice(0, 4)}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiCard;