"use client"
import ProviderSection from '@/components/content/provider-section';
import VideoSection from '@/components/content/video-section';
import React, { useState } from 'react';
import CreditsList from '@/components/people/credits-list';
import ContentNavbar from '@/components/content/content-navbar';
import SimilarContentSection from '@/components/content/similar-content-section';
import { MovieData } from '@/lib/types/movie';
import { Selection } from '@/lib/types/content';


const sectionComponents = {
  crew: (data: MovieData) => (
    <CreditsList personList={data.credits.crew} />
  ),
  cast: (data: MovieData) => (
    <CreditsList personList={data.credits.cast} />
  ),
  overview: (data: MovieData) => (
    <p className='text-justify'>{data.overview}</p>
  ),
  watch: (data: MovieData) => (
    <ProviderSection providers={data.providers} />
  ),
  videos: (data: MovieData) => (
    <VideoSection videoInfo={data.videos} />
  ),
  similar: (data: MovieData) => (
    <SimilarContentSection
      recommendations={data.recommendations.results}
      media={data.type}
    />
  )
};

const Body = ({ movieData }: { movieData: MovieData }) => {
  const [selection, setSelection] = useState<Selection>("cast");

  const SelectedSection = () => {
    const SectionComponent = sectionComponents[selection as keyof typeof sectionComponents];
    return (
      <div className={`
        flex flex-col gap-5 
        ${selection === 'watch' || selection === 'videos' ? 'h-full mt-10 justify-around' : 'my-10 w-full h-full pb-20'}
      `}>
        {SectionComponent && SectionComponent(movieData)}
      </div>
    );
  };

  return (
    <section className="bg-background text-foreground w-full">
      <div className='flex flex-col mt-5 mb-10 mx-5'>
        <ContentNavbar
          setSelection={setSelection}
          selection={selection}
          media={movieData.type}
        />
        <div className='rounded-xl z-0 flex-1 overflow-hidden relative h-[650px]'>
          <SelectedSection />
        </div>
      </div>
    </section>
  );
};

export default Body;