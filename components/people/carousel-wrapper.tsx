"use client"
import Link from "next/link";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import OrizontalCard from "@/components/cards/orizontal-card";
import { MovieData } from "@/lib/types/movie";
import { TvData } from "@/lib/types/tv";
import SimpleOrizontalCard from "@/components/cards/simple-orizontal-card";



const CarouselWrapper = ({ contentList, session }: { contentList: MovieData[] | TvData[], session: any }) => {
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
              {session ? (
                <OrizontalCard
                  item={content}
                  isWatchedServer={false}
                  isBookmarkedServer={false}
                />
              ) : (
                <SimpleOrizontalCard
                  item={content}
                />
              )}
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


