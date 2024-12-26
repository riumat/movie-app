import CarouselWrapper from "@/components/people/carousel-wrapper";
import { MovieData } from "@/lib/types/movie";
import { TvData } from "@/lib/types/tv";

const Body = ({ movies, tv }: { movies: MovieData[], tv: TvData[] }) => {

  return (
    <section className="relative flex-1 flex justify-center h-[93.5vh] mt-[330px]">
      <div className="w-[90%] mt-40 flex flex-col gap-8 ">
        <div className="flex flex-col gap-5  ">
          <p className="text-xl font-bold ">Trending Movies</p>
          <CarouselWrapper contentList={movies}  />
        </div>
        <div className="flex flex-col gap-5 ">
          <p className="text-xl font-bold ">Trending Tv Shows</p>
          <CarouselWrapper contentList={tv} />
        </div>
      </div>
    </section >
  );
};

export default Body;