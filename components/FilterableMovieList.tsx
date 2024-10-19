'use client'
import { useState, useEffect } from 'react'
import CheckboxGroup from "@/components/CheckboxGroup"
import YearInput from "@/components/YearInput"
import MovieCard from "@/components/MovieCard"
import axios from 'axios'
import PageSelector from '@/components/PageSelector'
import { SortInput } from '@/components/SortInput'
import MovieCardSkeleton from '@/components/SkeletonMovieCard'
import { MovieData, TvData } from '@/utils/types'

interface FilterableMovieListProps {
  initialContents: MovieData[] | TvData[],
  genres: { id: number; name: string }[]
  watchProviders: { provider_id: number; provider_name: string }[],
  media: string
}

export default function FilterableDataList({ initialContents, genres, watchProviders, media }: FilterableMovieListProps) {
  const [items, setItems] = useState(initialContents)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [selectedGenres, setSelectedGenres] = useState<number[]>([])
  const [selectedProviders, setSelectedProviders] = useState<number[]>([])
  const [yearRange, setYearRange] = useState({ start: '', end: '' })
  const [sortType, setSortType] = useState('popularity.desc')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const fetchFilteredContent = () => {
    setIsLoading(true)
    axios.get(`/api/filtered`, {
      params: {
        genres: selectedGenres.join(','),
        providers: selectedProviders.join(','),
        page: page,
        startDate: yearRange.start,
        endDate: yearRange.end,
        sortType: sortType,
        media: media
      }
    })
      .then(response => {
        setItems(response.data.results);
        setTotalPages(response.data.total_pages);
        setPage(response.data.page);
      })
      .then(() => setIsLoading(false))
      .catch(error => {
        console.error('Error fetching search results:', error);
      })
  }

  useEffect(() => {
    fetchFilteredContent()
  }, [selectedGenres, selectedProviders, yearRange, page, sortType])

  const handleGenreChange = (items: { id: number; name: string }[]) => {
    setPage(1)
    setSelectedGenres(items.map(item => item.id))
  }

  const handleProviderChange = (items: { provider_id: number; provider_name: string }[]) => {
    setPage(1)
    setSelectedProviders(items.map(item => item.provider_id))
  }

  const handleYearChange = (start: string, end: string) => {
    setPage(1)
    setYearRange({ start, end })
  }

  const handleSortChange = (sortType: string) => {
    setPage(1)
    setSortType(sortType)
  }

  return (
    <div className="flex flex-col md:flex-row w-[90%] gap-5 min-h-screen bg-neutral-950/90 p-3 rounded-xl">
      <div className="md:w-[300px] flex-1 md:flex-none flex flex-col items-center gap-10 px-2 z-30 h-full  mt-8">
        <div className="">
          <h2 className="text-sm font-semibold mb-3 text-center">Genres</h2>
          <CheckboxGroup items={genres} onChange={handleGenreChange} />
        </div>

        <div className="">
          <h2 className="text-sm font-semibold mb-3 text-center ">Watch Providers</h2>
          <CheckboxGroup
            items={watchProviders.filter((provider: any) => provider.display_priority < 30)}
            onChange={handleProviderChange}
          />
        </div>

        <div>
          <h2 className="text-sm font-semibold mb-3 text-center">Year Range</h2>
          <YearInput onChange={handleYearChange} />
        </div>

        <div>
          <h2 className="text-sm font-semibold mb-3 text-center">Sort by</h2>
          <SortInput onChange={handleSortChange} />
        </div>
      </div>

      <div className="flex-1 z-10 relative mb-20 flex flex-col gap-10 items-center">

        {isLoading ? (
          <div className="mt-8 w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-x-5 gap-y-10 overflow-x-hidden h-full ">
            {Array.from({ length: 20 }).map((movie: any, index: number) => (
              <MovieCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className="mt-8 w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-x-5 gap-y-10 overflow-x-hidden h-full ">
            {items.map((item: MovieData | TvData, index: number) => (
              <MovieCard
                key={index}
                item={{ id: item.id, poster_path: item.poster_path, media_type: media }}
              />
            ))}
          </div>
        )}
        <PageSelector page={page} setPage={setPage} totalPages={totalPages} />

      </div>


    </div>
  )
}

