import ContentInfos from '@/components/content/content-infos';
import ContentProdLogos from '@/components/content/content-prod-logos';
import UserSection from '@/components/content/user-section';
import { MovieData } from '@/lib/types/movie';
import { TvData } from '@/lib/types/tv';
import React from 'react';

const ContentHeader = ({ contentData }: { contentData: MovieData | TvData }) => {
  return (
    <div className="relative min-h-[350px] w-full ml-32 mt-10 ">

      <div className="absolute inset-0 flex flex-col gap-7 items-start text-foreground p-5 bg-gradient-to-b from-transparent  to-background ">
        <div className='flex flex-col gap-3 w-full'>
          <ContentProdLogos contentData={contentData} />
          <h2 className="text-5xl font-bold ">{contentData.type === "movie" ? contentData.title : contentData.name}</h2>
        </div>
        <ContentInfos contentData={contentData} />
        <UserSection contentData={contentData} />
      </div>

    </div>
  );
};

export default ContentHeader;
