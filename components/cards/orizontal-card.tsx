"use client"
import React from 'react';
import Image from 'next/image';
import { imageUrl, imgWidth, placeholders } from '@/lib/constants';
import { MovieData } from '@/lib/types/movie';
import { TvData } from '@/lib/types/tv';
import { FaRegBookmark, FaBookmark } from "react-icons/fa6";
import { FaEye, FaRegEye } from "react-icons/fa6";
import useIsWatched from '@/lib/hooks/use-watched';
import useWatchlist from '@/lib/hooks/use-watchlist';
import Loader from '@/components/layout/loader';


const OrizontalCard = ({ item, isWatchedServer, isBookmarkedServer }:
  { item: MovieData | TvData, isWatchedServer: boolean, isBookmarkedServer: boolean }
) => {
  const { isWatched, handleIsWatched } = useIsWatched(isWatchedServer, item);
  const { isListed, handleWatchlist } = useWatchlist(isBookmarkedServer, item);



  const imgSrc = item.backdrop_path ? `${imageUrl}${imgWidth.backdrop[780]}${item.backdrop_path}` : placeholders.multi;
  const [isImageLoaded, setIsImageLoaded] = React.useState(false);

  const onLoadCallback = () => {
    setIsImageLoaded(true);
  };

  const onErrorCallback = () => {
    setIsImageLoaded(false);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>, handler: () => void) => {
    e.stopPropagation();
    e.preventDefault();
    handler();
  }

  return (
    <div className={`flex flex-col bg-transparent w-full max-w-[350px]  rounded-lg mx-auto relative group ${isWatched ? 'border-b-4 border-destructive' : ''}`}>
      <div className="relative w-full max-h-44 h-40 rounded-lg overflow-hidden">
        {!isImageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader />
          </div>
        )}
        <Image
          src={imgSrc}
          alt={"alt item"}
          fill
          className='rounded-lg z-30 object-contain'
          onLoad={onLoadCallback}
          onError={onErrorCallback}
          sizes='(max-width: 768px) 500vw, (max-width: 1200px) 140vw, 100vw'
          loading='lazy'
        />
        <div className="absolute inset-0 bg-background/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-evenly p-2 z-50">
          {item.type === "movie" && (
            <p className="text-foreground text-xl font-bold z-50  text-center">{item.title}</p>
          )}
          {item.type === "tv" && (
            <p className="text-foreground text-xl font-bold z-50  text-center">{item.name}</p>
          )}
          <div className='flex justify-evenly items-center  w-full'>
            <div className="flex justify-between items-center">
              {isWatched ? (
                <div className="flex gap-2 items-center active:scale-90 duration-100" onClick={(e) => handleClick(e, handleIsWatched)}>
                  <FaEye size={30} />
                </div>
              ) : (
                <div className="flex gap-2 items-center active:scale-90 duration-100" onClick={(e) => handleClick(e, handleIsWatched)}>
                  <FaRegEye size={30} />
                </div>
              )}
            </div>
            <div className="flex justify-between items-center">
              {isListed ? (
                <div className="flex gap-2 items-center active:scale-90 duration-100" onClick={(e) => handleClick(e, handleWatchlist)}>
                  <FaBookmark size={30} />
                </div>
              ) : (
                <div className="flex gap-2 items-center active:scale-90 duration-100" onClick={(e) => handleClick(e, handleWatchlist)}>
                  <FaRegBookmark size={30} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrizontalCard;
