import React from 'react';
import MovieCard from '@/components/MovieCard';
import { ContentItem } from '@/utils/types';


interface SimilarContentProps {
  recommendations: ContentItem[];
  media: string;
}

const SimilarContent: React.FC<SimilarContentProps> = ({ recommendations, media }) => {
  return (

    <div className=" h-full ">
      {recommendations.length > 0 && (
        <div className='flex flex-col gap-4 items-center h-full overflow-y-auto scrollbar-thin flex-1'>
          <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
            {recommendations.map((item) => (
              <MovieCard
                key={item.id}
                item={{ id: item.id, poster_path: item.poster_path, media_type: media }}
              />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default SimilarContent;
