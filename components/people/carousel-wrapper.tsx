"use client"
import Link from "next/link";
import ContentCard from "@/components/cards/content-card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import OrizontalCard from "@/components/cards/orizontal-card";
import { MovieData } from "@/lib/types/movie";
import { TvData } from "@/lib/types/tv";



const CarouselWrapper = ({ contentList }: { contentList: MovieData[] | TvData[] }) => {
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
              {/*  <ContentCard
                item={{ id: content.id, poster_path: content.poster_path, media_type: content.media_type }}
              /> */}
              <OrizontalCard
                item={content}
                isWatchedServer={false}
                isBookmarkedServer={false}
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

export default CarouselWrapper;


