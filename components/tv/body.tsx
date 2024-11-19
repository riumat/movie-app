"use client"
import ProviderSection from '@/components/content/provider-section';
import VideoSection from '@/components/content/video-section';
import React, { useState } from 'react';
import CreditsList from '@/components/people/credits-list';
import { Selection, TvData } from '@/lib/types';
import ContentNavbar from '@/components/content/content-navbar';
import SimilarContentSection from '@/components/content/similar-content-section';
import SeasonsSection from '@/components/tv/seasons-section';

const sectionComponents = {
  crew: (data: TvData) => (
    <CreditsList personList={data.credits.crew} />
  ),
  cast: (data: TvData) => (
    <CreditsList personList={data.credits.cast} />
  ),
  seasons: (data: TvData) => (
    <SeasonsSection seasons={data.seasons} />
  ),
  watch: (data: TvData) => (
    <ProviderSection providers={data.providers} />
  ),
  videos: (data: TvData) => (
    <VideoSection videoInfo={data.videos} />
  ),
  similar: (data: TvData) => (
    <SimilarContentSection
      recommendations={data.recommendations.results}
      media={data.type}
    />
  )
};

const Body = ({ tvData }: { tvData: TvData }) => {
  const [selection, setSelection] = useState<Selection>("cast");

  const SelectedSection = () => {
    const SectionComponent = sectionComponents[selection as keyof typeof sectionComponents];
    return (
      <div className={`
        flex flex-col gap-5 
        ${selection === 'watch' || selection === 'videos' ? 'h-full mt-10 justify-around' : 'my-10 w-full h-full pb-20'}
        ${selection === 'seasons' ? 'h-full mt-10' : ''}
      `}>
        {SectionComponent && SectionComponent(tvData)}
      </div>
    );
  };

  return (
    <section className="bg-background text-foreground w-full">
      <div className='flex flex-col mt-5 mb-10 mx-5'>
        <ContentNavbar
          setSelection={setSelection}
          selection={selection}
          media={tvData.type}
        />
        <div className='rounded-xl z-0 flex-1 overflow-hidden relative h-[650px]'>
          <SelectedSection />
        </div>
      </div>
    </section>
  );
};

export default Body;
