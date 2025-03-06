import ImageWithLoader from '@/components/layout/image-with-loader'
import { imageUrl, imgWidth, placeholders } from '@/lib/constants'
import { PersonResult } from '@/lib/types/person.types';
import React from 'react'

const PersonCard = ({ item }: { item: PersonResult }) => {
  const imageSrc = item.profile_path ? `${imageUrl}${imgWidth.poster[342]}${item.profile_path}` : placeholders.profile;

  return (
    <div className="fflex flex-col bg-transparent w-full max-w-[170px] rounded-lg mx-auto relative group">
      <div className='relative w-full max-h-60 pb-[150%] rounded-lg overflow-hidden'>
        <ImageWithLoader src={imageSrc} />
      </div>
      <div className="content-card-hover ">
        <p className="text-foreground text-base font-bold z-50 mt-3 text-center">{item.name}</p>
      </div>

    </div>
  )
}

export default PersonCard