import CarouselWrapper from "@/components/landing-page/carousel-wrapper";
import { getLandingPageData } from "@/lib/fetchers/index";

const CarouselsSection = async () => {
  const { movies, tv } = await getLandingPageData();

  return (
    <section className="mt-[560px] flex justify-center flex-1 z-10 mb-10">
      <div className="w-[62%] md:w-[70%] lg:w-[80%] xl:w-[90%] flex flex-col gap-10 lg:gap-8 ">
        <div className="flex flex-col gap-3 lg:gap-3">
          <p className="text-lg lg:text-xl text-center lg:text-start font-semibold ">Trending movies</p>
          <CarouselWrapper contentList={movies} />
        </div>
        <div className="flex flex-col gap-3 lg:gap-3">
          <p className="text-lg lg:text-xl text-center lg:text-start font-semibold ">Trending tv shows</p>
          <CarouselWrapper contentList={tv} />
        </div>
      </div>
    </section >
  );
};

export default CarouselsSection;