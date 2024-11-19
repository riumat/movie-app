'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import ContentCard from '@/components/cards/content-card'
import Pagination from '@/components/ui/pagination'
import ContentCardSkeleton from '@/components/cards/content-card-skeleton'
import { FiltersSidebar } from '@/components/content/filters-sidebar'
import { useFilterState } from '@/lib/hooks/useFilterState'
import { useContentFetch } from '@/lib/hooks/useContentFetch'
import { MovieData } from '@/lib/types/movie'
import { TvData } from '@/lib/types/tv'
import { FilterItem } from '@/lib/types/filter'

type Props = {
  initialContents: MovieData[] | TvData[]
  genres: FilterItem[],
  yearRange: {
    start: string
    end: string
  },
  sortType: string,
  watchProviders: FilterItem[],
  media: string
}

const Body = ({ initialContents, genres, yearRange, sortType, watchProviders, media }: Props) => {
  const { items, totalPages, isLoading, fetchContent } = useContentFetch(initialContents)
  const { filters, handlers, initialRender } = useFilterState()

  useEffect(() => {
    if (initialRender) return;
    fetchContent({
      genres: filters.selectedGenres.join(','),
      providers: filters.selectedProviders.join(','),
      page: filters.page,
      startDate: filters.yearRange.start,
      endDate: filters.yearRange.end,
      sortType: filters.sortType,
      media
    })
  }, [
    filters.selectedGenres,
    filters.selectedProviders,
    filters.page,
    filters.yearRange.start,
    filters.yearRange.end,
    filters.sortType,
    initialRender
  ])

  return (
    <div className="flex flex-col md:flex-row w-[90%] gap-5 min-h-screen bg-background/95 text-foreground p-3 rounded-xl">
      <FiltersSidebar
        range={yearRange}
        sortType={sortType}
        genres={genres}
        filters={filters}
        watchProviders={watchProviders}
        onGenreChange={handlers.handleGenreChange}
        onProviderChange={handlers.handleProviderChange}
        onYearChange={handlers.handleYearChange}
        onSortChange={handlers.handleSortChange}
      />

      <div className="flex-1 z-10 relative mb-20 flex flex-col gap-10 items-center">
        {isLoading || !items ? (
          <div className="mt-8 w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-x-5 gap-y-10 overflow-x-hidden h-full">
            {Array.from({ length: 20 }).map((_, index) => (
              <ContentCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className="mt-8 w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-5 gap-x-5 gap-y-10 overflow-x-hidden h-full">
            {items.map((item: MovieData | TvData, index: number) => (
              <Link key={index} href={`/${media}/${item.id}`}>
                <ContentCard
                  key={index}
                  item={{ id: item.id, poster_path: item.poster_path, media_type: media }}
                />
              </Link>
            ))}
          </div>
        )}
        <Pagination
          page={filters.page}
          setPage={handlers.setPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  )
}
export default Body

