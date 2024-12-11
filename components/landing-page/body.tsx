import CarouselWrapper from "@/components/people/carousel-wrapper";

const Body = ({ movies, tv }: { movies: any, tv: any }) => {

  return (
    <div className="relative flex-1 flex justify-center max-h-80 mt-[230px]">
      <div className="w-[90%] mt-40 flex flex-col gap-8 ">
        <div className="flex flex-col gap-5 ">
          <p className="text-xl font-bold ">Trending Movies</p>
          <CarouselWrapper contentList={movies}  />
        </div>
        <div className="flex flex-col gap-5 ">
          <p className="text-xl font-bold ">Trending Tv Shows</p>
          <CarouselWrapper contentList={tv}  />
        </div>
      </div>
    </div >
  );
};

export default Body;