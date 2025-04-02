"use client"
import React from 'react';
import { imageUrl, imgWidth, placeholders } from '@/lib/constants';
import { MovieData } from '@/lib/types/movie.types';
import { TvData } from '@/lib/types/tv.types';
import ImageWithLoader from '@/components/layout/image-with-loader';


const SimpleOrizontalCard = ({ item }: { item: MovieData | TvData }) => {
  const imgSrc = item.backdrop_path ? `${imageUrl}${imgWidth.backdrop[780]}${item.backdrop_path}` : placeholders.multi;

  return (
    <div className={`flex flex-col bg-transparent w-[70%] lg:w-full max-w-[250px] rounded-lg mx-auto relative group`}>
      <div className="relative w-full max-h-44 h-[140px] rounded-lg overflow-hidden">
        <ImageWithLoader src={imgSrc} ratio={16 / 9} />
        <div className="absolute h-full w-full  inset-0 bg-background/85 opacity-0 group-hover:opacity-100  transition-opacity duration-300 flex flex-col items-center justify-evenly p-2 z-50">
          {item.media_type === "movie" && (
            <p className="text-foreground text-xl font-bold z-50  text-center">{item.title}</p>
          )}
          {item.media_type === "tv" && (
            <p className="text-foreground text-xl font-bold z-50  text-center">{item.name}</p>
          )}

        </div>
      </div>
    </div>
  );
};

export default SimpleOrizontalCard;
