"use client"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const CarouselWrapperSkeleton = () => {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent >
        {Array.from({ length: 6 }).map((_, index) => (
          <CarouselItem
            key={index}
            className="basis-[100%] md:basis-1/2 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6 flex items-center pl-4">
            <div key={index} className="h-[130px] w-full max-w-[300px] bg-gray-700 rounded-md animate-pulse " />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious disabled className="-left-14 " />
      <CarouselNext disabled className="-right-14 " />
    </Carousel>

  );
}

export default CarouselWrapperSkeleton;


