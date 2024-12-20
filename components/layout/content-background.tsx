import { imageUrl, imgWidth } from '@/lib/constants';
import Image from 'next/image';
import React from 'react'


const ContentBackground = ({ poster }: { poster: string }) => {
  return (
    <div className={`absolute inset-0  left-1/4 h-[69%] -z-30 `}>
      <div className="absolute inset-0 bg-gradient-to-l from-transparent via-background/10 to-background -z-10 " />
      <div className="flex h-full ">
        <div className="flex-1 relative w-full -z-20">
          <Image
            src={`${imageUrl}${imgWidth.poster.original}${poster}`}
            alt={"movie poster"}
            fill
            priority
            sizes={"100vw"}
            className="filter grayscale-[15%] brightness-90 object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default ContentBackground


