import React from 'react';
import Image from 'next/image';

interface NameCardProps {
  name: string;
  imagePath: string;
}

const NameCard: React.FC<NameCardProps> = ({ name, imagePath }) => {
  return (
    <div className="flex flex-col items-center  text-slate-100 rounded w-36 h-52 ">
      <div className='w-36 h-36 overflow-hidden relative -z-10'>
        <Image
          src={imagePath}
          alt={`${name}'s profile picture`}
          fill
          className="rounded object-cover"
        />
      </div>
      <div className='flex flex-col items-center gap-2 m-3 justify-center'>
        <p className="text-center font-semibold text-wrap text-[13px]">{name}</p>
      </div>
    </div>
  );
};

export default NameCard;
