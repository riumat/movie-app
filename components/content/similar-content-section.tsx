import React from 'react';
import Link from 'next/link';
import ContentCard from '@/components/cards/content-card';
import { MovieData } from '@/lib/types/movie.types';
import { TvData } from '@/lib/types/tv.types';
import SimpleContentCard from '@/components/cards/simple-content-card';


interface SimilarContentSectionProps {
  movieData: any;
}

const SimilarContentSection: React.FC<SimilarContentSectionProps> = ({ movieData }) => {
  const recommendations = movieData.recommendations;
  return (
    <div className=" h-full ">
      {recommendations.length > 0 && (
        <div className='flex flex-col gap-4 items-center h-full overflow-y-auto scrollbar-thin flex-1'>
          <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-2 gap-y-10">
            {recommendations.map((item: any, index: number) => (
              <Link
                key={`${index}-${item.id}-${item.type}`}
                href={`/${item.type}/${item.id}`}>
                {item.user ? (
                  <ContentCard
                    key={`${index}-${item.id}-${item.type}`}
                    item={item}

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
        </div>
      )}

    </div>
  );
};

export default SimilarContentSection;
