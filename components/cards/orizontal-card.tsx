"use client"
import { imageUrl, imgWidth, placeholders } from '@/lib/constants';
import { MovieData } from '@/lib/types/movie';
import { TvData } from '@/lib/types/tv';
import { FaRegBookmark, FaBookmark } from "react-icons/fa6";
import { FaEye, FaRegEye } from "react-icons/fa6";
import useIsWatched from '@/lib/hooks/use-watched';
import useWatchlist from '@/lib/hooks/use-watchlist';
import ImageWithLoader from '@/components/layout/image-with-loader';


const OrizontalCard = ({ item }: { item: MovieData | TvData }) => {
  const imgSrc = item.backdrop_path ? `${imageUrl}${imgWidth.backdrop[780]}${item.backdrop_path}` : placeholders.multi;
  const { isWatched, handleIsWatched } = useIsWatched(item);
  const { isListed, handleWatchlist } = useWatchlist(item);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>, handler: () => void) => {
    e.stopPropagation();
    e.preventDefault();
    handler();
  }

  return (
    <div className={`flex flex-col bg-transparent w-full max-w-[340px] rounded-lg mx-auto relative group `}>
      {isWatched && (
        <div className="absolute top-0 left-0 w-full bg-foreground text-background text-sm font-semibold flex gap-2 justify-center items-center  rounded-t-lg z-40 shadow ">
          <FaRegEye size={17} />
          <p className='text-center py-1'>Watched</p>
        </div>
      )}
      {isListed && (
        <div className="absolute bottom-0 left-0 w-full bg-foreground text-background text-sm font-semibold flex gap-2 justify-center items-center  rounded-b-lg z-40 shadow ">
          <FaRegBookmark size={17} />
          <p className='text-center py-1'>Watchlist</p>
        </div>
      )}
      <div className="relative w-full max-h-44 h-[140px] rounded-lg overflow-hidden">
        <ImageWithLoader src={imgSrc} />
        <div className="content-card-hover">
          {item.type === "movie" && (
            <p className="text-foreground text-base font-bold z-50 text-center">{item.title}</p>
          )}
          {item.type === "tv" && (
            <p className="text-foreground text-lg font-bold z-50 text-center">{item.name}</p>
          )}
          <div className='flex justify-evenly items-center w-full'>
            <div className="flex justify-between items-center">
              {isWatched ? (
                <div
                  className="content-card-button"
                  onClick={(e) => handleClick(e, handleIsWatched)}
                >
                  <FaEye size={30} />
                </div>
              ) : (
                <div
                  className="content-card-button"
                  onClick={(e) => handleClick(e, handleIsWatched)}
                >
                  <FaRegEye size={30} />
                </div>
              )}
            </div>
            <div className="flex justify-between items-center">
              {isListed ? (
                <div
                  className="content-card-button"
                  onClick={(e) => handleClick(e, handleWatchlist)}
                >
                  <FaBookmark size={30} />
                </div>
              ) : (
                <div
                  className="content-card-button"
                  onClick={(e) => handleClick(e, handleWatchlist)}
                >
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
