import ContentInfos from '@/components/content/content-infos';
import ContentProdLogos from '@/components/content/content-prod-logos';
import ExternalLinksList from '@/components/people/ext-links-list';
import { MovieData } from '@/lib/types/movie.types';
import { TvData } from '@/lib/types/tv.types';
import React from 'react';

const ContentHeader = ({ contentData }: { contentData: MovieData | TvData }) => {
  return (
    <div className="relative min-h-[370px] lg:min-h-[350px] w-full lg:ml-32 mt-14 lg:mt-10  ">

      <div className="absolute inset-0 flex flex-col gap-5 lg:gap-7 items-start text-foreground p-5 bg-gradient-to-b from-transparent  to-background ">
        <div className='flex flex-col  w-full items-center lg:items-start'>
          <ContentProdLogos contentData={contentData} />
          <h2 className="text-2xl lg:text-5xl font-bold text-center mt-5 lg:mt-0">{contentData.media_type === "movie" ? contentData.title : contentData.name}</h2>
        </div>
        <ContentInfos contentData={contentData} />
        <ExternalLinksList externalIds={contentData.external_ids} />
      </div>
    </div>
  );
};

export default ContentHeader;
