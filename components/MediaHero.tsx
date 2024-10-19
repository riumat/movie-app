"use client"
import ProviderSection from '@/components/ProvidersSection';
import VideoSection from '@/components/VideoSection';
import SimilarMovies from '@/components/SimilarMovies';
import { imageUrl, imgWidth } from '@/utils/constants';
import { MovieData, Selection } from '@/utils/types';
import Image from 'next/image';
import React, { useState } from 'react';
import { formatCrewList } from '@/utils/functions';
import SliderComponent from '@/components/SliderComponent';
import MainSectionSelector from '@/components/MainSectionSelector';

interface MediaHeroProps {
  movieData: MovieData;
}


const MediaHero: React.FC<MediaHeroProps> = ({ movieData }) => {
  const [selection, setSelection] = useState<Selection>("crew")
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
            <div className='flex flex-col justify-center mt-10 z-1 h-full'>
              <div className='flex justify-center '>
                <SliderComponent personList={formatCrewList(movieData.credits.crew)} type="crew" />
              </div>

              <div className="flex flex-col gap-5  relative">
                <h2 className="text-center font-semibold mb-1">Cast</h2>
                <div className='flex justify-center'>
                  <SliderComponent personList={movieData.credits.cast} type="cast" />
                </div>
              </div>
            </div>
          )}
          {selection === "watch" && (
            <div className='flex flex-col gap-5 h-full mt-10 justify-around'>
              <ProviderSection providers={movieData.providers.results.IT} />
              <VideoSection videoInfo={movieData.videos.results.filter((video) => video.official && video.type === "Trailer").slice(0, 3)} />
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