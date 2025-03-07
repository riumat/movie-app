import CarouselWrapperSkeleton from "@/components/landing-page/carousel-wrapper-skeleton";

const CarouselsSectionSkeleton = () => {
  return (
    <section className="mt-[390px] lg:mt-[440px] flex justify-center flex-1 z-10 mb-10">
      <div className="w-[62%] lg:w-[90%] flex flex-col gap-10 lg:gap-5">
        <div className="flex flex-col gap-3 lg:gap-5">
          <div className="h-6 w-36 bg-gray-700 rounded-md animate-pulse" />
          <CarouselWrapperSkeleton />
        </div>

        <div className="flex flex-col gap-3 lg:gap-5">
          <div className="h-6 w-36 bg-gray-700 rounded-md animate-pulse" />
          <CarouselWrapperSkeleton />
        </div>
      </div>
    </section>
  );
};

export default CarouselsSectionSkeleton;