"use client"
import Link from "next/link";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { MovieData } from "@/lib/types/movie";
import { TvData } from "@/lib/types/tv";
import SimpleContentCard from "@/components/cards/simple-content-card";



const CarouselVertical = ({ contentList }: { contentList: MovieData[] | TvData[]}) => {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent>
        {contentList.map(content => (
          <CarouselItem
            key={content.id}
            className={"basis-1/5"}>
            <Link
              href={`/${content.media_type}/${content.id}`}
            >
              <SimpleContentCard
                item={content}
              />
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>

  );
}

export default CarouselVertical;


