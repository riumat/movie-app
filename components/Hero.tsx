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
  const [searchResults, setSearchResults] = React.useState<SearchResult[]>([]);
  const [page, setPage] = React.useState<number>(1);
  const [totalPages, setTotalPages] = React.useState<number>(1);
  const [searchQuery, setSearchQuery] = React.useState<string>('');


  const handleSearch = (query: string, pageNum: number = 1) => {
    axios.get(`/api/multisearch`, {
      params: {
        query: query,
        page: pageNum,
      }
    })
      .then(response => {
        setSearchResults(response.data.results);
        setTotalPages(response.data.total_pages);
        setPage(pageNum);
        setSearchQuery(query);
      })
      .catch(error => {
        console.error('Error fetching search results:', error);
      })
  }

  useEffect(() => {
    if (searchQuery !== "") {
      handleSearch(searchQuery, page);
    }
  }, [page]);

  return (
    <div className="relative flex-1">
      {searchResults.length === 0 ? (
        <div className="relative h-full z-10 flex items-center justify-center">
          <div className='w-full max-w-4xl mt-56'>
            <Searchbar onSearch={(query) => { handleSearch(query) }} />
          </div >
        </div >
      ) : (
        <div className="relative h-full z-10 flex flex-col items-center">
          <div className='w-full max-w-4xl mt-8'>
            <Searchbar onSearch={(query) => { handleSearch(query) }} />
          </div>
          <div className="mt-8 w-full max-w-5xl flex flex-col overflow-y-auto overflow-x-hidden max-h-[70vh] bg-black/90 rounded-lg scrollbar-thin">
            {searchResults.map((result, index) => (
              <MultiCard key={index} item={result} />
            ))}
          </div>
          <PageSelector page={page} setPage={(page) => setPage(page)} totalPages={totalPages} />
        </div>
      )}
    </div >
  );
};

export default Hero;
