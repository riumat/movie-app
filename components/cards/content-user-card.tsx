import ImageWithLoader from '@/components/layout/image-with-loader'
import { Separator } from '@/components/ui/separator'
import { imageUrl, imgWidth, placeholders } from '@/lib/constants'
import React from 'react'


const ContentUserCard = ({ item }: { item: any }) => {
  const imageSrc = item.poster_path ? `${imageUrl}${imgWidth.poster[342]}${item.poster_path}` : placeholders.multi;

  return (
    <div className="flex items-center gap-3  relative justify-start">
      <div className='flex justify-start relative w-20 h-20'>
        <ImageWithLoader src={imageSrc} />
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-bold text-xl">{item.type === "movie" ? item.title : item.name}</p>
        <div className="flex items-center gap-2 italic ">
          <p className="font-light text-sm">{item.rating ? `Rating ${item.rating}/5` : `Not Rated`}</p>
          <Separator orientation="vertical" className="h-4" />
          <p className="font-light text-sm">{item.review ? `Reviewed` : `Not Reviewed`}</p>

        </div>
      </div>

    </div>
  )
}

export default ContentUserCard