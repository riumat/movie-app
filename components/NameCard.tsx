import React from 'react';
import Image from 'next/image';

interface NameCardProps {
  name: string;
  imagePath: string;
  desc: string,
}

const NameCard: React.FC<NameCardProps> = ({ name, imagePath, desc }) => {
  if (!name || !imagePath) {
    return null;
  }
  return (
    <div className="flex flex-col items-center  text-slate-50 rounded w-36 h-64 ">
      <div className='w-36 h-36 overflow-hidden relative -z-10'>
        <Image
          src={imagePath}
          alt={`${name}'s profile picture`}
          fill
          className="rounded object-cover"
          sizes={"(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
        />
      </div>
      <div className='flex flex-col items-center gap-2 mt-2  justify-center'>
        <p className="text-center font-bold text-wrap text-[14px]">{name}</p>
        <p className="text-center text-wrap text-[13px] opacity-75">{desc}</p>
      </div>
    </div>
  );
};

export default NameCard;
