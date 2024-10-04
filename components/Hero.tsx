"use client"
import Searchbar from '@/components/Searchbar';
import React from 'react';
import Image from 'next/image';
import { imageUrl } from '@/utils/constants';

interface Movie {
  poster_path: string;
  title: string;
}

interface HeroProps {
  movies: Movie[];
}
const Hero: React.FC<HeroProps> = ({ movies }) => {

  return (
    <div className="relative flex-1">
      <div className="absolute inset-0 z-0">
        <div className="flex h-full">
          {movies.map((movie, index) => (
            <div key={index} className="flex-1 relative">
              <Image
                src={`${imageUrl}/w780${movie.poster_path}`}
                alt={movie.title}
                layout="fill"
                objectFit="cover"
                className="filter grayscale-[80%] brightness-90"
              />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/85 to-black " />
      </div>
      <div className="relative h-full z-10 flex items-center justify-center">
        <div className='w-full max-w-4xl mt-56'>
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-300 to-cyan-400 rounded-lg blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
            <div className="relative">
              <Searchbar onSearch={(query) => { console.log(query) }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
