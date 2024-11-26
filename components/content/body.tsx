'use client'
import Link from 'next/link'
import ContentCard from '@/components/cards/content-card'
import Pagination from '@/components/ui/pagination'
import ContentCardSkeleton from '@/components/cards/content-card-skeleton'
import { FiltersSidebar } from '@/components/content/filters-sidebar'
import { useFilterState } from '@/lib/hooks/use-filter-state'
import { MovieData } from '@/lib/types/movie'
import { TvData } from '@/lib/types/tv'
import { FilterItem } from '@/lib/types/filter'

type Props = {
  contentData: {
    content: MovieData[] | TvData[]
    totalPages: number
    sort: string
    yearRange: {
      start: string
      end: string
    }
  }
  genres: FilterItem[],
  providers: FilterItem[],
  media: string
}

const Body = ({ contentData, genres, providers, media }: Props) => {
  const { filters, handlers } = useFilterState()

  return (
    <div className="flex flex-col md:flex-row w-[95%] gap-5 min-h-screen bg-background/95 text-foreground p-3 rounded-xl">
      <FiltersSidebar
        range={contentData.yearRange}
        sortType={contentData.sort}
        genres={genres}
        filters={filters}
        watchProviders={providers}
        onGenreChange={handlers.handleGenreChange}
        onProviderChange={handlers.handleProviderChange}
        onYearChange={handlers.handleYearChange}
        onSortChange={handlers.handleSortChange}
      />

      <div className="flex-1 z-10 relative mb-20 flex flex-col gap-10 items-center">
        {!contentData.content ? (
          <div className="mt-8 w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-x-5 gap-y-10 overflow-x-hidden h-full">
            {Array.from({ length: 20 }).map((_, index) => (
              <ContentCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className="mt-8 w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-5 gap-x-5 gap-y-10 overflow-x-hidden h-full">
            {contentData.content.map((item: MovieData | TvData, index: number) => (
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
          totalPages={contentData.totalPages}
        />
      </div>
    </div>
  )
}
export default Body

