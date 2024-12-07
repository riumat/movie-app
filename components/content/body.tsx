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
  }
  genres: FilterItem[],
  providers: FilterItem[],
  media: string
  userData: any
}

const Body = ({ contentData, genres, providers, media, userData }: Props) => {
  const { filters, handlers } = useFilterState()

  return (
    <div className="flex flex-col md:flex-row w-[95%] h-full bg-background/95 text-foreground px-3 pt-3 pb-0  rounded-lg overflow-hidden  ">
      <FiltersSidebar
        genres={genres}
        filters={filters}
        watchProviders={providers}
        onGenreChange={handlers.handleGenreChange}
        onProviderChange={handlers.handleProviderChange}
        onYearChange={handlers.handleYearChange}
        onSortChange={handlers.handleSortChange}
        onReset={handlers.handleReset}
        media={media}
      />


      <div className="flex-1 z-10 relative flex flex-col gap-2 items-center overflow-y-auto overflow-x-hidden ">
        {!contentData.content ? (
          <div className="mt-8 w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-x-5 gap-y-10 overflow-x-hidden h-full scrollbar-thin">
            {Array.from({ length: 20 }).map((_, index) => (
              <ContentCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className="mt-2 w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-5 gap-x-5 gap-y-10 overflow-x-hidden h-full scrollbar-thin" >
            {contentData.content.map((item: MovieData | TvData, index: number) => (
              <Link key={index} href={`/${media}/${item.id}`}>
                <ContentCard
                  key={`${index}-${item.id}-${item.type}`}
                  item={item}
                  isWatchedServer={userData.watched.includes(item.id)}
                  isBookmarkedServer={userData.bookmarked.includes(item.id)}
                />
              </Link>
            ))}
          </div>
        )}
        <Pagination
          page={filters.page}
          totalPages={contentData.totalPages}
          handleChangePage={handlers.handleChangePage}
        />
      </div>
    </div>
  )
}
export default Body

