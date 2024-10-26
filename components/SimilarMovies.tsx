import React from 'react';
import MovieCard from '@/components/MovieCard';
import { ContentItem } from '@/utils/types';
import Link from 'next/link';


interface SimilarContentProps {
  recommendations: ContentItem[];
  media: string;
}

const SimilarContent: React.FC<SimilarContentProps> = ({ recommendations, media }) => {
  return (

    <div className=" h-full ">
      {recommendations.length > 0 && (
        <div className='flex flex-col gap-4 items-center h-full overflow-y-auto scrollbar-thin flex-1'>
          <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-2 gap-y-10">
            {recommendations.map((item) => (
              <Link
                key={item.id}
                href={`/${item.media_type}/${item.id}`}>
                <MovieCard
                  key={item.id}
                  item={{ id: item.id, poster_path: item.poster_path, media_type: media }}
                />
              </Link>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default SimilarContent;
