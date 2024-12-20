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
import ImageWithLoader from '@/components/layout/image-with-loader';

const ContentCard = ({ item, }: { item: MovieData | TvData }
) => {
  const { isWatched, handleIsWatched } = useIsWatched(item);
  const { isListed, handleWatchlist } = useWatchlist(item);
  const imgSrc = item.poster_path ? `${imageUrl}${imgWidth.poster[342]}${item.poster_path}` : placeholders.multi;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>, handler: () => void) => {
    e.stopPropagation();
    e.preventDefault();
    handler();
  }

  return (
    <div className={`flex flex-col bg-transparent w-full max-w-[170px] rounded-lg mx-auto relative group`}>
      {isWatched && (
        <div className="absolute top-0 left-0 w-full bg-foreground text-background text-sm font-semibold flex gap-2 justify-center items-center  rounded-t-lg z-40 shadow py-1">
          <FaRegEye size={17} />
          <p className='text-center py-1'>Watched</p>
        </div>
      )}
       {isListed && (
        <div className="absolute bottom-0 left-0 w-full bg-foreground text-background text-sm font-semibold flex gap-2 justify-center items-center  rounded-b-lg z-40 shadow py-1">
          <FaRegBookmark size={17} />
          <p className='text-center py-1'>Watchlist</p>
        </div>
      )}
      <div className="relative w-full max-h-60 pb-[150%] rounded-lg overflow-hidden">
        <ImageWithLoader src={imgSrc} />
        <div className="content-card-hover">
          {item.type === "movie" && (
            <p className="text-foreground text-base font-bold z-50 mt-3 text-center">{item.title}</p>
          )}
          {item.type === "tv" && (
            <p className="text-foreground text-base font-bold z-50 mt-3 text-center">{item.name}</p>
          )}
          <div className='flex justify-evenly items-center mb-3 w-full'>
            <div className="flex justify-between items-center">
              {isWatched ? (
                <div className="content-card-button" onClick={(e) => handleClick(e, handleIsWatched)}>
                  <FaEye size={30} />
                </div>
              ) : (
                <div className="content-card-button" onClick={(e) => handleClick(e, handleIsWatched)}>
                  <FaRegEye size={30} />
                </div>
              )}
            </div>
            <div className="flex justify-between items-center">
              {isListed ? (
                <div className="content-card-button" onClick={(e) => handleClick(e, handleWatchlist)}>
                  <FaBookmark size={30} />
                </div>
              ) : (
                <div className="content-card-button" onClick={(e) => handleClick(e, handleWatchlist)}>
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
