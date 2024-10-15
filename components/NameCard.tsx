import React from 'react';
import Image from 'next/image';
import { imageUrl, imgWidth, placeholders } from '@/utils/constants';
import { BeatLoader } from 'react-spinners';

interface NameCardProps {
  name: string;
  imagePath: string;
  desc: string,
}

const NameCard: React.FC<NameCardProps> = ({ name, imagePath, desc }) => {
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
    <div className="flex flex-col items-center  text-slate-50 rounded-lg w-20 h-56 lg:w-28 lg:h-56 xl:w-40 xl:h-64 ">
      <div className='w-20 h-20 lg:w-28 lg:h-28 xl:w-40 xl:h-40 overflow-hidden relative '>
        {!imageLoaded && (
          <div className="z-40 flex justify-center items-center h-full">
            <BeatLoader color="#ffffff" size={10} />
          </div>
        )}
        <Image
          src={imagePath ? `${imageUrl}${imgWidth.profile[185]}${imagePath}` : `${placeholders.profile}`}
          alt={`${name}'s profile picture`}
          fill
          className={`rounded-lg object-cover ${imagePath ? "" : "grayscale filter invert  "}`}
          sizes={"(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      </div>
      <div className='flex flex-col items-center gap-2 mt-2  justify-center'>
        <p className="text-center font-bold text-wrap text-xs xl:text-sm">{name}</p>
        <p className="text-center text-wrap text-xs xl:text-sm opacity-75">{desc}</p>
      </div>
    </div>
  );
};

export default NameCard;
