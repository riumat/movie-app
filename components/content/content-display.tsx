import ContentCard from '@/components/cards/content-card'
import ContentCardSkeleton from '@/components/cards/content-card-skeleton'
import { MovieData } from '@/lib/types/movie'
import { TvData } from '@/lib/types/tv'
import Link from 'next/link'
import React from 'react'

type ContentDisplayProps = {
  contentData: {
    content: MovieData[] | TvData[]
    totalPages: number
    sort: string
  },
  userData: any
}

const ContentDisplay = ({ contentData, userData }: ContentDisplayProps) => {
  return (
    <>
      {!contentData.content ? (
        <div className="flex-1 mt-8 w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-x-5 gap-y-10 overflow-x-hidden h-full scrollbar-thin">
          {Array.from({ length: 20 }).map((_, index) => (
            <ContentCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg py-5 px-3 w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-5 gap-x-5 gap-y-10 overflow-x-hidden scrollbar-thin bg-background/95" >
          {contentData.content.map((item: MovieData | TvData, index: number) => (
            <Link key={index} href={`/${item.type}/${item.id}`}>
              <ContentCard
                key={`${index}-${item.id}-${item.type}`}
                item={item}
                isWatchedServer={userData.watched.includes(item.id)}
                isBookmarkedServer={userData.bookmarked.includes(item.id)}
              />
            </Link>
          ))}
        </div>
      )}
    </>
  )
}

export default ContentDisplay