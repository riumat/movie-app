"use client"
import Searchbar from '@/components/ui/searchbar';
import usePagination from '@/lib/hooks/use-pagination';
import useSearchResults from '@/lib/hooks/use-search-results';
import { useState } from 'react';
import MultiSkeletonGrid from '@/components/search-section/multi-skeleton-grid';
import MultiGrid from '@/components/search-section/multi-grid';

type ViewProps = {
  searchQuery: string;
  handleSearch: (query: string) => void;
}


const InitialView = ({ handleSearch, searchQuery }: ViewProps) => (
  <div className="relative flex-1">
    <div className="relative h-full z-10 flex items-center justify-center">
      <div className="w-full max-w-4xl mt-56">
        <Searchbar onSearch={handleSearch} initialValue={searchQuery} />
      </div>
    </div>
  </div>
)

const Body = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { currentPage, setCurrentPage } = usePagination();
  const { searchResults, isLoading, totalPages } = useSearchResults(searchQuery, currentPage);

  const handleSearch = (query: string) => {
    setCurrentPage(1);
    setSearchQuery(query);
  }

  if (searchQuery === '') {
    return (
      <InitialView
        handleSearch={handleSearch}
        searchQuery={searchQuery}
      />
    )
  }

  return (
    <div className="relative flex-1">
      <div className="relative h-full z-10 flex flex-col items-center">
        <div className="w-full max-w-4xl mt-5 h-10 text-sm">
          <Searchbar onSearch={handleSearch} initialValue={searchQuery} />
        </div>
        {isLoading ?
          <MultiSkeletonGrid />
          :
          <MultiGrid
            searchResults={searchResults}
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        }
      </div>
    </div >
  );
};

export default Body;