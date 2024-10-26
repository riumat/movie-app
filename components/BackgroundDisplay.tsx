import { imageUrl, imgWidth } from '@/utils/constants';
import Image from 'next/image';
import React from 'react'

interface BackgroundDisplayProps {
  posters: string[];
  page: string
}

const BackgroundDisplay: React.FC<BackgroundDisplayProps> = ({ posters, page }) => {
  return (
    <div className={`fixed inset-0 ${page === "content" ? "-top-40" : "top-0"} left-0 -z-30 `}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black -z-10 " />
      <div className="flex h-full ">
        {posters.map((path, index) => (
          <div key={index} className="flex-1 relative w-full -z-20">
            <Image
              src={`${imageUrl}${imgWidth.poster.original}${path}`}
              alt={"movie poster"}
              fill
              priority
              sizes={page === "content" ? "100vw" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
              className="filter grayscale-[80%] brightness-90 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BackgroundDisplay


