import { FilterItem } from '@/lib/types/filter'
import { useState } from 'react'

type Props = {
  genres: FilterItem[],
  watchProviders: FilterItem[]
}

const toggleItemInSelectedItems = (id: number) => {
  return (prevItems: number[]) => {
    const isItemSelected = prevItems.some(selectedItem => selectedItem === id);
    if (isItemSelected) {
      return prevItems.filter(selectedItem => selectedItem !== id);
    } else {
      return [...prevItems, id];
    }
  }
};

export const useFilterState = () => {
  const [selectedGenres, setSelectedGenres] = useState<number[]>([])
  const [selectedProviders, setSelectedProviders] = useState<number[]>([])
  const [yearRange, setYearRange] = useState({ start: '', end: '' })
  const [sortType, setSortType] = useState('popularity.desc')
  const [page, setPage] = useState(1)

  const handleGenreChange = (genre: number) => {
    setPage(1)
    setSelectedGenres(toggleItemInSelectedItems(genre))
  }

  const handleProviderChange = (provider: number) => {
    setPage(1)
    setSelectedProviders(toggleItemInSelectedItems(provider))
  }

  const handleYearChange = (start: string, end: string) => {
    setPage(1)
    setYearRange({ start, end })
  }

  const handleSortChange = (sortType: string) => {
    setPage(1)
    setSortType(sortType)
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
