import { Separator } from '@/components/ui/separator'
import { imageUrl, imgWidth } from '@/lib/constants'
import Image from 'next/image'
import React from 'react'
import { BeatLoader } from 'react-spinners'

const ContentUserCard = ({ item }: { item: any }) => {
  const [isImageLoaded, setIsImageLoaded] = React.useState(false);

  const onLoadCallback = () => {
    setIsImageLoaded(true);
  };

  const onErrorCallback = () => {
    setIsImageLoaded(false);
  };

  //togliere review dal modal del rating e viceversa

  return (
    <div className="flex items-center gap-3  relative justify-start">
      <div className='flex justify-start relative w-20 h-20'>
        {!isImageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <BeatLoader color='#ffffff' size={10} />
          </div>
        )}
        <Image
          src={`${imageUrl}${imgWidth.poster[342]}${item.poster_path}`}
          alt={item.title}
          fill
          className='rounded-lg z-30 object-contain block '
          onLoad={onLoadCallback}
          onError={onErrorCallback}
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          loading='lazy'
        />
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