import MultiCard from "@/components/cards/multi-card";
import Pagination from "@/components/ui/pagination";
import { MovieResult } from "@/lib/types/movie";
import { PeopleResult } from "@/lib/types/people";
import { TvResult } from "@/lib/types/tv";
import Link from "next/link";

interface MultiResultsProps {
  searchResults: (MovieResult | TvResult | PeopleResult)[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
}

const MultiGrid = ({ searchResults, currentPage, setCurrentPage, totalPages }: MultiResultsProps) => {
  return (
    <div className="mt-8 w-[90%] max-h-[85vh] bg-background text-foreground rounded-lg pt-5  flex flex-col">
      <div className="px-2 grid grid-cols-2 lg:grid-cols-5 gap-x-5 gap-y-1 justify-items-center overflow-y-auto overflow-x-hidden w-full flex-1 scrollbar-thin">
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
        setPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default MultiGrid