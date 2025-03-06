"use client"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { MovieData } from "@/lib/types/movie.types";
import { TvData } from "@/lib/types/tv.types";
import SimpleOrizontalCard from "@/components/cards/simple-orizontal-card";
import ContentInfoModal from "@/components/content/content-info-modal";

const CarouselWrapper = ({ contentList }: { contentList: MovieData[] | TvData[] }) => {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,

      }}
    >
      <CarouselContent >
        {contentList.map(content => (
          <CarouselItem
            key={content.id}
            className="basis-[100%] md:basis-1/2 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6 flex items-center pl-4">
            <ContentInfoModal content={content} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="-left-14 " />
      <CarouselNext className="-right-14 " />
    </Carousel>

  );
}

export default CarouselWrapper;


