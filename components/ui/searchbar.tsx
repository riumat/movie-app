"use client"
import React, { useState, useCallback } from 'react';
import { IoSearchOutline } from "react-icons/io5";
import { debounce } from 'lodash';

interface SearchbarProps {
  onSearch: (query: string) => void;
  initialValue: string,
}

const Searchbar = ({ onSearch, initialValue }: SearchbarProps) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);

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
    <div className="relative flex items-center rounded-xl border border-foreground/30 bg-background h-full">
      <div className='text-foreground text-[17px] pl-4'>
        <IoSearchOutline />
      </div>
      <input
        autoFocus
        type="text"
        placeholder="Search movies, tv shows, actors and more..."
        value={searchTerm}
        onChange={handleInputChange}
        className="w-full py-3 px-4 mr-2 text-foreground rounded-md bg-transparent placeholder-foreground/50 focus:outline-none focus:border-transparent"
      />
    </div>
  );
};
export default Searchbar;
