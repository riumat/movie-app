"use client"
import React, { useState, useCallback } from 'react';
import { IoSearchOutline } from "react-icons/io5";
import { debounce } from 'lodash';
import { useRouter } from 'next/navigation';

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();


  const onSearch = (query: string) => {
    if (query === "") {
      router.push('/')
    } else {
      router.push(`/search?query=${query}&page=1`);
    }
  };

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
    <div className={`relative flex items-center rounded-2xl border 
    opacity-60 hover:opacity-100 
    border-foreground/30  bg-background/95 
    duration-200 h-full text-sm lg:w-[30%] w-[60%] z-50
    `}
    >
      <div className='text-foreground pl-4 '>
        <IoSearchOutline size={18} />
      </div>
      <input
        autoFocus
        type="text"
        placeholder="Search movies, tv shows, actors and more..."
        value={searchTerm}
        onChange={handleInputChange}
        className="w-full py-2 px-4 mr-2 text-foreground rounded-md bg-transparent placeholder-foreground/50 focus:outline-none focus:border-transparent placeholder:truncate"
      />
    </div>
  );
};
export default Searchbar;
