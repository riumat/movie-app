import ContentCard from '@/components/cards/content-card'
import SimpleContentCard from '@/components/cards/simple-content-card'
import { getFilteredContents } from '@/lib/fetchers/index'
import { MediaType } from '@/lib/types/content.types'
import { MovieData } from '@/lib/types/movie.types'
import { FilterParams } from '@/lib/types/params.types'
import { TvData } from '@/lib/types/tv.types'
import Link from 'next/link'
import React from 'react'

const ContentDisplay = async ({ params, media }: { params: FilterParams, media: MediaType }) => {
  const content = await getFilteredContents(params, media)

  return (
    <div className="rounded-lg  px-3 w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-5 gap-x-5 gap-y-10 overflow-x-hidden scrollbar-thin bg-background" >
      {content.map((item: MovieData | TvData, index: number) => (
        <Link key={index} href={`/${item.media_type}/${item.id}`}>
          {item.user ? (
            <ContentCard
              key={`${index}-${item.id}-${item.media_type}`}
              item={item}
            />
          ) : (
            <SimpleContentCard
              key={`${index}-${item.id}-${item.media_type}`}
              item={item}
            />
          )}

        </Link>
      ))}
    </div>
  )
}

export default ContentDisplay