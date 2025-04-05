import ContentInfos from '@/components/content/content-infos';
import ContentProdLogos from '@/components/content/content-prod-logos';
import ExternalLinksList from '@/components/people/ext-links-list';
import { MovieData } from '@/lib/types/movie.types';
import { TvData } from '@/lib/types/tv.types';
import React from 'react';

const ContentHeader = ({ contentData }: { contentData: MovieData | TvData }) => {
  return (
    <div className="relative min-h-[420px] lg:min-h-[390px] w-full lg:ml-32 mt-16 lg:mt-14  ">

      <div className="absolute inset-0 top-12 lg:top-0 flex flex-col gap-5 items-center lg:items-start text-foreground p-5 bg-gradient-to-b from-transparent to-[90%]  to-background ">
        <ContentProdLogos contentData={contentData} />
        <ContentInfos contentData={contentData} />
        <ExternalLinksList externalIds={contentData.external_ids} />
      </div>
    </div>
  );
};

export default ContentHeader;
