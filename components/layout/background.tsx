import { imageUrl, imgWidth } from '@/lib/constants';
import Image from 'next/image';
import React from 'react'

const Background = ({ posters }: { posters: string[] }) => {
  return (
    <div className={`absolute inset-0 top-0 left-0 -z-30 `}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/70 to-background -z-10 " />
      <div className="flex h-full ">
        {posters.map((path, index) => (
          <div key={index} className="flex-1 relative w-full -z-20">
            <Image
              src={`${imageUrl}${imgWidth.poster.original}${path}`}
              alt={"movie poster"}
              fill
              priority
              sizes={"33vw"}
              className="filter grayscale-[50%] brightness-90 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Background


