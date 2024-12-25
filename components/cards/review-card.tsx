import ImageWithLoader from '@/components/layout/image-with-loader'
import { imageUrl, imgWidth, placeholders } from '@/lib/constants'
import React from 'react'

const ReviewCard = ({ item }: { item: any }) => {
  const imageSrc = item.poster_path ? `${imageUrl}${imgWidth.poster[342]}${item.poster_path}` : placeholders.multi;

  return (
    <div className="flex items-start gap-3  relative justify-start">
      <div className='flex justify-start relative w-20 h-32'>
        <ImageWithLoader src={imageSrc} />
      </div>
      <div className="flex flex-col gap-1 flex-1 ">
        <p className="font-bold text-xl">{item.type === "movie" ? item.title : item.name}</p>
        <p className=''>{item.review}</p>
      </div>

    </div>
  )
}

export default ReviewCard