import ContentCardSkeleton from '@/components/cards/content-card-skeleton'
import ContentDisplay from '@/components/content/content-display'
import FiltersSection from '@/components/content/filters-section'
import { getFilteredContents, getGenresAndProviders, getTotalPagesFiltered } from '@/lib/fetchers/index'
import { Suspense } from 'react'

type Props = {
  media: string,
  params: any
}

const Body = async ({ media, params }: Props) => {
  const filterPromise = getGenresAndProviders(media);
  const contentPromise = getFilteredContents(params, media)
  const [{ genres, providers }, { content, totalPages }] = await Promise.all([filterPromise, contentPromise])

  return (
    <div className="flex flex-col items-center w-[95%] gap-5  h-[91vh] text-foreground px-3  pb-0  rounded-lg overflow-hidden  ">
      <FiltersSection props={{ genres, providers, media, totalPages }}>
        <Suspense fallback={
          <div className="flex-1 mt-8 w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-x-5 gap-y-10 overflow-x-hidden h-full scrollbar-thin">
            {Array.from({ length: 20 }).map((_, index) => (
              <ContentCardSkeleton key={index} />
            ))}
          </div>
        }>
          <ContentDisplay
            content={content}
          />
        </Suspense>
      </FiltersSection>
    </div>
  )
}
export default Body



