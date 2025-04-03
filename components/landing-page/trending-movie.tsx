import { Button } from "@/components/ui/button";
import { imageUrl, imgWidth } from "@/lib/constants";
import { formatDate, formatMinutes } from "@/lib/functions";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface TrendingMovieSectionProps {
  movie: {
    title: string;
    id: number;
    poster: string;
    release: string;
    runtime: number;
    genres: { id: number; name: string }[];
  };
}

const TrendingMovieSection = ({ movie }: TrendingMovieSectionProps) => {

  return (
    <div className='absolute h-[60vh] w-full  '>
      <div className="relative h-full ">
        <div className="absolute top-0 mx-auto w-full h-full right-0 border " >
          <Image
            priority
            src={`${imageUrl}${imgWidth.poster.original}${movie.poster}`}
            alt={movie.title}
            fill
            sizes={"(max-width: 768px) 100vh, (max-width: 1200px) 100vw"}
            quality={100}
            className="object-cover"
          />
        </div>

        <div className='hidden lg:block absolute top-0 right-0 mx-auto bg-gradient-to-r from-background via-background/20 to-transparent  b0 w-full h-full ' />
        <div className="absolute -bottom-[10px] left-0 w-[101%] h-full lg:h-[50%] bg-gradient-to-t from-background via-background/90 lg:via-background/80 to-transparent z-0 " />
        <div className="absolute flex flex-col items-center lg:items-start w-full h-[50%] top-[35%] lg:top-[30%] text-center lg:text-start lg:left-20 z-30 ">
          <p className="font-light text-base lg:text-lg mb-3 lg:mb-6">Top trending movie this week</p>
          <div className=" flex flex-col gap-3 items-center lg:items-start">
            <p className="text-foreground font-bold text-2xl lg:text-4xl">{movie.title}</p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 lg:gap-5 text-sm lg:text-base justify-center lg:justify-start">
                <p>{formatDate(movie.release)}</p>
                <p>•</p>
                <p>{formatMinutes(movie.runtime)}</p>
              </div>
              <div className="flex items-center gap-1 text-sm lg:text-base justify-center lg:justify-start">
                {movie.genres.map((genre, index, array) => (
                  <span key={genre.id} className="mr-2">
                    {genre.name}{index < array.length - 1 ? ',' : ''}
                  </span>
                ))}
              </div>
            </div>
            <Link
              href={`/movie/${movie.id}`}
              className=" "
            >
              <Button variant="default" size="default" className="w-40 mt-3 lg:mt-0 flex justify-center items-center gap-2" >

                <p className="font-semibold ">Details</p>
                <ArrowRight  className=" !w-5 !h-5" />
              </Button>
            </Link>

          </div>
        </div>
      </div>
    </div >
  );
};

export default TrendingMovieSection;
