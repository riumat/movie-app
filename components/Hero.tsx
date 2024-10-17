"use client"
import Searchbar from '@/components/Searchbar';
import React, { useEffect } from 'react';
import axios from 'axios';
import MultiCard from '@/components/MultiCard';
import PageSelector from '@/components/PageSelector';

interface SearchResult {
  name?: string;
  title?: string;
}

const Hero = () => {
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [searchResults, setSearchResults] = React.useState<SearchResult[]>([]);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [totalPages, setTotalPages] = React.useState<number>(1);

  const handleSearch = (query: string, page: number) => {
    axios
      .get('/api/multisearch', {
        params: { query, page },
      })
      .then((response) => {
        setSearchResults(response.data.results);
        setTotalPages(response.data.total_pages);
        setCurrentPage(page);
        setSearchQuery(query);
      })
      .catch((error) => console.error('Error fetching search results:', error));
  };

  useEffect(() => {
    handleSearch(searchQuery, currentPage);
  }, [currentPage, searchQuery]);

  const handleQuery = (query: string) => {
    if (query !== '') {
      setCurrentPage(1);
      setSearchQuery(query);
    }
  }

  return (
    <div className="relative flex-1">
      {!searchQuery ? (
        <div className="relative h-full z-10 flex items-center justify-center">
          <div className="w-full max-w-4xl mt-56">
            <Searchbar onSearch={handleQuery} />
          </div>
        </div>
      ) : (
        <div className="relative h-full z-10 flex flex-col items-center">
          <div className="w-full max-w-4xl mt-8">
            <Searchbar onSearch={handleQuery} />
          </div>
          <div className="mt-8 w-[90%] max-h-[70vh] bg-black/85 rounded-lg pt-5">
            <div className="px-2 grid grid-cols-2 lg:grid-cols-4 gap-5 justify-items-center overflow-y-auto overflow-x-hidden w-full h-full scrollbar-thin">
              {searchResults.map((result, index) => (
                <MultiCard key={index} item={result} />
              ))}
            </div>
            <PageSelector
              page={currentPage}
              setPage={setCurrentPage}
              totalPages={totalPages}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
