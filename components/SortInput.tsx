"use client"
import React, { useState } from 'react';
import { RiArrowDropDownLine } from "react-icons/ri";

interface SortInputProps {
  onChange: (sortType: string) => void;
}
export const SortInput: React.FC<SortInputProps> = ({ onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState<string>('trending');

  const handleSortChange = (newSort: string, name: string) => {
    onChange(newSort);
    setIsOpen(false);
    setSelectedSort(name);
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="relative inline-block w-full text-white">
      <button
        className="w-full px-4 py-2 rounded-xl border border-white/30 bg-black text-white text-sm focus:outline-none"
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={toggleDropdown}
      >
        {selectedSort.charAt(0).toUpperCase() + selectedSort.slice(1)}
        {isOpen ? <RiArrowDropDownLine className="inline-block ml-2 rotate-180 duration-200 scale-150" /> : <RiArrowDropDownLine className="inline-block ml-2 duration-200 scale-150" />}
      </button>
      <ul className={`${isOpen ? 'visible opacity-100 duration-150 ' : 'invisible opacity-0 delay-50 transition-opacity duration-100  '} absolute right-0 w-full mt-2 py-1 z-20 text-white bg-black rounded-xl border border-white/30 transition-opacity duration-300`}>
        <li
          className="block px-4 py-2 text-sm cursor-pointer text-white hover:bg-white/10 duration-300"
          onClick={() => handleSortChange('popularity.desc', 'Trending')}
        >
          Trending
        </li>
        <li
          className="block px-4 py-2 text-sm cursor-pointer hover:bg-white/10 duration-300"
          onClick={() => handleSortChange('vote_average.desc', 'Vote')}
        >
          Vote
        </li>
        <li
          className="block px-4 py-2 text-sm cursor-pointer hover:bg-white/10 duration-300"
          onClick={() => handleSortChange('release_date.desc', 'Date')}
        >
          Date
        </li>
      </ul>
    </div>
  );
};

