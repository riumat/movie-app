"use client"
import ProviderSection from '@/components/ProvidersSection';
import VideoSection from '@/components/VideoSection';
import SimilarMovies from '@/components/SimilarMovies';
import { MovieData, Selection } from '@/utils/types';
import React, { useState } from 'react';
import MainSectionSelector from '@/components/MainSectionSelector';
import CreditsList from '@/components/CreditsList';

interface MediaHeroProps {
  movieData: MovieData;
}


const MediaHero: React.FC<MediaHeroProps> = ({ movieData }) => {
  const [selection, setSelection] = useState<Selection>("cast")
  return (
    <section className=" bg-gradient-to-r from-transparent to-neutral-100/10 rounded-xl container">
      <div className='flex m-10 '>
        <MainSectionSelector
          setSelection={setSelection}
          selection={selection}
          media={movieData.type}
        />
        <div className='rounded-xl z-0 flex-1 overflow-hidden relative h-[650px]'>
          {selection === "crew" && (
            <div className='flex flex-col gap-5 my-10 w-full h-full pb-20'>
              <CreditsList personList={movieData.credits.crew} />
            </div>
          )}
          {selection === "cast" && (
            <div className='flex flex-col gap-5 my-10 w-full h-full pb-20'>
              <CreditsList personList={movieData.credits.cast} />
            </div>
          )}
          {selection === "watch" && (
            <div className='flex flex-col gap-5 h-full mt-10 justify-around'>
              <ProviderSection providers={movieData.providers} />
            </div>
          )}
          {selection === "videos" && (
            <div className='flex flex-col gap-5 h-full mt-10 justify-around'>
              <VideoSection videoInfo={movieData.videos} />
            </div>
          )}
          {selection === "similar" && (
            <div className='flex flex-col gap-5 my-10 w-full h-full pb-20'>
              <SimilarMovies
                recommendations={movieData.recommendations.results}
                media={"movie"}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MediaHero;