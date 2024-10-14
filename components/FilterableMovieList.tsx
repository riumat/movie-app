'use client'

import { useState, useEffect } from 'react'
import CheckboxGroup from "@/components/CheckboxGroup"
import YearInput from "@/components/YearInput"
import MovieCard from "@/components/MovieCard"
import axios from 'axios'
import PageSelector from '@/components/PageSelector'
import { BeatLoader } from 'react-spinners'
import { SortInput } from '@/components/SortInput'
import MovieCardSkeleton from '@/components/SkeletonMovieCard'
/* import { fetchDiscoverMovies } from "@/utils/fetchers"
 */
interface FilterableMovieListProps {
  initialMovies: any[]
  genres: { id: number; name: string }[]
  watchProviders: { provider_id: number; provider_name: string }[]
}

export default function FilterableMovieList({ initialMovies, genres, watchProviders }: FilterableMovieListProps) {
  const [movies, setMovies] = useState(initialMovies)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [selectedGenres, setSelectedGenres] = useState<number[]>([])
  const [selectedProviders, setSelectedProviders] = useState<number[]>([])
  const [yearRange, setYearRange] = useState({ start: '', end: '' })
  const [sortType, setSortType] = useState('popularity.desc')
  const [isLoading, setIsLoading] = useState(false)



  const fetchFilteredMovies = () => {
    setIsLoading(true)
    axios.get(`/api/filtered`, {
      params: {
        genres: selectedGenres.join(','),
        providers: selectedProviders.join(','),
        page: page,
        startDate: yearRange.start,
        endDate: yearRange.end,
        sortType: sortType
      }
    })
      .then(response => {
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
        setPage(response.data.page);
      })
      .then(() => setIsLoading(false))
      .catch(error => {
        console.error('Error fetching search results:', error);
      })
  }

  useEffect(() => {
    fetchFilteredMovies()
  }, [selectedGenres, selectedProviders, yearRange, page, sortType])

  const handleGenreChange = (items: { id: number; name: string }[]) => {
    setSelectedGenres(items.map(item => item.id))
  }

  const handleProviderChange = (items: { provider_id: number; provider_name: string }[]) => {
    setSelectedProviders(items.map(item => item.provider_id))
  }

  const handleYearChange = (start: string, end: string) => {
    setYearRange({ start, end })
  }

  const handleSortChange = (sortType: string) => {
    console.log("sort")
    setSortType(sortType)
  }

  return (
    <div className="flex flex-col md:flex-row w-[90%] gap-5 min-h-screen bg-black/85 p-3 rounded-xl">
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
            <MovieCardSkeleton key={index}  />
          ))}
        </div>
        ) : (
          <div className="mt-8 w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-x-5 gap-y-10 overflow-x-hidden h-full ">
            {movies.map((movie: any, index: number) => (
              <MovieCard key={index} movie={movie} />
            ))}
          </div>
        )}
        <PageSelector page={page} setPage={setPage} totalPages={totalPages} />

      </div>


    </div>
  )
}

