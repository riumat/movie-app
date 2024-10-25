"use client"
import React, { useState, useCallback } from 'react';
import { IoSearchOutline } from "react-icons/io5";
import { debounce } from 'lodash';

interface SearchbarProps {
  onSearch: (query: string) => void;
}


const Searchbar: React.FC<SearchbarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      onSearch(query);
    }, 500),
    [onSearch]
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  return (
    <div className="relative flex items-center rounded-xl border border-white/30 bg-gradient-to-r from-neutral-950 to-95% to-neutral-900/50 h-full">
      <div className='text-gray-400 text-[17px] pl-4'>
        <IoSearchOutline />
      </div>
      <input
        type="text"
        placeholder="Search movies, tv shows, actors and more..."
        value={searchTerm}
        onChange={handleInputChange}
        className="w-full py-3 px-4 mr-2 text-gray-100 rounded-md bg-transparent placeholder-gray-400 focus:outline-none focus:border-transparent"
      />
    </div>
  );
};
export default Searchbar;
