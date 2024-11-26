"use client"
import { useState } from 'react';
import Image from 'next/image';
import { BeatLoader } from 'react-spinners';
import { imageUrl, imgWidth, placeholders } from '@/lib/constants';
import { PeopleResult } from '@/lib/types/people';


const PeopleCard = ({ item }: { item: PeopleResult }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const onLoadCallback = () => {
    setIsImageLoaded(true);
  };
  const onErrorCallback = () => {
    setIsImageLoaded(false);
  };

  return (
    <div
      className="py-5 flex flex-col gap-3  bg-transparent items-center hover:bg-border/40 duration-200 text-foreground w-56 rounded-lg"
    >
      <div className="relative rounded-lg w-[174px] h-64 overflow-hidden flex items-center">
        {!isImageLoaded && (
          <BeatLoader color='#ffffff' size={10} />
        )}
        <Image
          src={item.profile_path ? `${imageUrl}${imgWidth.backdrop[300]}${item.profile_path}` : placeholders.multi}
          alt={"poster movie"}
          fill
          onLoad={onLoadCallback}
          onError={onErrorCallback}
          className={`object-contain ${item.profile_path ? '' : 'grayscale brightness-125 contrast-0'}`}
          sizes='300w 300h'

        />
      </div>
      <div className=" flex flex-col items-center text-sm">
        <div className="font-semibold text-center mb-2">{item.name}</div>
        <div className='flex gap-2 justify-center'>
          {item.media_type && (
            <p className=" font-light px-3 py-1 border border-foreground/30 rounded-xl text-sm">{item.media_type[0].toUpperCase() + item.media_type.slice(1)} </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PeopleCard;