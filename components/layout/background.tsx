import { imageUrl, imgWidth } from '@/lib/constants';
import Image from 'next/image';
import React from 'react'

const Background = ({ posters }: { posters: string[] }) => {
  return (
    <div className={`absolute top-0 left-0  h-full w-full`}>
      <div className="absolute w-full h-full top-0 left-0 bg-gradient-to-b from-secondary via-background via-[30%] to-background -z-10" />
      {/*  <div className='bg-gradient-to-tr from-[#00e6e4] to-[#fb4f93] absolute top-0 left-3 w-full h-full -z-20' /> */}

      {/*  <div className="flex absolute top-0 left-0 w-full h-full -z-20">
        {posters.map((path, index) => (
          <div key={index} className="flex-1 relative w-full ">
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
      */}
    </div>
  );
};

export default Background


