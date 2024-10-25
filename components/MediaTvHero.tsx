"use client"
import ProviderSection from '@/components/ProvidersSection';
import VideoSection from '@/components/VideoSection';
import { Selection, TvData } from '@/utils/types';
import React, { useState } from 'react';
import SimilarContent from '@/components/SimilarMovies';
import TvSeasonSection from '@/components/TvSeasonSection';
import MainSectionSelector from '@/components/MainSectionSelector';
import CreditsList from '@/components/CreditsList';


interface MediaHeroProps {
  tvData: TvData;
}

const MediaTvHero: React.FC<MediaHeroProps> = ({ tvData }) => {
  const [selection, setSelection] = useState<Selection>("cast")
  return (
    <section className=" bg-gradient-to-r from-transparent to-neutral-100/10 rounded-xl container">
      <div className='flex m-10 gap-5'>
        <MainSectionSelector
          setSelection={setSelection}
          selection={selection}
          media={tvData.type}
        />
        <div className='rounded-xl z-0 flex-1 overflow-hidden relative h-[650px]'>

          {selection === "crew" && (
            <div className='flex flex-col gap-5 my-10 w-full h-full pb-20'>
              <CreditsList personList={tvData.credits.crew} />
            </div>
          )}
          {selection === "cast" && (
            <div className='flex flex-col gap-5 my-10 w-full h-full pb-20'>
              <CreditsList personList={tvData.credits.cast} />
            </div>
          )}

          {selection === "seasons" && (
            <div className='flex h-full mt-10  w-full'>
              <TvSeasonSection seasons={tvData.seasons} />
            </div>
          )}

          {selection === "watch" && (
            <div className='flex flex-col gap-5 h-full mt-10 justify-around'>
              <ProviderSection providers={tvData.providers} />
            </div>
          )}
          {selection === "videos" && (
            <div className='flex flex-col gap-5 h-full mt-10 justify-around'>
              <VideoSection videoInfo={tvData.videos} />
            </div>
          )}

          {selection === "similar" && (
            <div className='flex flex-col gap-5 my-10 w-full h-full pb-20'>
              <SimilarContent
                recommendations={tvData.recommendations.results}
                media='tv'
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MediaTvHero;