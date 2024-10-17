"use client"
import PersonCarousel from '@/components/PersonCarousel';
import ProviderSection from '@/components/ProvidersSection';
import VideoSection from '@/components/VideoSection';
import { imageUrl, imgWidth } from '@/utils/constants';
import { TvData } from '@/utils/types';
import Image from 'next/image';
import React, { useState } from 'react';
import { formatTvAggregate, formatTvCastList } from '@/utils/functions';
import SimilarContent from '@/components/SimilarMovies';


interface MediaHeroProps {
  tvData: TvData;
}
type Selection = "crew" | "watch" | "similar";


const MediaTvHero: React.FC<MediaHeroProps> = ({ tvData }) => {
  const [selection, setSelection] = useState<Selection>("crew")
  return (
    <section className="flex flex-col items-center gap-16 w-full">
      <div className='w-full flex justify-evenly text-[14px]'>
        <button
          onClick={() => setSelection("crew")}
          className={`${selection === "crew" ? "bg-white text-black" : "bg-black text-gray-200 border"} py-1 px-10 font-semibold rounded-lg active:scale-95`}
        >
          Crew & Cast
        </button>
        <button
          onClick={() => setSelection("watch")}
          className={`${selection === "watch" ? "bg-white text-black" : "bg-black text-gray-200 border"} py-1 px-10 font-semibold rounded-lg active:scale-95`}
        >
          Watch
        </button>
        <button
          onClick={() => setSelection("similar")}
          className={`${selection === "similar" ? "bg-white text-black" : "bg-black text-gray-200 border"} py-1 px-10 font-semibold rounded-lg active:scale-95`}
        >
          Similar
        </button>
      </div>
      <div className='rounded-xl z-0 h-[650px] w-[80%] overflow-hidden px-2 mb-10 relative'>
        <Image
          src={`${imageUrl}${imgWidth.backdrop.original}${tvData.images.backdrops[1]?.file_path ?? tvData.images.backdrops[0]?.file_path}`}
          alt={`${tvData.name} backdrop`}
          layout="fill"
          quality={100}
          className="absolute inset-0 z-[-1] opacity-10 filter grayscale-[80%] brightness-100 rounded-xl object-cover"
        />
        {selection === "crew" && (
          <div className='flex flex-col justify-center mt-10 z-1'>
            <div className='flex justify-center '>
              <PersonCarousel personList={[...tvData.created_by, ...(formatTvAggregate(tvData.aggregate_credits.crew))]} type="crew" />
            </div>

            <div className="flex flex-col gap-5 pt-6 relative">
              <h2 className="text-center font-semibold mb-2">Cast</h2>
              <div className='flex justify-center'>
                <PersonCarousel personList={formatTvCastList(tvData.aggregate_credits.cast)} type="cast" />
              </div>
            </div>
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
    </section>
  );
};

export default MediaTvHero;