"use client"
import { backdropRatio, imageUrl, imgWidth, placeholders } from '@/lib/constants';
import { MovieData } from '@/lib/types/movie.types';
import { TvData } from '@/lib/types/tv.types';
import { FaRegBookmark, FaBookmark } from "react-icons/fa6";
import { FaEye, FaRegEye } from "react-icons/fa6";
import useIsWatched from '@/lib/hooks/use-watched';
import ImageWithLoader from '@/components/layout/image-with-loader';
import useWatchlist from '@/lib/hooks/use-watchlist';


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
    <div className={`relative max-w-[300px]`}>
      <div className='flex flex-col gap-3 rounded-sm bg-gradient-to-t from-muted/30 to-muted/60 '>
        {
          (isWatched || isListed) && (
            <div className="absolute top-0 right-0 h-full bg-foreground text-background text-sm font-semibold flex flex-col gap-3 justify-center items-center rounded-r-sm shadow-lg z-40  px-1 ">

              {isWatched && (
                <FaRegEye size={17} />
              )}
              {isListed && (
                <FaRegBookmark size={17} />
              )}
            </div>
          )
        }

        <ImageWithLoader src={imgSrc} ratio={backdropRatio} className='' />
        {/*  <div className="content-card-hover">
          {item.media_type === "movie" && (
            <p className="text-foreground text-base font-bold z-50 text-center">{item.title}</p>
          )}
          {item.media_type === "tv" && (
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
        </div> */}

      </div>
    </div>
  );
};

export default OrizontalCard;
