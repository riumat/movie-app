import React from 'react';
import Image from 'next/image';
import { imageUrl, imgWidth, placeholders } from '@/lib/constants';
import Loader from '@/components/layout/loader';

interface NameCardProps {
  name: string;
  imagePath: string;
  desc: string,
}

const WorkingPersonCard: React.FC<NameCardProps> = ({ name, imagePath, desc }) => {
  const [imageLoaded, setImageLoaded] = React.useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageLoaded(false);
  };
  if (!name) {
    return null;
  }
  return (
    <div className="flex flex-col gap-1 bg-transparent w-full max-w-[140px] mx-auto text-foreground">
      <div className='relative w-full h-48 pb-[150%] rounded-lg overflow-hidden'>
        {!imageLoaded && (
          <div className="z-40 flex justify-center items-center h-48 ">
            <Loader />
          </div>
        )}
        <Image
          src={imagePath ? `${imageUrl}${imgWidth.profile[185]}${imagePath}` : `${placeholders.profile}`}
          alt={`${name}'s profile picture`}
          fill
          className={`rounded-lg z-30 object-contain ${imagePath ? "" : "grayscale filter invert  "}`}
          sizes={"(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading='lazy'
        />
      </div>
      <div className='flex flex-col items-center  mt-2  justify-center'>
        <p className="text-center font-semibold text-wrap text-xs xl:text-sm">{name}</p>
        <p className="text-center text-wrap text-xs xl:text-sm font-extralight">{desc}</p>
      </div>
    </div>
  );
};

export default WorkingPersonCard;
