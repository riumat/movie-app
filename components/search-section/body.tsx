import UserList from '@/components/search-section/user-list'
import MultiGrid from '@/components/search-section/multi-grid'
import { Separator } from '@/components/ui/separator'
import PaginationWrapper from '@/components/layout/pagination-wrapper'

type Props = {
  users: any
  session: any
  results: any
  totalPages: number
  page: number
  query: string
}

const Body = ({ users, session, results, totalPages, page, query }: Props) => {
  if (!results) {
    return;
  }

  return (
    <div className="flex flex-col items-center w-[95%] gap-5  h-[91vh] text-foreground px-3  pb-0  rounded-lg overflow-hidden  ">
      <div className='flex flex-grow overflow-hidden w-full gap-5'>
        <UserList users={users} session={session} />
        <Separator orientation='vertical' />
        <MultiGrid
          searchResults={results}
        />

      </div>
      <Separator />
      <div className='rounded-lg bg-background/95 py-3 w-full flex justify-center'>
        <PaginationWrapper
          page={page}
          totalPages={totalPages}
          query={query}
        />
      </div>
    </div>
  )
}
export default Body

