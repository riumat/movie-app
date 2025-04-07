import ContentDisplay from '@/components/content/content-display'
import FiltersSection from '@/components/content/filters-section'
import { getFilteredContents } from '@/lib/fetchers/index'
import { ContentType } from '@/lib/types/content.types'
import { FilterParams } from '@/lib/types/params.types'

type Props = {
  media: ContentType,
  params: FilterParams,
  genres: {
    id: number,
    name: string
  }[],
  providers: {
    id: number,
    name: string,
  }[],
}

const Body = async ({ media, params, genres, providers }: Props) => {
  const { totalPages, results } = await getFilteredContents(params, media)

  return (
    <div className="flex flex-col items-center w-[95%] gap-5 h-[90vh] lg:h-[91vh] text-foreground px-3  pb-0  rounded-lg overflow-hidden">
      <FiltersSection props={{ genres, providers, media, totalPages }}>
        <ContentDisplay
          results={results}
        />
      </FiltersSection>

    </div>
  )
}
export default Body



