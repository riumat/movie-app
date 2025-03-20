"use client"
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react'

export interface Filters{
  selectedGenres: number[],
  selectedProviders: number[],
  yearRange: { from: string, to: string },
  sortType: string,
  page: number,
  runtime: number[]
}
export interface Handlers{
  handleGenreChange: (genre: number) => void,
  handleProviderChange: (provider: number) => void,
  handleYearChange: (range: { from: string, to: string }) => void,
  handleSortChange: (sort: string) => void,
  handleChangePage: (page: number) => void,
  handleRuntime: (runtime: number[]) => void,
  handleReset: () => void
}

const toggleItemInSelectedItems = (id: number, prevItems: number[]) => {
  const isItemSelected = prevItems.some(selectedItem => selectedItem === id);

  if (isItemSelected) {
    return prevItems.filter(selectedItem => selectedItem !== id);
  } else {
    return [...prevItems, id];
  }
};

const formatParams = (key: string, searchParams: URLSearchParams) => {
  const param = searchParams.get(key);
  const array = param ? param.split(",").map(Number) : [];
  return array;
}


export const useFilterState = () => {
  const searchParams = new URLSearchParams(useSearchParams().toString());
  const [selectedGenres, setSelectedGenres] = useState<number[]>(formatParams("genres", searchParams))
  const [selectedProviders, setSelectedProviders] = useState<number[]>(formatParams("providers", searchParams))
  const [range, setRange] = useState({ from: searchParams.get("from") || "1924", to: searchParams.get("to") || new Date().getFullYear().toString() })
  const [sortType, setSortType] = useState(searchParams.get("sort") || "popularity.desc")
  const [page, setPage] = useState(searchParams.get("page") ? Number(searchParams.get("page")) : 1)
  const [runtime, setRuntime] = useState<number[]>([Number(searchParams.get("runtime_gte")) || 0, Number(searchParams.get("runtime_lte")) || 300])
  const router = useRouter();

  const handleChangePage = (page: number) => {
    setPage(page);
    searchParams.set('page', page.toString());
    router.push(`?${searchParams.toString()}`);
  }

  const handleGenreChange = (genre: number) => {
    const updated = toggleItemInSelectedItems(genre, selectedGenres)
    setPage(1)
    setSelectedGenres(updated)
    router.push(`?genres=${updated}&providers=${selectedProviders.join(',')}&page=${"1"}&from=${range.from}&to=${range.to}&sort=${sortType}&runtime_gte=${runtime[0]}&runtime_lte=${runtime[1]}`)
    
  }

  const handleProviderChange = (provider: number) => {
    const updated = toggleItemInSelectedItems(provider, selectedProviders)
    setPage(1)
    setSelectedProviders(updated)
    router.push(`?genres=${selectedGenres}&providers=${updated.join(',')}&page=${"1"}&from=${range.from}&to=${range.to}&sort=${sortType}&runtime_gte=${runtime[0]}&runtime_lte=${runtime[1]}`)

  }

  const handleYearChange = (range: { from: string, to: string }) => {
    setPage(1)
    setRange(range)
    router.push(`?genres=${selectedGenres}&providers=${selectedProviders.join(',')}&page=${"1"}&from=${range.from}&to=${range.to}&sort=${sortType}&runtime_gte=${runtime[0]}&runtime_lte=${runtime[1]}`)

  }

  const handleSortChange = (sort: string) => {
    setPage(1)
    setSortType(sort)
    router.push(`?genres=${selectedGenres}&providers=${selectedProviders.join(',')}&page=${"1"}&from=${range.from}&to=${range.to}&sort=${sort}&runtime_gte=${runtime[0]}&runtime_lte=${runtime[1]}`)

  }

  const handleRuntime = (runtime: number[]) => {
    setPage(1)
    setRuntime(runtime)
    router.push(`?genres=${selectedGenres}&providers=${selectedProviders.join(',')}&page=${"1"}&from=${range.from}&to=${range.to}&sort=${sortType}&runtime_gte=${runtime[0]}&runtime_lte=${runtime[1]}`) 
  }

  const handleReset = () => {
    setSelectedGenres([])
    setSelectedProviders([])
    setRange({ from: "1924", to: new Date().getFullYear().toString() })
    setSortType("popularity.desc")
    setRuntime([0, 360])
    setPage(1)
    router.push("?")
  }


  return {
    filters: {
      selectedGenres,
      selectedProviders,
      yearRange: range,
      sortType,
      page,
      runtime
    },
    handlers: {
      handleGenreChange,
      handleProviderChange,
      handleYearChange,
      handleSortChange,
      handleChangePage,
      handleRuntime,
      handleReset
    },
  }
}
