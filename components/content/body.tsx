import { FiltersSidebar } from '@/components/content/filters-sidebar'
import { FilterItem } from '@/lib/types/filter'
import PaginationWrapper from '@/components/layout/pagination-wrapper'
import { Suspense } from 'react'
import ContentCardSkeleton from '@/components/cards/content-card-skeleton'
import ContentDisplay from '@/components/content/content-display'

type Props = {
 /*  totalPages: number */
 /*  genres: FilterItem[],
  providers: FilterItem[], */
  media: string,
  params: any
}

const Body = ({ /* totalPages, */ /* genres, providers, */ media, params }: Props) => {
  return (
    <div className="flex flex-col items-center w-[95%] gap-5  h-[91vh] text-foreground px-3  pb-0  rounded-lg overflow-hidden  ">
      <div className='flex flex-grow overflow-hidden w-full gap-5'>
       {/*  <FiltersSidebar
          genres={genres}
          watchProviders={providers}
          media={media}
        /> */}

        <Suspense fallback={
          <div className="flex-1 mt-8 w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-x-5 gap-y-10 overflow-x-hidden h-full scrollbar-thin">
            {Array.from({ length: 20 }).map((_, index) => (
              <ContentCardSkeleton key={index} />
            ))}
          </div>
        }>
          <ContentDisplay
            params={params}
            media={media}
          />
        </Suspense>

      </div>
      {/* <div className='border rounded-lg bg-background/95 py-3 w-full flex justify-center'>
        <PaginationWrapper totalPages={totalPages} />
      </div> */}
    </div>
  )
}
export default Body

