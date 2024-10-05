"use client"
import Searchbar from '@/components/Searchbar';
import React, { useEffect } from 'react';
import Image from 'next/image';
import { imageUrl } from '@/utils/constants';
import axios from 'axios';
import MultiCard from '@/components/MultiCard';
import { set } from 'lodash';
import PageSelector from '@/components/PageSelector';

interface Movie {
  poster_path: string;
  title: string;
}
interface SearchResult {
  name?: string;
  title?: string;
}

interface HeroProps {
  movies: Movie[];
}
const Hero: React.FC<HeroProps> = ({ movies }) => {
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
    handleSearch(searchQuery, page);
  }, [page]);

  return (
    <div className="relative flex-1">
      <div className="absolute inset-0 z-0">
        <div className="flex h-full">
          {movies.map((movie, index) => (
            <div key={index} className="flex-1 relative">
              <Image
                src={`${imageUrl}/w780${movie.poster_path}`}
                alt={movie.title}
                layout="fill"
                objectFit="cover"
                className="filter grayscale-[80%] brightness-90"
              />
            </div>
          ))}
        </div>
      </div >

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/85 to-black " />
      {searchResults.length === 0 ? (
        <div className="relative h-full z-10 flex items-center justify-center">
          <div className='w-full max-w-4xl mt-56'>
            <div className="relative">
              <div className="absolute neon-shadow rounded-lg "></div>
              <div className="relative">
                <Searchbar onSearch={(query) => { handleSearch(query) }} />
              </div>
            </div >
          </div >
        </div >
      ) : (
        <div className="relative h-full z-10 flex flex-col items-center">
          <div className='w-full max-w-4xl mt-8'>
            <div className="relative">
              <div className="absolute neon-shadow rounded-lg  "></div>
              <div className="relative">
                <Searchbar onSearch={(query) => { handleSearch(query) }} />
              </div>
            </div>
          </div>
            <div className="mt-8 w-full max-w-5xl flex flex-col  overflow-y-auto overflow-x-hidden max-h-[70vh] bg-black/90 rounded-lg scrollbar-thin">
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
