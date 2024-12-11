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
import ContentDisplay from '@/components/content/content-display'
import { Suspense } from 'react'
import UserList from '@/components/search-section/user-list'
import MultiGrid from '@/components/search-section/multi-grid'
import { useRouter } from 'next/navigation'

type Props = {
  searchResults: any
  users: any
  session: any
  results: any
  totalPages: number
  page: number
  query: string
}

const Body = ({ searchResults, users, session, results, totalPages, page, query }: Props) => {
  const router = useRouter();
  if (!searchResults) {
    return;
  }

  const handleChangePage = (page: number) => {
    router.push(`/search?query=${query}&page=${page}`);
  }

  return (
    <div className="flex flex-col items-center w-[95%] gap-5  h-[91vh] text-foreground px-3  pb-0  rounded-lg overflow-hidden  ">
      <div className='flex flex-grow overflow-hidden w-full gap-5'>
        <UserList users={users} session={session} />
        <MultiGrid
          searchResults={results}
          totalPages={totalPages}
          currentPage={Number(page)}
          query={query}
        />

      </div>
      <div className='border rounded-lg bg-background/95 py-3 w-full flex justify-center'>
        <Pagination
          page={page}
          totalPages={totalPages}
          handleChangePage={handleChangePage}
        />
      </div>
    </div>
  )
}
export default Body

