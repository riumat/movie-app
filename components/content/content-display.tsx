import ContentCard from '@/components/cards/content-card'
import SimpleContentCard from '@/components/cards/simple-content-card'
import { MovieData } from '@/lib/types/movie.types'
import { TvData } from '@/lib/types/tv.types'
import Link from 'next/link'
import React from 'react'

type ContentDisplayProps = {
  content: any
}

const ContentDisplay = async ({ content }: ContentDisplayProps) => {

  return (
    <div className="rounded-lg py-5 px-3 w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-5 gap-x-5 gap-y-10 overflow-x-hidden scrollbar-thin bg-background/95" >
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