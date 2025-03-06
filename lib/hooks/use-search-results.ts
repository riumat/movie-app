import { useState, useEffect } from 'react';
import axios from 'axios';
import { MovieResult } from '@/lib/types/movie.types';
import { TvResult } from '@/lib/types/tv.types';
import { PeopleResult } from '@/lib/types/person.types';

type SearchResult = MovieResult | TvResult | PeopleResult;

interface UseSearchResults {
  searchResults: SearchResult[];
  isLoading: boolean;
  totalPages: number;
}

const useSearchResults = (searchQuery: string, currentPage: number): UseSearchResults => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearch = (query: string, page: number) => {
    setIsLoading(true);
    axios
      .get('/api/multisearch', { params: { query, page } })
      .then((response) => {
        setSearchResults(response.data.results);
        setTotalPages(response.data.total_pages);
      })
      .catch((error) => console.error('Error fetching search results:', error))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (searchQuery && searchQuery !== "") handleSearch(searchQuery, currentPage);
  }, [searchQuery, currentPage]);

  return { searchResults, isLoading, totalPages };
};

export default useSearchResults;
