import MultiGrid from '@/components/search-section/multi-grid'
import PaginationWrapper from '@/components/layout/pagination-wrapper'
import { MovieData } from '@/lib/types/movie.types'
import { TvData } from '@/lib/types/tv.types'
import { PersonResult } from '@/lib/types/person.types'

type Props = {
  results: (MovieData | TvData | PersonResult)[]
  totalPages: number
  page: number
  query: string
}

const Body = ({ results, totalPages, page, query }: Props) => {
  if (!results) {
    return;
  }

  return (
    <div className="flex flex-col items-center w-[95%] gap-5  h-[91vh] text-foreground px-3  pb-0  rounded-lg overflow-hidden  ">
      <div className='flex flex-grow overflow-hidden w-full gap-5'>
        <MultiGrid
          searchResults={results}
        />

      </div>
      <div className='rounded-lg bg-secondary py-3 w-full flex justify-center'>
        <PaginationWrapper
          currentPage={page}
          totalPages={totalPages}
          query={query}
        />
      </div>
    </div>
  )
}
export default Body

