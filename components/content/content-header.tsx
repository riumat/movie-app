import ContentInfos from '@/components/content/content-infos';
import ContentProdLogos from '@/components/content/content-prod-logos';
import UserSection from '@/components/content/user-section';
import { MovieData } from '@/lib/types/movie';
import { TvData } from '@/lib/types/tv';
import React from 'react';

const ContentHeader = ({ contentData, userData }: { contentData: MovieData | TvData, userData: any }) => {
  return (
    <div className="relative min-h-[350px] w-full ml-32">

      <div className="absolute inset-0 flex flex-col gap-5 justify-end pb-16 items-start  text-foreground p-5 bg-gradient-to-b from-transparent  to-background ">
        <ContentProdLogos contentData={contentData} />
        <h2 className="text-5xl font-bold ">{contentData.type === "movie" ? contentData.title : contentData.name}</h2>
        <ContentInfos contentData={contentData} />
        <UserSection userData={userData} contentData={contentData} />
      </div>

    </div>
  );
};

export default ContentHeader;
