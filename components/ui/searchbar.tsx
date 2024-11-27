"use client"
import React, { useState, useCallback, useEffect } from 'react';
import { IoSearchOutline } from "react-icons/io5";
import { debounce } from 'lodash';
import { useRouter } from 'next/navigation';

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    console.log(window.scrollY)

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  const onSearch = (query: string) => {
    router.push(`/search?query=${query}&page=1`);
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
    <div className={`relative flex items-center rounded-2xl border opacity-50 hover:opacity-100 border-foreground/30 bg-background/20 hover:bg-background/70 duration-200 h-full text-sm w-[30%] ${scrollY > 10 ? 'opacity-100' : 'opacity-0'}`}>
      <div className='text-foreground pl-4 '>
        <IoSearchOutline size={15} />
      </div>
      <input
        autoFocus
        type="text"
        placeholder="Search movies, tv shows, actors and more..."
        value={searchTerm}
        onChange={handleInputChange}
        className="w-full py-2 px-4 mr-2 text-foreground rounded-md bg-transparent placeholder-foreground/50 focus:outline-none focus:border-transparent"
      />
    </div>
  );
};
export default Searchbar;
