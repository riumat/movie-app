"use client"
import React, { useState } from 'react';
import { RiArrowDropDownLine } from "react-icons/ri";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from '@/components/ui/button';
import { GrAscend } from "react-icons/gr";

interface SortInputProps {
  sortType: string;
  onChange: (sortType: string) => void;
}

const sortTypes = [
  {
    name: "Trending",
    value: "popularity",
  },
  {
    name: "Pilot Date",
    value: "first_air_date",
  },
  {
    name: "Vote Average",
    value: "vote_average",
  },
];

const TvSortInput = ({ sortType, onChange }: SortInputProps) => {
  const initialSortType = sortTypes.find((s) => s.value === sortType.split(".")[0]);
  const [selectedSort, setSelectedSort] = useState<string>(
    initialSortType?.value || "popularity"
  );
  const [selectedName, setSelectedName] = useState<string>(
    initialSortType?.name || "Popularity"
  );
  const [order, setOrder] = useState<string>("desc");

  const handleSortChange = (newSort: string, name: string) => {
    setSelectedSort(newSort);
    setSelectedName(name);
    onChange(`${newSort}.${order}`);
  };

  const handleOrderChange = (newOrder: string) => {
    setOrder(newOrder);
    onChange(`${selectedSort}.${newOrder}`);
  };

  return (
    <div className="relative w-[220px] flex gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className="w-full px-4 py-2 flex justify-between items-center font-light"
            type="button"
            variant="outline"
          >
            {selectedName}
            <RiArrowDropDownLine className="ml-2 scale-150" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full mt-2 py-1 z-50 text-foreground bg-background rounded-md">
          <ul className="flex flex-col gap-1 ">
            {sortTypes.map(({ name, value }) => (
              <li
                key={value}
                className="block px-4 py-2 text-sm cursor-pointer hover:bg-foreground/10 duration-200 rounded font-light"
                onClick={() => handleSortChange(value, name)}
              >
                {name}
              </li>
            ))}
          </ul>
        </PopoverContent>
      </Popover>
      <Button
        variant={`${order === "asc" ? "outline" : "default"}`}
        className="px-2"
        onClick={() => handleOrderChange("desc")}
      >
        <GrAscend className="rotate-180" />
      </Button>
      <Button
        variant={`${order === "asc" ? "default" : "outline"}`}
        className="px-2"
        onClick={() => handleOrderChange("asc")}
      >
        <GrAscend />
      </Button>
    </div>
  );
};

export default TvSortInput