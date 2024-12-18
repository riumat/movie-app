import ContentCard from '@/components/cards/content-card'
import SimpleContentCard from '@/components/cards/simple-content-card'
import { fetchFilteredContents } from '@/lib/fetchers'
import { getSession } from '@/lib/session'
import { MovieData } from '@/lib/types/movie'
import { TvData } from '@/lib/types/tv'
import Link from 'next/link'
import React from 'react'

type ContentDisplayProps = {
  params: any,
  media: string,
}

const ContentDisplay = async ({ params, media }: ContentDisplayProps) => {
  const sessionData = getSession();
  const contentData = fetchFilteredContents(params, media);

  const [session, { content }] = await Promise.all([sessionData, contentData])

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return (
    <div className="rounded-lg py-5 px-3 w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-5 gap-x-5 gap-y-10 overflow-x-hidden scrollbar-thin bg-background/95" >
      {content.map((item: MovieData | TvData, index: number) => (
        <Link key={index} href={`/${item.type}/${item.id}`}>
          {session ? (
            <ContentCard
              key={`${index}-${item.id}-${item.type}`}
              item={item}
              isWatchedServer={item.watched}
              isBookmarkedServer={item.watchlisted}
            />
          ) : (
            <SimpleContentCard
              key={`${index}-${item.id}-${item.type}`}
              item={item}
            />
          )}

        </Link>
      ))}
    </div>
  )
}

export default ContentDisplay