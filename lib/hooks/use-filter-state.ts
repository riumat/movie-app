import { FilterItem } from '@/lib/types/filter'
import { useRouter } from 'next/navigation';
import { useState } from 'react'

type Props = {
  genres: FilterItem[],
  watchProviders: FilterItem[]
}

const toggleItemInSelectedItems = (id: number, prevItems: number[]) => {
  const isItemSelected = prevItems.some(selectedItem => selectedItem === id);
  
  if (isItemSelected) {
    return prevItems.filter(selectedItem => selectedItem !== id);
  } else {
    return [...prevItems, id];
  }
};


export const useFilterState = () => {
  const [selectedGenres, setSelectedGenres] = useState<number[]>([])
  const [selectedProviders, setSelectedProviders] = useState<number[]>([])
  const [yearRange, setYearRange] = useState({ start: '', end: '' })
  const [sortType, setSortType] = useState('popularity.desc')
  const [page, setPage] = useState(1)
  const router = useRouter();

  const handleGenreChange = (genre: number) => {
    const updated = toggleItemInSelectedItems(genre,selectedGenres)
    setPage(1)
    setSelectedGenres(updated)
    //genres, providers, page = "1", startDate, endDate, sort
    router.push(`?genres=${updated}&providers=${selectedProviders.join(',')}&page=${"1"}&startDate=${yearRange.start}&endDate=${yearRange.end}&sort=${sortType}`)
  }

  const handleProviderChange = (provider: number) => {
    const updated = toggleItemInSelectedItems(provider,selectedProviders)
    setPage(1)
    setSelectedProviders(updated)
    router.push(`?genres=${selectedGenres}&providers=${updated.join(',')}&page=${"1"}&startDate=${yearRange.start}&endDate=${yearRange.end}&sort=${sortType}`)

  }

  const handleYearChange = (start: string, end: string) => {
    setPage(1)
    setYearRange({ start, end })
    router.push(`?genres=${selectedGenres}&providers=${selectedProviders.join(',')}&page=${"1"}&startDate=${start}&endDate=${end}&sort=${sortType}`)

  }

  const handleSortChange = (sort: string) => {
    setPage(1)
    setSortType(sort)
    router.push(`?genres=${selectedGenres}&providers=${selectedProviders.join(',')}&page=${"1"}&startDate=${yearRange.start}&endDate=${yearRange.end}&sort=${sort}`)

  }


  return {
    filters: {
      selectedGenres,
      selectedProviders,
      yearRange,
      sortType,
      page
    },
    handlers: {
      handleGenreChange,
      handleProviderChange,
      handleYearChange,
      handleSortChange,
      setPage
    },
  }
}
