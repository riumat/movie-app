"use client"
import ProviderSection from '@/components/ProvidersSection';
import VideoSection from '@/components/VideoSection';
import { Selection, TvData } from '@/utils/types';
import React, { useState } from 'react';
import { formatTvAggregate, formatTvCastList } from '@/utils/functions';
import SimilarContent from '@/components/SimilarMovies';
import TvSeasonSection from '@/components/TvSeasonSection';
import SliderComponent from '@/components/SliderComponent';
import MainSectionSelector from '@/components/MainSectionSelector';


interface MediaHeroProps {
  tvData: TvData;
}

const MediaTvHero: React.FC<MediaHeroProps> = ({ tvData }) => {
  const [selection, setSelection] = useState<Selection>("crew")
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
            <div className='flex flex-col justify-center mt-10 z-1'>
              <div className='flex justify-center '>
                <SliderComponent
                  personList={[...tvData.created_by, ...(formatTvAggregate(tvData.aggregate_credits.crew))]}
                  type="crew"
                />
              </div>
              <div className="flex flex-col gap-5 pt-6 relative">
                <h2 className="text-center font-semibold mb-2">Cast</h2>
                <div className='flex justify-center'>
                  <SliderComponent
                    personList={formatTvCastList(tvData.aggregate_credits.cast)}
                    type="cast"
                  />
                </div>
              </div>
            </div>
          )}

          {selection === "seasons" && (
            <div className='flex h-full mt-10  w-full'>
              <TvSeasonSection seasons={tvData.seasons} />
            </div>
          )}

          {selection === "watch" && (
            <div className='flex flex-col gap-5 h-full mt-10 justify-around'>
              <ProviderSection providers={tvData.providers.results.IT} />
              <VideoSection videoInfo={tvData.videos.results.filter((video) => video.official && video.type === "Trailer").slice(0, 3)} />
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