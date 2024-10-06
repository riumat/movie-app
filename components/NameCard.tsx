import React from 'react';
import Image from 'next/image';

interface NameCardProps {
  name: string;
  imagePath: string;
  character: string;
}

const NameCard: React.FC<NameCardProps> = ({ name, imagePath, character }) => {
  return (
    <div className="flex flex-col items-center  text-slate-100 rounded border border-slate-600 w-36">
      <div className='w-36 h-36 overflow-hidden relative -z-10 '>
        <Image
          src={imagePath}
          alt={`${name}'s profile picture`}
          fill
          className="rounded-t object-cover"
        />
      </div>
      <div className='flex flex-col items-center gap-2 m-3 justify-center'>
        <p className="text-center font-semibold text-wrap text-[14px]">{name}</p>
        <p className="text-center text-gray-300 text-[14px]">{character}</p>
      </div>
    </div>
  );
};

export default NameCard;
