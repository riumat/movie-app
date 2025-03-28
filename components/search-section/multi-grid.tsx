import ContentCard from "@/components/cards/content-card";
import PersonCard from "@/components/cards/person-card";
import SimpleContentCard from "@/components/cards/simple-content-card";
import VerticalCard from "@/components/cards/vertical-card";
import ContentInfoModal from "@/components/content/content-info-modal";
import { MovieData } from "@/lib/types/movie.types";
import { PersonResult } from "@/lib/types/person.types";
import { TvData } from "@/lib/types/tv.types";
import Link from "next/link";

interface MultiGridProps {
  searchResults: (MovieData | TvData | PersonResult)[];
}

const MultiGrid = ({ searchResults }: MultiGridProps) => {
  if (!searchResults) {
    return;
  }
  return (
    <div className="flex-1 bg-background/95 text-foreground rounded-lg pt-5 px-3 flex flex-col pb-3 ">
      <div className="py-5 px-3 w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-5 gap-x-5 gap-y-10 overflow-x-hidden scrollbar-thin bg-background/95">
        {searchResults.length === 0 && (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <p className="text-lg">No results found</p>
          </div>
        )}
        {searchResults.map((item) => (
          <ContentInfoModal
            key={item.id}
            content={item}
            trigger={<VerticalCard item={item} />}
          />
        ))}
      </div>
    </div>
  );
};

export default MultiGrid