"use client"
import Link from "next/link";
import ContentCard from "@/components/cards/content-card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ContentItem } from "@/lib/types/content";



const CarouselWrapper = ({ contentList }: { contentList: ContentItem[] }) => {
  return (
    <Carousel>
      <CarouselContent>
        {contentList.map(content => (
          <CarouselItem
            key={content.id}
            className="basis-1/5">
            <Link
              href={`/${content.media_type}/${content.id}`}
            >
              <ContentCard
                item={{ id: content.id, poster_path: content.poster_path, media_type: content.media_type }}
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


