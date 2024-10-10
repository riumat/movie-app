"use client"
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { BeatLoader } from 'react-spinners';
import { imgWidth, placeholders } from '@/utils/constants';

interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    poster_path: string;
  };
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const imageUrl = movie.poster_path ? `https://image.tmdb.org/t/p${imgWidth.poster[92]}${movie.poster_path}` : placeholders.multi;
  const router = useRouter();
  const [isImageLoaded, setIsImageLoaded] = React.useState(false);

  const handleClick = () => {
    router.push(`/movie/${movie.id}`);
  };

  const onLoadCallback = () => {
    setIsImageLoaded(true);
  };

  const onErrorCallback = () => {
    setIsImageLoaded(false);
  };

  return (
    <div className="w-full m-4 flex gap-10 bg-transparent cursor-pointer items-center " onClick={handleClick}>
      <div className="relative rounded-lg w-16 h-16 flex items-center overflow-hidden">
        {!isImageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <BeatLoader color='#ffffff' size={10} />
          </div>
        )}
        <Image
          src={imageUrl}
          alt={movie.title}
          width={92}
          height={92}
          className='object-contain rounded-lg z-30'
          onLoad={onLoadCallback}
          onError={onErrorCallback}
        />
      </div>
      <div className="mt-2 text-center">
        <h3 className="font-semibold text-sm">{movie.title}</h3>
      </div>
    </div>
  );
};

export default MovieCard;
