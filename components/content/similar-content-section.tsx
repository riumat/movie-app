import React from 'react';
import { MovieData } from '@/lib/types/movie.types';
import { TvData } from '@/lib/types/tv.types';
import ContentInfoModal from '@/components/content/content-info-modal';
import VerticalCard from '@/components/cards/vertical-card';


interface SimilarContentSectionProps {
  contents: (MovieData | TvData)[];
}

const SimilarContentSection: React.FC<SimilarContentSectionProps> = ({ contents }) => {
  return (
    <div className=" h-full ">
      {contents.length > 0 && (
        <div className='flex flex-col gap-4 items-center justify-items-center h-full overflow-y-auto scrollbar-thin flex-1'>
          <div className="w-full grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-x-12 sm:gap-x-28 lg:gap-x-16 xl:gap-x-28 px-5 gap-y-10">
            {contents.map((item) => (
              <ContentInfoModal
                key={item.id}
                content={item}
                trigger={<VerticalCard item={item} />}
              />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default SimilarContentSection;
