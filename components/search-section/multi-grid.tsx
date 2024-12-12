"use client";
import MultiCard from "@/components/cards/multi-card";
import { MovieResult } from "@/lib/types/movie";
import { PeopleResult } from "@/lib/types/people";
import { TvResult } from "@/lib/types/tv";
import Link from "next/link";

interface MultiGridProps {
  searchResults: (MovieResult | TvResult | PeopleResult)[];
  currentPage: number;
  totalPages: number;
  query: string
}

const MultiGrid = ({ searchResults }: MultiGridProps) => {
  if (!searchResults) {
    return;
  }

  return (
    <div className="flex-1 bg-background/95 text-foreground rounded-lg pt-5 px-3 flex flex-col pb-3 ">
      <div className="mt-2 w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-x-5 gap-y-10 overflow-x-hidden h-full scrollbar-thin">
        {searchResults.map((result, index) => (
          <Link
            key={index}
            href={`/${result.media_type}/${result.id}`}
          >
            <MultiCard key={index} item={result} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MultiGrid