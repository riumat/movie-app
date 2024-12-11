"use client"
import { useState } from 'react';
import Image from 'next/image';
import { imageUrl, imgWidth, placeholders } from '@/lib/constants';
import { PeopleFollowed } from '@/lib/types/people';
import Loader from '@/components/layout/loader';


const PeopleCard = ({ item }: { item: PeopleFollowed }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const onLoadCallback = () => {
    setIsImageLoaded(true);
  };
  const onErrorCallback = () => {
    setIsImageLoaded(false);
  };

  return (
    <div className=" flex items-center gap-3  relative justify-start ">
      <div className="flex justify-start relative w-40 h-40">
        {!isImageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader />
          </div>
        )}
        <Image
          src={item.profile_path ? `${imageUrl}${imgWidth.backdrop[300]}${item.profile_path}` : placeholders.multi}
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
        <div className="font-semibold text-center mb-2 text-lg">{item.name}</div>
       
      </div>
    </div>
  );
};

export default PeopleCard;