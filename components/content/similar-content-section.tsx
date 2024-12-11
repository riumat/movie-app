import React from 'react';
import Link from 'next/link';
import ContentCard from '@/components/cards/content-card';
import { MovieData } from '@/lib/types/movie';
import { TvData } from '@/lib/types/tv';


interface SimilarContentSectionProps {
  recommendations: MovieData[] | TvData[];
  similarData: any;
}

const SimilarContentSection: React.FC<SimilarContentSectionProps> = ({ recommendations, similarData }) => {
  return (

    <div className=" h-full ">
      {recommendations.length > 0 && (
        <div className='flex flex-col gap-4 items-center h-full overflow-y-auto scrollbar-thin flex-1'>
          <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-2 gap-y-10">
            {recommendations.map((item, index) => (
              <Link
                key={`${index}-${item.id}-${item.type}`}
                href={`/${item.type}/${item.id}`}>
                <ContentCard
                  item={item}
                  isWatchedServer={similarData.watched.includes(item.id)}
                  isBookmarkedServer={similarData.bookmarked.includes(item.id)}
                />
              </Link>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default SimilarContentSection;
