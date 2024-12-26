import React from 'react';
import { imageUrl, imgWidth, placeholders } from '@/lib/constants';
import ImageWithLoader from '@/components/layout/image-with-loader';

interface NameCardProps {
  name: string;
  imagePath: string;
  desc: string,
}

const WorkingPersonCard: React.FC<NameCardProps> = ({ name, imagePath, desc }) => {
  const imageSrc = imagePath ? `${imageUrl}${imgWidth.profile[185]}${imagePath}` : `${placeholders.profile}`;
  const invert = imagePath ? "" : "grayscale filter dark:invert";
  if (!name) {
    return null;
  }
  return (
    <div className="flex flex-col gap-1 bg-transparent w-full max-w-[140px] mx-auto text-foreground">
      <div className='relative w-full h-48 pb-[150%] rounded-lg overflow-hidden'>
        <ImageWithLoader
          src={imageSrc}
          className={invert}
        />
      </div>
      <div className='flex flex-col items-center  mt-2  justify-center'>
        <p className="text-center font-bold text-wrap text-xs xl:text-sm">{name}</p>
        <p className="text-center text-wrap text-xs xl:text-sm font-light text-foreground/80">{desc}</p>
      </div>
    </div>
  );
};

export default WorkingPersonCard;
