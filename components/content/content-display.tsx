import VerticalCard from '@/components/cards/vertical-card'
import ContentInfoModal from '@/components/content/content-info-modal'
import { MovieData } from '@/lib/types/movie.types'
import { TvData } from '@/lib/types/tv.types'
import React from 'react'

const ContentDisplay = async ({ results }: { results: (MovieData | TvData)[] }) => {

  return (
    <div className="rounded-lg  px-3 w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-5 gap-x-5 gap-y-10 overflow-x-hidden scrollbar-thin bg-background" >
      {results.map((item) => (
        <ContentInfoModal
          key={item.id}
          content={item}
          trigger={<VerticalCard item={item} />}
        />

      ))}
    </div>
  )
}

export default ContentDisplay