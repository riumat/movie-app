"use client"
import React from 'react';
import Image from 'next/image';
import { BeatLoader } from 'react-spinners';
import { imageUrl, imgWidth, placeholders } from '@/lib/constants';
import { MovieData } from '@/lib/types/movie';
import { TvData } from '@/lib/types/tv';
import { FaRegBookmark, FaBookmark } from "react-icons/fa6";
import { FaEye, FaRegEye } from "react-icons/fa6";
import useIsWatched from '@/lib/hooks/use-watched';
import useWatchlist from '@/lib/hooks/use-watchlist';


const ContentCard = ({ item, isWatchedServer, isBookmarkedServer }:
  { item: MovieData | TvData, isWatchedServer: boolean, isBookmarkedServer: boolean }
) => {
  const { isWatched, handleIsWatched } = useIsWatched(isWatchedServer, item);
  const { isListed, handleWatchlist } = useWatchlist(isBookmarkedServer, item);
  const [isImageLoaded, setIsImageLoaded] = React.useState(false);
  const imgSrc = item.poster_path ? `${imageUrl}${imgWidth.poster[342]}${item.poster_path}` : placeholders.multi;

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
    <div className={`flex flex-col bg-transparent w-full max-w-[170px] rounded-lg mx-auto relative group ${isWatched ? '' : ''}`}>
      {isWatched && (
        <div className="absolute top-0 left-0 w-full bg-foreground text-background text-xs font-bold  rounded-t-lg z-40">
          <p className='text-center py-1'> Watched</p>
        </div>
      )}
      <div className="relative w-full max-h-60 pb-[150%] rounded-lg overflow-hidden">
        {!isImageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <BeatLoader color='#ffffff' size={10} />
          </div>
        )}
        <Image
          src={imgSrc}
          alt={"alt item"}
          fill
          className='rounded-lg z-30 object-contain'
          onLoad={onLoadCallback}
          onError={onErrorCallback}
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          loading='lazy'
        />
        <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-between p-2 z-50">
          {item.type === "movie" && (
            <p className="text-foreground text-sm font-bold z-50 mt-3 text-center">{item.title}</p>
          )}
          {item.type === "tv" && (
            <p className="text-foreground text-sm font-bold z-50 mt-3 text-center">{item.name}</p>
          )}
          <div className='flex justify-evenly items-center mb-3 w-full'>
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

export default ContentCard;
