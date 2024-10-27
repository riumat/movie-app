"use client"
import Searchbar from '@/components/Searchbar';
import React, { useEffect } from 'react';
import axios from 'axios';
import MultiCard from '@/components/MultiCard';
import PageSelector from '@/components/PageSelector';
import Link from 'next/link';

interface SearchResult {
  name?: string;
  title?: string;
  id: number,
  media_type: string,
}

const Hero = () => {
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [searchResults, setSearchResults] = React.useState<SearchResult[]>([]);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [totalPages, setTotalPages] = React.useState<number>(1);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleSearch = (query: string, page: number) => {
    setIsLoading(true);
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
      .then(() => setIsLoading(false))
      .catch((error) => console.error('Error fetching search results:', error));
  };

  const handleQuery = (query: string) => {
    if (query !== '') {
      setCurrentPage(1);
      setSearchQuery(query);
    }
  }

  useEffect(() => {
    handleSearch(searchQuery, currentPage);
  }, [currentPage, searchQuery]);

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
          <div className="w-full max-w-4xl mt-8 h-10 text-sm">
            <Searchbar onSearch={handleQuery} />
          </div>
          <div className="mt-8 w-[90%] max-h-[80vh] bg-neutral-950/95 rounded-lg pt-5 flex flex-col">
            <div className="px-2 grid grid-cols-2 lg:grid-cols-5 gap-5 justify-items-center overflow-y-auto overflow-x-hidden w-full flex-1 scrollbar-thin">
              {searchResults.map((result, index) => (
                <Link
                  key={index}
                  href={`/${result.media_type}/${result.id}`}
                >
                  <MultiCard key={index} item={result} />
                </Link>
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
