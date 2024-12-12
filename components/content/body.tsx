'use client'
import Pagination from '@/components/ui/pagination'
import { FiltersSidebar } from '@/components/content/filters-sidebar'
import { useFilterState } from '@/lib/hooks/use-filter-state'
import { MovieData } from '@/lib/types/movie'
import { TvData } from '@/lib/types/tv'
import { FilterItem } from '@/lib/types/filter'
import ContentDisplay from '@/components/content/content-display'

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
    <div className="flex flex-col items-center w-[95%] gap-5  h-[91vh] text-foreground px-3  pb-0  rounded-lg overflow-hidden  ">
      <div className='flex flex-grow overflow-hidden w-full gap-5'>
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
        <ContentDisplay
          contentData={contentData}
          userData={userData}
        />

      </div>
      <div className='border rounded-lg bg-background/95 py-3 w-full flex justify-center'>
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

