import CarouselWrapper from "@/components/landing-page/carousel-wrapper";
import { getLandingPageData } from "@/lib/fetchers/index";

const CarouselsSection = async () => {
  const { movies, tv, ratedMovies, ratedTvs } = await getLandingPageData();

  return (
    <section className="mt-[390px] lg:mt-[440px] flex justify-center flex-1 z-10 mb-10">
      <div className="w-[62%] lg:w-[90%] flex flex-col gap-10 lg:gap-8">
        {ratedMovies.length !== 0 && ratedTvs.length !== 0 && (
          <>
            <div className="flex flex-col gap-3 lg:gap-3">
              <p className="text-base lg:text-xl text-center lg:text-start font-semibold ">Movies for you</p>
              <CarouselWrapper contentList={ratedMovies} />
            </div>
            <div className="flex flex-col gap-3 lg:gap-3">
              <p className="text-base lg:text-xl text-center lg:text-start font-semibold ">Shows for you</p>
              <CarouselWrapper contentList={ratedTvs} />
            </div>
          </>
        )}

        <div className="flex flex-col gap-3 lg:gap-3">
          <p className="text-base lg:text-xl text-center lg:text-start font-semibold ">Trending movies</p>
          <CarouselWrapper contentList={movies} />
        </div>
        <div className="flex flex-col gap-3 lg:gap-3">
          <p className="text-base lg:text-xl text-center lg:text-start font-semibold ">Trending tv shows</p>
          <CarouselWrapper contentList={tv} />
        </div>
      </div>
    </section >
  );
};

export default CarouselsSection;