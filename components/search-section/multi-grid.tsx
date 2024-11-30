"use client";
import MultiCard from "@/components/cards/multi-card";
import Pagination from "@/components/ui/pagination";
import { MovieResult } from "@/lib/types/movie";
import { PeopleResult } from "@/lib/types/people";
import { TvResult } from "@/lib/types/tv";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface MultiGridProps {
  searchResults: (MovieResult | TvResult | PeopleResult)[];
  currentPage: number;
  totalPages: number;
  query: string
}

const MultiGrid = ({ searchResults, currentPage, totalPages, query }: MultiGridProps) => {
  const router = useRouter();
  if (!searchResults) {
    return;
  }

  const handleChangePage = (page: number) => {
    router.push(`/search?query=${query}&page=${page}`);
  }
  return (
    <div className="w-[93%] max-h-[90vh] bg-background/95 text-foreground rounded-lg pt-5 px-3 flex flex-col ">
      <div className="mt-2 w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-5 gap-x-5 gap-y-10 overflow-x-hidden h-full scrollbar-thin">
        {searchResults.map((result, index) => (
          <Link
            key={index}
            href={`/${result.media_type}/${result.id}`}
          >
            <MultiCard key={index} result={result} />
          </Link>
        ))}
      </div>
      <Pagination
        page={currentPage}
        totalPages={totalPages}
        handleChangePage={handleChangePage}
      />
    </div>
  );
};

export default MultiGrid