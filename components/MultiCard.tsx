import React from 'react';
import Image from 'next/image';

interface CardProps {
  item: {
    name?: string;
    title?: string;
    media_type?: string;
    poster_path?: string;
    release_date?: string;
    first_air_date?: string;
  };
}

const MultiCard: React.FC<CardProps> = ({ item }) => {
  const title = item.name || item.title || 'Unknown';
  const imageUrl = item.poster_path ? `https://image.tmdb.org/t/p/w154${item.poster_path}`: 'https://placehold.co/150x150.webp';

  return (
    <div className="w-full m-4 flex gap-2 bg-transparent ">
      <div className="relative rounded-lg w-24 h-24 overflow-hidden flex items-center">
        <Image
          src={imageUrl}
          alt={title}
          width={150}
          height={150}
         
        />
      </div>
      <div className="flex-1 px-6 py-4 grid grid-cols-3 justify-items-center items-center">
        <div className="font-bold  mb-2">{title}</div>
        {item.media_type && (
          <p className="text-gray-400 text-base">{item.media_type} </p>
        )}
        <div className='text-gray-400'>{item.release_date?.slice(0, 4) ?? item.first_air_date?.slice(0, 4)}</div>
      </div>
    </div>
  );
};

export default MultiCard;