import { imageUrl, imgWidth, placeholders } from '@/lib/constants'
import React from 'react'
import { FaRegStar, FaStar } from 'react-icons/fa';
import ImageWithLoader from '@/components/layout/image-with-loader';

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
  const imageSrc = item.poster_path ? `${imageUrl}${imgWidth.poster[342]}${item.poster_path}` : placeholders.multi;

  return (
    <div className="flex items-center gap-3  relative justify-start">
      <div className='flex justify-start relative w-20 h-20'>
        <ImageWithLoader src={imageSrc} />
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