"use client"
import React from 'react';
import Image from 'next/image';
import { imageUrl, imgWidth, placeholders } from '@/lib/constants';
import { MovieData } from '@/lib/types/movie';
import { TvData } from '@/lib/types/tv';
import Loader from '@/components/layout/loader';
import ImageWithLoader from '@/components/layout/image-with-loader';


const SimpleContentCard = ({ item }: { item: MovieData | TvData }) => {
  const imgSrc = item.poster_path ? `${imageUrl}${imgWidth.poster[342]}${item.poster_path}` : placeholders.multi;

  return (
    <div className={`flex flex-col bg-transparent w-full max-w-[170px] rounded-lg mx-auto relative group `}>

      <div className="relative w-full max-h-60 pb-[150%] rounded-lg overflow-hidden">
        <ImageWithLoader src={imgSrc} />
        <div className="content-card-hover">
          {(item.media_type === "movie" || item.type === "movie") && (
            <p className="text-foreground text-sm font-bold z-50 mt-3 text-center">{(item as MovieData).title}</p>
          )}
          {(item.media_type === "tv" || item.type === "tv") && (
            <p className="text-foreground text-sm font-bold z-50 mt-3 text-center">{(item as TvData).name}</p>
          )}

        </div>
      </div>
    </div>
  );
};

export default SimpleContentCard;
