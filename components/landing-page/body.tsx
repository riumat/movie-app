import CarouselWrapper from "@/components/people/carousel-wrapper";

const Body = ({ movies, tv, session }: { movies: any, tv: any, session: any }) => {

  return (
    <div className="relative flex-1 flex justify-center h-[93.5vh] mt-[200px]">
      <div className="w-[90%] mt-40 flex flex-col gap-8 ">
        <div className="flex flex-col gap-5 ">
          <p className="text-xl font-bold ">Trending Movies</p>
          <CarouselWrapper contentList={movies} session={session} />
        </div>
        <div className="flex flex-col gap-5 ">
          <p className="text-xl font-bold ">Trending Tv Shows</p>
          <CarouselWrapper contentList={tv} session={session} />
        </div>
      </div>
    </div >
  );
};

export default Body;