import { imageUrl, imgWidth } from '@/lib/constants'
import Image from 'next/image'
import React from 'react'

import { FaRegStar, FaStar } from 'react-icons/fa';
import Loader from '@/components/layout/loader'

const renderStars = (rating: number) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      i < rating ? <FaStar size={20} /> : <FaRegStar size={20} />
    );
  }
  return stars;
};

const RatingCard = ({ item }: { item: any }) => {
  const [isImageLoaded, setIsImageLoaded] = React.useState(false);

  const onLoadCallback = () => {
    setIsImageLoaded(true);
  };

  const onErrorCallback = () => {
    setIsImageLoaded(false);
  };


  return (
    <div className="flex items-center gap-3  relative justify-start">
      <div className='flex justify-start relative w-20 h-20'>
        {!isImageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader />
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
        <div className="flex items-center gap-2 ">
          {renderStars(item.rating)}
        </div>
      </div>

    </div>
  )
}

export default RatingCard