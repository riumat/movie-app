import CarouselWrapper from "@/components/people/carousel-wrapper";
import { MovieData } from "@/lib/types/movie.types";
import { TvData } from "@/lib/types/tv.types";

const Body = ({ movies, tv }: { movies: MovieData[], tv: TvData[] }) => {
  return (
    <section className="mt-[390px] lg:mt-[440px] flex justify-center flex-1 z-10 mb-10">
      <div className="w-[62%] lg:w-[90%] flex flex-col gap-10 lg:gap-5 ">
        <div className="flex flex-col gap-3 lg:gap-5">
          <p className="text-base lg:text-lg text-center lg:text-start font-semibold ">Trending Movies</p>
          <CarouselWrapper contentList={movies} />
        </div>
        <div className="flex flex-col gap-3 lg:gap-5">
          <p className="text-base lg:text-lg text-center lg:text-start font-semibold ">Trending Tv Shows</p>
          <CarouselWrapper contentList={tv} />
        </div>
      </div>
    </section >
  );
};

export default Body;