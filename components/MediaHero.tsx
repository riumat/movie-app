"use client"
import CastCarousel from '@/components/CastCarousel';
import ProviderSection from '@/components/ProvidersSection';
import VideoSection from '@/components/VideoSection';
import { formattedCrewList } from '@/utils/functions';
import { MovieData } from '@/utils/types';
import React, { useState } from 'react';


interface MediaHeroProps {
  movieData: MovieData;
}
type Selection = "crew" | "watch" | "similar";


const MediaHero: React.FC<MediaHeroProps> = ({ movieData }) => {
  const [selection, setSelection] = useState<Selection>("crew")
  return (
    <section className="flex flex-col items-center gap-16 w-full">
      <div className='w-full flex justify-evenly text-[14px]'>
        <button
          onClick={() => setSelection("crew")}
          className={`${selection === "crew" ? "bg-white text-black" : "bg-black text-gray-200 border"} py-1 px-10 font-semibold rounded-lg active:scale-95`}
        >
          Crew
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
      <div className='rounded z-0 h-[650px] w-[80%]'>
        {selection === "crew" && (
          <div className='flex flex-col justify-center'>
            <div className='flex flex-col gap-5 mt-5'>
              <CastCarousel personList={formattedCrewList(movieData.credits.crew)} />
            </div>

            <div className="flex flex-col pt-6 relative">
              <h2 className="text-center font-semibold mb-2">Cast</h2>
              <CastCarousel personList={movieData.credits.cast} />
            </div>
          </div>
        )}
        {selection === "watch" && (
          <div className='flex gap-5 h-full justify-between'>

            <ProviderSection providers={movieData.providers.results.IT} />
            <VideoSection videoInfo={movieData.videos.results.filter((video) => video.official && video.type === "Trailer").slice(0, 3)} />

          </div>
        )}
        {selection === "similar" && (
          <div className='flex flex-col gap-5'>
            <div className='flex flex-col gap-5'>


            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MediaHero;
