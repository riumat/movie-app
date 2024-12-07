import { FilterItem } from '@/lib/types/filter'
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react'

type Props = {
  genres: FilterItem[],
  watchProviders: FilterItem[]
}

const toggleItemInSelectedItems = (id: number, prevItems: number[]) => {
  console.log(id)
  const isItemSelected = prevItems.some(selectedItem => selectedItem === id);

  if (isItemSelected) {
    return prevItems.filter(selectedItem => selectedItem !== id);
  } else {
    return [...prevItems, id];
  }
};


export const useFilterState = () => {
  const searchParams = new URLSearchParams(useSearchParams().toString());
  const [selectedGenres, setSelectedGenres] = useState<number[]>(searchParams.get("genres")?.split(",").map(Number) ?? [])
  const [selectedProviders, setSelectedProviders] = useState<number[]>(searchParams.get("providers")?.split(",").map(Number) ?? [])
  const [range, setRange] = useState({ from: searchParams.get("from") || "1924", to: searchParams.get("to") || new Date().getFullYear().toString() })
  const [sortType, setSortType] = useState(searchParams.get("sort") || "popularity.desc")
  const [page, setPage] = useState(searchParams.get("page") ? Number(searchParams.get("page")) : 1)
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
    router.push(`?genres=${updated}&providers=${selectedProviders.join(',')}&page=${"1"}&from=${range.from}&to=${range.to}&sort=${sortType}`)
  }

  const handleProviderChange = (provider: number) => {
    const updated = toggleItemInSelectedItems(provider, selectedProviders)
    setPage(1)
    setSelectedProviders(updated)
    router.push(`?genres=${selectedGenres}&providers=${updated.join(',')}&page=${"1"}&from=${range.from}&to=${range.to}&sort=${sortType}`)

  }

  const handleYearChange = (range: { from: string, to: string }) => {
    setPage(1)
    setRange(range)
    router.push(`?genres=${selectedGenres}&providers=${selectedProviders.join(',')}&page=${"1"}&from=${range.from}&to=${range.to}&sort=${sortType}`)

  }

  const handleSortChange = (sort: string) => {
    setPage(1)
    setSortType(sort)
    router.push(`?genres=${selectedGenres}&providers=${selectedProviders.join(',')}&page=${"1"}&from=${range.from}&to=${range.to}&sort=${sort}`)

  }

  const handleReset = () => {
    setSelectedGenres([])
    setSelectedProviders([])
    setRange({ from: "1924", to: new Date().getFullYear().toString() })
    setSortType("popularity.desc")
    setPage(1)
    router.push("?")
  }


  return {
    filters: {
      selectedGenres,
      selectedProviders,
      yearRange: range,
      sortType,
      page
    },
    handlers: {
      handleGenreChange,
      handleProviderChange,
      handleYearChange,
      handleSortChange,
      handleChangePage,
      handleReset
    },
  }
}
